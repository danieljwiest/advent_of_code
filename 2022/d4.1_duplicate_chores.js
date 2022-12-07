const fs = require("fs");
const readline = require("readline");

async function processInputAndExecuteSolution(inputFile, solution) {

    const rl = readline.createInterface({
        input: fs.createReadStream(inputFile, {encoding: 'utf-8'}),
        crlfDelay: Infinity,
    });

    rl.on("line", solution);

    await new Promise((res) => rl.once("close", res));
}

async function sumDuplicateAssignments () {
    let duplicateAssignmentSum = 0;

    const solution = (line) => {
        const assignments = parseAssignments(line);
        console.log(assignments);

        if(isDuplicateAssignment(assignments)) {
            duplicateAssignmentSum++;
        }
    }

    await processInputAndExecuteSolution('./d4.1_input.txt', solution);
    console.log(duplicateAssignmentSum);
}

function parseAssignments (line) {
    const buffer = line.split(',');
    const assignments = [];

    //split assignments into start and end values and store in assignments array
    for (let i = 0; i < buffer.length; i++) {
        assignments[i] = buffer[i].split('-');
    }

    return assignments;
}   


function isDuplicateAssignment (assignments) {
    const firstAssignment = assignments[0];
    const secondAssignment = assignments[1];

    const firstAssignmentStart = Number(firstAssignment[0]);
    const firstAssignmentEnd = Number(firstAssignment[1]);

    const secondAssignmentStart = Number(secondAssignment[0]);
    const secondAssignmentEnd = Number(secondAssignment[1]);

    const firstAssignmentLength = firstAssignmentEnd - firstAssignmentStart;
    const secondAssignmentLength = secondAssignmentEnd - secondAssignmentStart;


    //find which assignment is longer is and then check if the other assignment is contained within it.
    if (firstAssignmentLength >= secondAssignmentLength && secondAssignmentStart >= firstAssignmentStart && secondAssignmentEnd <= firstAssignmentEnd) {
            return true;
    } else if (firstAssignmentLength <= secondAssignmentLength && firstAssignmentStart >= secondAssignmentStart && firstAssignmentEnd <= secondAssignmentEnd) {
            return true;
    } else {
        return false;
    }
}

sumDuplicateAssignments();
