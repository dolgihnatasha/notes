'use strict';

let renderNotes = require('./pageParts.js').renderNotes;
let search = require('./search');
let sort = require('./sorting').sort;
let storage = require('./ls').LocalStorage.getLocalStorage();

let allNotes = []; // храним здесь записи для для удобства

document.addEventListener("DOMContentLoaded", () => {
    allNotes = storage.getAllNotes(); // загружаем имеющиеся записи
    renderNotes(allNotes); // отображаем загруженные из хранилища записи
    addSorting('myTable');
});

document.getElementById('search').oninput = event => { // поиск по подстроке
    let filter = event.target.value;
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

let submitForm = document.getElementById('submitForm');
submitForm.addEventListener('click', event => { // добавление записи
    let formData = new FormData(document.getElementById('form'));
    let data = {};
    formData.forEach((e, i) => {
        data[i] = e;
    });
    storage.addNote(data);
    reset('name');
    reset('email');
    reset('tel');
});

let reset_btn = document.getElementById('reset');
reset_btn.addEventListener('click', event => {
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

document.getElementById('tel').oninput = event => {  // валидация телефона
    if (event.target.value !== '') {
        validateOk('tel');
    } else {
        validateErr('tel');
    }
};

document.getElementById('email').oninput = event => { // валидация почты
    if (document.getElementById('email').checkValidity()) {
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
    let currentSort = document.getElementsByClassName(field).item(0);
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
    for (let node of currentSort.parentNode.childNodes) {
        if (!node.classList.contains(field)) {
            node.classList.remove('headerAsc');
            node.classList.remove('headerDesc');
            node.classList.add('headerUnSorted');
        }
    }
}

function addSortingClasses(tableID) {
    let headings = document.getElementById(tableID).firstChild.firstChild.childNodes;
    for (let node of headings) {
        node.classList.remove('headerAsc');
        node.classList.remove('headerDesc');
        node.classList.add('headerUnSorted');
    }
}

// валидация полей

let valid = {tel: false, name: false};

function validateOk(id) {
    valid[id] = true;
    id = '#' + id;
    var parent = $(id).parent();
    parent.addClass('has-feedback has-success');
    parent.removeClass('has-error');
    $(id + 'OK').show();
    $(id + 'Err').hide();
    if (Object.keys(valid).length == 3 || (Object.keys(valid).length == 2 && valid.tel == true && valid.name == true)) {
        $('#submitForm').removeAttr("disabled");
    }
}

function validateErr(id) {
    valid[id] = false;
    id = '#' + id;
    var parent = $(id).parent();
    parent.addClass('has-feedback has-error');
    parent.removeClass('has-success');
    $(id + 'OK').hide();
    $(id + 'Err').show();
    $('#submitForm').attr("disabled", true);
}

function reset(id) {
    id = '#' + id;
    $(id).val('');
    $(id + 'OK').hide();
    $(id + 'Err').hide();
    var parent = $(id).parent();
    parent.removeClass('has-success has-feedback has-error');
    $('#submitForm').attr("disabled", true);
    let valid = {tel: false, name: false};
}
