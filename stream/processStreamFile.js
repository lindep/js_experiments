const fs = require('fs')
const highland = require('highland')

fs.createReadStream('file.txt','utf8').pipe(process.stdout)

// Print buffer
highland(fs.createReadStream('file.txt'))
  .each(console.log)

// print string, all single buffer
highland(fs.createReadStream('file.txt','utf8'))
  .each(console.log)

// split buffer by new line
highland(fs.createReadStream('file.txt','utf8'))
  .split()
  .filter(line => line.length) //return true length > 0
  .map(line=>line.split(","))
  .map(parts=>({
    name:parts[0],
    val:parseInt(parts[1])
  }))
  .filter(obj=>obj.val>1)
  .ratelimit(1, 1000)
  .each(x=>console.log('line:',x))
