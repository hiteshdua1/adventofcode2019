function programAlarm(arr) {
  arr[1] = 12;
  arr[2] = 2;
  let i = 0;
  while (true) {
    if (arr[i] === 99) {
      break;
    }
    if (arr[i] === 1) {
      arr[arr[i + 3]] = arr[arr[i + 1]] + arr[arr[i + 2]];
      i += 4;
    }
    if (arr[i] === 2) {
      arr[arr[i + 3]] = arr[arr[i + 1]] * arr[arr[i + 2]];
      i += 4;
    }
  }
  return arr;
}
console.log(programAlarm([1, 0, 0, 0, 99]));
