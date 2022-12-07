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

    switch (true) {
        
        //first assignment fully contained in second assignment
        case firstAssignmentStart >= secondAssignmentStart && firstAssignmentEnd <= secondAssignmentEnd:
            return true;

        //second assignment fully contained in first assignment
        case secondAssignmentStart >= firstAssignmentStart && secondAssignmentEnd <= firstAssignmentEnd:
            return true;

        //first assignment overlaps low end of second assignment
        case firstAssignmentStart <= secondAssignmentStart && firstAssignmentEnd >= secondAssignmentStart:
            return true;
        
        //second assignment overlaps low end of first assignment
        case secondAssignmentStart <= firstAssignmentStart && secondAssignmentEnd >= firstAssignmentStart:
            return true;
        
        //first assignment overlaps high end of second assignment
        case firstAssignmentStart <= secondAssignmentEnd && firstAssignmentEnd >= secondAssignmentEnd:
            return true;
        
        //second assignment overlaps high end of first assignment
        case secondAssignmentStart <= firstAssignmentEnd && secondAssignmentEnd >= firstAssignmentEnd:
            return true;
        default:
            return false;

    }

}

sumDuplicateAssignments();
