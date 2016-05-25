'use strict';

class LocalStorage {
    get currentNumber() {
        var n = localStorage.getItem('last');
        console.log('get:', n);
        return n ? parseInt(n) : 0;
    }
    set currentNumber(num) {
        console.log('set:', num);
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
        window.addEventListener('storage', func);
    }

    onChangeHere (func) {
        this.onAdd = func;
    }

    addNote (note) {
        localStorage.setItem(this.currentNumber.toString(), JSON.stringify(note));
        this.currentNumber += 1 ;
        this.onAdd(note);
    }

    getAllNotes () {
        var result = [];
        for (var i = 0; i < this.currentNumber; i++) {
            try {
                var note = JSON.parse(localStorage.getItem(i.toString()));
                if (note) {
                    result.push(note);
                }
            } catch (e){}
        }
        return result;
    }
}


module.exports.LocalStorage = LocalStorage;
