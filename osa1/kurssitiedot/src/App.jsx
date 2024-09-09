
const Header = (props) => (
  <h1>{props.course}</h1>
);

const Total = (props) => (
  <p>Number of exercises {props.exercises.reduceRight((acc, cur) => acc + cur, 0)}</p>
);

const Content = (props) => {
  return (
  <>
  {props.parts.map(function (i, index) {
    return <Part key={i.part} index={index} part={i.part} exercise={i.exercise} />;
  })}
  </>
  );
};

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
);

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[{"part": part1, "exercise": 10},
         {"part": part2, "exercise": 7},
         {"part": part3, "exercise": 14}]} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App