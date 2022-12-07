const fs = require("fs");
const readline = require("readline");

async function inputReadAndSort(inputFile, solution) {

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile, {encoding: 'utf-8'}),
        crlfDelay: Infinity,
    });

    rl.on("line", solution);

    await new Promise((res) => rl.once("close", res));
}


async function stackTopFinder() {
    const procedure = [];
    // const procedure = [['1','7','8'],[]];
    const stacks = [[],[],[],[],[],[],[],[],[]];
    const stackTops = [[],[],[],[],[],[],[],[],[]];

    const inputSort = (line) => {
        processLine(line, stacks, procedure);       
    }

    await inputReadAndSort('./d5.1_input.txt', inputSort);

    sortStacks(stacks, procedure);

    for (let i = 0; i < stacks.length; i++) {
        stackTops[i] = stacks[i][0];
    }

    console.log(stackTops);

}

function processLine (line, stacks, procedure) {

    const regexNums = /[0-9]+/g;
    let currentInstruction = [];
    let stackNumber = 1;
    const STACK_COLUMN_OFFSET = 4;
    
    if (line === '') return; 
    //Do nothing if line is blank
    if (line === ' 1   2   3   4   5   6   7   8   9 ') return;
    //Do nothing if current line is stack identification row

    if (line[0] === 'm') {
        //log instructions
        currentInstruction = line.match(regexNums);
        procedure.push(currentInstruction);
        return;
    } else {
        //log stacks
        for (let i = 1; i < line.length; i += STACK_COLUMN_OFFSET) {
        //use stack offset to only evaluate characters in the stacks
            if(line[i] === ' ') {
                //Nothing in stack so increment stackNumber
                stackNumber++;
            } else {
                //log crate in stacks array
                stacks[stackNumber-1].push(line[i]);
                // console.log(stacks);
                // console.log(stacks[stackNumber]);
                stackNumber++;
            }
            
        }
    }
}

function sortStacks(stacks, procedure) {
    for (let step of procedure) {
        //each step in procedure is an array formatted as ['move QTY', 'from', 'to']
        let moveQty = Number(step[0]);
        const from = Number(step[1]) - 1;
        const to = Number(step[2]) - 1;

        // move items per instructions
        for (let i = moveQty; i > 0; i--) {
                stacks[to].unshift(stacks[from].shift());
        }
    }
}


stackTopFinder();