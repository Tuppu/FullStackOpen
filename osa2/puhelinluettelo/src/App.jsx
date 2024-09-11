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

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  switch (type) {
    case 'success':
      return (
        <div className={type}>
          {message}
        </div>
      )
    case 'error':
    default:
      return (
        <div className="error">
          {message}
        </div>
      )
  }
  
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
      if (!window.confirm(`${foundPerson.name} id already added to phonebook, replace the old number with a new one?`)) {
        return;
      }

      const changedPerson = { ...foundPerson, number: newNumber }

      personService
        .update(foundPerson.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id !== changedPerson.id ? p : updatedPerson))
            setSuccessMessage(
              `Updated ${foundPerson.name}`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000) 
        })
        .catch(error => {
          console.log(error.response.statusText)
          alert(error.response.statusText);
        })

      return;
    }

    personService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('');
          setNewNumber('');
          setSuccessMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

          return;
        })
        .catch(error => {
          console.log(error.response.statusText)
          alert(error.response.statusText);
        })
  }

  const deletePerson = (id) => {
    const deletingPerson = persons.find((person) => person.id === id);

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
          setSuccessMessage(
            `Deleted ${deletedPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000) 
        })
        .catch(error => {
          const unfoundPerson = persons.find((person) => person.id === id);
          setErrorMessage(
            `the person '${unfoundPerson.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
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
      <Notification message={successMessage} type='success' />
      {/*<Notification message={errorMessage} type='error' />*/}
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