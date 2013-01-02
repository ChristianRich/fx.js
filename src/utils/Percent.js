/**
* PercentUtils
* A percent is a numerical value that represents the relationship of a part to a whole.
*/
fx.Percent = {

    /**
    * Returns the decimal value of the percent in relation to the total.
    * 
    * Question: "What is 75% of 1500?"
    * Answer: fx.PercentUtils.of(75, 1500); // 1125
    * 
    * @param  {number} percent (as percent)
    * @param  {number} total (as decimal)
    * @return {number} result (as decimal)
    */
    of : function(percent, total){
        return total * (percent / 100);
    },

    /**
    * Returns the fraction in percent of the total
    * 
    * Question: "What percentage is 500 of 1500?"
    * Answer: fx.Percent.from(500, 1500); // 33.333
    * 
    * @param  {number} fraction (as decimal)
    * @param  {number} total (as decimal)
    * @return {number} result (as percent)
    */
    from : function(fraction, total){
        return (fraction / total) * 100;
    },

    /**
    * Converts a decimal to a percent. In this system the decimal value 1 equals 100%
    * @param  {number} value (as decimal)
    * @return {number} result (as percent)
    */
    decimalToPercent : function(value){
        return value * 100;
    },

    /**
    * Converts a decimal in a range to the equivalent percent
    *
    * Question: "What is the corresponding percentage of 50 in a range between 40 and 80?"
    * Answer: fx.Percent.rangeToPercent(40, 80, 50); // 25
    * 
    * @param  {number} min (as decimal)
    * @param  {number} max (as decimal)
    * @param  {number} currentDecimal (as decimal)
    * @return {number} result (as percent)
    */
    rangeToPercent : function(min, max, current){
        return (current - min) / (max - min) * 100;
    },

    /**
    * Converts a percentage in a range to the equivalent decimal value
    *
    * Question: "What is the corresponding decimal of 85% in a range between 25 and 215?"
    * Answer: fx.Percent.rangeToDecimal(25, 215, 85); // 161.5
    * 
    * @param  {number} min (as decimal)
    * @param  {number} max (as decimal)
    * @param  {number} current (as percent)
    * @return {number} result (as decimal)
    */
    rangeToDecimal : function(min, max, current){
        return (max - min) / 100 * current;
    }
}