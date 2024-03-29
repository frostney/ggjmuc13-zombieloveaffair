/**
 * @namespace Lyria
 * Lyria namespace decleration
 */
;(function(Lyria, $, undefined) {
	'use strict';

	/**
	 * @class Lyria.Utils
	 * Utils class
	 */
	Lyria.Utils = {};

	/**
	 *
	 * @param {Object} object
	 */
	Lyria.Utils.isArray = function(object) {
		if (Object.prototype.toString.call(object) === '[object Array]') {
			return true;
		} else {
			return false;
		}
	}
	/**
	 *
	 * @param {Object} type
	 * @param {Object} callbackObject
	 * @param {Object} callbackString
	 */
	Lyria.Utils.isObjectOrString = function(type, callbackObject, callbackString) {
		callbackObject = callbackObject ||
		function(type) {
		};
		callbackString = callbackString ||
		function(type) {
		};

		if ( typeof type === "object") {
			callbackObject(type);
		} else {
			if ( typeof type === "string") {
				callbackString(type)
			} else {
				return;
			}
		}
	}
	/**
	 *
	 * @param {Object} filename
	 *
	 * @returns {Boolean}
	 */
	Lyria.Utils.isFile = function(filename) {
		var sepPos = filename.indexOf('.');
		if (sepPos === -1) {
			return false;
		}

		var filenameLength = filename.length;
		var diff = filenameLength - sepPos;

		// A filename extension is allowed to be one to four characters long.
		if ((diff > 1) && (diff <= 5)) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 *
	 * @param {Object} anyObject
	 *
	 * @returns {Object}
	 */
	Lyria.Utils.cloneObject = function(anyObject) {
		return $.extend(true, {}, anyObject);
	}
	
	/**
	 * 
 	 * @param {Object} anyObject
 	 * 
 	 * @returns {String}
	 */
	Lyria.Utils.serializeObject = function(anyObject) {
		if ((typeof anyObject !== 'object') || (anyObject instanceof jQuery)) {
			return;
		}
		
	    var str = '{';
	    
	    console.log(anyObject);
	    console.log(Object.keys(anyObject));
	    
	    
	    
	    for (var p in anyObject) {
	        if (anyObject.hasOwnProperty(p)) {
	        	if (anyObject[p] instanceof jQuery) {
	        		continue;
	        	}
	        	
	        	var objKeys = Object.keys(anyObject);
	        	var commaStr = (objKeys.indexOf(p) === (objKeys.length - 1)) ? '' : ',';
	        	
	        	switch (typeof anyObject[p]) {
	        		case 'object': {
	        			str += p + ': ' + Lyria.Utils.serializeObject(anyObject[p]) + commaStr + '\n';
	        			break;
	        		}
	        		case 'string': {
	        			str += p + ': "' + anyObject[p] + '"' + commaStr + '\n';
	        			break;
	        		}
	        		default: {
	        			str += p + ': ' + anyObject[p] + commaStr + '\n';
	        			break;
	        		}
	        	}
	        }
	    }
	    str += '}';
	    
	    return str;
	}
	
})(this.Lyria = this.Lyria || {}, this.jQuery);
