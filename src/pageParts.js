'use strict';

import React from 'react';

// немного реакта для удобного добавления записей на страницу
var TableRow = React.createClass({
    render: () => {
        console.log(this.props);
        return (
            <tr>
                <td>{this.props.note.name}</td>
                <td>{this.props.note.email}</td>
                <td>{this.props.note.tel}</td>
            </tr>
        );
    }
});

var TableBody = React.createClass({
    render: () => {
        var tableRows = this.props.data.map(function(note) {
            return (
                <TableRow note=note />
            );
        });
        return (
            <tbody>
                {tableRows}
            </tbody>
        );
    }
});