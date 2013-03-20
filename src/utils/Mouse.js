fx.Mouse = {

    /**
    * Returns the current mouse position, relative to an element.
    * @param {MouseEvent} event
    * @return {object} Contains properties: x, y, event
    */
   	getPos : function(event){

        var pos = {x: NaN, y: NaN, event: null},
            element = event.target,
            x, 
            y;
            
        if(!event || !event.target){
            return pos;
        }

        if(event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
        } else {
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        x -= element.offsetLeft;
        y -= element.offsetTop;

        pos.x = x;
        pos.y = y;
        pos.event = event;

        // Some times mouse x and mouse y end up as negative after the relative calculation
        if(pos.x < 0){
            pos.x = 0;
        }

        if(pos.y < 0){
            pos.y = 0;
        }

        return pos;
    }
}