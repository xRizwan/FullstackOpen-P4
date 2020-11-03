import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import personService from './services/persons';
import Notification from './Components/Notification';
import Error from './Components/Error';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ query, setNewQuery ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ successMessage, setSuccessMessage ] = useState(null);

  useEffect(() => {
    personService
    .getAll()
    .then(pData => {
      setPersons(pData.data);
    })
    .catch(() => setErrorMessage("Database Error"))
  }, [])

  const handleChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleQuery = (e) => {
    setNewQuery(e.target.value)
  }

  const addName = (e) => {
    setErrorMessage('');
    e.preventDefault();

    let check = persons.filter(person => person.name === newName);
    let check2 = persons.filter(person => person.number === newNumber);

    if (check.length > 0){
      let result = window.confirm(`${newName} already exists, replace the old number with the new one?`);
      
      if (result) {
        personService
        .update(check[0].id, {...check[0] , number: newNumber})
        .then(response => setPersons(persons.map(val => val.id === check[0].id ? response.data : val)))
        .then(() => setSuccessMessage(`person ${check[0].name} updated successfully`))
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error);
        })
      }

    }
    else if (check2.length > 0) {
      alert(`${newNumber} already exists`);
    } else {

      personService
      .create({name: newName, number: newNumber})
      .then(response => {
        setPersons(persons.concat(response.data))
        setSuccessMessage(`${newName} has been added!`);
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error);
      })

    }

    setNewName('');
    setNewNumber('');
  }

  const deleteHandler = (id) => {

    let result = window.confirm(`Delete person number ${id}?`)
    if (result){
      personService
      .deletePerson(id)
      .then(() => setPersons(persons.filter(person => person.id !== id ? person : false)))
      .then(() => setSuccessMessage(`Successfully deleted`))
      .catch(() => setSuccessMessage(`information of person number ${id} has already been deleted from the server`))

    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage}/>
      <Error message={errorMessage} />
      <Filter query={query} handleQuery={handleQuery}/>
      <h3>Add New</h3>
      <PersonForm
        addName={addName}
        handleChange={handleChange}
        newName={newName}
        handleNumber={handleNumber}
        newNumber={newNumber} 
      />
      <h2>Numbers</h2>
        <Persons 
          deleteHandler={deleteHandler}
          persons={persons.filter(person => person.name.toLowerCase().includes(query.toLowerCase()))}
        />
    </div>
  )
}

export default App