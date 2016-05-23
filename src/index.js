'use strict';

$(document).ready(function(){
    $("#myTable").tablesorter(); // одключаем сортировку по столбцам
});

var LS = require('./ls').LocalStorage;

var {TableRow, TableBody} = require('./pageParts');

var storage = LS.getLocalStorage();


