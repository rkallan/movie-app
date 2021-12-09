/* eslint-disable func-names */
/* eslint-disable no-extend-native */
Array.prototype.insert = function (index, ...rest) {
    return this.slice(0, index).concat(rest, this.slice(index));
};
