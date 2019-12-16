function fftAlgo(data) {
    let inpDigits = data.split('').map(digit=>+digit);
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
            outDigits[i] = Math.abs(sum%10);
        }
        phaseCounter++;
//         console.log(outDigits);
        inpDigits = outDigits;
    }

    return outDigits.slice(0, 8).join('');
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

fftAlgo('59750530221324194853012320069589312027523989854830232144164799228029162830477472078089790749906142587998642764059439173975199276254972017316624772614925079238407309384923979338502430726930592959991878698412537971672558832588540600963437409230550897544434635267172603132396722812334366528344715912756154006039512272491073906389218927420387151599044435060075148142946789007756800733869891008058075303490106699737554949348715600795187032293436328810969288892220127730287766004467730818489269295982526297430971411865028098708555709525646237713045259603175397623654950719275982134690893685598734136409536436003548128411943963263336042840301380655801969822');
