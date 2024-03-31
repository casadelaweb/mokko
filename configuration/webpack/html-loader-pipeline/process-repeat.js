export default function processRepeat(match, number, content) {
  // const occurrences = content.split('end;').length


  const times = Number(number) | 1
  match = content.repeat(times)
  return match
}
