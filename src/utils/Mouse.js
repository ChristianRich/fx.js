fx.Mouse = {

    /**
    * Returns the current mouse position, relative to an element.
    * @param {MouseEvent} event
    * @return {object} Contains properties: x, y, event
    */
   	getPos : function(event){
        var mouse = {x: NaN, y: NaN, event: null},
            element = event.target,
            x, 
            y;
            
        if(!event || !event.target){
            return mouse; 
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

        mouse.x = x;
        mouse.y = y;
        mouse.event = event;

        // Some times mouse x and mouse y end up as negative after the relative calculation
        if(mouse.x < 0){
            mouse.x = 0;
        }

        if(mouse.y < 0){
            mouse.y = 0;
        }

        return mouse;
    },

    /**
    * Keeps track of the current (first) touch position, relative to an element.
    * @param {HTMLElement} element
    * @return {object} Contains properties: x, y, isPressed, event
    */
    captureTouch : function(element){
        var touch = {x: null, y: null, isPressed: false, event: null},
            body_scrollLeft = document.body.scrollLeft,
            element_scrollLeft = document.documentElement.scrollLeft,
            body_scrollTop = document.body.scrollTop,
            element_scrollTop = document.documentElement.scrollTop,
            offsetLeft = element.offsetLeft,
            offsetTop = element.offsetTop;

        element.addEventListener('touchstart', function (event) {
            touch.isPressed = true;
            touch.event = event;
        }, false);

        element.addEventListener('touchend', function (event) {
            touch.isPressed = false;
            touch.x = null;
            touch.y = null;
            touch.event = event;
        }, false);

        element.addEventListener('touchmove', function (event) {
            var x, y,
            touch_event = event.touches[0]; //first touch

            if (touch_event.pageX || touch_event.pageY) {
                x = touch_event.pageX;
                y = touch_event.pageY;
            } else {
                x = touch_event.clientX + body_scrollLeft + element_scrollLeft;
                y = touch_event.clientY + body_scrollTop + element_scrollTop;
            }

            x -= offsetLeft;
            y -= offsetTop;

            touch.x = x;
            touch.y = y;
            touch.event = event;
        }, false);

        return touch;
    }
}