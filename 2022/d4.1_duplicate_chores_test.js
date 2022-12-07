const fs = require("fs");
const readline = require("readline");

async function processInputAndExecuteSolution(inputFile, solution) {

    const rl = readline.createInterface({
        input: fs.createReadStream("inputFile", {encoding: 'utf-8'}),
        crlfDelay: Infinity,
    });

    rl.on("line", solution);

    await new Promise((res) => rl.once("close", res));
}



function parseAssignments (line) {
    const buffer = line.split(',');
    const assignments = [];
    // const assignmentNumber = 'first';
    // let assignmentStart = true;
    // let assignmentEnd = false;
    // let buffer = '';

    //split assignments into start and end values and store in assignments array
    for (let i = 0, i < buffer.length, i++) {
        assignments[i] = buffer[i].split('-');
    }

    
    

    // for (let char of line) {
    //     if (char === "-") {
    //         //log assignment start
    //         assignments[assignmentNumber].start = number(buffer);
    //         //shift to assignment end
    //         assignmentStart = false;
    //         assignmentEnd = true;
    //     } else if (char === ",") {
    //         //log assignment end
    //         assignments[assignmentNumber].end = buffer;
    //         //update to second assignment and shift to assignment start
    //         assignmentNumber = 'second';
    //         assignmentStart = true;
    //         assignmentEnd = false;
    //     } else {
    //         //udpate buffer with current character
    //         buffer += char;
    //     }
        
    //     //log assignment end for second assignment
    //     assignments[assignmentNumber].end = number(buffer);

        return assignments;
    }
}   


function findDuplicateAssignments (obj) {
    if (obj.first.start)
}