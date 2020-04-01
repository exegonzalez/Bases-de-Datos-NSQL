const capitalize = (w) => {
    let words = w.split(' ')
    words.forEach((word, idx) => {
        words[idx] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    return words.join(' ')
}

module.exports = { capitalize }