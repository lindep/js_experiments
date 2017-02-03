

var obj = {
	method1: function() {
		console.log('from obj.method1');
	}
}

// create method "method1" on the prototype
var myObj = Object.create(obj);
myObj.method1();

function CustObj() {
	var custObj = Object.create(CustObj.prototype);
	var prop = "test";
	custObj.get = function() {
		if (arguments.length) return prop;
		console.log('prop =', prop);
	}
	return custObj;
}

CustObj.prototype = {};
CustObj.prototype.getFromPrototype = function() {
	console.log('prop = ', this.get(true));
}
CustObj.prototype.method1 = function() {
	console.log('from custObj.method1');
}

var testCustObj = CustObj();
testCustObj.method1();
console.log(CustObj.prototype.isPrototypeOf(testCustObj));
console.log(testCustObj.get());

newObj = Object.assign(testCustObj, obj, objA)
