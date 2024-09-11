import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

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
          setErrorMessage(`Information of '${changedPerson.name}' has been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          const updatedPersons = persons.reduce((acc, item) => {
            if (item.id !== foundPerson.id) {
                acc.push(item);
            }
            return acc;
          }, []);

          setPersons(updatedPersons);
          setNewName('');
          setNewNumber('');  
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
          setErrorMessage(
            `Information of '${personObject.name}' has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          const updatedPersons = persons.reduce((acc, item) => {
            if (item.id !== personObject.id) {
                acc.push(item);
            }
            return acc;
          }, []);

          setPersons(updatedPersons);
          setNewName('');
          setNewNumber('');  
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
          const updatedPersons = persons.reduce((acc, item) => {
            if (item.id !== id) {
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
      <Notification message={successMessage ?? errorMessage} type={successMessage ? 'success' : 'error'} />
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