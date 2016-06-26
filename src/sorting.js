
let sorted = {name: null, asc: -1};

var sort = (arr, name) => {
    var asc =  name == sorted.name ? sorted.asc * -1 : 1;
    sorted = {name, asc};
    return arr.sort(function (a, b) {
        if (a[name] > b[name]) {
            return asc;
        }
        if (a[name] < b[name]) {
            return -1 * asc;
        }
        return 0;
    })
};


module.exports = {
    sort
};
