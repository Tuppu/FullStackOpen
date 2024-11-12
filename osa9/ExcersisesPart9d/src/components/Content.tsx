import Part from "./Part";

interface CoursePartBase extends CoursePartDescription {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription {
  description?: string;
}

export interface CoursePartBasic extends CoursePartBase {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartBase {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartBase {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Content = (props: CoursePart[]): JSX.Element => {
  const courses = props;
  return <div>   
    {Object.values(courses).map((course: CoursePart) => (
      <Part {...course} />
    ))}
  </div>;
};

export default Content