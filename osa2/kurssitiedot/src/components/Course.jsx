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

  export default Course;