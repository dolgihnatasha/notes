
import Modernizr from './modernizr-custom';



class LocalStorage {
    private constructor() {
        this.ls = localStorage;
    }

    static getLocalStogage() {
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
}


module.exports.LocalStorage = LocalStorage;