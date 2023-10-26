function filterByValue(array, string) {
    return array.filter(obj => obj.minionId === string);
}

module.exports = {filterByValue};