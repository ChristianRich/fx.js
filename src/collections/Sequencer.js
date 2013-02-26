fx.Sequencer = function(size, start){

	if(!size){
		throw new Error('Too few arguments.');
	}

	if(!(this instanceof arguments.callee)){
        throw new Error('Constructor called as a function.');
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
		var len = this.data.length;
		var i = len;

		while(i--) {
		var p = parseInt(Math.random() * len);
		var t = this.data[i];
		this.data[i] = this.data[p];
		this.data[p] = t;
		}

		return this;
	},

	toString : function(){
		return '[Sequencer] size: ' + this.size;
	}
}