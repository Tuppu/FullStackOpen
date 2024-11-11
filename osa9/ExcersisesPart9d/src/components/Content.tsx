interface CourseServiceItem {
    name: string
    exerciseCount: number
}

export interface EnumCoursesServiceItems { content: Array<CourseServiceItem>}

const Content = (props: EnumCoursesServiceItems): JSX.Element => {
  return <div>
     {props.content.map((course) => (
      <p>{course.name} {course.exerciseCount}</p>
      ))}
  </div>;
};

export default Content