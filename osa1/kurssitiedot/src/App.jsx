
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[{"part": part1.name, "exercise": part1.exercises},
         {"part": part2.name, "exercise": part2.exercises},
         {"part": part3.name, "exercise": part3.exercises}]} />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

export default App