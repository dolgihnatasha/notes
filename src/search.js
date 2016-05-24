function contains(value, searched) {
    return value.indexOf(searched) !== -1;
}

module.exports = (string) => {
    return function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)){
                if (contains(obj[key],string)) {
                    return true;
                }
            }

        }
        return false;
    }
};
