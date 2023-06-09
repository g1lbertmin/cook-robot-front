export function sortBy(property, asc) {
  if (asc === undefined) {
    asc = -1
  } else {
    asc = asc ? -1 : 1
  }
  return function (value1, value2) {
    let a = value1[property]
    let b = value2[property]
    return a < b ? asc : a > b ? asc * -1 : 0
  }
}
