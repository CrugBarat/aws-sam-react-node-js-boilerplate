exports.sortData = (arr) => (arr ? arr.sort((a, b) => b.created - a.created) : []);
