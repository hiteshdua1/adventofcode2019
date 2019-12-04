function getPassword(start, end) {
  let totalPasword = 0;
  for (let i = start; i < end; i++) {
    let temp = ("" + i).split("");
    let matchCriteria = true;
    let doubleCriteria = false;
    for (let j = 0; j < temp.length - 1; j++) {
      if (+temp[j] > +temp[j + 1]) {
        matchCriteria = false;
        continue;
      }
      if (+temp[j] === +temp[j + 1]) {
        doubleCriteria = true;
      }
    }
    if (matchCriteria && doubleCriteria) {
      totalPasword++;
    }
  }
  return totalPasword;
}

getPassword(138241, 674034);
