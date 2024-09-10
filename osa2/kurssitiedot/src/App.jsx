const Course = ({course}) => (
  <>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);


const Header = ({courseName}) => (
  <h1>{courseName}</h1>
);

const Total = ({parts}) => {

  const totaExcercises = parts.reduce((total, current) => {
        return total + current.exercises;
    }, 0);
  
  return (
  <b><p>total of {totaExcercises} excercises</p></b>
)};

const Content = ({parts}) => {
  return (
  <>
    {parts.map((i) => {
      return <Part key={i.id} name={i.name} exercise={i.exercises} />;
    })}
  </>
  );
};

const Part = ({name, exercise}) => (
  <p>{name} {exercise}</p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <Course course={course} />
  )
}

export default App