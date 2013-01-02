/*
 * Helper function to run the test cases
 *
 * Usage:
 *
 * var testResultsContainer = document.getElementById('test-results');
 * var myTest = new Benchmark( document.getElementById(testResultsContainer, 'fx.display.Element');
 *
 * var x = 1;
 * myTest.assert(x = 1, 'Testing that the variable x is set to the value of 1');
 */
var Benchmark = function(element, testName) {

	this.assetElement = element;
	this.assetElement.innerHTML = '';
	this.testName = testName;

	/*
	 * @result : Result of the test should always be true. Otherwise the test is failed.
	 */
	this.assert = function(result, testName, optionalInformation){
		var res = testName + ': ' + (result ? "<p style='display: inline;'><font color='green'>Passed</font>" : "<font color='red'>Failed</font>");

		if(optionalInformation){
		    res += ' (' + optionalInformation + ')';
		}

		res += '</p><p></p>';

		if(this.assetElement){
			this.assetElement.innerHTML += res;
		} else{
	    	return res;
		}
	}
	
	this.setHeading = function(el, heading){
		el.innerHTML = '<h1>Benchmark test for: ' + '<strong>' + heading + ':</strong></h1>';
	}

	this.addGroup = function(name){
		if(this.assetElement){
			this.assetElement.innerHTML += '<p>Group ' + '<strong>' + name + '</strong>' + ':<p/>';
		} else{
			return name;
		}
	}

	this.clearResults = function(){
		this.assetElement.innerHTML = '';
	}
}

Benchmark.prototype.randomChars = function(len){
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
		len = len || 3,
		res = '';

	for(var i=0; i<len; i++) {
		var n = Math.floor(Math.random() * chars.length);
		res += chars.substring(n, n + 1);
	}
	
	return res;
}