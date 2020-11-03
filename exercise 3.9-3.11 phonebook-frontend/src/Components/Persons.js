import React from 'react';
import Person from './Person';

export default function Persons({persons, deleteHandler}) {
    return (
        <>
        {persons.map(person => <Person deleteHandler={deleteHandler} person={person} key={person.name} />)}
        </>
    )
}