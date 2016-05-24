'use strict';

var React = require('react');

// немного реакта для удобного добавления записей на страницу
var TableRow = note => {
    note = note.note;
    return (
        <tr>
            <td>{note.name}</td>
            <td>{note.email}</td>
            <td>{note.tel}</td>
        </tr>
    );
};

var Heading = (name) => {
    var heading = name.name;
    return (
        <th class="header">
            <span className="glyphicon glyphicon-sort-by-alphabet down"></span>
            <span className="glyphicon glyphicon-sort-by-alphabet-alt up"></span>
            <span className="glyphicon glyphicon-sort sort"></span>
            {heading}
        </th>
    )
};

var TableHeading = () => {
    return (
        <thead>
            <tr>
                <Heading name="Name"/>
                <Heading name="e-mail"/>
                <Heading name="Tel."/>
            </tr>
        </thead>
    )
};

var TableBody = notes => {
    var tableRows = notes.notes.map(function (note, i) {
        return (
            <TableRow key={i} note={note}/>
        );
    });
    return (
        <tbody id="tbody">
            {tableRows}
        </tbody>
    );
};

var NotesTable = notes => {
    return (
        <table id="myTable" className="table table-hover table-bordered table-striped">
            <TableHeading/>
            <TableBody notes={notes.notes}/>
        </table>
    );
};

module.exports = {
    TableRow,
    TableBody,
    NotesTable
};
