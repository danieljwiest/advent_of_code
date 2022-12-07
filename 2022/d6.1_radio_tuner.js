const fs = require("fs");
const readline = require("readline");

async function processInputAndExecuteSolution(inputFile, solution) {
    console.log('in Process Execute');

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile, {encoding: 'utf-8'}),
        crlfDelay: Infinity,
    });

    rl.on("line", solution);


    await new Promise((res) => rl.once("close", res));
}

async function signalTuner() {

    console.log('in signal tuner');

let inputHash = {};
let startOfPacketMarker = '';
let currentStreamPosition = 0;


const findPacketMarker = (line) => {
    console.log('in find Packet Marker');
    for (let i = 0; i < line.length; i++) {
        let char = line[i];
        currentStreamPosition++;
        
        logChar(char);

        if (isValidMarker()) {
            console.log(currentStreamPosition)
            moveToNextLine();
            return;
        } else {
            moveToNextChar();
        }
    }
}

await processInputAndExecuteSolution('./d6.1_input.txt', findPacketMarker);

function logChar (char) {
    //Hash current character if not already in inputHash
    if (!inputHash[char]) {
        inputHash[char] = 1;
    } else {
        inputHash[char]++;
    }

    //Add current char to start of PackerMarker
    startOfPacketMarker += char;
}

function isValidMarker () {
   if (startOfPacketMarker.length === 4 && !hasDuplicateCharacters(inputHash)) {
    return true;
   } else {
    return false;
   }
}

function hasDuplicateCharacters (hash) {
    for (let item in hash) {
        if (hash[item] > 1) return true;
    }
    return false;
}

function moveToNextChar () {
    let firstChar = startOfPacketMarker[0];

    // If packetMarker is full remove first char from Marker String and inputHash
    if (startOfPacketMarker.length === 4) {
        inputHash[firstChar]--;
        startOfPacketMarker = startOfPacketMarker.substring(1); 
    }
}

function moveToNextLine () {
    inputHash = {}
    startOfPacketMarker = '';
    currentStreamPosition = 0;
}

}



signalTuner();
