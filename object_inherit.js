const EventEmitter = require('events').EventEmitter;
const _ = require('lodash');

var obj = {
	objMethod1: function() {
		console.log('from obj.method1');
	}
}
// create method "method1" on the prototype
var myObj = Object.create(obj);
myObj.objMethod1();

var objA = {
	x:0,
	y:0,
	show() {
		console.log(this.x,this.y)
	}
}

function CustObj() {
	var custObj = Object.create(Object.assign(CustObj.prototype, objA));
	var prop = "test";
	custObj.get = function() {
		if (arguments.length) return prop;
		console.log('prop =', prop);
	}
	return custObj;
}

CustObj.prototype = {};

// using lodash
//_.extend(CustObj.prototype, EventEmitter.prototype)

//Enherit EventEmitter methods
Object.assign(CustObj.prototype, EventEmitter.prototype)
Object.assign(CustObj.prototype, obj)
//CustObj.prototype = Object.create(Object.assign(CustObj.prototype, EventEmitter.prototype))

CustObj.prototype.getFromPrototype = function() {
	console.log('prop = ', this.get(true));
}
CustObj.prototype.method1 = function() {
	console.log('from custObj.method1');
}

var testCustObj = CustObj();
Object.assign(testCustObj, obj2)
testCustObj.on('event',(e)=>{console.log('from listener')})
testCustObj.emit('event')

testCustObj.method1();
console.log(CustObj.prototype.isPrototypeOf(testCustObj));
console.log('get method',testCustObj.get());
