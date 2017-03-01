
var simpleAverageHistory = [];
var averageCount = 10;
var simpleAveragePointer = 0;
var currentVal = 0, simpleAverage = 0;

for (var x=0; x < averageCount; x++)
  simpleAverageHistory[x] = 0;

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    currentVal = parseInt(chunk);

    simpleAverageHistory[simpleAveragePointer] = currentVal;
    simpleAveragePointer++;
    if (simpleAveragePointer > averageCount)
      simpleAveragePointer = 0;

    console.log(simpleAverageHistory)
    var temporaryCount = 0;
    for (var x=0; x < averageCount; x++) {
      temporaryCount = temporaryCount + simpleAverageHistory[x];
    }

    simpleAverage = parseInt(temporaryCount / averageCount);

    console.log(currentVal,simpleAverage)
    process.stdout.write(`data: ${chunk}`);
  }
});
process.stdin.on('end', () => {
  process.stdout.write('end');
});
