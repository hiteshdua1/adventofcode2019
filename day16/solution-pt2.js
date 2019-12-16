function fftAlgo(data) {
  let repeatcounter = 32;
  let concatData = "";
  while (repeatcounter) {
    concatData += data;
    repeatcounter--;
  }
  let inpDigits = concatData.split("").map(digit => +digit);
  let phaseLimit = 100;
  let phaseCounter = 0;
  let outDigits = [];

  while (phaseCounter < phaseLimit) {
    for (let i = 0; i < inpDigits.length; i++) {
      let sum = 0;
      let patternArr = patternCreator(i + 1, inpDigits.length + 1);
      for (let j = 0; j < inpDigits.length; j++) {
        sum += inpDigits[j] * patternArr[j];
      }
      outDigits[i] = Math.abs(sum % 10);
    }
    phaseCounter++;
    console.log(
      outDigits.join("").substring(outDigits.length / 2, outDigits.length)[0]
    );
    inpDigits = outDigits;
  }

  return outDigits.join("");
}

function patternCreator(count, len) {
  const pattern = [0, 1, 0, -1];
  const patternArr = [];
  let patternIndex = 0;

  let noOfTimesToRepeat = count;
  for (let i = 0; i < len; i++) {
    if (noOfTimesToRepeat > 0) {
      patternArr[i] = pattern[patternIndex % 4];
      noOfTimesToRepeat--;
    }

    if (noOfTimesToRepeat === 0) {
      patternIndex++;
      noOfTimesToRepeat = count;
    }
  }
  patternArr.shift();
  return patternArr;
}

fftAlgo("03036732577212944063491565474664");
