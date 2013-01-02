/**
 * DateUtils by Christian Schlosrich
 * Methods for parsing and manipulating Date objects.
 * 
 */
fx.Date = {
	
	/**
	 * Returns the number of days between start and end (if the start date falls *after* the end date a negative value is returned).
	 * @param  {Date} start
	 * @param  {Date} end
	 * @return {number}
	 */
	daysBetween : function(start, end){
		return (start.valueOf() - end.valueOf()) / 1000 / 60 / 60 / 24;
	},

	/**
	 * Evaluates if date1 is before date2
	 * @param  {Date}  date1
	 * @param  {Date}  date2
	 * @return {boolean}
	 */
	isBefore : function(date1, date2){
		return !!(this.daysBetween(date1, date2) < 0);
	},

	/**
	 * Evaluates if date1 is after date2
	 * @param  {Date}  date1
	 * @param  {Date}  date2
	 * @return {boolean}
	 */
	isAfter : function(date1, date2){
		return !!(this.daysBetween(date1, date2) > 0);
	},

	/**
	 * Evaluates if date falls between rangeStart and rangeEnd.
	 * @param  {Date}  date
	 * @param  {Date}  rangeStart
	 * @param  {Date}  rangeEnd
	 * @return {boolean}
	 */
	isBetween : function(date, rangeStart, rangeEnd){
		return !this.isBefore(date, rangeStart) && !this.isAfter(date, rangeEnd);
	},

	/**
	 * Creates a new Date
	 * @return {Date} [description]
	 */
	today: function(){
		return new Date();	
	},

	/**
	 * Tomorrow
	 * @param  {Date} date
	 * @return {Date} Tomorrow
	 */
	tomorrow : function(date){
		return this.today.setDate(this.today.getDate() + 1);
	},

	/**
	 * Yesterday
	 * @param  {Date} date
	 * @return {Date} Yesterday
	 */
	yesterday : function(date){
		return this.today.setDate(this.today.getDate() - 1);
	},

	/**
	 * Determines if time is Ante meridiem or Post meridiem.
	 * @param  {Date} hours
	 * @return {string}   
	 */
	getMeridiem : function(hours){
		return (hours < 12) ? 'AM' : 'PM';
	}
}