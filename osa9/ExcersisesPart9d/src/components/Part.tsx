import { CoursePart, CoursePartBackground, CoursePartBasic, CoursePartGroup, CoursePartSpecial } from "./Content";

const Part = (course: CoursePart): JSX.Element => {

    const basic = (course: CoursePartBasic): JSX.Element => (
        <div>
          <p>
            <div><b>{course.name} {course.exerciseCount}</b></div>
            <div><i>{course.description}</i></div>
          </p>
        </div>
      );

    const group = (course: CoursePartGroup): JSX.Element => (
    <div>
        <p>
        <div><b>{course.name} {course.exerciseCount}</b></div>
        <div><i>{course.description}</i></div>
        <div>project exercises {course.groupProjectCount}</div>
        </p>
    </div>
    );

    const background = (course: CoursePartBackground): JSX.Element => (
        <div>
            <p>
            <div><b>{course.name} {course.exerciseCount}</b></div>
            <div><i>{course.description}</i></div>
            <div>submit to {course.backgroundMaterial}</div>
            </p>
        </div>
        );

    const special = (course: CoursePartSpecial): JSX.Element => (
        <div>
            <p>
            <div><b>{course.name} {course.exerciseCount}</b></div>
            <div><i>{course.description}</i></div>
            <div>required skills {course.requirements.join(',')}</div>
            </p>
        </div>
        );

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (course.kind) {
        case "basic":
            return basic(course);
        case "group":
            return group(course);
        case "background":
            return background(course)
        case "special":
            return special(course)
    
        default:
            return assertNever(course);
    }
  };
  
  export default Part;