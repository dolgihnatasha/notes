'use strict';

var LS = require('./ls').LocalStorage;

var React = require('react');
var ReactDOM = require('react-dom');
var {NotesTable} = require('./pageParts.js');
var search = require('./search');

var storage = LS.getLocalStorage();

var allNotes = [
    {name: 'vasiliy', email:'qwerqwr', tel:'0'},
    {name: 'vasiliy2', email:'qwerqwr2', tel:'3456789'},
    {name: 'vasiliy3', email:'qwerqwr3', tel:'1234'}
]; // храним здесь записи для для удобства

function renderNotes(notes) {
    ReactDOM.render(
        <NotesTable notes={notes}/>,
        document.getElementById('table-container')
    );
}

$(document).ready(function(){
    renderNotes(allNotes); // отображаем загруженные из хранилища записи
    $("#myTable").tablesorter(); // подключаем сортировку по столбцам
});

document.getElementById('search').oninput = event => { // поиск по подстроке
    var filter = event.target.value;
    renderNotes(
        allNotes.filter(search(filter))
    );
};

storage.onChange((newValue) => {
    try {
        allNotes.push(newValue);
        renderNotes(allNotes);
    } catch (err) {
        console.error('There is a problem:', newValue);
    }
});

$('#submitForm').on('click', event => {
    var data = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    storage.addNote(data);
});

document.getElementById('name').oninput = event => {
    if (event.target.value !== '') {
        validateOk('name');
    } else {
        validateErr('name');
    }
};

document.getElementById('email').oninput = event => {
    if (document.getElementById('email').checkValidity() && event.target.value !== '') {
        validateOk('email')
    } else {
        validateErr('email');
    }
};

function validateOk(id) {
    id = '#' + id;
    var parent = $(id).parent();
    parent.addClass('has-feedback has-success');
    parent.removeClass('has-error');
    $(id + 'OK').show();
    $(id + 'Err').hide();
    $('#submit').removeAttr("disabled");
}

function validateErr(id) {
    id = '#' + id;
    var parent = $(id).parent();
    parent.addClass('has-feedback has-error');
    parent.removeClass('has-success');
    $(id + 'OK').hide();
    $(id + 'Err').show();
    $('#submit').attr("disabled", true);
}
