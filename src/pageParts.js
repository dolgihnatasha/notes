'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// немного реакта для удобного добавления записей на страницу

var TableRow = note => { // одна запись
    note = note.note;
    return (
        <tr>
            <td>{note.name}</td>
            <td>{note.email}</td>
            <td>{note.tel}</td>
        </tr>
    );
};

var Heading = React.createClass({// блок заголовка колонки
    render: function () {
        var heading = this.props.name;
        var className = heading.toLowerCase().replace('-', '');
        return (
            <th className={className} class="header">
                <span className="glyphicon glyphicon-sort-by-alphabet down"/>
                <span className="glyphicon glyphicon-sort-by-alphabet-alt up"/>
                <span className="glyphicon glyphicon-sort sort"/>
                {heading}
            </th>
        )
    }
});

var TableHeading = React.createClass({ // строка заголовка таблицы
    render: function() {
        return (
            <thead>
                <tr>
                    <Heading name="Name"/>
                    <Heading name="e-mail"/>
                    <Heading name="Tel"/>
                </tr>
            </thead>
        )
    }
});

var TableBody = notes => { //содержимое таблицы
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

var NotesTable = notes => { // вся таблица
    return (
        <table id="myTable" className="table table-hover table-bordered table-striped">
            <TableHeading/>
            <TableBody notes={notes.notes}/>
        </table>
    );
};

function renderNotes(notes) {
    ReactDOM.render(
        <NotesTable notes={notes}/>,
        document.getElementById('table-container')
    );
}


module.exports = {
    NotesTable,
    renderNotes
};
