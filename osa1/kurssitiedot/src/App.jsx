
const Header = (props) => (
  <h1>{props.course}</h1>
);

const Total = (props) => {

  const totaExcercises = props.parts.reduce((total, current) => {
        return total + current.exercises;
    }, 0);
  
  return (
  <p>Number of exercises {totaExcercises}</p>
)};

const Content = (props) => {
  return (
  <>
    {props.parts.map(function (i, index) {
      return <Part key={i.name} index={index} name={i.name} exercise={i.exercises} />;
    })}
  </>
  );
};

const Part = (props) => (
  <p>{props.name} {props.exercise}</p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App