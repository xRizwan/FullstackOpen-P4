import React from 'react';

export default function Person(props) {
   
    return (
        <div>
            <span>{props.person.name} {props.person.number}</span>
            <button onClick={() => props.deleteHandler(props.person.id)}>delete</button>
        </div>
    )
}