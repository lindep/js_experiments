const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

const readFileAsArray = function(file, cb = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) {
        reject(err);
        return cb(err);
      }
      const lines = data.toString().trim().split('\n');
      resolve(lines);
      cb(null, lines);
    });
  });
};

var objA = {
	x:0,
	y:0,
	show() {
		console.log(this.x,this.y)
	},
	async execute(...args) {
  	this.emit('begin');
    try {
      console.time('execute');
      const data = await readFileAsArray(...args);
      this.emit('data', data);
      console.timeEnd('execute');
      this.emit('end');
    } catch(err) {
      this.emit('error', err);
    }
  }
}

function CustObj() {
	var custObj = Object.create(Object.assign(CustObj.prototype, objA));
	var prop = "test";
	custObj.get = function() {
		console.log('prop =', prop);
		return prop;
	}
	return custObj;
}

CustObj.prototype = {};

//Enherit EventEmitter methods
Object.assign(CustObj.prototype, EventEmitter.prototype)

CustObj.prototype.getFromPrototype = function() {
	console.log('prop = ', this.get(true));
}
CustObj.prototype.method1 = function() {
	console.log('from custObj.method1');
}

var testCustObj = CustObj();
testCustObj.on('event',(e)=>{console.log('from listener')})
testCustObj.emit('event')

testCustObj.method1();
console.log(CustObj.prototype.isPrototypeOf(testCustObj));
console.log('get method',testCustObj.get());

testCustObj.on('begin', () => console.log('About to execute'));
testCustObj.on('end', () => console.log('Done with execute'));
testCustObj.on('data', (data) => console.log('Data ',data));
testCustObj.on('error', (err) => console.log('ERROR ',err));

testCustObj.execute('numbers.txt');
