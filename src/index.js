'use strict';

var renderNotes = require('./pageParts.js').renderNotes;
var search = require('./search');
var sort = require('./sorting').sort;
var storage = require('./ls').LocalStorage.getLocalStorage();

var allNotes = []; // храним здесь записи для для удобства

$(document).ready(function(){
    allNotes = storage.getAllNotes(); // загружаем имеющиеся записи
    renderNotes(allNotes); // отображаем загруженные из хранилища записи
    addSorting('myTable');
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
    updateSortingClasses('');
});

storage.onChange(event => {// изменения из другой вкладки
    if (event.key !== 'key' && event.key !== 'last') {
        try {
            allNotes.push(JSON.parse(event.newValue));
        } catch (e) {}
    }
    renderNotes(allNotes);
});

$('#submitForm').on('click', event => { // сохраняем запись
    var data = $('#form').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    storage.addNote(data);
    reset('name');
    reset('email');
    reset('tel');
});

document.getElementById('name').oninput = event => {  // валидация имени
    if (event.target.value !== '') {
        validateOk('name');
    } else {
        validateErr('name');
    }
};

document.getElemntById('tel').oninput = event => {  // валидация имени
    if (event.target.value !== '') {
        validateOk('tel');
    } else {
        validateErr('tel');
    }
};

document.getElementById('email').oninput = event => { // валидация почты
    if (document.getElementById('email').checkValidity() && event.target.value !== '') {
        validateOk('email')
    } else {
        validateErr('email');
    }
};

function addSorting(tableID) { // подключаем сортировку
    document.getElementsByClassName('name').item(0).addEventListener('click', sortTable('name'));
    document.getElementsByClassName('email').item(0).addEventListener('click', sortTable('email'));
    document.getElementsByClassName('tel').item(0).addEventListener('click', sortTable('tel'));
    addSortingClasses(tableID);
}

function sortTable(field) {
    return function handler(event) {
        renderNotes(sort(allNotes, field));
        updateSortingClasses(field);
    }
}

function updateSortingClasses(field) {
    var currentSort = document.getElementsByClassName(field).item(0);
    if (currentSort.classList.contains('headerUnSorted')) {
        currentSort.classList.remove('headerUnSorted');
        currentSort.classList.add('headerAsc');
    } else {
        if (currentSort.classList.contains('headerAsc')) {
            currentSort.classList.remove('headerAsc');
            currentSort.classList.add('headerDesc');
        } else {
            currentSort.classList.remove('headerDesc');
            currentSort.classList.add('headerAsc');
        }
    }
    for (var node of currentSort.parentNode.childNodes) {
        if (!node.classList.contains(field)) {
            node.classList.remove('headerAsc');
            node.classList.remove('headerDesc');
            node.classList.add('headerUnSorted');
        }
    }
}

function addSortingClasses(tableID) {
    var headings = document.getElementById(tableID).firstChild.firstChild.childNodes;
    for (var node of headings) {
        node.classList.remove('headerAsc');
        node.classList.remove('headerDesc');
        node.classList.add('headerUnSorted');
    }
}

// валидация полей

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
