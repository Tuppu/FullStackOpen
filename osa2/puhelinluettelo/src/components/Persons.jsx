import Person from './Person'

const Persons = ({persons, newFilter, deletePerson}) => {
    return (
      persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map(person =>
          <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)} />
      )
    )
}
  
export default Persons;