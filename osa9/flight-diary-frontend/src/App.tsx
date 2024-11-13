import { useEffect, useState } from 'react'
import { DiaryEntry, Visibility, Weather } from './types';
import diaryService from './diaryService';
import axios from 'axios';

const App = () => {
  const [newDiaryDate, setNewDiaryDate] = useState('');
  const [newDiaryWeather, setNewDiaryWeather] = useState('');
  const [newDiaryVisibility, setNewDiaryVisibility] = useState('');
  const [newDiaryComment, setNewDiaryComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string>();

  interface VisibilityOption{
    value: Visibility;
    label: string;
  }

  const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
    value: v, label: v.toString()
  }));

  interface WeatherOption{
    value: Weather;
    label: string;
  }

  const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
    value: v, label: v.toString()
  }));

  useEffect(() => {
    diaryService.getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    
    try {
      const diaryToAdd = {
        date: newDiaryDate,
        weather: newDiaryWeather as Weather,
        visibility: newDiaryVisibility as Visibility,
        comment: newDiaryComment,
        id: diaries.length + 1
      }

      const diary = await diaryService.createDiary(diaryToAdd)
      setDiaries(diaries.concat(diary));

      setNewDiaryDate('')
      setNewDiaryWeather('')
      setNewDiaryVisibility('')
      setNewDiaryComment('')

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p className="error">Error: {error}</p>}
      <form onSubmit={diaryCreation}>
        <div>
          date <input type="date"
          value={newDiaryDate}
          onChange={(event) => setNewDiaryDate(event.target.value)} />
        </div>
        <div>
          visibility
          {visibilityOptions.map(option =>
            <>
              <input type="radio"
              value={option.value}
              id={option.label}
              checked={newDiaryVisibility == option.value}
              onChange={(event) => setNewDiaryVisibility(event.target.value)} />
              <label>{option.value}</label>
            </>
          )}
           
        </div>
        <div>
          weather
          {weatherOptions.map(option =>
            <>
              <input type="radio"
              value={option.value}
              id={option.label}
              checked={newDiaryWeather == option.value}
              onChange={(event) => setNewDiaryWeather(event.target.value)} />
              <label>{option.value}</label>
            </>
          )}
        </div>
        <div>
          Comment: <input
          value={newDiaryComment}
          onChange={(event) => setNewDiaryComment(event.target.value)} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h1><b>Diary entries</b></h1>
      {diaries.map(diary =>
        <div key={diary.id}>
          <p><b><h3>{diary.date}</h3></b></p>
          <p>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
            <div>comment: {diary.comment}</div>
          </p>
        </div>
      )}
  </div>
  )
}

export default App
