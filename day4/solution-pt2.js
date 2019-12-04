function getPassword(start, end) {
  let totalPasword = 0;
  for (let i = start; i < end; i++) {
    let temp = ("" + i).split("");
    let matchCriteria = true;
    let doubleCriteria = false;
    const doubleCriteriaMap = {};
    for (let j = 0; j < temp.length - 1; j++) {
      if (+temp[j] > +temp[j + 1]) {
        matchCriteria = false;
        continue;
      }
      if (+temp[j] === +temp[j + 1]) {
        doubleCriteria = true;
        doubleCriteriaMap[temp[j]] = (doubleCriteriaMap[temp[j]] || 0) + 1;
      }
    }
    if (matchCriteria && doubleCriteria) {
      const allKeys = Object.keys(doubleCriteriaMap);
      let holaMatch = false;
      for (let k = 0; k < allKeys.length; k++) {
        if (doubleCriteriaMap[allKeys[k]] === 1) {
          holaMatch = true;
          break;
        }
      }
      if (holaMatch) {
        totalPasword++;
      }
    }
  }
  return totalPasword;
}

getPassword(138241, 674034);
