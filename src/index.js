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
    allNotes = storage.getAllNotes(); // загружаем имеющиеся записи
    console.log(allNotes);
    renderNotes(allNotes); // отображаем загруженные из хранилища записи
    $("#myTable").tablesorter(); // подключаем сортировку по столбцам
});

document.getElementById('search').oninput = event => { // поиск по подстроке
    var filter = event.target.value;
    renderNotes(
        allNotes.filter(search(filter)) // сортируем по запросу
    );
};

storage.onChangeHere(note => {// изменения в текущей вкладке
    allNotes.push(note);
    renderNotes(allNotes);
});

storage.onChange(event => {// изменения из другой вкладки
    if (event.key !== 'key' && event.key !== 'last') {
        console.log('here');
        try {
            allNotes.push(JSON.parse(event.newValue));
        } catch (e) {}
    }
    renderNotes(allNotes);
});

$('#submitForm').on('click', event => {
    var data = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    storage.addNote(data);
    reset('name');
    reset('email');
    reset('tel');
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

function reset(id) {
    id = '#' + id;
    $(id).val('');
    $(id + 'OK').hide();
    $(id + 'Err').hide();
    var parent = $(id).parent();
    parent.removeClass('has-success has-feedback has-error');
}

//TODO: load data from ls
//TODO: clear form

