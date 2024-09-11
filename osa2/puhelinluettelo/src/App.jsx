import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({newFilter, onChange}) => {
  return (      <div>
    filter shown with <input value={newFilter} onChange={onChange} />
  </div>)
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({persons, newFilter, deletePerson}) => {
  return (
    persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      .map(person =>
        <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id)} />
    )
  )
}

const Person = ({person, deletePerson}) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={deletePerson}>{'delete'}</button>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }

    const foundPerson = persons.find((person) => person.name == newName);

    if (foundPerson) {
      alert(`${newName} is already added to phonebook`);
      return
    }

    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('');
          setNewNumber('');    
        })
  }

  const deletePerson = (id) => {
    const deletingPerson = persons.find((person) => person.id == id);

    if (!window.confirm(`Delete ${deletingPerson.name}`)) {
      return;
    }

    personService
      .delete(id)
        .then(deletedPerson => {
          const updatedPersons = persons.reduce((acc, item) => {
            if (item.id !== deletedPerson.id) {
                acc.push(item);
            }
            return acc;
          }, []);

          setPersons(updatedPersons);
          setNewName('');
          setNewNumber('');   
        })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handlefilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} onChange={handlefilterChange} />
      <h3>add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} 
        handleNumberChange={handleNumberChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App