
/**
 * Sequencer is a data structure containing numbers only.
 * The numerical range is infinite and can by randomized using the shuffle() method.
 * This data structure was made for a game where random numbers was needed in sequences, 
 * but the same number was not to be repeated more than once per sequence.
 *
 * This will produce a random sequence of numbers between 0 and 100:
 *
 * var s = new Sequence(100);
 * s.shuffle();
 *
 */
fx.Sequencer = function(size, start){

	if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function.');
    }

	if(!size){
		throw new Error('Too few arguments.');
	}

	this.size = size;
	this.index = -1;
	this.data = [];

	for(var i = start || 0; i < this.size; i++){
		this.data[i] = i;
	}

	return this;
}

fx.Sequencer.prototype = {

	next : function(){
		if(this.hasNext()){
			return this.data[++this.index];
		}

		return null;
	},

	hasNext : function(){
		return this.index + 1 < this.data.length;
	},

	reset : function(){
		this.index = -1;
	},

	shuffle : function(){
		var len = this.data.length,
			i = len;

		while(i--) {
			var p = parseInt(Math.random() * len),
				t = this.data[i];
			this.data[i] = this.data[p];
			this.data[p] = t;
		}

		return this;
	},

	toString : function(){
		return '[Sequencer] size: ' + this.size;
	}
}