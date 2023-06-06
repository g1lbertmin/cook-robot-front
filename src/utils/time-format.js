export function secondsToMMSS(sec, ph1 = ':', ph2 = '') {
  let ss = sec % 60
  let mm = (sec - ss) / 60
  if (mm < 10) mm = '0' + mm
  if (ss < 10) ss = '0' + ss
  return mm + ph1 + ss + ph2
}
