'use strict';

import Modernizr from './modernizr-custom';


class LocalStorage {
    private constructor() {
        this.ls = localStorage;
        this.currentNumber = this.getLastNoteNumber()
    }
    static getLocalStorage() {
        if (Modernizr.localstorage) {
            return new LocalStorage();
        } else {
            throw Error('Local storage is not available');
        }
    }

    onChange (func) {
        this.ls.onchange = func;
    }
    addNote (note) {

    }

    getAll() {

    }

    getLastNoteNumber() {
        //this.ls.get('')
    }
}


module.exports.LocalStorage = LocalStorage;