const Course = ({course}) => (
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Header = ({courseName}) => (
  <h3>{courseName}</h3>
);

const Total = ({parts}) => {

  const totalExcercises = parts.reduce((total, current) => {
        return total + current.exercises;
    }, 0);
  
  return (
  <b><p>total of {totalExcercises} excercises</p></b>
)};

const Content = ({parts}) => {
  return (
  <div>
    {parts.map((i) => {
      return <Part key={i.id} name={i.name} exercise={i.exercises} />;
    })}
  </div>
  );
};

const Part = ({name, exercise}) => (
  <p>{name} {exercise}</p>
);

const App = () => {
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
    <h2>Web development curriculum</h2>
    {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App