/**
* Uri utils by Christian Schlosrich
* Methods for extracting, validating and manipulating Uris
* Based on Steven Levithan parseuri method http://blog.stevenlevithan.com/archives/parseuri
*/
fx.Uri = {
    
    /**
    * Returns true if supplied uri is a properly formatted url
    * @param  {string} s
    * @return {boolean}
    */
    isUrl : function(s){
        return s.indexOf('http') === 0 || s.indexOf('www') === 0;
    },
    
    /**
    * Returns the file extension of a uri (if present)
    * @param  {string} uri 
    * @return {string}
    */
    getExtension : function(uri){
        var s = this.parse(uri).source;
        var p = s.substring(s.lastIndexOf('.') + 1, s.length);
        return(this.stripQueryString(p));
    },

    /**
    * Removes the file extension part of a filename (if present)
    * Works for both urls and file names (like 'www.mydomain.com/index.html' or just 'index.html')
    * @param  {string} s
    * @return {string}
    */
    stripExtension : function(s){ 
        var parsed,
            fn;

        if(this.isUrl(s)){
            parsedUrl = this.parse(s);

            if(parsedUrl.file){
                fn = parsedUrl.file;
            } else{
                return '';
            }

        } else{
            fn = s;
        }

        return fn.split('.')[0];
    },

    /**
    * Removes the query string (if present)
    * @param  {string} uri
    * @return {string}
    */
    stripQueryString : function(uri){
        return decodeURIComponent(uri).split('?')[0];
    },

    /**
    * Returns the file name part of a URI including the file extension (if present)
    * @param  {string} url
    * @return {string} result
    */
    getFileName : function(url){
        return this.stripQueryString(this.parse(url).file);
    },

    /**
    * Returns the window's current hashtag in an Object containing the whole hashtag and the parts (if any)
    * @return {Object} [description]
    */
    parseHashTag : function() {
        var r, h, a;

        r = {};
        h = window.location.hash;
        h = h.replace('#', '');
        a = h.split('/');
        r.hash = h;
        r.parts = [];
        r.length = a.length;

        for(var i = 0; i < a.length; i++){
            r.parts[i] = a[i];
        }

        return r;
    },

    /**
    * Returns an Object containing detailed information about the URI (like protocol, path, host, file, directory, queryKeys and more)
    * Original method written by Steven Levithan (http://blog.stevenlevithan.com/archives/parseuri)
    * @param  {string=} str
    * @return {Object}
    */
    parse : function(str){
        str = str || window.location;

        var options = {
            strictMode: false,
            key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
            
            q: {
                name: 'queryKey',
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        }
            
        var o = options,
            m  = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str),
            uri = {},
            i = 14;

        while (i--){
            uri[o.key[i]] = m[i] || '';
        }

        uri[o.q.name] = {};
        
        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
            if($1){
                uri[o.q.name][$1] = $2;
            } 
        });

        return uri;    
    },

    /**
    * Takes parameters in an object and constructs an uri
    * @param  {Object} u
    * @return {String}
    */
    toUri : function(u) {

        var uri = '';

        if(u.protocol) {
            uri += u.protocol + '://';
        }

        if(u.user) {
            uri += u.user;
        }

        if(u.password) {
            uri += ':' + u.password;
        }

        if(u.user || u.password) {
            uri += '@';
        }

        if(u.host) {
            uri += u.host;
        }

        if(u.port) {
            uri += ':' + u.port;
        }

        if(u.path) {
            uri += u.path;
        }

        var qk = u.queryKey, 
            qs = [];

        for(var k in qk) {

            if(!qk.hasOwnProperty(k)) {
                continue;
            }

            var v = encodeURIComponent(qk[k]);
            k = encodeURIComponent(k);

            if(v) {
                qs.push(k + '=' + v);
            } else {
                qs.push(k);
            }
        }

        if(qs.length > 0) {
            uri += '?' + qs.join('&');
        }

        if(u.anchor) {
            uri += '#' + u.anchor;
        }

        return uri;
    }
};