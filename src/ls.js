'use strict';

class LocalStorage {
    static get currentNumber() {
        try {
            return parseInt(localStorage.get('last'));
        } catch (e) {
            return 0;
        }
    }
    static set currentNumber(num) {
        localStorage.setItem('last', num.toString());
    }
    
    constructor() {}

    static getLocalStorage() {
        if (LocalStorage.checkLocalStorage()) {
            return new LocalStorage();
        } else {
            throw Error('Local storage is not available');
        }
    }

    static checkLocalStorage() {
        try {
            localStorage.setItem('key', 'data');
            localStorage.removeItem('key');
            return true
        } catch (e) {
            return false;
        }

    }

    onChange (func) {
        this.onAdd = func
    }

    addNote (note) {
        localStorage.setItem(LocalStorage.currentNumber.toString(), JSON.stringify(note));
        LocalStorage.currentNumber += 1;
        this.onAdd(note);
    }

    getAllNotes () {
        var result = [];
        for (var i = 0; i++; i > LocalStorage.currentNumber) {
            try {
                result.push(localStorage.getItem(i.toString(10)));
            } catch (e) {}
        }
        return result;
    }
}


module.exports.LocalStorage = LocalStorage;
