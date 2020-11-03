import React from 'react';

export default function PersonForm(props) {
    return (
        <form onSubmit={props.addName}>
            <div>
                name: <input type="text" placeholder="Name" value={props.newName} onChange={props.handleChange}/>
            </div>
            <div>number: <input type="text" placeholder="Number" value={props.newNumber} onChange={props.handleNumber}/></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}