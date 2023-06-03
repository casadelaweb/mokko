module.exports = function processRepeat(match, number, content) {
  const times = Number(number)
  match = content.repeat(times)
  return match
}
