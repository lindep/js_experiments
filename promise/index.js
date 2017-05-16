

function promisify(func) {
  const self = this
  return (...args) =>
    new Promise((resolve, reject) => {
      const callback = (err, data) => err ? reject(err) : resolve(data)
      func.apply(self, args.concat[callback]);
    })
}

const readFile = promisify(fs.readFile)
const file = await readFile('./kittens.txt')
console.log(file)
