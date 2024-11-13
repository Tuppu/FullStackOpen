import { useEffect, useState } from 'react'
import { DiaryEntry, Visibility, Weather } from './types';
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {
  const [newDiaryDate, setNewDiaryDate] = useState('');
  const [newDiaryWeather, setNewDiaryWeather] = useState('');
  const [newDiaryVisibility, setNewDiaryVisibility] = useState('');
  const [newDiaryComment, setNewDiaryComment] = useState('');
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    
    const diaryToAdd = {
      date: newDiaryDate,
      weather: newDiaryWeather as Weather,
      visibility: newDiaryVisibility as Visibility,
      comment: newDiaryComment,
      id: diaries.length + 1
    }

    createDiary(diaryToAdd).then(data => {
      setDiaries(diaries.concat(data));
    })

    setNewDiaryDate('')
    setNewDiaryWeather('')
    setNewDiaryVisibility('')
    setNewDiaryComment('')
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date <input
          value={newDiaryDate}
          onChange={(event) => setNewDiaryDate(event.target.value)} />
        </div>
        <div>
          weather <input
          value={newDiaryWeather}
          onChange={(event) => setNewDiaryWeather(event.target.value)} />
        </div>
        <div>
          visibility <input
          value={newDiaryVisibility}
          onChange={(event) => setNewDiaryVisibility(event.target.value)} />
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
