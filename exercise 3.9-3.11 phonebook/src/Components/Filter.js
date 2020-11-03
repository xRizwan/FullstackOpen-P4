import React from 'react';

export default function Filter(props) {
    return (
        <h3>Filter Shown by <input type="text" value={props.query} onChange={props.handleQuery}/> </h3>
    )
}