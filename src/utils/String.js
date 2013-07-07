/**
* Assorted String utils
*/
fx.String = {
    
    trim: function(string) {
        return string.replace(/^\s*/, '').replace(/\s*$/, '');
    },

    startsWith: function(string, prefix) {
        if (this.isEmpty(string)) return false;
        return string.indexOf(prefix) == 0;
    },

    endsWith: function(string, postfix) {
        if (this.isEmpty(string) || this.isEmpty(postfix)) return false;
        return string.lastIndexOf(postfix) == string.length - postfix.length;
    },

    isEmpty: function(string) { 
        return this.isString && string.length > 0;
    },

    isString: function(string) {
        return Object.prototype.toString.apply(o) === '[object String]';
    },

    isDigit: function(string) {
        if(!this.isString(string)) string = string.toString();
        return string.test(/^\d*$/);
    },

    contains: function(needle, haystack) {
        return haystack && haystack.indexOf(needle) != -1;
    },

    removeWhitespace: function(str) {
        return str.replace(/\s/g, '');
    },

    insertAt: function(string, stringToInsert, index) {
        return string.substring(0, index) + stringToInsert + string.substring(index);
    },

    toTitleCase: function(string) {
        var result = string.substring(0, 1).toUpperCase();
        if (string.length > 1) result = result + string.substring(1);
        return result;
    },

    /**
    * Formats a number by adding a comma in the right place
    * Example: 1000 becomes 1,000 and 10000 becomes 10,000.
    * @param  {String} nStr
    * @return {String} 
    */
    formatNumber : function(nStr){
        nStr = nStr.toString();
        
        var x = nStr.split('.'),
            x1 = x[0],
            x2 = x.length > 1 ? '.' + x[1] : '',
            rgx = /(\d+)(\d{3})/;

        while(rgx.test(x1)){
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }

        return x1 + x2;
    },

    /**
    * Appends a noCache query string to an URL
    * @param  {String} url		The url to bust
    * @param  {boolean} bypass	bypass the cache buster (easier to set a flag that to remove the function call)
    * @return {String} 			The cache busted URL
    */
    cacheBuster : function(url, bypass){
        if(bypass){
            return url; 
        } else{
            return url + '?noCache=' + Math.round(Math.random() * new Date().getMilliseconds() * 100000);
        }
    },

    /**
    * @param string string: string to test
    * @param string matchExp: expr to test agains string; * and spaces are interpreted as reg ex (.*?)  
    */
    catches: function(string, matchExp, ignoreCase) {
        var ignoreCase = arguments.length >= 3 ? ignoreCase : false;
        matchExp = this.trim(matchExp);
        matchExp = matchExp.replace(/\s+/, '*');
        matchExp = matchExp.replace(/\*/, '.*?');
        matchExp = matchExp.replace(/\?/, '.{0,1}');
        var regExp = new RegExp('^' + matchExp, (ignoreCase ? 'i' : ''));
        return regExp.test(string);
    },

    /**
    * Format seconds time to readable time code. 60 seconds would return 00:60
    * @param {number} sec
    * @return {string}
    */
    toTimeCode: function(sec) {
        var h = Math.floor(sec / 3600),
            m = Math.floor(sec % 3600 / 60),
            s = Math.floor(sec % 3600 % 60);

        return(
			h == 0 ? '' : (h < 10 ? '0' + h.toString() + ':' : h.toString() + ':')) +
			(m < 10 ? '0' + m.toString() : m.toString()) + ':' +
			(s < 10 ? '0' + s.toString() : s.toString()
        )
    }
};
