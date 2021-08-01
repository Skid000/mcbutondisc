module.exports = {
    itemToString: (item) => {
        if (item) {
            return `${item.name}(${item.count})[${item.slot}] | `
        }
    },
    splitAt: index => x => [x.slice(0, index), x.slice(index)]
}