/**
 * High precision timer
 * http://updates.html5rocks.com/2012/08/When-milliseconds-are-not-enough-performance-now
 */
window.performance = window.performance || {};

performance.now = (function() {
	return performance.now    ||
		performance.mozNow    ||
		performance.msNow     ||
		performance.oNow      ||
		performance.webkitNow ||
		function() { return new Date().getTime(); };
})();