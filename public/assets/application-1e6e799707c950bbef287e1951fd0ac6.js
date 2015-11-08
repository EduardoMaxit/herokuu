/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement("a");
      originAnchor.href = location.href;
      var urlAnchor = document.createElement("a");

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + "//" + originAnchor.host ===
            urlAnchor.protocol + "//" + urlAnchor.host));      //
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.5
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.5
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.5'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.5
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.5'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.5
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.5'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.5
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.5'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.5
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.5'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.5
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.5'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.5
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.5'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.5
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.5'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.5
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.5'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.5
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.5'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.5
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.5'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
//intervalo tiempo cambio img slide, 5 segundos, se llama a la función "avanzaSlide()"
setInterval('avanzaSlide()',3500);  // tiempo para que avance
 
//array con las clases para las diferentes imagenes
var arrayImagenes = new Array(".img1",".img2",".img3",".img4");
 
//variable que nos permitirá saber qué imagen se está mostrando
var contador = 0;

 
//hace un efecto fadeIn para mostrar una imagen
function mostrar(img){
	$(img).ready(function(){				
  		$(arrayImagenes[contador]).fadeIn(1500);		
	});
}
 
//hace un efecto fadeOut para ocultar una imagen
function ocultar(img){
	$(img).ready(function(){				
  		$(arrayImagenes[contador]).fadeOut(1500);		
	});
}
 
//función principal
function avanzaSlide(){
        //se oculta la imagen actual
	ocultar(arrayImagenes[contador]);
        //aumentamos el contador en una unidad

	contador = (contador + 1) % 4;
        //mostramos la nueva imagen
	mostrar(arrayImagenes[contador]);
}
;

/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/

(function (e, t) {
    var n, r, i = typeof t, o = e.document, a = e.location, s = e.jQuery, u = e.$, l = {}, c = [], p = "1.9.1", f = c.concat, d = c.push, h = c.slice, g = c.indexOf, m = l.toString, y = l.hasOwnProperty, v = p.trim, b = function (e, t) { return new b.fn.init(e, t, r) }, x = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, w = /\S+/g, T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, N = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, k = /^[\],:{}\s]*$/, E = /(?:^|:|,)(?:\s*\[)+/g, S = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, A = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, j = /^-ms-/, D = /-([\da-z])/gi, L = function (e, t) { return t.toUpperCase() }, H = function (e) { (o.addEventListener || "load" === e.type || "complete" === o.readyState) && (q(), b.ready()) }, q = function () { o.addEventListener ? (o.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (o.detachEvent("onreadystatechange", H), e.detachEvent("onload", H)) }; b.fn = b.prototype = { jquery: p, constructor: b, init: function (e, n, r) { var i, a; if (!e) return this; if ("string" == typeof e) { if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : N.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e); if (i[1]) { if (n = n instanceof b ? n[0] : n, b.merge(this, b.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : o, !0)), C.test(i[1]) && b.isPlainObject(n)) for (i in n) b.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]); return this } if (a = o.getElementById(i[2]), a && a.parentNode) { if (a.id !== i[2]) return r.find(e); this.length = 1, this[0] = a } return this.context = o, this.selector = e, this } return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : b.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), b.makeArray(e, this)) }, selector: "", length: 0, size: function () { return this.length }, toArray: function () { return h.call(this) }, get: function (e) { return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e] }, pushStack: function (e) { var t = b.merge(this.constructor(), e); return t.prevObject = this, t.context = this.context, t }, each: function (e, t) { return b.each(this, e, t) }, ready: function (e) { return b.ready.promise().done(e), this }, slice: function () { return this.pushStack(h.apply(this, arguments)) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, eq: function (e) { var t = this.length, n = +e + (0 > e ? t : 0); return this.pushStack(n >= 0 && t > n ? [this[n]] : []) }, map: function (e) { return this.pushStack(b.map(this, function (t, n) { return e.call(t, n, t) })) }, end: function () { return this.prevObject || this.constructor(null) }, push: d, sort: [].sort, splice: [].splice }, b.fn.init.prototype = b.fn, b.extend = b.fn.extend = function () { var e, n, r, i, o, a, s = arguments[0] || {}, u = 1, l = arguments.length, c = !1; for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || b.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++) if (null != (o = arguments[u])) for (i in o) e = s[i], r = o[i], s !== r && (c && r && (b.isPlainObject(r) || (n = b.isArray(r))) ? (n ? (n = !1, a = e && b.isArray(e) ? e : []) : a = e && b.isPlainObject(e) ? e : {}, s[i] = b.extend(c, a, r)) : r !== t && (s[i] = r)); return s }, b.extend({ noConflict: function (t) { return e.$ === b && (e.$ = u), t && e.jQuery === b && (e.jQuery = s), b }, isReady: !1, readyWait: 1, holdReady: function (e) { e ? b.readyWait++ : b.ready(!0) }, ready: function (e) { if (e === !0 ? ! --b.readyWait : !b.isReady) { if (!o.body) return setTimeout(b.ready); b.isReady = !0, e !== !0 && --b.readyWait > 0 || (n.resolveWith(o, [b]), b.fn.trigger && b(o).trigger("ready").off("ready")) } }, isFunction: function (e) { return "function" === b.type(e) }, isArray: Array.isArray || function (e) { return "array" === b.type(e) }, isWindow: function (e) { return null != e && e == e.window }, isNumeric: function (e) { return !isNaN(parseFloat(e)) && isFinite(e) }, type: function (e) { return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? l[m.call(e)] || "object" : typeof e }, isPlainObject: function (e) { if (!e || "object" !== b.type(e) || e.nodeType || b.isWindow(e)) return !1; try { if (e.constructor && !y.call(e, "constructor") && !y.call(e.constructor.prototype, "isPrototypeOf")) return !1 } catch (n) { return !1 } var r; for (r in e); return r === t || y.call(e, r) }, isEmptyObject: function (e) { var t; for (t in e) return !1; return !0 }, error: function (e) { throw Error(e) }, parseHTML: function (e, t, n) { if (!e || "string" != typeof e) return null; "boolean" == typeof t && (n = t, t = !1), t = t || o; var r = C.exec(e), i = !n && []; return r ? [t.createElement(r[1])] : (r = b.buildFragment([e], t, i), i && b(i).remove(), b.merge([], r.childNodes)) }, parseJSON: function (n) { return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = b.trim(n), n && k.test(n.replace(S, "@").replace(A, "]").replace(E, ""))) ? Function("return " + n)() : (b.error("Invalid JSON: " + n), t) }, parseXML: function (n) { var r, i; if (!n || "string" != typeof n) return null; try { e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n)) } catch (o) { r = t } return r && r.documentElement && !r.getElementsByTagName("parsererror").length || b.error("Invalid XML: " + n), r }, noop: function () { }, globalEval: function (t) { t && b.trim(t) && (e.execScript || function (t) { e.eval.call(e, t) })(t) }, camelCase: function (e) { return e.replace(j, "ms-").replace(D, L) }, nodeName: function (e, t) { return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase() }, each: function (e, t, n) { var r, i = 0, o = e.length, a = M(e); if (n) { if (a) { for (; o > i; i++) if (r = t.apply(e[i], n), r === !1) break } else for (i in e) if (r = t.apply(e[i], n), r === !1) break } else if (a) { for (; o > i; i++) if (r = t.call(e[i], i, e[i]), r === !1) break } else for (i in e) if (r = t.call(e[i], i, e[i]), r === !1) break; return e }, trim: v && !v.call("\ufeff\u00a0") ? function (e) { return null == e ? "" : v.call(e) } : function (e) { return null == e ? "" : (e + "").replace(T, "") }, makeArray: function (e, t) { var n = t || []; return null != e && (M(Object(e)) ? b.merge(n, "string" == typeof e ? [e] : e) : d.call(n, e)), n }, inArray: function (e, t, n) { var r; if (t) { if (g) return g.call(t, e, n); for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n } return -1 }, merge: function (e, n) { var r = n.length, i = e.length, o = 0; if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o]; else while (n[o] !== t) e[i++] = n[o++]; return e.length = i, e }, grep: function (e, t, n) { var r, i = [], o = 0, a = e.length; for (n = !!n; a > o; o++) r = !!t(e[o], o), n !== r && i.push(e[o]); return i }, map: function (e, t, n) { var r, i = 0, o = e.length, a = M(e), s = []; if (a) for (; o > i; i++) r = t(e[i], i, n), null != r && (s[s.length] = r); else for (i in e) r = t(e[i], i, n), null != r && (s[s.length] = r); return f.apply([], s) }, guid: 1, proxy: function (e, n) { var r, i, o; return "string" == typeof n && (o = e[n], n = e, e = o), b.isFunction(e) ? (r = h.call(arguments, 2), i = function () { return e.apply(n || this, r.concat(h.call(arguments))) }, i.guid = e.guid = e.guid || b.guid++, i) : t }, access: function (e, n, r, i, o, a, s) { var u = 0, l = e.length, c = null == r; if ("object" === b.type(r)) { o = !0; for (u in r) b.access(e, n, u, r[u], !0, a, s) } else if (i !== t && (o = !0, b.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) { return c.call(b(e), n) })), n)) for (; l > u; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r))); return o ? e : c ? n.call(e) : l ? n(e[0], r) : a }, now: function () { return (new Date).getTime() } }), b.ready.promise = function (t) { if (!n) if (n = b.Deferred(), "complete" === o.readyState) setTimeout(b.ready); else if (o.addEventListener) o.addEventListener("DOMContentLoaded", H, !1), e.addEventListener("load", H, !1); else { o.attachEvent("onreadystatechange", H), e.attachEvent("onload", H); var r = !1; try { r = null == e.frameElement && o.documentElement } catch (i) { } r && r.doScroll && function a() { if (!b.isReady) { try { r.doScroll("left") } catch (e) { return setTimeout(a, 50) } q(), b.ready() } } () } return n.promise(t) }, b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) { l["[object " + t + "]"] = t.toLowerCase() }); function M(e) { var t = e.length, n = b.type(e); return b.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e) } r = b(o); var _ = {}; function F(e) { var t = _[e] = {}; return b.each(e.match(w) || [], function (e, n) { t[n] = !0 }), t } b.Callbacks = function (e) { e = "string" == typeof e ? _[e] || F(e) : b.extend({}, e); var n, r, i, o, a, s, u = [], l = !e.once && [], c = function (t) { for (r = e.memory && t, i = !0, a = s || 0, s = 0, o = u.length, n = !0; u && o > a; a++) if (u[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) { r = !1; break } n = !1, u && (l ? l.length && c(l.shift()) : r ? u = [] : p.disable()) }, p = { add: function () { if (u) { var t = u.length; (function i(t) { b.each(t, function (t, n) { var r = b.type(n); "function" === r ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && i(n) }) })(arguments), n ? o = u.length : r && (s = t, c(r)) } return this }, remove: function () { return u && b.each(arguments, function (e, t) { var r; while ((r = b.inArray(t, u, r)) > -1) u.splice(r, 1), n && (o >= r && o--, a >= r && a--) }), this }, has: function (e) { return e ? b.inArray(e, u) > -1 : !(!u || !u.length) }, empty: function () { return u = [], this }, disable: function () { return u = l = r = t, this }, disabled: function () { return !u }, lock: function () { return l = t, r || p.disable(), this }, locked: function () { return !l }, fireWith: function (e, t) { return t = t || [], t = [e, t.slice ? t.slice() : t], !u || i && !l || (n ? l.push(t) : c(t)), this }, fire: function () { return p.fireWith(this, arguments), this }, fired: function () { return !!i } }; return p }, b.extend({ Deferred: function (e) { var t = [["resolve", "done", b.Callbacks("once memory"), "resolved"], ["reject", "fail", b.Callbacks("once memory"), "rejected"], ["notify", "progress", b.Callbacks("memory")]], n = "pending", r = { state: function () { return n }, always: function () { return i.done(arguments).fail(arguments), this }, then: function () { var e = arguments; return b.Deferred(function (n) { b.each(t, function (t, o) { var a = o[0], s = b.isFunction(e[t]) && e[t]; i[o[1]](function () { var e = s && s.apply(this, arguments); e && b.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments) }) }), e = null }).promise() }, promise: function (e) { return null != e ? b.extend(e, r) : r } }, i = {}; return r.pipe = r.then, b.each(t, function (e, o) { var a = o[2], s = o[3]; r[o[1]] = a.add, s && a.add(function () { n = s }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () { return i[o[0] + "With"](this === i ? r : this, arguments), this }, i[o[0] + "With"] = a.fireWith }), r.promise(i), e && e.call(i, i), i }, when: function (e) { var t = 0, n = h.call(arguments), r = n.length, i = 1 !== r || e && b.isFunction(e.promise) ? r : 0, o = 1 === i ? e : b.Deferred(), a = function (e, t, n) { return function (r) { t[e] = this, n[e] = arguments.length > 1 ? h.call(arguments) : r, n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n) } }, s, u, l; if (r > 1) for (s = Array(r), u = Array(r), l = Array(r); r > t; t++) n[t] && b.isFunction(n[t].promise) ? n[t].promise().done(a(t, l, n)).fail(o.reject).progress(a(t, u, s)) : --i; return i || o.resolveWith(l, n), o.promise() } }), b.support = function () { var t, n, r, a, s, u, l, c, p, f, d = o.createElement("div"); if (d.setAttribute("className", "t"), d.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = d.getElementsByTagName("*"), r = d.getElementsByTagName("a")[0], !n || !r || !n.length) return {}; s = o.createElement("select"), l = s.appendChild(o.createElement("option")), a = d.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = { getSetAttribute: "t" !== d.className, leadingWhitespace: 3 === d.firstChild.nodeType, tbody: !d.getElementsByTagName("tbody").length, htmlSerialize: !!d.getElementsByTagName("link").length, style: /top/.test(r.getAttribute("style")), hrefNormalized: "/a" === r.getAttribute("href"), opacity: /^0.5/.test(r.style.opacity), cssFloat: !!r.style.cssFloat, checkOn: !!a.value, optSelected: l.selected, enctype: !!o.createElement("form").enctype, html5Clone: "<:nav></:nav>" !== o.createElement("nav").cloneNode(!0).outerHTML, boxModel: "CSS1Compat" === o.compatMode, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1 }, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !l.disabled; try { delete d.test } catch (h) { t.deleteExpando = !1 } a = o.createElement("input"), a.setAttribute("value", ""), t.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "t"), a.setAttribute("name", "t"), u = o.createDocumentFragment(), u.appendChild(a), t.appendChecked = a.checked, t.checkClone = u.cloneNode(!0).cloneNode(!0).lastChild.checked, d.attachEvent && (d.attachEvent("onclick", function () { t.noCloneEvent = !1 }), d.cloneNode(!0).click()); for (f in { submit: !0, change: !0, focusin: !0 }) d.setAttribute(c = "on" + f, "t"), t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1; return d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === d.style.backgroundClip, b(function () { var n, r, a, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", u = o.getElementsByTagName("body")[0]; u && (n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", u.appendChild(n).appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = d.getElementsByTagName("td"), a[0].style.cssText = "padding:0;margin:0;border:0;display:none", p = 0 === a[0].offsetHeight, a[0].style.display = "", a[1].style.display = "none", t.reliableHiddenOffsets = p && 0 === a[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === d.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== u.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(d, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(d, null) || { width: "4px" }).width, r = d.appendChild(o.createElement("div")), r.style.cssText = d.style.cssText = s, r.style.marginRight = r.style.width = "0", d.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof d.style.zoom !== i && (d.innerHTML = "", d.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== d.offsetWidth, t.inlineBlockNeedsLayout && (u.style.zoom = 1)), u.removeChild(n), n = d = a = r = null) }), n = s = u = l = r = a = null, t } (); var O = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, B = /([A-Z])/g; function P(e, n, r, i) { if (b.acceptData(e)) { var o, a, s = b.expando, u = "string" == typeof n, l = e.nodeType, p = l ? b.cache : e, f = l ? e[s] : e[s] && s; if (f && p[f] && (i || p[f].data) || !u || r !== t) return f || (l ? e[s] = f = c.pop() || b.guid++ : f = s), p[f] || (p[f] = {}, l || (p[f].toJSON = b.noop)), ("object" == typeof n || "function" == typeof n) && (i ? p[f] = b.extend(p[f], n) : p[f].data = b.extend(p[f].data, n)), o = p[f], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[b.camelCase(n)] = r), u ? (a = o[n], null == a && (a = o[b.camelCase(n)])) : a = o, a } } function R(e, t, n) { if (b.acceptData(e)) { var r, i, o, a = e.nodeType, s = a ? b.cache : e, u = a ? e[b.expando] : b.expando; if (s[u]) { if (t && (o = n ? s[u] : s[u].data)) { b.isArray(t) ? t = t.concat(b.map(t, b.camelCase)) : t in o ? t = [t] : (t = b.camelCase(t), t = t in o ? [t] : t.split(" ")); for (r = 0, i = t.length; i > r; r++) delete o[t[r]]; if (!(n ? $ : b.isEmptyObject)(o)) return } (n || (delete s[u].data, $(s[u]))) && (a ? b.cleanData([e], !0) : b.support.deleteExpando || s != s.window ? delete s[u] : s[u] = null) } } } b.extend({ cache: {}, expando: "jQuery" + (p + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function (e) { return e = e.nodeType ? b.cache[e[b.expando]] : e[b.expando], !!e && !$(e) }, data: function (e, t, n) { return P(e, t, n) }, removeData: function (e, t) { return R(e, t) }, _data: function (e, t, n) { return P(e, t, n, !0) }, _removeData: function (e, t) { return R(e, t, !0) }, acceptData: function (e) { if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1; var t = e.nodeName && b.noData[e.nodeName.toLowerCase()]; return !t || t !== !0 && e.getAttribute("classid") === t } }), b.fn.extend({ data: function (e, n) { var r, i, o = this[0], a = 0, s = null; if (e === t) { if (this.length && (s = b.data(o), 1 === o.nodeType && !b._data(o, "parsedAttrs"))) { for (r = o.attributes; r.length > a; a++) i = r[a].name, i.indexOf("data-") || (i = b.camelCase(i.slice(5)), W(o, i, s[i])); b._data(o, "parsedAttrs", !0) } return s } return "object" == typeof e ? this.each(function () { b.data(this, e) }) : b.access(this, function (n) { return n === t ? o ? W(o, e, b.data(o, e)) : null : (this.each(function () { b.data(this, e, n) }), t) }, null, n, arguments.length > 1, null, !0) }, removeData: function (e) { return this.each(function () { b.removeData(this, e) }) } }); function W(e, n, r) { if (r === t && 1 === e.nodeType) { var i = "data-" + n.replace(B, "-$1").toLowerCase(); if (r = e.getAttribute(i), "string" == typeof r) { try { r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : O.test(r) ? b.parseJSON(r) : r } catch (o) { } b.data(e, n, r) } else r = t } return r } function $(e) { var t; for (t in e) if (("data" !== t || !b.isEmptyObject(e[t])) && "toJSON" !== t) return !1; return !0 } b.extend({ queue: function (e, n, r) { var i; return e ? (n = (n || "fx") + "queue", i = b._data(e, n), r && (!i || b.isArray(r) ? i = b._data(e, n, b.makeArray(r)) : i.push(r)), i || []) : t }, dequeue: function (e, t) { t = t || "fx"; var n = b.queue(e, t), r = n.length, i = n.shift(), o = b._queueHooks(e, t), a = function () { b.dequeue(e, t) }; "inprogress" === i && (i = n.shift(), r--), o.cur = i, i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire() }, _queueHooks: function (e, t) { var n = t + "queueHooks"; return b._data(e, n) || b._data(e, n, { empty: b.Callbacks("once memory").add(function () { b._removeData(e, t + "queue"), b._removeData(e, n) }) }) } }), b.fn.extend({ queue: function (e, n) { var r = 2; return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? b.queue(this[0], e) : n === t ? this : this.each(function () { var t = b.queue(this, e, n); b._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && b.dequeue(this, e) }) }, dequeue: function (e) { return this.each(function () { b.dequeue(this, e) }) }, delay: function (e, t) { return e = b.fx ? b.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) { var r = setTimeout(t, e); n.stop = function () { clearTimeout(r) } }) }, clearQueue: function (e) { return this.queue(e || "fx", []) }, promise: function (e, n) { var r, i = 1, o = b.Deferred(), a = this, s = this.length, u = function () { --i || o.resolveWith(a, [a]) }; "string" != typeof e && (n = e, e = t), e = e || "fx"; while (s--) r = b._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u)); return u(), o.promise(n) } }); var I, z, X = /[\t\r\n]/g, U = /\r/g, V = /^(?:input|select|textarea|button|object)$/i, Y = /^(?:a|area)$/i, J = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i, G = /^(?:checked|selected)$/i, Q = b.support.getSetAttribute, K = b.support.input; b.fn.extend({ attr: function (e, t) { return b.access(this, b.attr, e, t, arguments.length > 1) }, removeAttr: function (e) { return this.each(function () { b.removeAttr(this, e) }) }, prop: function (e, t) { return b.access(this, b.prop, e, t, arguments.length > 1) }, removeProp: function (e) { return e = b.propFix[e] || e, this.each(function () { try { this[e] = t, delete this[e] } catch (n) { } }) }, addClass: function (e) { var t, n, r, i, o, a = 0, s = this.length, u = "string" == typeof e && e; if (b.isFunction(e)) return this.each(function (t) { b(this).addClass(e.call(this, t, this.className)) }); if (u) for (t = (e || "").match(w) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : " ")) { o = 0; while (i = t[o++]) 0 > r.indexOf(" " + i + " ") && (r += i + " "); n.className = b.trim(r) } return this }, removeClass: function (e) { var t, n, r, i, o, a = 0, s = this.length, u = 0 === arguments.length || "string" == typeof e && e; if (b.isFunction(e)) return this.each(function (t) { b(this).removeClass(e.call(this, t, this.className)) }); if (u) for (t = (e || "").match(w) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(X, " ") : "")) { o = 0; while (i = t[o++]) while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " "); n.className = e ? b.trim(r) : "" } return this }, toggleClass: function (e, t) { var n = typeof e, r = "boolean" == typeof t; return b.isFunction(e) ? this.each(function (n) { b(this).toggleClass(e.call(this, n, this.className, t), t) }) : this.each(function () { if ("string" === n) { var o, a = 0, s = b(this), u = t, l = e.match(w) || []; while (o = l[a++]) u = r ? u : !s.hasClass(o), s[u ? "addClass" : "removeClass"](o) } else (n === i || "boolean" === n) && (this.className && b._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : b._data(this, "__className__") || "") }) }, hasClass: function (e) { var t = " " + e + " ", n = 0, r = this.length; for (; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(X, " ").indexOf(t) >= 0) return !0; return !1 }, val: function (e) { var n, r, i, o = this[0]; { if (arguments.length) return i = b.isFunction(e), this.each(function (n) { var o, a = b(this); 1 === this.nodeType && (o = i ? e.call(this, n, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : b.isArray(o) && (o = b.map(o, function (e) { return null == e ? "" : e + "" })), r = b.valHooks[this.type] || b.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o)) }); if (o) return r = b.valHooks[o.type] || b.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(U, "") : null == n ? "" : n) } } }), b.extend({ valHooks: { option: { get: function (e) { var t = e.attributes.value; return !t || t.specified ? e.value : e.text } }, select: { get: function (e) { var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; for (; s > u; u++) if (n = r[u], !(!n.selected && u !== i || (b.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && b.nodeName(n.parentNode, "optgroup"))) { if (t = b(n).val(), o) return t; a.push(t) } return a }, set: function (e, t) { var n = b.makeArray(t); return b(e).find("option").each(function () { this.selected = b.inArray(b(this).val(), n) >= 0 }), n.length || (e.selectedIndex = -1), n } } }, attr: function (e, n, r) { var o, a, s, u = e.nodeType; if (e && 3 !== u && 8 !== u && 2 !== u) return typeof e.getAttribute === i ? b.prop(e, n, r) : (a = 1 !== u || !b.isXMLDoc(e), a && (n = n.toLowerCase(), o = b.attrHooks[n] || (J.test(n) ? z : I)), r === t ? o && a && "get" in o && null !== (s = o.get(e, n)) ? s : (typeof e.getAttribute !== i && (s = e.getAttribute(n)), null == s ? t : s) : null !== r ? o && a && "set" in o && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r) : (b.removeAttr(e, n), t)) }, removeAttr: function (e, t) { var n, r, i = 0, o = t && t.match(w); if (o && 1 === e.nodeType) while (n = o[i++]) r = b.propFix[n] || n, J.test(n) ? !Q && G.test(n) ? e[b.camelCase("default-" + n)] = e[r] = !1 : e[r] = !1 : b.attr(e, n, ""), e.removeAttribute(Q ? n : r) }, attrHooks: { type: { set: function (e, t) { if (!b.support.radioValue && "radio" === t && b.nodeName(e, "input")) { var n = e.value; return e.setAttribute("type", t), n && (e.value = n), t } } } }, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function (e, n, r) { var i, o, a, s = e.nodeType; if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !b.isXMLDoc(e), a && (n = b.propFix[n] || n, o = b.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n] }, propHooks: { tabIndex: { get: function (e) { var n = e.getAttributeNode("tabindex"); return n && n.specified ? parseInt(n.value, 10) : V.test(e.nodeName) || Y.test(e.nodeName) && e.href ? 0 : t } }} }), z = { get: function (e, n) { var r = b.prop(e, n), i = "boolean" == typeof r && e.getAttribute(n), o = "boolean" == typeof r ? K && Q ? null != i : G.test(n) ? e[b.camelCase("default-" + n)] : !!i : e.getAttributeNode(n); return o && o.value !== !1 ? n.toLowerCase() : t }, set: function (e, t, n) { return t === !1 ? b.removeAttr(e, n) : K && Q || !G.test(n) ? e.setAttribute(!Q && b.propFix[n] || n, n) : e[b.camelCase("default-" + n)] = e[n] = !0, n } }, K && Q || (b.attrHooks.value = { get: function (e, n) { var r = e.getAttributeNode(n); return b.nodeName(e, "input") ? e.defaultValue : r && r.specified ? r.value : t }, set: function (e, n, r) { return b.nodeName(e, "input") ? (e.defaultValue = n, t) : I && I.set(e, n, r) } }), Q || (I = b.valHooks.button = { get: function (e, n) { var r = e.getAttributeNode(n); return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value : r.specified) ? r.value : t }, set: function (e, n, r) { var i = e.getAttributeNode(r); return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t } }, b.attrHooks.contenteditable = { get: I.get, set: function (e, t, n) { I.set(e, "" === t ? !1 : t, n) } }, b.each(["width", "height"], function (e, n) { b.attrHooks[n] = b.extend(b.attrHooks[n], { set: function (e, r) { return "" === r ? (e.setAttribute(n, "auto"), r) : t } }) })), b.support.hrefNormalized || (b.each(["href", "src", "width", "height"], function (e, n) { b.attrHooks[n] = b.extend(b.attrHooks[n], { get: function (e) { var r = e.getAttribute(n, 2); return null == r ? t : r } }) }), b.each(["href", "src"], function (e, t) { b.propHooks[t] = { get: function (e) { return e.getAttribute(t, 4) } } })), b.support.style || (b.attrHooks.style = { get: function (e) { return e.style.cssText || t }, set: function (e, t) { return e.style.cssText = t + "" } }), b.support.optSelected || (b.propHooks.selected = b.extend(b.propHooks.selected, { get: function (e) { var t = e.parentNode; return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null } })), b.support.enctype || (b.propFix.enctype = "encoding"), b.support.checkOn || b.each(["radio", "checkbox"], function () { b.valHooks[this] = { get: function (e) { return null === e.getAttribute("value") ? "on" : e.value } } }), b.each(["radio", "checkbox"], function () { b.valHooks[this] = b.extend(b.valHooks[this], { set: function (e, n) { return b.isArray(n) ? e.checked = b.inArray(b(e).val(), n) >= 0 : t } }) }); var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/; function it() { return !0 } function ot() { return !1 } b.event = { global: {}, add: function (e, n, r, o, a) { var s, u, l, c, p, f, d, h, g, m, y, v = b._data(e); if (v) { r.handler && (c = r, r = c.handler, a = c.selector), r.guid || (r.guid = b.guid++), (u = v.events) || (u = v.events = {}), (f = v.handle) || (f = v.handle = function (e) { return typeof b === i || e && b.event.triggered === e.type ? t : b.event.dispatch.apply(f.elem, arguments) }, f.elem = e), n = (n || "").match(w) || [""], l = n.length; while (l--) s = rt.exec(n[l]) || [], g = y = s[1], m = (s[2] || "").split(".").sort(), p = b.event.special[g] || {}, g = (a ? p.delegateType : p.bindType) || g, p = b.event.special[g] || {}, d = b.extend({ type: g, origType: y, data: o, handler: r, guid: r.guid, selector: a, needsContext: a && b.expr.match.needsContext.test(a), namespace: m.join(".") }, c), (h = u[g]) || (h = u[g] = [], h.delegateCount = 0, p.setup && p.setup.call(e, o, m, f) !== !1 || (e.addEventListener ? e.addEventListener(g, f, !1) : e.attachEvent && e.attachEvent("on" + g, f))), p.add && (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)), a ? h.splice(h.delegateCount++, 0, d) : h.push(d), b.event.global[g] = !0; e = null } }, remove: function (e, t, n, r, i) { var o, a, s, u, l, c, p, f, d, h, g, m = b.hasData(e) && b._data(e); if (m && (c = m.events)) { t = (t || "").match(w) || [""], l = t.length; while (l--) if (s = rt.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) { p = b.event.special[d] || {}, d = (r ? p.delegateType : p.bindType) || d, f = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = f.length; while (o--) a = f[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (f.splice(o, 1), a.selector && f.delegateCount--, p.remove && p.remove.call(e, a)); u && !f.length && (p.teardown && p.teardown.call(e, h, m.handle) !== !1 || b.removeEvent(e, d, m.handle), delete c[d]) } else for (d in c) b.event.remove(e, d + t[l], n, r, !0); b.isEmptyObject(c) && (delete m.handle, b._removeData(e, "events")) } }, trigger: function (n, r, i, a) { var s, u, l, c, p, f, d, h = [i || o], g = y.call(n, "type") ? n.type : n, m = y.call(n, "namespace") ? n.namespace.split(".") : []; if (l = f = i = i || o, 3 !== i.nodeType && 8 !== i.nodeType && !nt.test(g + b.event.triggered) && (g.indexOf(".") >= 0 && (m = g.split("."), g = m.shift(), m.sort()), u = 0 > g.indexOf(":") && "on" + g, n = n[b.expando] ? n : new b.Event(g, "object" == typeof n && n), n.isTrigger = !0, n.namespace = m.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : b.makeArray(r, [n]), p = b.event.special[g] || {}, a || !p.trigger || p.trigger.apply(i, r) !== !1)) { if (!a && !p.noBubble && !b.isWindow(i)) { for (c = p.delegateType || g, nt.test(c + g) || (l = l.parentNode); l; l = l.parentNode) h.push(l), f = l; f === (i.ownerDocument || o) && h.push(f.defaultView || f.parentWindow || e) } d = 0; while ((l = h[d++]) && !n.isPropagationStopped()) n.type = d > 1 ? c : p.bindType || g, s = (b._data(l, "events") || {})[n.type] && b._data(l, "handle"), s && s.apply(l, r), s = u && l[u], s && b.acceptData(l) && s.apply && s.apply(l, r) === !1 && n.preventDefault(); if (n.type = g, !(a || n.isDefaultPrevented() || p._default && p._default.apply(i.ownerDocument, r) !== !1 || "click" === g && b.nodeName(i, "a") || !b.acceptData(i) || !u || !i[g] || b.isWindow(i))) { f = i[u], f && (i[u] = null), b.event.triggered = g; try { i[g]() } catch (v) { } b.event.triggered = t, f && (i[u] = f) } return n.result } }, dispatch: function (e) { e = b.event.fix(e); var n, r, i, o, a, s = [], u = h.call(arguments), l = (b._data(this, "events") || {})[e.type] || [], c = b.event.special[e.type] || {}; if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) { s = b.event.handlers.call(this, e, l), n = 0; while ((o = s[n++]) && !e.isPropagationStopped()) { e.currentTarget = o.elem, a = 0; while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped()) (!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((b.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())) } return c.postDispatch && c.postDispatch.call(this, e), e.result } }, handlers: function (e, n) { var r, i, o, a, s = [], u = n.delegateCount, l = e.target; if (u && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) { for (o = [], a = 0; u > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? b(r, this).index(l) >= 0 : b.find(r, this, null, [l]).length), o[r] && o.push(i); o.length && s.push({ elem: l, handlers: o }) } return n.length > u && s.push({ elem: this, handlers: n.slice(u) }), s }, fix: function (e) { if (e[b.expando]) return e; var t, n, r, i = e.type, a = e, s = this.fixHooks[i]; s || (this.fixHooks[i] = s = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new b.Event(a), t = r.length; while (t--) n = r[t], e[n] = a[n]; return e.target || (e.target = a.srcElement || o), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, a) : e }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (e, t) { return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, n) { var r, i, a, s = n.button, u = n.fromElement; return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || o, a = i.documentElement, r = i.body, e.pageX = n.clientX + (a && a.scrollLeft || r && r.scrollLeft || 0) - (a && a.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (a && a.scrollTop || r && r.scrollTop || 0) - (a && a.clientTop || r && r.clientTop || 0)), !e.relatedTarget && u && (e.relatedTarget = u === e.target ? n.toElement : u), e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e } }, special: { load: { noBubble: !0 }, click: { trigger: function () { return b.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t } }, focus: { trigger: function () { if (this !== o.activeElement && this.focus) try { return this.focus(), !1 } catch (e) { } }, delegateType: "focusin" }, blur: { trigger: function () { return this === o.activeElement && this.blur ? (this.blur(), !1) : t }, delegateType: "focusout" }, beforeunload: { postDispatch: function (e) { e.result !== t && (e.originalEvent.returnValue = e.result) } } }, simulate: function (e, t, n, r) { var i = b.extend(new b.Event, n, { type: e, isSimulated: !0, originalEvent: {} }); r ? b.event.trigger(i, null, t) : b.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault() } }, b.removeEvent = o.removeEventListener ? function (e, t, n) { e.removeEventListener && e.removeEventListener(t, n, !1) } : function (e, t, n) { var r = "on" + t; e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n)) }, b.Event = function (e, n) { return this instanceof b.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : ot) : this.type = e, n && b.extend(this, n), this.timeStamp = e && e.timeStamp || b.now(), this[b.expando] = !0, t) : new b.Event(e, n) }, b.Event.prototype = { isDefaultPrevented: ot, isPropagationStopped: ot, isImmediatePropagationStopped: ot, preventDefault: function () { var e = this.originalEvent; this.isDefaultPrevented = it, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1) }, stopPropagation: function () { var e = this.originalEvent; this.isPropagationStopped = it, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0) }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = it, this.stopPropagation() } }, b.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) {
        b.event.special[e] = { delegateType: t, bindType: t, handle: function (e) {
            var n, r = this, i = e.relatedTarget, o = e.handleObj;
            return (!i || i !== r && !b.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
        } 
        }
    }), b.support.submitBubbles || (b.event.special.submit = { setup: function () { return b.nodeName(this, "form") ? !1 : (b.event.add(this, "click._submit keypress._submit", function (e) { var n = e.target, r = b.nodeName(n, "input") || b.nodeName(n, "button") ? n.form : t; r && !b._data(r, "submitBubbles") && (b.event.add(r, "submit._submit", function (e) { e._submit_bubble = !0 }), b._data(r, "submitBubbles", !0)) }), t) }, postDispatch: function (e) { e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && b.event.simulate("submit", this.parentNode, e, !0)) }, teardown: function () { return b.nodeName(this, "form") ? !1 : (b.event.remove(this, "._submit"), t) } }), b.support.changeBubbles || (b.event.special.change = { setup: function () { return Z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (b.event.add(this, "propertychange._change", function (e) { "checked" === e.originalEvent.propertyName && (this._just_changed = !0) }), b.event.add(this, "click._change", function (e) { this._just_changed && !e.isTrigger && (this._just_changed = !1), b.event.simulate("change", this, e, !0) })), !1) : (b.event.add(this, "beforeactivate._change", function (e) { var t = e.target; Z.test(t.nodeName) && !b._data(t, "changeBubbles") && (b.event.add(t, "change._change", function (e) { !this.parentNode || e.isSimulated || e.isTrigger || b.event.simulate("change", this.parentNode, e, !0) }), b._data(t, "changeBubbles", !0)) }), t) }, handle: function (e) { var n = e.target; return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t }, teardown: function () { return b.event.remove(this, "._change"), !Z.test(this.nodeName) } }), b.support.focusinBubbles || b.each({ focus: "focusin", blur: "focusout" }, function (e, t) { var n = 0, r = function (e) { b.event.simulate(t, e.target, b.event.fix(e), !0) }; b.event.special[t] = { setup: function () { 0 === n++ && o.addEventListener(e, r, !0) }, teardown: function () { 0 === --n && o.removeEventListener(e, r, !0) } } }), b.fn.extend({ on: function (e, n, r, i, o) { var a, s; if ("object" == typeof e) { "string" != typeof n && (r = r || n, n = t); for (a in e) this.on(a, n, r, e[a], o); return this } if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = ot; else if (!i) return this; return 1 === o && (s = i, i = function (e) { return b().off(e), s.apply(this, arguments) }, i.guid = s.guid || (s.guid = b.guid++)), this.each(function () { b.event.add(this, e, i, r, n) }) }, one: function (e, t, n, r) { return this.on(e, t, n, r, 1) }, off: function (e, n, r) { var i, o; if (e && e.preventDefault && e.handleObj) return i = e.handleObj, b(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this; if ("object" == typeof e) { for (o in e) this.off(o, n, e[o]); return this } return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = ot), this.each(function () { b.event.remove(this, e, r, n) }) }, bind: function (e, t, n) { return this.on(e, null, t, n) }, unbind: function (e, t) { return this.off(e, null, t) }, delegate: function (e, t, n, r) { return this.on(t, e, n, r) }, undelegate: function (e, t, n) { return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n) }, trigger: function (e, t) { return this.each(function () { b.event.trigger(e, t, this) }) }, triggerHandler: function (e, n) { var r = this[0]; return r ? b.event.trigger(e, n, r, !0) : t } }), function (e, t) { var n, r, i, o, a, s, u, l, c, p, f, d, h, g, m, y, v, x = "sizzle" + -new Date, w = e.document, T = {}, N = 0, C = 0, k = it(), E = it(), S = it(), A = typeof t, j = 1 << 31, D = [], L = D.pop, H = D.push, q = D.slice, M = D.indexOf || function (e) { var t = 0, n = this.length; for (; n > t; t++) if (this[t] === e) return t; return -1 }, _ = "[\\x20\\t\\r\\n\\f]", F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", O = F.replace("w", "w#"), B = "([*^$|!~]?=)", P = "\\[" + _ + "*(" + F + ")" + _ + "*(?:" + B + _ + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + O + ")|)|)" + _ + "*\\]", R = ":(" + F + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + P.replace(3, 8) + ")*)|.*)\\)|)", W = RegExp("^" + _ + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _ + "+$", "g"), $ = RegExp("^" + _ + "*," + _ + "*"), I = RegExp("^" + _ + "*([\\x20\\t\\r\\n\\f>+~])" + _ + "*"), z = RegExp(R), X = RegExp("^" + O + "$"), U = { ID: RegExp("^#(" + F + ")"), CLASS: RegExp("^\\.(" + F + ")"), NAME: RegExp("^\\[name=['\"]?(" + F + ")['\"]?\\]"), TAG: RegExp("^(" + F.replace("w", "w*") + ")"), ATTR: RegExp("^" + P), PSEUDO: RegExp("^" + R), CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _ + "*(even|odd|(([+-]|)(\\d*)n|)" + _ + "*(?:([+-]|)" + _ + "*(\\d+)|))" + _ + "*\\)|)", "i"), needsContext: RegExp("^" + _ + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _ + "*((?:-\\d)?\\d*)" + _ + "*\\)|)(?=[^-]|$)", "i") }, V = /[\x20\t\r\n\f]*[+~]/, Y = /^[^{]+\{\s*\[native code/, J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, G = /^(?:input|select|textarea|button)$/i, Q = /^h\d$/i, K = /'|\\/g, Z = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, et = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, tt = function (e, t) { var n = "0x" + t - 65536; return n !== n ? t : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n) }; try { q.call(w.documentElement.childNodes, 0)[0].nodeType } catch (nt) { q = function (e) { var t, n = []; while (t = this[e++]) n.push(t); return n } } function rt(e) { return Y.test(e + "") } function it() { var e, t = []; return e = function (n, r) { return t.push(n += " ") > i.cacheLength && delete e[t.shift()], e[n] = r } } function ot(e) { return e[x] = !0, e } function at(e) { var t = p.createElement("div"); try { return e(t) } catch (n) { return !1 } finally { t = null } } function st(e, t, n, r) { var i, o, a, s, u, l, f, g, m, v; if ((t ? t.ownerDocument || t : w) !== p && c(t), t = t || p, n = n || [], !e || "string" != typeof e) return n; if (1 !== (s = t.nodeType) && 9 !== s) return []; if (!d && !r) { if (i = J.exec(e)) if (a = i[1]) { if (9 === s) { if (o = t.getElementById(a), !o || !o.parentNode) return n; if (o.id === a) return n.push(o), n } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && y(t, o) && o.id === a) return n.push(o), n } else { if (i[2]) return H.apply(n, q.call(t.getElementsByTagName(e), 0)), n; if ((a = i[3]) && T.getByClassName && t.getElementsByClassName) return H.apply(n, q.call(t.getElementsByClassName(a), 0)), n } if (T.qsa && !h.test(e)) { if (f = !0, g = x, m = t, v = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) { l = ft(e), (f = t.getAttribute("id")) ? g = f.replace(K, "\\$&") : t.setAttribute("id", g), g = "[id='" + g + "'] ", u = l.length; while (u--) l[u] = g + dt(l[u]); m = V.test(e) && t.parentNode || t, v = l.join(",") } if (v) try { return H.apply(n, q.call(m.querySelectorAll(v), 0)), n } catch (b) { } finally { f || t.removeAttribute("id") } } } return wt(e.replace(W, "$1"), t, n, r) } a = st.isXML = function (e) { var t = e && (e.ownerDocument || e).documentElement; return t ? "HTML" !== t.nodeName : !1 }, c = st.setDocument = function (e) { var n = e ? e.ownerDocument || e : w; return n !== p && 9 === n.nodeType && n.documentElement ? (p = n, f = n.documentElement, d = a(n), T.tagNameNoComments = at(function (e) { return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length }), T.attributes = at(function (e) { e.innerHTML = "<select></select>"; var t = typeof e.lastChild.getAttribute("multiple"); return "boolean" !== t && "string" !== t }), T.getByClassName = at(function (e) { return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1 }), T.getByName = at(function (e) { e.id = x + 0, e.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", f.insertBefore(e, f.firstChild); var t = n.getElementsByName && n.getElementsByName(x).length === 2 + n.getElementsByName(x + 0).length; return T.getIdNotName = !n.getElementById(x), f.removeChild(e), t }), i.attrHandle = at(function (e) { return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== A && "#" === e.firstChild.getAttribute("href") }) ? {} : { href: function (e) { return e.getAttribute("href", 2) }, type: function (e) { return e.getAttribute("type") } }, T.getIdNotName ? (i.find.ID = function (e, t) { if (typeof t.getElementById !== A && !d) { var n = t.getElementById(e); return n && n.parentNode ? [n] : [] } }, i.filter.ID = function (e) { var t = e.replace(et, tt); return function (e) { return e.getAttribute("id") === t } }) : (i.find.ID = function (e, n) { if (typeof n.getElementById !== A && !d) { var r = n.getElementById(e); return r ? r.id === e || typeof r.getAttributeNode !== A && r.getAttributeNode("id").value === e ? [r] : t : [] } }, i.filter.ID = function (e) { var t = e.replace(et, tt); return function (e) { var n = typeof e.getAttributeNode !== A && e.getAttributeNode("id"); return n && n.value === t } }), i.find.TAG = T.tagNameNoComments ? function (e, n) { return typeof n.getElementsByTagName !== A ? n.getElementsByTagName(e) : t } : function (e, t) { var n, r = [], i = 0, o = t.getElementsByTagName(e); if ("*" === e) { while (n = o[i++]) 1 === n.nodeType && r.push(n); return r } return o }, i.find.NAME = T.getByName && function (e, n) { return typeof n.getElementsByName !== A ? n.getElementsByName(name) : t }, i.find.CLASS = T.getByClassName && function (e, n) { return typeof n.getElementsByClassName === A || d ? t : n.getElementsByClassName(e) }, g = [], h = [":focus"], (T.qsa = rt(n.querySelectorAll)) && (at(function (e) { e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || h.push("\\[" + _ + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || h.push(":checked") }), at(function (e) { e.innerHTML = "<input type='hidden' i=''/>", e.querySelectorAll("[i^='']").length && h.push("[*^$]=" + _ + "*(?:\"\"|'')"), e.querySelectorAll(":enabled").length || h.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), h.push(",.*:") })), (T.matchesSelector = rt(m = f.matchesSelector || f.mozMatchesSelector || f.webkitMatchesSelector || f.oMatchesSelector || f.msMatchesSelector)) && at(function (e) { T.disconnectedMatch = m.call(e, "div"), m.call(e, "[s!='']:x"), g.push("!=", R) }), h = RegExp(h.join("|")), g = RegExp(g.join("|")), y = rt(f.contains) || f.compareDocumentPosition ? function (e, t) { var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode; return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))) } : function (e, t) { if (t) while (t = t.parentNode) if (t === e) return !0; return !1 }, v = f.compareDocumentPosition ? function (e, t) { var r; return e === t ? (u = !0, 0) : (r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & r || e.parentNode && 11 === e.parentNode.nodeType ? e === n || y(w, e) ? -1 : t === n || y(w, t) ? 1 : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1 } : function (e, t) { var r, i = 0, o = e.parentNode, a = t.parentNode, s = [e], l = [t]; if (e === t) return u = !0, 0; if (!o || !a) return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : 0; if (o === a) return ut(e, t); r = e; while (r = r.parentNode) s.unshift(r); r = t; while (r = r.parentNode) l.unshift(r); while (s[i] === l[i]) i++; return i ? ut(s[i], l[i]) : s[i] === w ? -1 : l[i] === w ? 1 : 0 }, u = !1, [0, 0].sort(v), T.detectDuplicates = u, p) : p }, st.matches = function (e, t) { return st(e, null, null, t) }, st.matchesSelector = function (e, t) { if ((e.ownerDocument || e) !== p && c(e), t = t.replace(Z, "='$1']"), !(!T.matchesSelector || d || g && g.test(t) || h.test(t))) try { var n = m.call(e, t); if (n || T.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n } catch (r) { } return st(t, p, null, [e]).length > 0 }, st.contains = function (e, t) { return (e.ownerDocument || e) !== p && c(e), y(e, t) }, st.attr = function (e, t) { var n; return (e.ownerDocument || e) !== p && c(e), d || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : d || T.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t : n && n.specified ? n.value : null }, st.error = function (e) { throw Error("Syntax error, unrecognized expression: " + e) }, st.uniqueSort = function (e) { var t, n = [], r = 1, i = 0; if (u = !T.detectDuplicates, e.sort(v), u) { for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r)); while (i--) e.splice(n[i], 1) } return e }; function ut(e, t) { var n = t && e, r = n && (~t.sourceIndex || j) - (~e.sourceIndex || j); if (r) return r; if (n) while (n = n.nextSibling) if (n === t) return -1; return e ? 1 : -1 } function lt(e) { return function (t) { var n = t.nodeName.toLowerCase(); return "input" === n && t.type === e } } function ct(e) { return function (t) { var n = t.nodeName.toLowerCase(); return ("input" === n || "button" === n) && t.type === e } } function pt(e) { return ot(function (t) { return t = +t, ot(function (n, r) { var i, o = e([], n.length, t), a = o.length; while (a--) n[i = o[a]] && (n[i] = !(r[i] = n[i])) }) }) } o = st.getText = function (e) { var t, n = "", r = 0, i = e.nodeType; if (i) { if (1 === i || 9 === i || 11 === i) { if ("string" == typeof e.textContent) return e.textContent; for (e = e.firstChild; e; e = e.nextSibling) n += o(e) } else if (3 === i || 4 === i) return e.nodeValue } else for (; t = e[r]; r++) n += o(t); return n }, i = st.selectors = { cacheLength: 50, createPseudo: ot, match: U, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling"} }, preFilter: { ATTR: function (e) { return e[1] = e[1].replace(et, tt), e[3] = (e[4] || e[5] || "").replace(et, tt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4) }, CHILD: function (e) { return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || st.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && st.error(e[0]), e }, PSEUDO: function (e) { var t, n = !e[5] && e[2]; return U.CHILD.test(e[0]) ? null : (e[4] ? e[2] = e[4] : n && z.test(n) && (t = ft(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3)) } }, filter: { TAG: function (e) { return "*" === e ? function () { return !0 } : (e = e.replace(et, tt).toLowerCase(), function (t) { return t.nodeName && t.nodeName.toLowerCase() === e }) }, CLASS: function (e) { var t = k[e + " "]; return t || (t = RegExp("(^|" + _ + ")" + e + "(" + _ + "|$)")) && k(e, function (e) { return t.test(e.className || typeof e.getAttribute !== A && e.getAttribute("class") || "") }) }, ATTR: function (e, t, n) { return function (r) { var i = st.attr(r, e); return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0 } }, CHILD: function (e, t, n, r, i) { var o = "nth" !== e.slice(0, 3), a = "last" !== e.slice(-4), s = "of-type" === t; return 1 === r && 0 === i ? function (e) { return !!e.parentNode } : function (t, n, u) { var l, c, p, f, d, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, y = s && t.nodeName.toLowerCase(), v = !u && !s; if (m) { if (o) { while (g) { p = t; while (p = p[g]) if (s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1; h = g = "only" === e && !h && "nextSibling" } return !0 } if (h = [a ? m.firstChild : m.lastChild], a && v) { c = m[x] || (m[x] = {}), l = c[e] || [], d = l[0] === N && l[1], f = l[0] === N && l[2], p = d && m.childNodes[d]; while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if (1 === p.nodeType && ++f && p === t) { c[e] = [N, d, f]; break } } else if (v && (l = (t[x] || (t[x] = {}))[e]) && l[0] === N) f = l[1]; else while (p = ++d && p && p[g] || (f = d = 0) || h.pop()) if ((s ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) && ++f && (v && ((p[x] || (p[x] = {}))[e] = [N, f]), p === t)) break; return f -= i, f === r || 0 === f % r && f / r >= 0 } } }, PSEUDO: function (e, t) { var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || st.error("unsupported pseudo: " + e); return r[x] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ot(function (e, n) { var i, o = r(e, t), a = o.length; while (a--) i = M.call(e, o[a]), e[i] = !(n[i] = o[a]) }) : function (e) { return r(e, 0, n) }) : r } }, pseudos: { not: ot(function (e) { var t = [], n = [], r = s(e.replace(W, "$1")); return r[x] ? ot(function (e, t, n, i) { var o, a = r(e, null, i, []), s = e.length; while (s--) (o = a[s]) && (e[s] = !(t[s] = o)) }) : function (e, i, o) { return t[0] = e, r(t, null, o, n), !n.pop() } }), has: ot(function (e) { return function (t) { return st(e, t).length > 0 } }), contains: ot(function (e) { return function (t) { return (t.textContent || t.innerText || o(t)).indexOf(e) > -1 } }), lang: ot(function (e) { return X.test(e || "") || st.error("unsupported lang: " + e), e = e.replace(et, tt).toLowerCase(), function (t) { var n; do if (n = d ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType); return !1 } }), target: function (t) { var n = e.location && e.location.hash; return n && n.slice(1) === t.id }, root: function (e) { return e === f }, focus: function (e) { return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex) }, enabled: function (e) { return e.disabled === !1 }, disabled: function (e) { return e.disabled === !0 }, checked: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && !!e.checked || "option" === t && !!e.selected }, selected: function (e) { return e.parentNode && e.parentNode.selectedIndex, e.selected === !0 }, empty: function (e) { for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1; return !0 }, parent: function (e) { return !i.pseudos.empty(e) }, header: function (e) { return Q.test(e.nodeName) }, input: function (e) { return G.test(e.nodeName) }, button: function (e) { var t = e.nodeName.toLowerCase(); return "input" === t && "button" === e.type || "button" === t }, text: function (e) { var t; return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type) }, first: pt(function () { return [0] }), last: pt(function (e, t) { return [t - 1] }), eq: pt(function (e, t, n) { return [0 > n ? n + t : n] }), even: pt(function (e, t) { var n = 0; for (; t > n; n += 2) e.push(n); return e }), odd: pt(function (e, t) { var n = 1; for (; t > n; n += 2) e.push(n); return e }), lt: pt(function (e, t, n) { var r = 0 > n ? n + t : n; for (; --r >= 0; ) e.push(r); return e }), gt: pt(function (e, t, n) { var r = 0 > n ? n + t : n; for (; t > ++r; ) e.push(r); return e })} }; for (n in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) i.pseudos[n] = lt(n); for (n in { submit: !0, reset: !0 }) i.pseudos[n] = ct(n); function ft(e, t) { var n, r, o, a, s, u, l, c = E[e + " "]; if (c) return t ? 0 : c.slice(0); s = e, u = [], l = i.preFilter; while (s) { (!n || (r = $.exec(s))) && (r && (s = s.slice(r[0].length) || s), u.push(o = [])), n = !1, (r = I.exec(s)) && (n = r.shift(), o.push({ value: n, type: r[0].replace(W, " ") }), s = s.slice(n.length)); for (a in i.filter) !(r = U[a].exec(s)) || l[a] && !(r = l[a](r)) || (n = r.shift(), o.push({ value: n, type: a, matches: r }), s = s.slice(n.length)); if (!n) break } return t ? s.length : s ? st.error(e) : E(e, u).slice(0) } function dt(e) { var t = 0, n = e.length, r = ""; for (; n > t; t++) r += e[t].value; return r } function ht(e, t, n) { var i = t.dir, o = n && "parentNode" === i, a = C++; return t.first ? function (t, n, r) { while (t = t[i]) if (1 === t.nodeType || o) return e(t, n, r) } : function (t, n, s) { var u, l, c, p = N + " " + a; if (s) { while (t = t[i]) if ((1 === t.nodeType || o) && e(t, n, s)) return !0 } else while (t = t[i]) if (1 === t.nodeType || o) if (c = t[x] || (t[x] = {}), (l = c[i]) && l[0] === p) { if ((u = l[1]) === !0 || u === r) return u === !0 } else if (l = c[i] = [p], l[1] = e(t, n, s) || r, l[1] === !0) return !0 } } function gt(e) { return e.length > 1 ? function (t, n, r) { var i = e.length; while (i--) if (!e[i](t, n, r)) return !1; return !0 } : e[0] } function mt(e, t, n, r, i) { var o, a = [], s = 0, u = e.length, l = null != t; for (; u > s; s++) (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s)); return a } function yt(e, t, n, r, i, o) { return r && !r[x] && (r = yt(r)), i && !i[x] && (i = yt(i, o)), ot(function (o, a, s, u) { var l, c, p, f = [], d = [], h = a.length, g = o || xt(t || "*", s.nodeType ? [s] : s, []), m = !e || !o && t ? g : mt(g, f, e, s, u), y = n ? i || (o ? e : h || r) ? [] : a : m; if (n && n(m, y, s, u), r) { l = mt(y, d), r(l, [], s, u), c = l.length; while (c--) (p = l[c]) && (y[d[c]] = !(m[d[c]] = p)) } if (o) { if (i || e) { if (i) { l = [], c = y.length; while (c--) (p = y[c]) && l.push(m[c] = p); i(null, y = [], l, u) } c = y.length; while (c--) (p = y[c]) && (l = i ? M.call(o, p) : f[c]) > -1 && (o[l] = !(a[l] = p)) } } else y = mt(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, u) : H.apply(a, y) }) } function vt(e) { var t, n, r, o = e.length, a = i.relative[e[0].type], s = a || i.relative[" "], u = a ? 1 : 0, c = ht(function (e) { return e === t }, s, !0), p = ht(function (e) { return M.call(t, e) > -1 }, s, !0), f = [function (e, n, r) { return !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : p(e, n, r)) } ]; for (; o > u; u++) if (n = i.relative[e[u].type]) f = [ht(gt(f), n)]; else { if (n = i.filter[e[u].type].apply(null, e[u].matches), n[x]) { for (r = ++u; o > r; r++) if (i.relative[e[r].type]) break; return yt(u > 1 && gt(f), u > 1 && dt(e.slice(0, u - 1)).replace(W, "$1"), n, r > u && vt(e.slice(u, r)), o > r && vt(e = e.slice(r)), o > r && dt(e)) } f.push(n) } return gt(f) } function bt(e, t) { var n = 0, o = t.length > 0, a = e.length > 0, s = function (s, u, c, f, d) { var h, g, m, y = [], v = 0, b = "0", x = s && [], w = null != d, T = l, C = s || a && i.find.TAG("*", d && u.parentNode || u), k = N += null == T ? 1 : Math.random() || .1; for (w && (l = u !== p && u, r = n); null != (h = C[b]); b++) { if (a && h) { g = 0; while (m = e[g++]) if (m(h, u, c)) { f.push(h); break } w && (N = k, r = ++n) } o && ((h = !m && h) && v--, s && x.push(h)) } if (v += b, o && b !== v) { g = 0; while (m = t[g++]) m(x, y, u, c); if (s) { if (v > 0) while (b--) x[b] || y[b] || (y[b] = L.call(f)); y = mt(y) } H.apply(f, y), w && !s && y.length > 0 && v + t.length > 1 && st.uniqueSort(f) } return w && (N = k, l = T), x }; return o ? ot(s) : s } s = st.compile = function (e, t) { var n, r = [], i = [], o = S[e + " "]; if (!o) { t || (t = ft(e)), n = t.length; while (n--) o = vt(t[n]), o[x] ? r.push(o) : i.push(o); o = S(e, bt(i, r)) } return o }; function xt(e, t, n) { var r = 0, i = t.length; for (; i > r; r++) st(e, t[r], n); return n } function wt(e, t, n, r) { var o, a, u, l, c, p = ft(e); if (!r && 1 === p.length) { if (a = p[0] = p[0].slice(0), a.length > 2 && "ID" === (u = a[0]).type && 9 === t.nodeType && !d && i.relative[a[1].type]) { if (t = i.find.ID(u.matches[0].replace(et, tt), t)[0], !t) return n; e = e.slice(a.shift().value.length) } o = U.needsContext.test(e) ? 0 : a.length; while (o--) { if (u = a[o], i.relative[l = u.type]) break; if ((c = i.find[l]) && (r = c(u.matches[0].replace(et, tt), V.test(a[0].type) && t.parentNode || t))) { if (a.splice(o, 1), e = r.length && dt(a), !e) return H.apply(n, q.call(r, 0)), n; break } } } return s(e, p)(r, t, d, n, V.test(e)), n } i.pseudos.nth = i.pseudos.eq; function Tt() { } i.filters = Tt.prototype = i.pseudos, i.setFilters = new Tt, c(), st.attr = b.attr, b.find = st, b.expr = st.selectors, b.expr[":"] = b.expr.pseudos, b.unique = st.uniqueSort, b.text = st.getText, b.isXMLDoc = st.isXML, b.contains = st.contains } (e); var at = /Until$/, st = /^(?:parents|prev(?:Until|All))/, ut = /^.[^:#\[\.,]*$/, lt = b.expr.match.needsContext, ct = { children: !0, contents: !0, next: !0, prev: !0 }; b.fn.extend({ find: function (e) { var t, n, r, i = this.length; if ("string" != typeof e) return r = this, this.pushStack(b(e).filter(function () { for (t = 0; i > t; t++) if (b.contains(r[t], this)) return !0 })); for (n = [], t = 0; i > t; t++) b.find(e, this[t], n); return n = this.pushStack(i > 1 ? b.unique(n) : n), n.selector = (this.selector ? this.selector + " " : "") + e, n }, has: function (e) { var t, n = b(e, this), r = n.length; return this.filter(function () { for (t = 0; r > t; t++) if (b.contains(this, n[t])) return !0 }) }, not: function (e) { return this.pushStack(ft(this, e, !1)) }, filter: function (e) { return this.pushStack(ft(this, e, !0)) }, is: function (e) { return !!e && ("string" == typeof e ? lt.test(e) ? b(e, this.context).index(this[0]) >= 0 : b.filter(e, this).length > 0 : this.filter(e).length > 0) }, closest: function (e, t) { var n, r = 0, i = this.length, o = [], a = lt.test(e) || "string" != typeof e ? b(e, t || this.context) : 0; for (; i > r; r++) { n = this[r]; while (n && n.ownerDocument && n !== t && 11 !== n.nodeType) { if (a ? a.index(n) > -1 : b.find.matchesSelector(n, e)) { o.push(n); break } n = n.parentNode } } return this.pushStack(o.length > 1 ? b.unique(o) : o) }, index: function (e) { return e ? "string" == typeof e ? b.inArray(this[0], b(e)) : b.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1 }, add: function (e, t) { var n = "string" == typeof e ? b(e, t) : b.makeArray(e && e.nodeType ? [e] : e), r = b.merge(this.get(), n); return this.pushStack(b.unique(r)) }, addBack: function (e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) } }), b.fn.andSelf = b.fn.addBack; function pt(e, t) { do e = e[t]; while (e && 1 !== e.nodeType); return e } b.each({ parent: function (e) { var t = e.parentNode; return t && 11 !== t.nodeType ? t : null }, parents: function (e) { return b.dir(e, "parentNode") }, parentsUntil: function (e, t, n) { return b.dir(e, "parentNode", n) }, next: function (e) { return pt(e, "nextSibling") }, prev: function (e) { return pt(e, "previousSibling") }, nextAll: function (e) { return b.dir(e, "nextSibling") }, prevAll: function (e) { return b.dir(e, "previousSibling") }, nextUntil: function (e, t, n) { return b.dir(e, "nextSibling", n) }, prevUntil: function (e, t, n) { return b.dir(e, "previousSibling", n) }, siblings: function (e) { return b.sibling((e.parentNode || {}).firstChild, e) }, children: function (e) { return b.sibling(e.firstChild) }, contents: function (e) { return b.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : b.merge([], e.childNodes) } }, function (e, t) { b.fn[e] = function (n, r) { var i = b.map(this, t, n); return at.test(e) || (r = n), r && "string" == typeof r && (i = b.filter(r, i)), i = this.length > 1 && !ct[e] ? b.unique(i) : i, this.length > 1 && st.test(e) && (i = i.reverse()), this.pushStack(i) } }), b.extend({ filter: function (e, t, n) { return n && (e = ":not(" + e + ")"), 1 === t.length ? b.find.matchesSelector(t[0], e) ? [t[0]] : [] : b.find.matches(e, t) }, dir: function (e, n, r) { var i = [], o = e[n]; while (o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !b(o).is(r))) 1 === o.nodeType && i.push(o), o = o[n]; return i }, sibling: function (e, t) { var n = []; for (; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e); return n } }); function ft(e, t, n) { if (t = t || 0, b.isFunction(t)) return b.grep(e, function (e, r) { var i = !!t.call(e, r, e); return i === n }); if (t.nodeType) return b.grep(e, function (e) { return e === t === n }); if ("string" == typeof t) { var r = b.grep(e, function (e) { return 1 === e.nodeType }); if (ut.test(t)) return b.filter(t, r, !n); t = b.filter(t, r) } return b.grep(e, function (e) { return b.inArray(e, t) >= 0 === n }) } function dt(e) { var t = ht.split("|"), n = e.createDocumentFragment(); if (n.createElement) while (t.length) n.createElement(t.pop()); return n } var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", gt = / jQuery\d+="(?:null|\d+)"/g, mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"), yt = /^\s+/, vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, xt = /<tbody/i, wt = /<|&#?\w+;/, Tt = /<(?:script|style|link)/i, Nt = /^(?:checkbox|radio)$/i, Ct = /checked\s*(?:[^=]|=\s*.checked.)/i, kt = /^$|\/(?:java|ecma)script/i, Et = /^true\/(.*)/, St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, At = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: b.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"] }, jt = dt(o), Dt = jt.appendChild(o.createElement("div")); At.optgroup = At.option, At.tbody = At.tfoot = At.colgroup = At.caption = At.thead, At.th = At.td, b.fn.extend({ text: function (e) { return b.access(this, function (e) { return e === t ? b.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e)) }, null, e, arguments.length) }, wrapAll: function (e) { if (b.isFunction(e)) return this.each(function (t) { b(this).wrapAll(e.call(this, t)) }); if (this[0]) { var t = b(e, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && t.insertBefore(this[0]), t.map(function () { var e = this; while (e.firstChild && 1 === e.firstChild.nodeType) e = e.firstChild; return e }).append(this) } return this }, wrapInner: function (e) { return b.isFunction(e) ? this.each(function (t) { b(this).wrapInner(e.call(this, t)) }) : this.each(function () { var t = b(this), n = t.contents(); n.length ? n.wrapAll(e) : t.append(e) }) }, wrap: function (e) { var t = b.isFunction(e); return this.each(function (n) { b(this).wrapAll(t ? e.call(this, n) : e) }) }, unwrap: function () { return this.parent().each(function () { b.nodeName(this, "body") || b(this).replaceWith(this.childNodes) }).end() }, append: function () { return this.domManip(arguments, !0, function (e) { (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e) }) }, prepend: function () { return this.domManip(arguments, !0, function (e) { (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild) }) }, before: function () { return this.domManip(arguments, !1, function (e) { this.parentNode && this.parentNode.insertBefore(e, this) }) }, after: function () { return this.domManip(arguments, !1, function (e) { this.parentNode && this.parentNode.insertBefore(e, this.nextSibling) }) }, remove: function (e, t) { var n, r = 0; for (; null != (n = this[r]); r++) (!e || b.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || b.cleanData(Ot(n)), n.parentNode && (t && b.contains(n.ownerDocument, n) && Mt(Ot(n, "script")), n.parentNode.removeChild(n))); return this }, empty: function () { var e, t = 0; for (; null != (e = this[t]); t++) { 1 === e.nodeType && b.cleanData(Ot(e, !1)); while (e.firstChild) e.removeChild(e.firstChild); e.options && b.nodeName(e, "select") && (e.options.length = 0) } return this }, clone: function (e, t) { return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () { return b.clone(this, e, t) }) }, html: function (e) { return b.access(this, function (e) { var n = this[0] || {}, r = 0, i = this.length; if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t; if (!("string" != typeof e || Tt.test(e) || !b.support.htmlSerialize && mt.test(e) || !b.support.leadingWhitespace && yt.test(e) || At[(bt.exec(e) || ["", ""])[1].toLowerCase()])) { e = e.replace(vt, "<$1></$2>"); try { for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (b.cleanData(Ot(n, !1)), n.innerHTML = e); n = 0 } catch (o) { } } n && this.empty().append(e) }, null, e, arguments.length) }, replaceWith: function (e) { var t = b.isFunction(e); return t || "string" == typeof e || (e = b(e).not(this).detach()), this.domManip([e], !0, function (e) { var t = this.nextSibling, n = this.parentNode; n && (b(this).remove(), n.insertBefore(e, t)) }) }, detach: function (e) { return this.remove(e, !0) }, domManip: function (e, n, r) { e = f.apply([], e); var i, o, a, s, u, l, c = 0, p = this.length, d = this, h = p - 1, g = e[0], m = b.isFunction(g); if (m || !(1 >= p || "string" != typeof g || b.support.checkClone) && Ct.test(g)) return this.each(function (i) { var o = d.eq(i); m && (e[0] = g.call(this, i, n ? o.html() : t)), o.domManip(e, n, r) }); if (p && (l = b.buildFragment(e, this[0].ownerDocument, !1, this), i = l.firstChild, 1 === l.childNodes.length && (l = i), i)) { for (n = n && b.nodeName(i, "tr"), s = b.map(Ot(l, "script"), Ht), a = s.length; p > c; c++) o = l, c !== h && (o = b.clone(o, !0, !0), a && b.merge(s, Ot(o, "script"))), r.call(n && b.nodeName(this[c], "table") ? Lt(this[c], "tbody") : this[c], o, c); if (a) for (u = s[s.length - 1].ownerDocument, b.map(s, qt), c = 0; a > c; c++) o = s[c], kt.test(o.type || "") && !b._data(o, "globalEval") && b.contains(u, o) && (o.src ? b.ajax({ url: o.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : b.globalEval((o.text || o.textContent || o.innerHTML || "").replace(St, ""))); l = i = null } return this } }); function Lt(e, t) { return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t)) } function Ht(e) { var t = e.getAttributeNode("type"); return e.type = (t && t.specified) + "/" + e.type, e } function qt(e) { var t = Et.exec(e.type); return t ? e.type = t[1] : e.removeAttribute("type"), e } function Mt(e, t) { var n, r = 0; for (; null != (n = e[r]); r++) b._data(n, "globalEval", !t || b._data(t[r], "globalEval")) } function _t(e, t) { if (1 === t.nodeType && b.hasData(e)) { var n, r, i, o = b._data(e), a = b._data(t, o), s = o.events; if (s) { delete a.handle, a.events = {}; for (n in s) for (r = 0, i = s[n].length; i > r; r++) b.event.add(t, n, s[n][r]) } a.data && (a.data = b.extend({}, a.data)) } } function Ft(e, t) { var n, r, i; if (1 === t.nodeType) { if (n = t.nodeName.toLowerCase(), !b.support.noCloneEvent && t[b.expando]) { i = b._data(t); for (r in i.events) b.removeEvent(t, r, i.handle); t.removeAttribute(b.expando) } "script" === n && t.text !== e.text ? (Ht(t).text = e.text, qt(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), b.support.html5Clone && e.innerHTML && !b.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Nt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue) } } b.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) { b.fn[e] = function (e) { var n, r = 0, i = [], o = b(e), a = o.length - 1; for (; a >= r; r++) n = r === a ? this : this.clone(!0), b(o[r])[t](n), d.apply(i, n.get()); return this.pushStack(i) } }); function Ot(e, n) { var r, o, a = 0, s = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t; if (!s) for (s = [], r = e.childNodes || e; null != (o = r[a]); a++) !n || b.nodeName(o, n) ? s.push(o) : b.merge(s, Ot(o, n)); return n === t || n && b.nodeName(e, n) ? b.merge([e], s) : s } function Bt(e) { Nt.test(e.type) && (e.defaultChecked = e.checked) } b.extend({ clone: function (e, t, n) { var r, i, o, a, s, u = b.contains(e.ownerDocument, e); if (b.support.html5Clone || b.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Dt.innerHTML = e.outerHTML, Dt.removeChild(o = Dt.firstChild)), !(b.support.noCloneEvent && b.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || b.isXMLDoc(e))) for (r = Ot(o), s = Ot(e), a = 0; null != (i = s[a]); ++a) r[a] && Ft(i, r[a]); if (t) if (n) for (s = s || Ot(e), r = r || Ot(o), a = 0; null != (i = s[a]); a++) _t(i, r[a]); else _t(e, o); return r = Ot(o, "script"), r.length > 0 && Mt(r, !u && Ot(e, "script")), r = s = i = null, o }, buildFragment: function (e, t, n, r) {
        var i, o, a, s, u, l, c, p = e.length, f = dt(t), d = [], h = 0; for (; p > h; h++) if (o = e[h], o || 0 === o) if ("object" === b.type(o)) b.merge(d, o.nodeType ? [o] : o); else if (wt.test(o)) {
            s = s || f.appendChild(t.createElement("div")), u = (bt.exec(o) || ["", ""])[1].toLowerCase(), c = At[u] || At._default, s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2], i = c[0]; while (i--) s = s.lastChild; if (!b.support.leadingWhitespace && yt.test(o) && d.push(t.createTextNode(yt.exec(o)[0])), !b.support.tbody) {
                o = "table" !== u || xt.test(o) ? "<table>" !== c[1] || xt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; while (i--) b.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l)
            } b.merge(d, s.childNodes), s.textContent = ""; while (s.firstChild) s.removeChild(s.firstChild); s = f.lastChild
        } else d.push(t.createTextNode(o)); s && f.removeChild(s), b.support.appendChecked || b.grep(Ot(d, "input"), Bt), h = 0; while (o = d[h++]) if ((!r || -1 === b.inArray(o, r)) && (a = b.contains(o.ownerDocument, o), s = Ot(f.appendChild(o), "script"), a && Mt(s), n)) { i = 0; while (o = s[i++]) kt.test(o.type || "") && n.push(o) } return s = null, f
    }, cleanData: function (e, t) { var n, r, o, a, s = 0, u = b.expando, l = b.cache, p = b.support.deleteExpando, f = b.event.special; for (; null != (n = e[s]); s++) if ((t || b.acceptData(n)) && (o = n[u], a = o && l[o])) { if (a.events) for (r in a.events) f[r] ? b.event.remove(n, r) : b.removeEvent(n, r, a.handle); l[o] && (delete l[o], p ? delete n[u] : typeof n.removeAttribute !== i ? n.removeAttribute(u) : n[u] = null, c.push(o)) } } 
    }); var Pt, Rt, Wt, $t = /alpha\([^)]*\)/i, It = /opacity\s*=\s*([^)]*)/, zt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Ut = /^margin/, Vt = RegExp("^(" + x + ")(.*)$", "i"), Yt = RegExp("^(" + x + ")(?!px)[a-z%]+$", "i"), Jt = RegExp("^([+-])=(" + x + ")", "i"), Gt = { BODY: "block" }, Qt = { position: "absolute", visibility: "hidden", display: "block" }, Kt = { letterSpacing: 0, fontWeight: 400 }, Zt = ["Top", "Right", "Bottom", "Left"], en = ["Webkit", "O", "Moz", "ms"]; function tn(e, t) { if (t in e) return t; var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length; while (i--) if (t = en[i] + n, t in e) return t; return r } function nn(e, t) { return e = t || e, "none" === b.css(e, "display") || !b.contains(e.ownerDocument, e) } function rn(e, t) { var n, r, i, o = [], a = 0, s = e.length; for (; s > a; a++) r = e[a], r.style && (o[a] = b._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && nn(r) && (o[a] = b._data(r, "olddisplay", un(r.nodeName)))) : o[a] || (i = nn(r), (n && "none" !== n || !i) && b._data(r, "olddisplay", i ? n : b.css(r, "display")))); for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none")); return e } b.fn.extend({ css: function (e, n) { return b.access(this, function (e, n, r) { var i, o, a = {}, s = 0; if (b.isArray(n)) { for (o = Rt(e), i = n.length; i > s; s++) a[n[s]] = b.css(e, n[s], !1, o); return a } return r !== t ? b.style(e, n, r) : b.css(e, n) }, e, n, arguments.length > 1) }, show: function () { return rn(this, !0) }, hide: function () { return rn(this) }, toggle: function (e) { var t = "boolean" == typeof e; return this.each(function () { (t ? e : nn(this)) ? b(this).show() : b(this).hide() }) } }), b.extend({ cssHooks: { opacity: { get: function (e, t) { if (t) { var n = Wt(e, "opacity"); return "" === n ? "1" : n } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": b.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (e, n, r, i) { if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) { var o, a, s, u = b.camelCase(n), l = e.style; if (n = b.cssProps[u] || (b.cssProps[u] = tn(l, u)), s = b.cssHooks[n] || b.cssHooks[u], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n]; if (a = typeof r, "string" === a && (o = Jt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(b.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || b.cssNumber[u] || (r += "px"), b.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try { l[n] = r } catch (c) { } } }, css: function (e, n, r, i) { var o, a, s, u = b.camelCase(n); return n = b.cssProps[u] || (b.cssProps[u] = tn(e.style, u)), s = b.cssHooks[n] || b.cssHooks[u], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = Wt(e, n, i)), "normal" === a && n in Kt && (a = Kt[n]), "" === r || r ? (o = parseFloat(a), r === !0 || b.isNumeric(o) ? o || 0 : a) : a }, swap: function (e, t, n, r) { var i, o, a = {}; for (o in t) a[o] = e.style[o], e.style[o] = t[o]; i = n.apply(e, r || []); for (o in t) e.style[o] = a[o]; return i } }), e.getComputedStyle ? (Rt = function (t) { return e.getComputedStyle(t, null) }, Wt = function (e, n, r) { var i, o, a, s = r || Rt(e), u = s ? s.getPropertyValue(n) || s[n] : t, l = e.style; return s && ("" !== u || b.contains(e.ownerDocument, e) || (u = b.style(e, n)), Yt.test(u) && Ut.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u }) : o.documentElement.currentStyle && (Rt = function (e) { return e.currentStyle }, Wt = function (e, n, r) { var i, o, a, s = r || Rt(e), u = s ? s[n] : t, l = e.style; return null == u && l && l[n] && (u = l[n]), Yt.test(u) && !zt.test(n) && (i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u }); function on(e, t, n) { var r = Vt.exec(t); return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t } function an(e, t, n, r, i) { var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; for (; 4 > o; o += 2) "margin" === n && (a += b.css(e, n + Zt[o], !0, i)), r ? ("content" === n && (a -= b.css(e, "padding" + Zt[o], !0, i)), "margin" !== n && (a -= b.css(e, "border" + Zt[o] + "Width", !0, i))) : (a += b.css(e, "padding" + Zt[o], !0, i), "padding" !== n && (a += b.css(e, "border" + Zt[o] + "Width", !0, i))); return a } function sn(e, t, n) { var r = !0, i = "width" === t ? e.offsetWidth : e.offsetHeight, o = Rt(e), a = b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, o); if (0 >= i || null == i) { if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Yt.test(i)) return i; r = a && (b.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0 } return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px" } function un(e) { var t = o, n = Gt[e]; return n || (n = ln(e, t), "none" !== n && n || (Pt = (Pt || b("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (Pt[0].contentWindow || Pt[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = ln(e, t), Pt.detach()), Gt[e] = n), n } function ln(e, t) { var n = b(t.createElement(e)).appendTo(t.body), r = b.css(n[0], "display"); return n.remove(), r } b.each(["height", "width"], function (e, n) { b.cssHooks[n] = { get: function (e, r, i) { return r ? 0 === e.offsetWidth && Xt.test(b.css(e, "display")) ? b.swap(e, Qt, function () { return sn(e, n, i) }) : sn(e, n, i) : t }, set: function (e, t, r) { var i = r && Rt(e); return on(e, t, r ? an(e, n, r, b.support.boxSizing && "border-box" === b.css(e, "boxSizing", !1, i), i) : 0) } } }), b.support.opacity || (b.cssHooks.opacity = { get: function (e, t) { return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "" }, set: function (e, t) { var n = e.style, r = e.currentStyle, i = b.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "", o = r && r.filter || n.filter || ""; n.zoom = 1, (t >= 1 || "" === t) && "" === b.trim(o.replace($t, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i) } }), b(function () { b.support.reliableMarginRight || (b.cssHooks.marginRight = { get: function (e, n) { return n ? b.swap(e, { display: "inline-block" }, Wt, [e, "marginRight"]) : t } }), !b.support.pixelPosition && b.fn.position && b.each(["top", "left"], function (e, n) { b.cssHooks[n] = { get: function (e, r) { return r ? (r = Wt(e, n), Yt.test(r) ? b(e).position()[n] + "px" : r) : t } } }) }), b.expr && b.expr.filters && (b.expr.filters.hidden = function (e) { return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !b.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || b.css(e, "display")) }, b.expr.filters.visible = function (e) { return !b.expr.filters.hidden(e) }), b.each({ margin: "", padding: "", border: "Width" }, function (e, t) { b.cssHooks[e + t] = { expand: function (n) { var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; for (; 4 > r; r++) i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0]; return i } }, Ut.test(e) || (b.cssHooks[e + t].set = on) }); var cn = /%20/g, pn = /\[\]$/, fn = /\r?\n/g, dn = /^(?:submit|button|image|reset|file)$/i, hn = /^(?:input|select|textarea|keygen)/i; b.fn.extend({ serialize: function () { return b.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { var e = b.prop(this, "elements"); return e ? b.makeArray(e) : this }).filter(function () { var e = this.type; return this.name && !b(this).is(":disabled") && hn.test(this.nodeName) && !dn.test(e) && (this.checked || !Nt.test(e)) }).map(function (e, t) { var n = b(this).val(); return null == n ? null : b.isArray(n) ? b.map(n, function (e) { return { name: t.name, value: e.replace(fn, "\r\n")} }) : { name: t.name, value: n.replace(fn, "\r\n")} }).get() } }), b.param = function (e, n) { var r, i = [], o = function (e, t) { t = b.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t) }; if (n === t && (n = b.ajaxSettings && b.ajaxSettings.traditional), b.isArray(e) || e.jquery && !b.isPlainObject(e)) b.each(e, function () { o(this.name, this.value) }); else for (r in e) gn(r, e[r], n, o); return i.join("&").replace(cn, "+") }; function gn(e, t, n, r) { var i; if (b.isArray(t)) b.each(t, function (t, i) { n || pn.test(e) ? r(e, i) : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r) }); else if (n || "object" !== b.type(t)) r(e, t); else for (i in t) gn(e + "[" + i + "]", t[i], n, r) } b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) { b.fn[t] = function (e, n) { return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t) } }), b.fn.hover = function (e, t) { return this.mouseenter(e).mouseleave(t || e) }; var mn, yn, vn = b.now(), bn = /\?/, xn = /#.*$/, wn = /([?&])_=[^&]*/, Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Nn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Cn = /^(?:GET|HEAD)$/, kn = /^\/\//, En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Sn = b.fn.load, An = {}, jn = {}, Dn = "*/".concat("*"); try { yn = a.href } catch (Ln) { yn = o.createElement("a"), yn.href = "", yn = yn.href } mn = En.exec(yn.toLowerCase()) || []; function Hn(e) { return function (t, n) { "string" != typeof t && (n = t, t = "*"); var r, i = 0, o = t.toLowerCase().match(w) || []; if (b.isFunction(n)) while (r = o[i++]) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n) } } function qn(e, n, r, i) { var o = {}, a = e === jn; function s(u) { var l; return o[u] = !0, b.each(e[u] || [], function (e, u) { var c = u(n, r, i); return "string" != typeof c || a || o[c] ? a ? !(l = c) : t : (n.dataTypes.unshift(c), s(c), !1) }), l } return s(n.dataTypes[0]) || !o["*"] && s("*") } function Mn(e, n) { var r, i, o = b.ajaxSettings.flatOptions || {}; for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]); return r && b.extend(!0, e, r), e } b.fn.load = function (e, n, r) { if ("string" != typeof e && Sn) return Sn.apply(this, arguments); var i, o, a, s = this, u = e.indexOf(" "); return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), b.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && b.ajax({ url: e, type: a, dataType: "html", data: n }).done(function (e) { o = arguments, s.html(i ? b("<div>").append(b.parseHTML(e)).find(i) : e) }).complete(r && function (e, t) { s.each(r, o || [e.responseText, t, e]) }), this }, b.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) { b.fn[t] = function (e) { return this.on(t, e) } }), b.each(["get", "post"], function (e, n) { b[n] = function (e, r, i, o) { return b.isFunction(r) && (o = o || i, i = r, r = t), b.ajax({ url: e, type: n, dataType: o, data: r, success: i }) } }), b.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: yn, type: "GET", isLocal: Nn.test(mn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Dn, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": e.String, "text html": !0, "text json": b.parseJSON, "text xml": b.parseXML }, flatOptions: { url: !0, context: !0} }, ajaxSetup: function (e, t) { return t ? Mn(Mn(e, b.ajaxSettings), t) : Mn(b.ajaxSettings, e) }, ajaxPrefilter: Hn(An), ajaxTransport: Hn(jn), ajax: function (e, n) { "object" == typeof e && (n = e, e = t), n = n || {}; var r, i, o, a, s, u, l, c, p = b.ajaxSetup({}, n), f = p.context || p, d = p.context && (f.nodeType || f.jquery) ? b(f) : b.event, h = b.Deferred(), g = b.Callbacks("once memory"), m = p.statusCode || {}, y = {}, v = {}, x = 0, T = "canceled", N = { readyState: 0, getResponseHeader: function (e) { var t; if (2 === x) { if (!c) { c = {}; while (t = Tn.exec(a)) c[t[1].toLowerCase()] = t[2] } t = c[e.toLowerCase()] } return null == t ? null : t }, getAllResponseHeaders: function () { return 2 === x ? a : null }, setRequestHeader: function (e, t) { var n = e.toLowerCase(); return x || (e = v[n] = v[n] || e, y[e] = t), this }, overrideMimeType: function (e) { return x || (p.mimeType = e), this }, statusCode: function (e) { var t; if (e) if (2 > x) for (t in e) m[t] = [m[t], e[t]]; else N.always(e[N.status]); return this }, abort: function (e) { var t = e || T; return l && l.abort(t), k(0, t), this } }; if (h.promise(N).complete = g.add, N.success = N.done, N.error = N.fail, p.url = ((e || p.url || yn) + "").replace(xn, "").replace(kn, mn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = b.trim(p.dataType || "*").toLowerCase().match(w) || [""], null == p.crossDomain && (r = En.exec(p.url.toLowerCase()), p.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (mn[3] || ("http:" === mn[1] ? 80 : 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = b.param(p.data, p.traditional)), qn(An, p, n, N), 2 === x) return N; u = p.global, u && 0 === b.active++ && b.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Cn.test(p.type), o = p.url, p.hasContent || (p.data && (o = p.url += (bn.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = wn.test(o) ? o.replace(wn, "$1_=" + vn++) : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)), p.ifModified && (b.lastModified[o] && N.setRequestHeader("If-Modified-Since", b.lastModified[o]), b.etag[o] && N.setRequestHeader("If-None-Match", b.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && N.setRequestHeader("Content-Type", p.contentType), N.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : p.accepts["*"]); for (i in p.headers) N.setRequestHeader(i, p.headers[i]); if (p.beforeSend && (p.beforeSend.call(f, N, p) === !1 || 2 === x)) return N.abort(); T = "abort"; for (i in { success: 1, error: 1, complete: 1 }) N[i](p[i]); if (l = qn(jn, p, n, N)) { N.readyState = 1, u && d.trigger("ajaxSend", [N, p]), p.async && p.timeout > 0 && (s = setTimeout(function () { N.abort("timeout") }, p.timeout)); try { x = 1, l.send(y, k) } catch (C) { if (!(2 > x)) throw C; k(-1, C) } } else k(-1, "No Transport"); function k(e, n, r, i) { var c, y, v, w, T, C = n; 2 !== x && (x = 2, s && clearTimeout(s), l = t, a = i || "", N.readyState = e > 0 ? 4 : 0, r && (w = _n(p, N, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (T = N.getResponseHeader("Last-Modified"), T && (b.lastModified[o] = T), T = N.getResponseHeader("etag"), T && (b.etag[o] = T)), 204 === e ? (c = !0, C = "nocontent") : 304 === e ? (c = !0, C = "notmodified") : (c = Fn(p, w), C = c.state, y = c.data, v = c.error, c = !v)) : (v = C, (e || !C) && (C = "error", 0 > e && (e = 0))), N.status = e, N.statusText = (n || C) + "", c ? h.resolveWith(f, [y, C, N]) : h.rejectWith(f, [N, C, v]), N.statusCode(m), m = t, u && d.trigger(c ? "ajaxSuccess" : "ajaxError", [N, p, c ? y : v]), g.fireWith(f, [N, C]), u && (d.trigger("ajaxComplete", [N, p]), --b.active || b.event.trigger("ajaxStop"))) } return N }, getScript: function (e, n) { return b.get(e, t, n, "script") }, getJSON: function (e, t, n) { return b.get(e, t, n, "json") } }); function _n(e, n, r) { var i, o, a, s, u = e.contents, l = e.dataTypes, c = e.responseFields; for (s in c) s in r && (n[c[s]] = r[s]); while ("*" === l[0]) l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type")); if (o) for (s in u) if (u[s] && u[s].test(o)) { l.unshift(s); break } if (l[0] in r) a = l[0]; else { for (s in r) { if (!l[0] || e.converters[s + " " + l[0]]) { a = s; break } i || (i = s) } a = a || i } return a ? (a !== l[0] && l.unshift(a), r[a]) : t } function Fn(e, t) { var n, r, i, o, a = {}, s = 0, u = e.dataTypes.slice(), l = u[0]; if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), u[1]) for (i in e.converters) a[i.toLowerCase()] = e.converters[i]; for (; r = u[++s]; ) if ("*" !== r) { if ("*" !== l && l !== r) { if (i = a[l + " " + r] || a["* " + r], !i) for (n in a) if (o = n.split(" "), o[1] === r && (i = a[l + " " + o[0]] || a["* " + o[0]])) { i === !0 ? i = a[n] : a[n] !== !0 && (r = o[0], u.splice(s--, 0, r)); break } if (i !== !0) if (i && e["throws"]) t = i(t); else try { t = i(t) } catch (c) { return { state: "parsererror", error: i ? c : "No conversion from " + l + " to " + r} } } l = r } return { state: "success", data: t} } b.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /(?:java|ecma)script/ }, converters: { "text script": function (e) { return b.globalEval(e), e } } }), b.ajaxPrefilter("script", function (e) { e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1) }), b.ajaxTransport("script", function (e) { if (e.crossDomain) { var n, r = o.head || b("head")[0] || o.documentElement; return { send: function (t, i) { n = o.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) { (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success")) }, r.insertBefore(n, r.firstChild) }, abort: function () { n && n.onload(t, !0) } } } }); var On = [], Bn = /(=)\?(?=&|$)|\?\?/; b.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var e = On.pop() || b.expando + "_" + vn++; return this[e] = !0, e } }), b.ajaxPrefilter("json jsonp", function (n, r, i) { var o, a, s, u = n.jsonp !== !1 && (Bn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Bn.test(n.data) && "data"); return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = b.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Bn, "$1" + o) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () { return s || b.error(o + " was not called"), s[0] }, n.dataTypes[0] = "json", a = e[o], e[o] = function () { s = arguments }, i.always(function () { e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, On.push(o)), s && b.isFunction(a) && a(s[0]), s = a = t }), "script") : t }); var Pn, Rn, Wn = 0, $n = e.ActiveXObject && function () { var e; for (e in Pn) Pn[e](t, !0) }; function In() { try { return new e.XMLHttpRequest } catch (t) { } } function zn() { try { return new e.ActiveXObject("Microsoft.XMLHTTP") } catch (t) { } } b.ajaxSettings.xhr = e.ActiveXObject ? function () { return !this.isLocal && In() || zn() } : In, Rn = b.ajaxSettings.xhr(), b.support.cors = !!Rn && "withCredentials" in Rn, Rn = b.support.ajax = !!Rn, Rn && b.ajaxTransport(function (n) { if (!n.crossDomain || b.support.cors) { var r; return { send: function (i, o) { var a, s, u = n.xhr(); if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) u[s] = n.xhrFields[s]; n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"); try { for (s in i) u.setRequestHeader(s, i[s]) } catch (l) { } u.send(n.hasContent && n.data || null), r = function (e, i) { var s, l, c, p; try { if (r && (i || 4 === u.readyState)) if (r = t, a && (u.onreadystatechange = b.noop, $n && delete Pn[a]), i) 4 !== u.readyState && u.abort(); else { p = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (p.text = u.responseText); try { c = u.statusText } catch (f) { c = "" } s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = p.text ? 200 : 404 } } catch (d) { i || o(-1, d) } p && o(s, c, p, l) }, n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Wn, $n && (Pn || (Pn = {}, b(e).unload($n)), Pn[a] = r), u.onreadystatechange = r) : r() }, abort: function () { r && r(t, !0) } } } }); var Xn, Un, Vn = /^(?:toggle|show|hide)$/, Yn = RegExp("^(?:([+-])=|)(" + x + ")([a-z%]*)$", "i"), Jn = /queueHooks$/, Gn = [nr], Qn = { "*": [function (e, t) { var n, r, i = this.createTween(e, t), o = Yn.exec(t), a = i.cur(), s = +a || 0, u = 1, l = 20; if (o) { if (n = +o[2], r = o[3] || (b.cssNumber[e] ? "" : "px"), "px" !== r && s) { s = b.css(i.elem, e, !0) || n || 1; do u = u || ".5", s /= u, b.style(i.elem, e, s + r); while (u !== (u = i.cur() / a) && 1 !== u && --l) } i.unit = r, i.start = s, i.end = o[1] ? s + (o[1] + 1) * n : n } return i } ] }; function Kn() { return setTimeout(function () { Xn = t }), Xn = b.now() } function Zn(e, t) { b.each(t, function (t, n) { var r = (Qn[t] || []).concat(Qn["*"]), i = 0, o = r.length; for (; o > i; i++) if (r[i].call(e, t, n)) return }) } function er(e, t, n) { var r, i, o = 0, a = Gn.length, s = b.Deferred().always(function () { delete u.elem }), u = function () { if (i) return !1; var t = Xn || Kn(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; for (; u > a; a++) l.tweens[a].run(o); return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1) }, l = s.promise({ elem: e, props: b.extend({}, t), opts: b.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: Xn || Kn(), duration: n.duration, tweens: [], createTween: function (t, n) { var r = b.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing); return l.tweens.push(r), r }, stop: function (t) { var n = 0, r = t ? l.tweens.length : 0; if (i) return this; for (i = !0; r > n; n++) l.tweens[n].run(1); return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this } }), c = l.props; for (tr(c, l.opts.specialEasing); a > o; o++) if (r = Gn[o].call(l, e, c, l.opts)) return r; return Zn(l, c), b.isFunction(l.opts.start) && l.opts.start.call(e, l), b.fx.timer(b.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always) } function tr(e, t) { var n, r, i, o, a; for (i in e) if (r = b.camelCase(i), o = t[r], n = e[i], b.isArray(n) && (o = n[1], n = e[i] = n[0]), i !== r && (e[r] = n, delete e[i]), a = b.cssHooks[r], a && "expand" in a) { n = a.expand(n), delete e[r]; for (i in n) i in e || (e[i] = n[i], t[i] = o) } else t[r] = o } b.Animation = b.extend(er, { tweener: function (e, t) { b.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" "); var n, r = 0, i = e.length; for (; i > r; r++) n = e[r], Qn[n] = Qn[n] || [], Qn[n].unshift(t) }, prefilter: function (e, t) { t ? Gn.unshift(e) : Gn.push(e) } }); function nr(e, t, n) { var r, i, o, a, s, u, l, c, p, f = this, d = e.style, h = {}, g = [], m = e.nodeType && nn(e); n.queue || (c = b._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, p = c.empty.fire, c.empty.fire = function () { c.unqueued || p() }), c.unqueued++, f.always(function () { f.always(function () { c.unqueued--, b.queue(e, "fx").length || c.empty.fire() }) })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === b.css(e, "display") && "none" === b.css(e, "float") && (b.support.inlineBlockNeedsLayout && "inline" !== un(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")), n.overflow && (d.overflow = "hidden", b.support.shrinkWrapBlocks || f.always(function () { d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2] })); for (i in t) if (a = t[i], Vn.exec(a)) { if (delete t[i], u = u || "toggle" === a, a === (m ? "hide" : "show")) continue; g.push(i) } if (o = g.length) { s = b._data(e, "fxshow") || b._data(e, "fxshow", {}), "hidden" in s && (m = s.hidden), u && (s.hidden = !m), m ? b(e).show() : f.done(function () { b(e).hide() }), f.done(function () { var t; b._removeData(e, "fxshow"); for (t in h) b.style(e, t, h[t]) }); for (i = 0; o > i; i++) r = g[i], l = f.createTween(r, m ? s[r] : 0), h[r] = s[r] || b.style(e, r), r in s || (s[r] = l.start, m && (l.end = l.start, l.start = "width" === r || "height" === r ? 1 : 0)) } } function rr(e, t, n, r, i) { return new rr.prototype.init(e, t, n, r, i) } b.Tween = rr, rr.prototype = { constructor: rr, init: function (e, t, n, r, i, o) { this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (b.cssNumber[n] ? "" : "px") }, cur: function () { var e = rr.propHooks[this.prop]; return e && e.get ? e.get(this) : rr.propHooks._default.get(this) }, run: function (e) { var t, n = rr.propHooks[this.prop]; return this.pos = t = this.options.duration ? b.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this } }, rr.prototype.init.prototype = rr.prototype, rr.propHooks = { _default: { get: function (e) { var t; return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = b.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop] }, set: function (e) { b.fx.step[e.prop] ? b.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[b.cssProps[e.prop]] || b.cssHooks[e.prop]) ? b.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now } } }, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = { set: function (e) { e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now) } }, b.each(["toggle", "show", "hide"], function (e, t) { var n = b.fn[t]; b.fn[t] = function (e, r, i) { return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i) } }), b.fn.extend({ fadeTo: function (e, t, n, r) { return this.filter(nn).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r) }, animate: function (e, t, n, r) { var i = b.isEmptyObject(e), o = b.speed(t, n, r), a = function () { var t = er(this, b.extend({}, e), o); a.finish = function () { t.stop(!0) }, (i || b._data(this, "finish")) && t.stop(!0) }; return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a) }, stop: function (e, n, r) { var i = function (e) { var t = e.stop; delete e.stop, t(r) }; return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () { var t = !0, n = null != e && e + "queueHooks", o = b.timers, a = b._data(this); if (n) a[n] && a[n].stop && i(a[n]); else for (n in a) a[n] && a[n].stop && Jn.test(n) && i(a[n]); for (n = o.length; n--; ) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1)); (t || !r) && b.dequeue(this, e) }) }, finish: function (e) { return e !== !1 && (e = e || "fx"), this.each(function () { var t, n = b._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = b.timers, a = r ? r.length : 0; for (n.finish = !0, b.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--; ) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1)); for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this); delete n.finish }) } }); function ir(e, t) { var n, r = { height: e }, i = 0; for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Zt[i], r["margin" + n] = r["padding" + n] = e; return t && (r.opacity = r.width = e), r } b.each({ slideDown: ir("show"), slideUp: ir("hide"), slideToggle: ir("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle"} }, function (e, t) { b.fn[e] = function (e, n, r) { return this.animate(t, e, n, r) } }), b.speed = function (e, t, n) { var r = e && "object" == typeof e ? b.extend({}, e) : { complete: n || !n && t || b.isFunction(e) && e, duration: e, easing: n && t || t && !b.isFunction(t) && t }; return r.duration = b.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in b.fx.speeds ? b.fx.speeds[r.duration] : b.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function () { b.isFunction(r.old) && r.old.call(this), r.queue && b.dequeue(this, r.queue) }, r }, b.easing = { linear: function (e) { return e }, swing: function (e) { return .5 - Math.cos(e * Math.PI) / 2 } }, b.timers = [], b.fx = rr.prototype.init, b.fx.tick = function () { var e, n = b.timers, r = 0; for (Xn = b.now(); n.length > r; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1); n.length || b.fx.stop(), Xn = t }, b.fx.timer = function (e) { e() && b.timers.push(e) && b.fx.start() }, b.fx.interval = 13, b.fx.start = function () { Un || (Un = setInterval(b.fx.tick, b.fx.interval)) }, b.fx.stop = function () { clearInterval(Un), Un = null }, b.fx.speeds = { slow: 600, fast: 200, _default: 400 }, b.fx.step = {}, b.expr && b.expr.filters && (b.expr.filters.animated = function (e) { return b.grep(b.timers, function (t) { return e === t.elem }).length }), b.fn.offset = function (e) { if (arguments.length) return e === t ? this : this.each(function (t) { b.offset.setOffset(this, e, t) }); var n, r, o = { top: 0, left: 0 }, a = this[0], s = a && a.ownerDocument; if (s) return n = s.documentElement, b.contains(n, a) ? (typeof a.getBoundingClientRect !== i && (o = a.getBoundingClientRect()), r = or(s), { top: o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: o.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0) }) : o }, b.offset = { setOffset: function (e, t, n) { var r = b.css(e, "position"); "static" === r && (e.style.position = "relative"); var i = b(e), o = i.offset(), a = b.css(e, "top"), s = b.css(e, "left"), u = ("absolute" === r || "fixed" === r) && b.inArray("auto", [a, s]) > -1, l = {}, c = {}, p, f; u ? (c = i.position(), p = c.top, f = c.left) : (p = parseFloat(a) || 0, f = parseFloat(s) || 0), b.isFunction(t) && (t = t.call(e, n, o)), null != t.top && (l.top = t.top - o.top + p), null != t.left && (l.left = t.left - o.left + f), "using" in t ? t.using.call(e, l) : i.css(l) } }, b.fn.extend({ position: function () { if (this[0]) { var e, t, n = { top: 0, left: 0 }, r = this[0]; return "fixed" === b.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), b.nodeName(e[0], "html") || (n = e.offset()), n.top += b.css(e[0], "borderTopWidth", !0), n.left += b.css(e[0], "borderLeftWidth", !0)), { top: t.top - n.top - b.css(r, "marginTop", !0), left: t.left - n.left - b.css(r, "marginLeft", !0)} } }, offsetParent: function () { return this.map(function () { var e = this.offsetParent || o.documentElement; while (e && !b.nodeName(e, "html") && "static" === b.css(e, "position")) e = e.offsetParent; return e || o.documentElement }) } }), b.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) { var r = /Y/.test(n); b.fn[e] = function (i) { return b.access(this, function (e, i, o) { var a = or(e); return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? b(a).scrollLeft() : o, r ? o : b(a).scrollTop()) : e[i] = o, t) }, e, i, arguments.length, null) } }); function or(e) { return b.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1 } b.each({ Height: "height", Width: "width" }, function (e, n) { b.each({ padding: "inner" + e, content: n, "": "outer" + e }, function (r, i) { b.fn[i] = function (i, o) { var a = arguments.length && (r || "boolean" != typeof i), s = r || (i === !0 || o === !0 ? "margin" : "border"); return b.access(this, function (n, r, i) { var o; return b.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? b.css(n, r, s) : b.style(n, r, i, s) }, n, a ? i : t, a, null) } }) }), e.jQuery = e.$ = b, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () { return b })
})(window);
/*! Jssor */

var $JssorDebug$=new function(){this.$DebugMode=true;this.$Log=function(c,d){var a=window.console||{},b=this.$DebugMode;if(b&&a.log)a.log(c);else b&&d&&alert(c)};this.$Error=function(b,d){var c=window.console||{},a=this.$DebugMode;if(a&&c.error)c.error(b);else a&&alert(b);if(a)throw d||new Error(b);};this.$Fail=function(a){throw new Error(a);};this.$Assert=function(b,c){var a=this.$DebugMode;if(a)if(!b)throw new Error("Assert failed "+c||"");};this.$Trace=function(c){var a=window.console||{},b=this.$DebugMode;b&&a.log&&a.log(c)};this.$Execute=function(b){var a=this.$DebugMode;a&&b()};this.$LiveStamp=function(c,d){var b=this.$DebugMode;if(b){var a=document.createElement("DIV");a.setAttribute("id",d);c.$Live=a}};this.$C_AbstractProperty=function(){throw new Error("The property is abstract, it should be implemented by subclass.");};this.$C_AbstractMethod=function(){throw new Error("The method is abstract, it should be implemented by subclass.");};function a(b){if(b.constructor===a.caller)throw new Error("Cannot create instance of an abstract class.");}this.$C_AbstractClass=a},$JssorEasing$=window.$JssorEasing$={$EaseSwing:function(a){return-Math.cos(a*Math.PI)/2+.5},$EaseLinear:function(a){return a},$EaseInQuad:function(a){return a*a},$EaseOutQuad:function(a){return-a*(a-2)},$EaseInOutQuad:function(a){return(a*=2)<1?1/2*a*a:-1/2*(--a*(a-2)-1)},$EaseInCubic:function(a){return a*a*a},$EaseOutCubic:function(a){return(a-=1)*a*a+1},$EaseInOutCubic:function(a){return(a*=2)<1?1/2*a*a*a:1/2*((a-=2)*a*a+2)},$EaseInQuart:function(a){return a*a*a*a},$EaseOutQuart:function(a){return-((a-=1)*a*a*a-1)},$EaseInOutQuart:function(a){return(a*=2)<1?1/2*a*a*a*a:-1/2*((a-=2)*a*a*a-2)},$EaseInQuint:function(a){return a*a*a*a*a},$EaseOutQuint:function(a){return(a-=1)*a*a*a*a+1},$EaseInOutQuint:function(a){return(a*=2)<1?1/2*a*a*a*a*a:1/2*((a-=2)*a*a*a*a+2)},$EaseInSine:function(a){return 1-Math.cos(a*Math.PI/2)},$EaseOutSine:function(a){return Math.sin(a*Math.PI/2)},$EaseInOutSine:function(a){return-1/2*(Math.cos(Math.PI*a)-1)},$EaseInExpo:function(a){return a==0?0:Math.pow(2,10*(a-1))},$EaseOutExpo:function(a){return a==1?1:-Math.pow(2,-10*a)+1},$EaseInOutExpo:function(a){return a==0||a==1?a:(a*=2)<1?1/2*Math.pow(2,10*(a-1)):1/2*(-Math.pow(2,-10*--a)+2)},$EaseInCirc:function(a){return-(Math.sqrt(1-a*a)-1)},$EaseOutCirc:function(a){return Math.sqrt(1-(a-=1)*a)},$EaseInOutCirc:function(a){return(a*=2)<1?-1/2*(Math.sqrt(1-a*a)-1):1/2*(Math.sqrt(1-(a-=2)*a)+1)},$EaseInElastic:function(a){if(!a||a==1)return a;var b=.3,c=.075;return-(Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/b))},$EaseOutElastic:function(a){if(!a||a==1)return a;var b=.3,c=.075;return Math.pow(2,-10*a)*Math.sin((a-c)*2*Math.PI/b)+1},$EaseInOutElastic:function(a){if(!a||a==1)return a;var b=.45,c=.1125;return(a*=2)<1?-.5*Math.pow(2,10*(a-=1))*Math.sin((a-c)*2*Math.PI/b):Math.pow(2,-10*(a-=1))*Math.sin((a-c)*2*Math.PI/b)*.5+1},$EaseInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},$EaseOutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},$EaseInOutBack:function(a){var b=1.70158;return(a*=2)<1?1/2*a*a*(((b*=1.525)+1)*a-b):1/2*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},$EaseInBounce:function(a){return 1-$JssorEasing$.$EaseOutBounce(1-a)},$EaseOutBounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},$EaseInOutBounce:function(a){return a<1/2?$JssorEasing$.$EaseInBounce(a*2)*.5:$JssorEasing$.$EaseOutBounce(a*2-1)*.5+.5},$EaseGoBack:function(a){return 1-Math.abs(2-1)},$EaseInWave:function(a){return 1-Math.cos(a*Math.PI*2)},$EaseOutWave:function(a){return Math.sin(a*Math.PI*2)},$EaseOutJump:function(a){return 1-((a*=2)<1?(a=1-a)*a*a:(a-=1)*a*a)},$EaseInJump:function(a){return(a*=2)<1?a*a*a:(a=2-a)*a*a}},$Jease$=window.$Jease$={$Swing:$JssorEasing$.$EaseSwing,$Linear:$JssorEasing$.$EaseLinear,$InQuad:$JssorEasing$.$EaseInQuad,$OutQuad:$JssorEasing$.$EaseOutQuad,$InOutQuad:$JssorEasing$.$EaseInOutQuad,$InCubic:$JssorEasing$.$EaseInCubic,$OutCubic:$JssorEasing$.$EaseOutCubic,$InOutCubic:$JssorEasing$.$EaseInOutCubic,$InQuart:$JssorEasing$.$EaseInQuart,$OutQuart:$JssorEasing$.$EaseOutQuart,$InOutQuart:$JssorEasing$.$EaseInOutQuart,$InQuint:$JssorEasing$.$EaseInQuint,$OutQuint:$JssorEasing$.$EaseOutQuint,$InOutQuint:$JssorEasing$.$EaseInOutQuint,$InSine:$JssorEasing$.$EaseInSine,$OutSine:$JssorEasing$.$EaseOutSine,$InOutSine:$JssorEasing$.$EaseInOutSine,$InExpo:$JssorEasing$.$EaseInExpo,$OutExpo:$JssorEasing$.$EaseOutExpo,$InOutExpo:$JssorEasing$.$EaseInOutExpo,$InCirc:$JssorEasing$.$EaseInCirc,$OutCirc:$JssorEasing$.$EaseOutCirc,$InOutCirc:$JssorEasing$.$EaseInOutCirc,$InElastic:$JssorEasing$.$EaseInElastic,$OutElastic:$JssorEasing$.$EaseOutElastic,$InOutElastic:$JssorEasing$.$EaseInOutElastic,$InBack:$JssorEasing$.$EaseInBack,$OutBack:$JssorEasing$.$EaseOutBack,$InOutBack:$JssorEasing$.$EaseInOutBack,$InBounce:$JssorEasing$.$EaseInBounce,$OutBounce:$JssorEasing$.$EaseOutBounce,$InOutBounce:$JssorEasing$.$EaseInOutBounce,$GoBack:$JssorEasing$.$EaseGoBack,$InWave:$JssorEasing$.$EaseInWave,$OutWave:$JssorEasing$.$EaseOutWave,$OutJump:$JssorEasing$.$EaseOutJump,$InJump:$JssorEasing$.$EaseInJump},$JssorDirection$=window.$JssorDirection$={$TO_LEFT:1,$TO_RIGHT:2,$TO_TOP:4,$TO_BOTTOM:8,$HORIZONTAL:3,$VERTICAL:12,$GetDirectionHorizontal:function(a){return a&3},$GetDirectionVertical:function(a){return a&12},$IsHorizontal:function(a){return a&3},$IsVertical:function(a){return a&12}},$JssorKeyCode$={$BACKSPACE:8,$COMMA:188,$DELETE:46,$DOWN:40,$END:35,$ENTER:13,$ESCAPE:27,$HOME:36,$LEFT:37,$NUMPAD_ADD:107,$NUMPAD_DECIMAL:110,$NUMPAD_DIVIDE:111,$NUMPAD_ENTER:108,$NUMPAD_MULTIPLY:106,$NUMPAD_SUBTRACT:109,$PAGE_DOWN:34,$PAGE_UP:33,$PERIOD:190,$RIGHT:39,$SPACE:32,$TAB:9,$UP:38},$JssorServices$={},$Jssor$=window.$Jssor$=new function(){var a=this,qb=/\S+/g,J=1,W=2,ab=3,Z=4,eb=5,z,j=0,c=0,h=0,A=0,t=0,p=navigator,jb=p.appName,e=p.userAgent,m=document.documentElement;function zb(){if(!z){z={$Touchable:"ontouchstart"in window||"createTouch"in document};var a;if(p.pointerEnabled||(a=p.msPointerEnabled))z.$TouchActionAttr=a?"msTouchAction":"touchAction"}return z}function k(l){if(!j){j=-1;if(jb=="Microsoft Internet Explorer"&&!!window.attachEvent&&!!window.ActiveXObject){var i=e.indexOf("MSIE");j=J;h=f(e.substring(i+5,e.indexOf(";",i)));/*@cc_on A=@_jscript_version@*/;c=document.documentMode||h}else if(jb=="Netscape"&&!!window.addEventListener){var g=e.indexOf("Firefox"),b=e.indexOf("Safari"),k=e.indexOf("Chrome"),d=e.indexOf("AppleWebKit");if(g>=0){j=W;c=f(e.substring(g+8))}else if(b>=0){var m=e.substring(0,b).lastIndexOf("/");j=k>=0?Z:ab;c=f(e.substring(m+1,b))}else{var a=/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(e);if(a){j=J;c=h=f(a[1])}}if(d>=0)t=f(e.substring(d+12))}else{var a=/(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(e);if(a){j=eb;c=f(a[2])}}}return l==j}function g(){return k(J)}function E(){return g()&&(c<6||document.compatMode=="BackCompat")}function rb(){return k(W)}function Y(){return k(ab)}function ub(){return k(Z)}function db(){return k(eb)}function R(){return Y()&&t>534&&t<535}function C(){return g()&&c<9}function T(a){var b;return function(e){if(!b){b=a;var c=a.substr(0,1).toUpperCase()+a.substr(1);d([a].concat(["WebKit","ms","Moz","O","webkit"]),function(g,f){var d=a;if(f)d=g+c;if(e.style[d]!=undefined)return b=d})}return b}}var S=T("transform");function ib(a){return{}.toString.call(a)}var y;function wb(){if(!y){y={};d(["Boolean","Number","String","Function","Array","Date","RegExp","Object"],function(a){y["[object "+a+"]"]=a.toLowerCase()})}return y}function d(a,c){if(ib(a)=="[object Array]"){for(var b=0;b<a.length;b++)if(c(a[b],b,a))return true}else for(var d in a)if(c(a[d],d,a))return true}function r(a){return a==null?String(a):wb()[ib(a)]||"object"}function gb(a){for(var b in a)return true}function o(a){try{return r(a)=="object"&&!a.nodeType&&a!=a.window&&(!a.constructor||{}.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))}catch(b){}}function n(a,b){return{x:a,y:b}}function mb(b,a){setTimeout(b,a||0)}function w(b,e,c){var a=!b||b=="inherit"?"":b;d(e,function(c){var b=c.exec(a);if(b){var d=a.substr(0,b.index),e=a.substr(b.lastIndex+1,a.length-(b.lastIndex+1));a=d+e}});a=c+(a.indexOf(" ")!=0?" ":"")+a;return a}function V(b,a){if(c<9)b.style.filter=a}function sb(f,b,h){if(!A||A<9){var d=b.$ScaleX,e=b.$ScaleY,i=(b.$Rotate||0)%360,g="";if(i||d!=undefined||e!=undefined){if(d==undefined)d=1;if(e==undefined)e=1;var c=a.$CreateMatrix(i/180*Math.PI,d||1,e||1),h=a.$GetMatrixOffset(c,b.$OriginalWidth,b.$OriginalHeight);a.$CssMarginTop(f,h.y);a.$CssMarginLeft(f,h.x);g="progid:DXImageTransform.Microsoft.Matrix(M11="+c[0][0]+", M12="+c[0][1]+", M21="+c[1][0]+", M22="+c[1][1]+", SizingMethod='auto expand')"}var k=f.style.filter,l=new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),j=w(k,[l],g);V(f,j)}}a.$Device=zb;a.$IsBrowserIE=g;a.$IsBrowserIeQuirks=E;a.$IsBrowserFireFox=rb;a.$IsBrowserSafari=Y;a.$IsBrowserChrome=ub;a.$IsBrowserOpera=db;a.$IsBrowserBadTransform=R;a.$IsBrowserIe9Earlier=C;a.$BrowserVersion=function(){return c};a.$BrowserEngineVersion=function(){return h||c};a.$WebKitVersion=function(){k();return t};a.$Delay=mb;a.$Inherit=function(a,b){b.call(a);return q({},a)};function M(a){a.constructor===M.caller&&a.$Construct&&a.$Construct.apply(a,M.caller.arguments)}a.$Construct=M;a.$GetElement=function(b){if(a.$IsString(b))b=document.getElementById(b);return b};function i(a){return a||window.event}a.$GetEvent=i;a.$EvtSrc=function(a){a=i(a);return a.target||a.srcElement||document};a.$EvtTarget=function(a){a=i(a);return a.relatedTarget||a.toElement};a.$EvtWhich=function(a){a=i(a);return a.which||([0,1,3,0,2])[a.button]||a.charCode||a.keyCode};a.$MousePosition=function(a){a=i(a);return{x:a.pageX||a.clientX||0,y:a.pageY||a.clientY||0}};a.$PageScroll=function(){var a=document.body;return{x:(window.pageXOffset||m.scrollLeft||a.scrollLeft||0)-(m.clientLeft||a.clientLeft||0),y:(window.pageYOffset||m.scrollTop||a.scrollTop||0)-(m.clientTop||a.clientTop||0)}};a.$WindowSize=function(){var a=document.body;return{x:a.clientWidth||m.clientWidth,y:a.clientHeight||m.clientHeight}};function s(c,d,a){if(a!==undefined)c.style[d]=a==undefined?"":a;else{var b=c.currentStyle||c.style;a=b[d];if(a==""&&window.getComputedStyle){b=c.ownerDocument.defaultView.getComputedStyle(c,null);b&&(a=b.getPropertyValue(d)||b[d])}return a}}function O(b,c,a,d){if(a!=undefined){if(a==null)a="";else d&&(a+="px");s(b,c,a)}else return f(s(b,c))}function Ab(b,c,a){return O(b,c,a,true)}function b(c,a){var d=a?O:s,b;if(a&4)b=T(c);return function(e,f){return d(e,b?b(e):c,f,a&2)}}function tb(b){if(g()&&h<9){var a=/opacity=([^)]*)/.exec(b.style.filter||"");return a?f(a[1])/100:1}else return f(b.style.opacity||"1")}function vb(b,a,e){if(g()&&h<9){var i=b.style.filter||"",j=new RegExp(/[\s]*alpha\([^\)]*\)/g),d=Math.round(100*a),c="";if(d<100||e)c="alpha(opacity="+d+") ";var f=w(i,[j],c);V(b,f)}else b.style.opacity=a==1?"":Math.round(a*100)/100}var ob={$Rotate:["rotate"],$RotateX:["rotateX"],$RotateY:["rotateY"],$ScaleX:["scaleX",2],$ScaleY:["scaleY",2],$TranslateX:["translateX",1],$TranslateY:["translateY",1],$TranslateZ:["translateZ",1],$SkewX:["skewX"],$SkewY:["skewY"]};function Q(e,b){if(g()&&c&&c<10){delete b.$RotateX;delete b.$RotateY}var d=S(e);if(d){var a="";$Jssor$.$Each(b,function(e,c){var b=ob[c];if(b){var d=b[1]||0;a+=(a?" ":"")+b[0]+"("+e+(["deg","px",""])[d]+")"}});e.style[d]=a}}a.$SetStyleTransform=function(c,b){if(R())mb(a.$CreateCallback(null,Q,c,b));else(C()?sb:Q)(c,b)};a.$CssTransformOrigin=b("transformOrigin",4);a.$CssBackfaceVisibility=b("backfaceVisibility",4);a.$CssTransformStyle=b("transformStyle",4);a.$CssPerspective=b("perspective",6);a.$CssPerspectiveOrigin=b("perspectiveOrigin",4);a.$CssScale=function(a,c){if(g()&&h<9||h<10&&E())a.style.zoom=c==1?"":c;else{var b=S(a);if(b){var f="scale("+c+")",e=a.style[b],i=new RegExp(/[\s]*scale\(.*?\)/g),d=w(e,[i],f);a.style[b]=d}}};var cb=0,X=0;a.$WindowResizeFilter=function(b,a){return C()?function(){var f=true,c=E()?b.document.body:b.document.documentElement;if(c){var e=c.offsetWidth-cb,d=c.offsetHeight-X;if(e||d){cb+=e;X+=d}else f=false}f&&a()}:a};a.$MouseOverOutFilter=function(c,b){$JssorDebug$.$Execute(function(){if(!b)throw new Error('Null reference, parameter "target".');});return function(d){d=i(d);var f=d.type,e=d.relatedTarget||(f=="mouseout"?d.toElement:d.fromElement);(!e||e!==b&&!a.$IsChild(b,e))&&c(d)}};a.$AddEvent=function(b,e,c,d){b=a.$GetElement(b);$JssorDebug$.$Execute(function(){!b&&$JssorDebug$.$Fail("Parameter 'elmt' not specified.");!c&&$JssorDebug$.$Fail("Parameter 'handler' not specified.");!b.addEventListener&&!b.attachEvent&&$JssorDebug$.$Fail("Unable to attach event handler, no known technique.")});if(b.addEventListener){e=="mousewheel"&&b.addEventListener("DOMMouseScroll",c,d);b.addEventListener(e,c,d)}else if(b.attachEvent){b.attachEvent("on"+e,c);d&&b.setCapture&&b.setCapture()}};a.$RemoveEvent=function(b,d,e,c){b=a.$GetElement(b);if(b.removeEventListener){d=="mousewheel"&&b.removeEventListener("DOMMouseScroll",e,c);b.removeEventListener(d,e,c)}else if(b.detachEvent){b.detachEvent("on"+d,e);c&&b.releaseCapture&&b.releaseCapture()}};a.$FireEvent=function(b,c){$JssorDebug$.$Execute(function(){!document.createEvent&&!document.createEventObject&&$JssorDebug$.$Fail("Unable to fire event, no known technique.");!b.dispatchEvent&&!b.fireEvent&&$JssorDebug$.$Fail("Unable to fire event, no known technique.")});var a;if(document.createEvent){a=document.createEvent("HTMLEvents");a.initEvent(c,false,false);b.dispatchEvent(a)}else{var d="on"+c;a=document.createEventObject();b.fireEvent(d,a)}};a.$CancelEvent=function(a){a=i(a);a.preventDefault&&a.preventDefault();a.cancel=true;a.returnValue=false};a.$StopEvent=function(a){a=i(a);a.stopPropagation&&a.stopPropagation();a.cancelBubble=true};a.$CreateCallback=function(d,c){var a=[].slice.call(arguments,2),b=function(){var b=a.concat([].slice.call(arguments,0));return c.apply(d,b)};return b};a.$InnerText=function(b,c){if(c==undefined)return b.textContent||b.innerText;var d=document.createTextNode(c);a.$Empty(b);b.appendChild(d)};a.$InnerHtml=function(a,b){if(b==undefined)return a.innerHTML;a.innerHTML=b};a.$GetClientRect=function(b){var a=b.getBoundingClientRect();return{x:a.left,y:a.top,w:a.right-a.left,h:a.bottom-a.top}};a.$ClearInnerHtml=function(a){a.innerHTML=""};a.$EncodeHtml=function(c){var b=a.$CreateDiv();a.$InnerText(b,c);return a.$InnerHtml(b)};a.$DecodeHtml=function(c){var b=a.$CreateDiv();a.$InnerHtml(b,c);return a.$InnerText(b)};a.$SelectElement=function(c){var b;if(window.getSelection)b=window.getSelection();var a=null;if(document.createRange){a=document.createRange();a.selectNode(c)}else{a=document.body.createTextRange();a.moveToElementText(c);a.select()}b&&b.addRange(a)};a.$DeselectElements=function(){if(document.selection)document.selection.empty();else window.getSelection&&window.getSelection().removeAllRanges()};a.$Children=function(d,c){for(var b=[],a=d.firstChild;a;a=a.nextSibling)(c||a.nodeType==1)&&b.push(a);return b};function hb(a,c,e,b){b=b||"u";for(a=a?a.firstChild:null;a;a=a.nextSibling)if(a.nodeType==1){if(I(a,b)==c)return a;if(!e){var d=hb(a,c,e,b);if(d)return d}}}a.$FindChild=hb;function G(a,d,f,b){b=b||"u";var c=[];for(a=a?a.firstChild:null;a;a=a.nextSibling)if(a.nodeType==1){I(a,b)==d&&c.push(a);if(!f){var e=G(a,d,f,b);if(e.length)c=c.concat(e)}}return c}a.$FindChildren=G;function bb(a,c,d){for(a=a?a.firstChild:null;a;a=a.nextSibling)if(a.nodeType==1){if(a.tagName==c)return a;if(!d){var b=bb(a,c,d);if(b)return b}}}a.$FindChildByTag=bb;function U(a,c,e){var b=[];for(a=a?a.firstChild:null;a;a=a.nextSibling)if(a.nodeType==1){(!c||a.tagName==c)&&b.push(a);if(!e){var d=U(a,c,e);if(d.length)b=b.concat(d)}}return b}a.$FindChildrenByTag=U;a.$GetElementsByTag=function(b,a){return b.getElementsByTagName(a)};function q(){var e=arguments,d,c,b,a,g=1&e[0],f=1+g;d=e[f-1]||{};for(;f<e.length;f++)if(c=e[f])for(b in c){a=c[b];if(a!==undefined){a=c[b];var h=d[b];d[b]=g&&(o(h)||o(a))?q(g,{},h,a):a}}return d}a.$Extend=q;function N(g,f){$JssorDebug$.$Assert(f);var d={},c,a,b;for(c in g){a=g[c];b=f[c];if(a!==b){var e;if(o(a)&&o(b)){a=N(a,b);e=!gb(a)}!e&&(d[c]=a)}}return d}a.$Unextend=N;a.$IsFunction=function(a){return r(a)=="function"};a.$IsArray=function(a){return r(a)=="array"};a.$IsString=function(a){return r(a)=="string"};a.$IsNumeric=function(a){return!isNaN(f(a))&&isFinite(a)};a.$Type=r;a.$Each=d;a.$IsNotEmpty=gb;a.$IsPlainObject=o;function F(a){return document.createElement(a)}a.$CreateElement=F;a.$CreateDiv=function(){return F("DIV")};a.$CreateSpan=function(){return F("SPAN")};a.$EmptyFunction=function(){};function K(b,c,a){if(a==undefined)return b.getAttribute(c);b.setAttribute(c,a)}function I(a,b){return K(a,b)||K(a,"data-"+b)}a.$Attribute=K;a.$AttributeEx=I;function l(b,a){if(a==undefined)return b.className;b.className=a}a.$ClassName=l;function lb(b){var a={};d(b,function(b){a[b]=b});return a}function yb(b){var a=[];d(b,function(b){a.push(b)});return a}function nb(b,a){return b.match(a||qb)}function D(b,a){return lb(nb(b||"",a))}a.$ToHash=lb;a.$FromHash=yb;a.$Split=nb;function P(b,c){var a="";d(c,function(c){a&&(a+=b);a+=c});return a}function v(a,c,b){l(a,P(" ",q(N(D(l(a)),D(c)),D(b))))}a.$Join=P;a.$AddClass=function(b,a){v(b,null,a)};a.$RemoveClass=v;a.$ReplaceClass=v;a.$ParentNode=function(a){return a.parentNode};a.$HideElement=function(b){a.$CssDisplay(b,"none")};a.$EnableElement=function(b,c){if(c)a.$Attribute(b,"disabled",true);else a.$RemoveAttribute(b,"disabled")};a.$HideElements=function(c){for(var b=0;b<c.length;b++)a.$HideElement(c[b])};a.$ShowElement=function(b,c){a.$CssDisplay(b,c?"none":"")};a.$ShowElements=function(c,d){for(var b=0;b<c.length;b++)a.$ShowElement(c[b],d)};a.$RemoveAttribute=function(b,a){b.removeAttribute(a)};a.$CanClearClip=function(){return g()&&c<10};a.$SetStyleClip=function(b,a){if(a)b.style.clip="rect("+Math.round(a.$Top)+"px "+Math.round(a.$Right)+"px "+Math.round(a.$Bottom)+"px "+Math.round(a.$Left)+"px)";else{var e=b.style.cssText,d=[new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),new RegExp(/[\s]*cliptop: .*?[;]?/i),new RegExp(/[\s]*clipright: .*?[;]?/i),new RegExp(/[\s]*clipbottom: .*?[;]?/i),new RegExp(/[\s]*clipleft: .*?[;]?/i)],c=w(e,d,"");$Jssor$.$CssCssText(b,c)}};a.$GetNow=function(){return+new Date};a.$AppendChild=function(b,a){b.appendChild(a)};a.$AppendChildren=function(c,b){d(b,function(b){a.$AppendChild(c,b)})};a.$InsertBefore=function(b,a,c){(c||a.parentNode).insertBefore(b,a)};a.$InsertAfter=function(c,b,d){a.$InsertBefore(c,b.nextSibling,d||b.parentNode)};a.$InsertAdjacentHtml=function(b,a,c){b.insertAdjacentHTML(a,c)};a.$RemoveElement=function(a,b){(b||a.parentNode).removeChild(a)};a.$RemoveElements=function(b,c){d(b,function(b){a.$RemoveElement(b,c)})};a.$Empty=function(b){a.$RemoveElements(a.$Children(b,true),b)};a.$CenterElement=function(b,c){var d=a.$ParentNode(b);c&1&&a.$CssLeft(b,(a.$CssWidth(d)-a.$CssWidth(b))/2);c&2&&a.$CssTop(b,(a.$CssHeight(d)-a.$CssHeight(b))/2)};a.$ParseInt=function(b,a){return parseInt(b,a||10)};var f=parseFloat;a.$ParseFloat=f;a.$IsChild=function(b,a){var c=document.body;while(a&&b!==a&&c!==a)try{a=a.parentNode}catch(d){return false}return b===a};function L(e,d,c){var b=e.cloneNode(!d);!c&&a.$RemoveAttribute(b,"id");return b}a.$CloneNode=L;a.$LoadImage=function(f,g){var b=new Image;function d(f,c){a.$RemoveEvent(b,"load",d);a.$RemoveEvent(b,"abort",e);a.$RemoveEvent(b,"error",e);g&&g(b,c)}function e(a){d(a,true)}if(db()&&c<11.6||!f)d(!f);else{a.$AddEvent(b,"load",d);a.$AddEvent(b,"abort",e);a.$AddEvent(b,"error",e);b.src=f}};a.$LoadImages=function(f,b,g){var e=f.length+1;function c(a){e--;if(b&&a&&a.src==b.src)b=a;!e&&g&&g(b)}d(f,function(b){a.$LoadImage(b.src,c)});c()};a.$BuildElement=function(a,f,h,g){if(g)a=L(a);var b=G(a,f);if(!b.length)b=$Jssor$.$GetElementsByTag(a,f);for(var e=b.length-1;e>-1;e--){var c=b[e],d=L(h);l(d,l(c));$Jssor$.$CssCssText(d,c.style.cssText);$Jssor$.$InsertBefore(d,c);$Jssor$.$RemoveElement(c)}return a};function xb(b){var j=this,n="",p=["av","pv","ds","dn"],f=[],o,i=0,g=0,e=0;function h(){v(b,o,f[e||i||g&2||g]);$Jssor$.$Css(b,"pointer-events",e?"none":"")}function c(){i=0;h();a.$RemoveEvent(document,"mouseup",c);a.$RemoveEvent(document,"touchend",c);a.$RemoveEvent(document,"touchcancel",c)}function m(b){if(e)a.$CancelEvent(b);else{i=4;h();a.$AddEvent(document,"mouseup",c);a.$AddEvent(document,"touchend",c);a.$AddEvent(document,"touchcancel",c)}}j.$Selected=function(a){if(a===undefined)return g;g=a&2||a&1;h()};j.$Enable=function(a){if(a===undefined)return!e;e=a?0:3;h()};j.$Elmt=b=a.$GetElement(b);var k=$Jssor$.$Split(l(b));if(k)n=k.shift();d(p,function(a){f.push(n+a)});o=P(" ",f);f.unshift("");a.$AddEvent(b,"mousedown",m);a.$AddEvent(b,"touchstart",m)}a.$Buttonize=function(a){return new xb(a)};a.$Css=s;a.$CssN=O;a.$CssP=Ab;a.$CssOverflow=b("overflow");a.$CssTop=b("top",2);a.$CssLeft=b("left",2);a.$CssWidth=b("width",2);a.$CssHeight=b("height",2);a.$CssMarginLeft=b("marginLeft",2);a.$CssMarginTop=b("marginTop",2);a.$CssPosition=b("position");a.$CssDisplay=b("display");a.$CssZIndex=b("zIndex",1);a.$CssFloat=function(b,a){return s(b,g()?"styleFloat":"cssFloat",a)};a.$CssOpacity=function(b,a,c){if(a!=undefined)vb(b,a,c);else return tb(b)};a.$CssCssText=function(a,b){if(b!=undefined)a.style.cssText=b;else return a.style.cssText};var H={$Opacity:a.$CssOpacity,$Top:a.$CssTop,$Left:a.$CssLeft,$Width:a.$CssWidth,$Height:a.$CssHeight,$Position:a.$CssPosition,$Display:a.$CssDisplay,$ZIndex:a.$CssZIndex},B;function x(){if(!B)B=q({$MarginTop:a.$CssMarginTop,$MarginLeft:a.$CssMarginLeft,$Clip:a.$SetStyleClip,$Transform:a.$SetStyleTransform},H);return B}function fb(){var a={};a.$Transform=a.$Transform;a.$Transform=a.$Rotate;a.$Transform=a.$RotateX;a.$Transform=a.$RotateY;a.$Transform=a.$SkewX;a.$Transform=a.$SkewY;a.$Transform=a.$TranslateX;a.$Transform=a.$TranslateY;a.$Transform=a.$TranslateZ;return x()}a.$StyleSetter=x;a.$StyleSetterEx=fb;a.$GetStyles=function(c,b){x();var a={};d(b,function(d,b){if(H[b])a[b]=H[b](c)});return a};a.$SetStyles=function(c,b){var a=x();d(b,function(d,b){a[b]&&a[b](c,d)})};a.$SetStylesEx=function(c,b){fb();a.$SetStyles(c,b)};var u=new function(){var a=this;function b(d,g){for(var j=d[0].length,i=d.length,h=g[0].length,f=[],c=0;c<i;c++)for(var k=f[c]=[],b=0;b<h;b++){for(var e=0,a=0;a<j;a++)e+=d[c][a]*g[a][b];k[b]=e}return f}a.$ScaleX=function(b,c){return a.$ScaleXY(b,c,0)};a.$ScaleY=function(b,c){return a.$ScaleXY(b,0,c)};a.$ScaleXY=function(a,c,d){return b(a,[[c,0],[0,d]])};a.$TransformPoint=function(d,c){var a=b(d,[[c.x],[c.y]]);return n(a[0][0],a[1][0])}};a.$CreateMatrix=function(c,a,b){var d=Math.cos(c),e=Math.sin(c);return[[d*a,-e*b],[e*a,d*b]]};a.$GetMatrixOffset=function(c,b,a){var d=u.$TransformPoint(c,n(-b/2,-a/2)),e=u.$TransformPoint(c,n(b/2,-a/2)),f=u.$TransformPoint(c,n(b/2,a/2)),g=u.$TransformPoint(c,n(-b/2,a/2));return n(Math.min(d.x,e.x,f.x,g.x)+b/2,Math.min(d.y,e.y,f.y,g.y)+a/2)};var pb={$Zoom:1,$ScaleX:1,$ScaleY:1,$Rotate:0,$RotateX:0,$RotateY:0,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0};a.$FormatEasings=function(a){var b=a||{};if(a)if($Jssor$.$IsFunction(a))b={$Default:b};else if($Jssor$.$IsFunction(a.$Clip))b.$Clip={$Default:a.$Clip};return b};function kb(e,b){var c={};d(e,function(d,e){var f=d;if(b[e]!=undefined)if(a.$IsNumeric(d))f=d+b[e];else f=kb(d,b[e]);c[e]=f});return c}a.$AddDif=kb;a.$Cast=function(e,f,r,i,t,u,j){var a=f;if(e){a={};for(var d in f){var v=u[d]||1,q=t[d]||[0,1],b=(r-q[0])/q[1];b=Math.min(Math.max(b,0),1);b=b*v;var p=Math.floor(b);if(b!=p)b-=p;var g=i.$Default||$JssorEasing$.$EaseSwing,h,w=e[d],l=f[d];if($Jssor$.$IsNumeric(l)){g=i[d]||g;var s=g(b);h=w+l*s}else{h=$Jssor$.$Extend({$Offset:{}},e[d]);$Jssor$.$Each(l.$Offset||l,function(e,a){if(i.$Clip)g=i.$Clip[a]||i.$Clip.$Default||g;var d=g(b),c=e*d;h.$Offset[a]=c;h[a]+=c})}a[d]=h}var o,c={$OriginalWidth:j.$OriginalWidth,$OriginalHeight:j.$OriginalHeight};$Jssor$.$Each(pb,function(g,b){o=o||f[b];var d=a[b];if(d!=undefined){if(d!=g)c[b]=d;delete a[b]}else if(e[b]!=undefined&&e[b]!=g)c[b]=e[b]});if(f.$Zoom&&c.$Zoom){c.$ScaleX=c.$Zoom;c.$ScaleY=c.$Zoom}a.$Transform=c}if(f.$Clip&&j.$Move){var k=a.$Clip.$Offset,n=(k.$Top||0)+(k.$Bottom||0),m=(k.$Left||0)+(k.$Right||0);a.$Left=(a.$Left||0)+m;a.$Top=(a.$Top||0)+n;a.$Clip.$Left-=m;a.$Clip.$Right-=m;a.$Clip.$Top-=n;a.$Clip.$Bottom-=n}if(a.$Clip&&$Jssor$.$CanClearClip()&&!a.$Clip.$Top&&!a.$Clip.$Left&&a.$Clip.$Right==j.$OriginalWidth&&a.$Clip.$Bottom==j.$OriginalHeight)a.$Clip=null;return a}};function $JssorObject$(){var a=this,c=[],b=[];function g(a,b){$JssorDebug$.$Execute(function(){if(a==undefined||a==null)throw new Error("param 'eventName' is null or empty.");if(typeof b!="function")throw"param 'handler' must be a function.";$Jssor$.$Each(c,function(c){if(c.$EventName==a&&c.$Handler===b)throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");})});c.push({$EventName:a,$Handler:b})}function f(a,b){$JssorDebug$.$Execute(function(){if(a==undefined||a==null)throw new Error("param 'eventName' is null or empty.");if(typeof b!="function")throw"param 'handler' must be a function.";});$Jssor$.$Each(c,function(d,e){d.$EventName==a&&d.$Handler===b&&c.splice(e,1)})}function e(){c=[]}function d(){$Jssor$.$Each(b,function(a){$Jssor$.$RemoveEvent(a.$Obj,a.$EventName,a.$Handler)});b=[]}a.$Listen=function(d,a,c,e){$JssorDebug$.$Execute(function(){if(!d)throw new Error("param 'obj' is null or empty.");if(a==undefined||a==null)throw new Error("param 'eventName' is null or empty.");if(typeof c!="function")throw"param 'handler' must be a function.";$Jssor$.$Each(b,function(b){if(b.$Obj===d&&b.$EventName==a&&b.$Handler===c)throw new Error("The handler listened to the event already, cannot listen to the same event of the same object with the same handler twice.");})});$Jssor$.$AddEvent(d,a,c,e);b.push({$Obj:d,$EventName:a,$Handler:c})};a.$Unlisten=function(d,a,c){$JssorDebug$.$Execute(function(){if(!d)throw new Error("param 'obj' is null or empty.");if(a==undefined||a==null)throw new Error("param 'eventName' is null or empty.");if(typeof c!="function")throw"param 'handler' must be a function.";});$Jssor$.$Each(b,function(e,f){if(e.$Obj===d&&e.$EventName==a&&e.$Handler===c){$Jssor$.$RemoveEvent(d,a,c);b.splice(f,1)}})};a.$UnlistenAll=d;a.$On=a.addEventListener=g;a.$Off=a.removeEventListener=f;a.$TriggerEvent=function(a){var b=[].slice.call(arguments,1);$Jssor$.$Each(c,function(c){c.$EventName==a&&c.$Handler.apply(window,b)})};a.$Destroy=function(){d();e();for(var b in a)delete a[b]};$JssorDebug$.$C_AbstractClass(a)}var $JssorAnimator$=window.$JssorAnimator$=function(s,x,d,J,D,v){s=s||0;var a=this,k,H,h,i,q,t=0,C,E,B,w,r=0,e=0,g=0,y,f,m,c,b,j,n=[],u;function I(a){c+=a;b+=a;f+=a;m+=a;e+=a;g+=a;r+=a}function p(l){var h=l;if(j&&(h>=b||h<=c))h=((h-c)%j+j)%j+c;if(!y||q||e!=h){var i=Math.min(h,b);i=Math.max(i,c);if(!y||q||i!=g){if(v){var k=(i-f)/(x||1);if(d.$Reverse)k=1-k;var m=$Jssor$.$Cast(D,v,k,C,B,E,d);$Jssor$.$Each(m,function(b,a){u[a]&&u[a](J,b)})}a.$OnInnerOffsetChange(g-f,i-f);g=i;$Jssor$.$Each(n,function(b,c){var a=l<e?n[n.length-c-1]:b;a.$GoToPosition(g-r)});var p=e,o=g;e=h;y=true;a.$OnPositionChange(p,o)}}}function z(a,d,e){$JssorDebug$.$Execute(function(){d!==0&&d!==1&&$JssorDebug$.$Fail("Argument out of range, the value of 'combineMode' should be either 0 or 1.")});d&&a.$Shift(b);if(!e){c=Math.min(c,a.$GetPosition_OuterBegin()+r);b=Math.max(b,a.$GetPosition_OuterEnd()+r)}n.push(a)}var l=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame;if($Jssor$.$IsBrowserSafari()&&$Jssor$.$BrowserVersion()<7)l=null;l=l||function(a){$Jssor$.$Delay(a,d.$Interval)};function F(){if(k){var b=$Jssor$.$GetNow(),c=Math.min(b-t,d.$IntervalMax),a=e+c*i;t=b;if(a*i>=h*i)a=h;p(a);if(!q&&a*i>=h*i)G(w);else l(F)}}function o(d,f,g){if(!k){k=true;q=g;w=f;d=Math.max(d,c);d=Math.min(d,b);h=d;i=h<e?-1:1;a.$OnStart();t=$Jssor$.$GetNow();l(F)}}function G(b){if(k){q=k=w=false;a.$OnStop();b&&b()}}a.$Play=function(a,c,d){o(a?e+a:b,c,d)};a.$PlayToPosition=o;a.$PlayToBegin=function(a,b){o(c,a,b)};a.$PlayToEnd=function(a,c){o(b,a,c)};a.$Stop=G;a.$Continue=function(a){o(a)};a.$GetPosition=function(){return e};a.$GetPlayToPosition=function(){return h};a.$GetPosition_Display=function(){return g};a.$GoToPosition=p;a.$GoToBegin=function(){p(c,true)};a.$GoToEnd=function(){p(b,true)};a.$Move=function(a){p(e+a)};a.$CombineMode=function(){return H};a.$GetDuration=function(){return x};a.$IsPlaying=function(){return k};a.$IsOnTheWay=function(){return e>f&&e<=m};a.$SetLoopLength=function(a){j=a};a.$Shift=I;a.$Join=z;a.$Combine=function(a,b){z(a,0,b)};a.$Chain=function(a){z(a,1)};a.$Expand=function(a){b+=a};a.$GetPosition_InnerBegin=function(){return f};a.$GetPosition_InnerEnd=function(){return m};a.$GetPosition_OuterBegin=function(){return c};a.$GetPosition_OuterEnd=function(){return b};a.$OnPositionChange=a.$OnStart=a.$OnStop=a.$OnInnerOffsetChange=$Jssor$.$EmptyFunction;a.$Version=$Jssor$.$GetNow();$JssorDebug$.$Execute(function(){a.$NestedAnimators=n;a.$FromStyles=D;a.$DifStyles=v});d=$Jssor$.$Extend({$Interval:16,$IntervalMax:50},d);$JssorDebug$.$Execute(function(){d=$Jssor$.$Extend({$LoopLength:undefined,$Setter:undefined,$Easing:undefined},d)});j=d.$LoopLength;u=$Jssor$.$Extend({},$Jssor$.$StyleSetter(),d.$Setter);c=f=s;b=m=s+x;E=d.$Round||{};B=d.$During||{};C=$Jssor$.$FormatEasings(d.$Easing)};function $JssorPlayerClass$(){var b=this,a=[];function c(a){var f=this,c,b=[];function d(f){var e=$Jssor$.$EvtSrc(f);c=e.pInstance;$Jssor$.$RemoveEvent(e,"dataavailable",d);$Jssor$.$Each(b,function(a){a!=c&&a.$Remove()});a.pTagName=c.tagName;b=null}function e(c){var e;if(!c.pInstance){var f=$Jssor$.$AttributeEx(c,"pHandler");if($JssorPlayer$[f]){$Jssor$.$AddEvent(c,"dataavailable",d);e=new $JssorPlayer$[f](a,c);b.push(e);$JssorDebug$.$Execute(function(){$Jssor$.$Type(e.$Remove)!="function"&&$JssorDebug$.$Fail("'pRemove' interface not implemented for player handler '"+f+"'.")})}}return e}f.$InitPlayerController=function(){if(!a.pInstance&&!e(a)){var b=$Jssor$.$Children(a);$Jssor$.$Each(b,function(a){e(a)})}}}b.$EVT_SWITCH=21;b.$FetchPlayers=function(b){b=b||document.body;var d=$Jssor$.$FindChildren(b,"player");$Jssor$.$Each(d,function(b){if(!a[b.pId]){b.pId=a.length;a.push(new c(b))}var d=a[b.pId];d.$InitPlayerController()})}}var $JssorSlideshowFormations$=window.$JssorSlideshowFormations$=new function(){var f=this,b=0,a=1,d=2,c=3,q=1,p=2,r=4,o=8,u=256,v=512,t=1024,s=2048,h=s+q,g=s+p,m=v+q,k=v+p,l=u+r,i=u+o,j=t+r,n=t+o;function w(a){return(a&p)==p}function x(a){return(a&r)==r}function e(b,a,c){c.push(a);b[a]=b[a]||[];b[a].push(c)}f.$FormationStraight=function(n){for(var d=n.$Cols,f=n.$Rows,s=n.$Assembly,t=n.$Count,r=[],a=0,b=0,p=d-1,q=f-1,o=t-1,c,b=0;b<f;b++)for(a=0;a<d;a++){switch(s){case h:c=o-(a*f+(q-b));break;case j:c=o-(b*d+(p-a));break;case m:c=o-(a*f+b);case l:c=o-(b*d+a);break;case g:c=a*f+b;break;case i:c=b*d+(p-a);break;case k:c=a*f+(q-b);break;default:c=b*d+a}e(r,c,[b,a])}return r};f.$FormationSwirl=function(p){var w=p.$Cols,x=p.$Rows,A=p.$Assembly,v=p.$Count,z=[],y=[],t=0,f=0,n=0,q=w-1,r=x-1,s,o,u=0;switch(A){case h:f=q;n=0;o=[d,a,c,b];break;case j:f=0;n=r;o=[b,c,a,d];break;case m:f=q;n=r;o=[c,a,d,b];break;case l:f=q;n=r;o=[a,c,b,d];break;case g:f=0;n=0;o=[d,b,c,a];break;case i:f=q;n=0;o=[a,d,b,c];break;case k:f=0;n=r;o=[c,b,d,a];break;default:f=0;n=0;o=[b,d,a,c]}t=0;while(t<v){s=n+","+f;if(f>=0&&f<w&&n>=0&&n<x&&!y[s]){y[s]=true;e(z,t++,[n,f])}else switch(o[u++%o.length]){case b:f--;break;case d:n--;break;case a:f++;break;case c:n++}switch(o[u%o.length]){case b:f++;break;case d:n++;break;case a:f--;break;case c:n--}}return z};f.$FormationZigZag=function(p){var w=p.$Cols,x=p.$Rows,z=p.$Assembly,v=p.$Count,t=[],u=0,f=0,n=0,q=w-1,r=x-1,y,o,s=0;switch(z){case h:f=q;n=0;o=[d,a,c,a];break;case j:f=0;n=r;o=[b,c,a,c];break;case m:f=q;n=r;o=[c,a,d,a];break;case l:f=q;n=r;o=[a,c,b,c];break;case g:f=0;n=0;o=[d,b,c,b];break;case i:f=q;n=0;o=[a,d,b,d];break;case k:f=0;n=r;o=[c,b,d,b];break;default:f=0;n=0;o=[b,d,a,d]}u=0;while(u<v){y=n+","+f;if(f>=0&&f<w&&n>=0&&n<x&&typeof t[y]=="undefined"){e(t,u++,[n,f]);switch(o[s%o.length]){case b:f++;break;case d:n++;break;case a:f--;break;case c:n--}}else{switch(o[s++%o.length]){case b:f--;break;case d:n--;break;case a:f++;break;case c:n++}switch(o[s++%o.length]){case b:f++;break;case d:n++;break;case a:f--;break;case c:n--}}}return t};f.$FormationStraightStairs=function(q){var u=q.$Cols,v=q.$Rows,f=q.$Assembly,t=q.$Count,r=[],s=0,c=0,d=0,o=u-1,p=v-1,z=t-1;switch(f){case h:case k:case m:case g:var a=0,b=0;break;case i:case j:case l:case n:var a=o,b=0;break;default:f=n;var a=o,b=0}c=a;d=b;while(s<t){if(x(f)||w(f))e(r,z-s++,[d,c]);else e(r,s++,[d,c]);switch(f){case h:case k:c--;d++;break;case m:case g:c++;d--;break;case i:case j:c--;d--;break;case n:case l:default:c++;d++}if(c<0||d<0||c>o||d>p){switch(f){case h:case k:a++;break;case i:case j:case m:case g:b++;break;case n:case l:default:a--}if(a<0||b<0||a>o||b>p){switch(f){case h:case k:a=o;b++;break;case m:case g:b=p;a++;break;case i:case j:b=p;a--;break;case n:case l:default:a=0;b++}if(b>p)b=p;else if(b<0)b=0;else if(a>o)a=o;else if(a<0)a=0}d=b;c=a}}return r};f.$FormationSquare=function(h){var a=h.$Cols||1,b=h.$Rows||1,i=[],c,d,f,g,j;f=a<b?(b-a)/2:0;g=a>b?(a-b)/2:0;j=Math.round(Math.max(a/2,b/2))+1;for(c=0;c<a;c++)for(d=0;d<b;d++)e(i,j-Math.min(c+1+f,d+1+g,a-c+f,b-d+g),[d,c]);return i};f.$FormationRectangle=function(f){var c=f.$Cols||1,d=f.$Rows||1,g=[],a,b,h;h=Math.round(Math.min(c/2,d/2))+1;for(a=0;a<c;a++)for(b=0;b<d;b++)e(g,h-Math.min(a+1,b+1,c-a,d-b),[b,a]);return g};f.$FormationRandom=function(c){for(var d=[],a,b=0;b<c.$Rows;b++)for(a=0;a<c.$Cols;a++)e(d,Math.ceil(1e5*Math.random())%13,[b,a]);return d};f.$FormationCircle=function(c){for(var d=c.$Cols||1,f=c.$Rows||1,g=[],a,h=d/2-.5,i=f/2-.5,b=0;b<d;b++)for(a=0;a<f;a++)e(g,Math.round(Math.sqrt(Math.pow(b-h,2)+Math.pow(a-i,2))),[a,b]);return g};f.$FormationCross=function(c){for(var d=c.$Cols||1,f=c.$Rows||1,g=[],a,h=d/2-.5,i=f/2-.5,b=0;b<d;b++)for(a=0;a<f;a++)e(g,Math.round(Math.min(Math.abs(b-h),Math.abs(a-i))),[a,b]);return g};f.$FormationRectangleCross=function(f){for(var g=f.$Cols||1,h=f.$Rows||1,i=[],a,c=g/2-.5,d=h/2-.5,j=Math.max(c,d)+1,b=0;b<g;b++)for(a=0;a<h;a++)e(i,Math.round(j-Math.max(c-Math.abs(b-c),d-Math.abs(a-d)))-1,[a,b]);return i}},$JssorSlideshowRunner$=window.$JssorSlideshowRunner$=function(f,j,h,k,p){var c=this,l,b,a,o=0,n=k.$TransitionsOrder,i,d=8;function e(c,b){var a={$Interval:b,$Duration:1,$Delay:0,$Cols:1,$Rows:1,$Opacity:0,$Zoom:0,$Clip:0,$Move:false,$SlideOut:false,$Reverse:false,$Formation:$JssorSlideshowFormations$.$FormationRandom,$Assembly:1032,$ChessMode:{$Column:0,$Row:0},$Easing:$JssorEasing$.$EaseSwing,$Round:{},$Blocks:[],$During:{}};$Jssor$.$Extend(a,c);a.$Count=a.$Cols*a.$Rows;a.$Easing=$Jssor$.$FormatEasings(a.$Easing);a.$FramesCount=Math.ceil(a.$Duration/a.$Interval);a.$GetBlocks=function(c,b){c/=a.$Cols;b/=a.$Rows;var f=c+"x"+b;if(!a.$Blocks[f]){a.$Blocks[f]={$Width:c,$Height:b};for(var d=0;d<a.$Cols;d++)for(var e=0;e<a.$Rows;e++)a.$Blocks[f][e+","+d]={$Top:e*b,$Right:d*c+c,$Bottom:e*b+b,$Left:d*c}}return a.$Blocks[f]};if(a.$Brother){a.$Brother=e(a.$Brother,b);a.$SlideOut=true}return a}function g(w,e,a,r,j,h){var u=this,p,q={},f={},i=[],c,b,n,l=a.$ChessMode.$Column||0,m=a.$ChessMode.$Row||0,d=a.$GetBlocks(j,h),k=x(a),y=k.length-1,o=a.$Duration+a.$Delay*y,s=r+o,g=a.$SlideOut,t;s+=50;function x(a){var b=a.$Formation(a);return a.$Reverse?b.reverse():b}u.$EndTime=s;u.$ShowFrame=function(b){b-=r;var c=b<o;if(c||t){t=c;if(!g)b=o-b;var d=Math.ceil(b/a.$Interval);$Jssor$.$Each(f,function(a,c){var b=Math.max(d,a.$Min);b=Math.min(b,a.length-1);if(a.$LastFrameIndex!=b){if(!a.$LastFrameIndex&&!g)$Jssor$.$ShowElement(i[c]);else b==a.$Max&&g&&$Jssor$.$HideElement(i[c]);a.$LastFrameIndex=b;$Jssor$.$SetStylesEx(i[c],a[b])}})}};e=$Jssor$.$CloneNode(e);if($Jssor$.$IsBrowserIe9Earlier()){var z=!e["no-image"],v=$Jssor$.$FindChildrenByTag(e);$Jssor$.$Each(v,function(a){(z||a["jssor-slider"])&&$Jssor$.$CssOpacity(a,$Jssor$.$CssOpacity(a),true)})}$Jssor$.$Each(k,function(e,i){$Jssor$.$Each(e,function(C){var G=C[0],F=C[1],r=G+","+F,k=false,o=false,t=false;if(l&&F%2){if(l&3)k=!k;if(l&12)o=!o;if(l&16)t=!t}if(m&&G%2){if(m&3)k=!k;if(m&12)o=!o;if(m&16)t=!t}a.$Top=a.$Top||a.$Clip&4;a.$Bottom=a.$Bottom||a.$Clip&8;a.$Left=a.$Left||a.$Clip&1;a.$Right=a.$Right||a.$Clip&2;var y=o?a.$Bottom:a.$Top,v=o?a.$Top:a.$Bottom,x=k?a.$Right:a.$Left,w=k?a.$Left:a.$Right;a.$Clip=y||v||x||w;n={};b={$Top:0,$Left:0,$Opacity:1,$Width:j,$Height:h};c=$Jssor$.$Extend({},b);p=$Jssor$.$Extend({},d[r]);if(a.$Opacity)b.$Opacity=2-a.$Opacity;if(a.$ZIndex){b.$ZIndex=a.$ZIndex;c.$ZIndex=0}var E=a.$Cols*a.$Rows>1||a.$Clip;if(a.$Zoom||a.$Rotate){var D=true;if($Jssor$.$IsBrowserIe9Earlier())if(a.$Cols*a.$Rows>1)D=false;else E=false;if(D){b.$Zoom=a.$Zoom?a.$Zoom-1:1;c.$Zoom=1;if($Jssor$.$IsBrowserIe9Earlier()||$Jssor$.$IsBrowserOpera())b.$Zoom=Math.min(b.$Zoom,2);var J=a.$Rotate||0;b.$Rotate=J*360*(t?-1:1);c.$Rotate=0}}if(E){var e=p.$Offset={};if(a.$Clip){var s=a.$ScaleClip||1;if(y&&v){e.$Top=d.$Height/2*s;e.$Bottom=-e.$Top}else if(y)e.$Bottom=-d.$Height*s;else if(v)e.$Top=d.$Height*s;if(x&&w){e.$Left=d.$Width/2*s;e.$Right=-e.$Left}else if(x)e.$Right=-d.$Width*s;else if(w)e.$Left=d.$Width*s}n.$Clip=p;c.$Clip=d[r]}var H=k?1:-1,I=o?1:-1;if(a.x)b.$Left+=j*a.x*H;if(a.y)b.$Top+=h*a.y*I;$Jssor$.$Each(b,function(a,b){if($Jssor$.$IsNumeric(a))if(a!=c[b])n[b]=a-c[b]});q[r]=g?c:b;var z=a.$FramesCount,u=Math.round(i*a.$Delay/a.$Interval);f[r]=new Array(u);f[r].$Min=u;f[r].$Max=u+z-1;for(var B=0;B<=z;B++){var A=$Jssor$.$Cast(c,n,B/z,a.$Easing,a.$During,a.$Round,{$Move:a.$Move,$OriginalWidth:j,$OriginalHeight:h});A.$ZIndex=A.$ZIndex||1;f[r].push(A)}})});k.reverse();$Jssor$.$Each(k,function(a){$Jssor$.$Each(a,function(b){var f=b[0],d=b[1],c=f+","+d,a=e;if(d||f)a=$Jssor$.$CloneNode(e);$Jssor$.$SetStyles(a,q[c]);$Jssor$.$CssOverflow(a,"hidden");$Jssor$.$CssPosition(a,"absolute");w.$AddClipElement(a);i[c]=a;$Jssor$.$ShowElement(a,!g)})})}function m(){var c=this,e=0;$JssorAnimator$.call(c,0,l);c.$OnPositionChange=function(f,c){if(c-e>d){e=c;a&&a.$ShowFrame(c);b&&b.$ShowFrame(c)}};c.$Transition=i}c.$GetTransition=function(){var a=0,b=k.$Transitions,c=b.length;if(n)a=o++%c;else a=Math.floor(Math.random()*c);b[a]&&(b[a].$Index=a);return b[a]};c.$Initialize=function(x,y,p,s,k){$JssorDebug$.$Execute(function(){b&&$JssorDebug$.$Fail("slideshow runner has not been cleared.")});i=k;k=e(k,d);var o=s.$Item,n=p.$Item;o["no-image"]=!s.$Image;n["no-image"]=!p.$Image;var t=o,u=n,w=k,m=k.$Brother||e({},d);if(!k.$SlideOut){t=n;u=o}var v=m.$Shift||0;b=new g(f,u,m,Math.max(v-m.$Interval,0),j,h);a=new g(f,t,w,Math.max(m.$Interval-v,0),j,h);b.$ShowFrame(0);a.$ShowFrame(0);l=Math.max(b.$EndTime,a.$EndTime);c.$Index=x};c.$Clear=function(){f.$Clear();b=null;a=null};c.$GetProcessor=function(){var b=null;if(a)b=new m;return b};if($Jssor$.$IsBrowserIe9Earlier()||$Jssor$.$IsBrowserOpera()||p&&$Jssor$.$WebKitVersion()<537)d=16;$JssorObject$.call(c);$JssorAnimator$.call(c,-1e7,1e7)},$JssorSlider$=window.$JssorSlider$=function(c,Vb){var b=this;function tc(){var a=this;$JssorAnimator$.call(a,-1e8,2e8);a.$GetCurrentSlideInfo=function(){var b=a.$GetPosition_Display(),c=Math.floor(b),e=f(c),d=b-Math.floor(b);return{$Index:e,$VirtualIndex:c,$Position:d}};a.$OnPositionChange=function(c,a){var d=Math.floor(a);if(d!=a&&a>c)d++;Mb(d,true);b.$TriggerEvent($JssorSlider$.$EVT_POSITION_CHANGE,f(a),f(c),a,c)}}function sc(){var a=this;$JssorAnimator$.call(a,0,0,{$LoopLength:d});$Jssor$.$Each(o,function(b){p&1&&b.$SetLoopLength(d);a.$Chain(b);b.$Shift(T/Sb)})}function rc(){var a=this,b=ob.$Elmt;$JssorAnimator$.call(a,-1,2,{$Easing:$JssorEasing$.$EaseLinear,$Setter:{$Position:Rb},$LoopLength:d},b,{$Position:1},{$Position:-2});a.$Wrapper=b;$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(ob.$Elmt,"debug-id","slide_container")})}function fc(m,l){var c=this,g,h,j,k,d;$JssorAnimator$.call(c,-1e8,2e8,{$IntervalMax:100});c.$OnStart=function(){E=true;J=null;b.$TriggerEvent($JssorSlider$.$EVT_SWIPE_START,f(i.$GetPosition()),i.$GetPosition())};c.$OnStop=function(){E=false;k=false;var a=i.$GetCurrentSlideInfo();b.$TriggerEvent($JssorSlider$.$EVT_SWIPE_END,f(i.$GetPosition()),i.$GetPosition());!a.$Position&&vc(a.$VirtualIndex,e)};c.$OnPositionChange=function(f,e){var b;if(k)b=d;else{b=h;if(j){var c=e/j;b=a.$SlideEasing(c)*(h-g)+g}}i.$GoToPosition(b)};c.$PlayCarousel=function(a,d,b,e){$JssorDebug$.$Execute(function(){c.$IsPlaying()&&$JssorDebug$.$Fail("The carousel is already playing.")});g=a;h=d;j=b;i.$GoToPosition(a);c.$GoToPosition(0);c.$PlayToPosition(b,e)};c.$StandBy=function(a){k=true;d=a;c.$Play(a,null,true)};c.$SetStandByPosition=function(a){d=a};c.$MoveCarouselTo=function(a){i.$GoToPosition(a)};i=new tc;i.$Combine(m);i.$Combine(l)}function gc(){var b=this,a=Pb();$Jssor$.$CssZIndex(a,0);$Jssor$.$Css(a,"pointerEvents","none");b.$Elmt=a;b.$AddClipElement=function(b){$Jssor$.$AppendChild(a,b);$Jssor$.$ShowElement(a)};b.$Clear=function(){$Jssor$.$HideElement(a);$Jssor$.$Empty(a)}}function qc(j,i){var c=this,q,u,r,g,w=[],t,z,Q,D,I,C,k,s,n,O;$JssorAnimator$.call(c,-h,h+1,{$SlideItemAnimator:true});function A(a){q&&q.$Revert();P(j,a,0);C=true;q=new v.$Class(j,v,$Jssor$.$ParseFloat($Jssor$.$AttributeEx(j,"idle"))||ec);$JssorDebug$.$LiveStamp(q,"caption_slider_"+Db);$JssorDebug$.$Execute(function(){Db++});q.$GoToPosition(0)}function S(){q.$Version<v.$Version&&A()}function G(l,n,k){if(!D){D=true;if(g&&k){var e=k.width,d=k.height,j=e,h=d;if(e&&d&&a.$FillMode){if(a.$FillMode&3&&(!(a.$FillMode&4)||e>y||d>x)){var f=false,m=y/x*d/e;if(a.$FillMode&1)f=m>1;else if(a.$FillMode&2)f=m<1;j=f?e*x/d:y;h=f?x:d*y/e}$Jssor$.$CssWidth(g,j);$Jssor$.$CssHeight(g,h);$Jssor$.$CssTop(g,(x-h)/2);$Jssor$.$CssLeft(g,(y-j)/2)}$Jssor$.$CssPosition(g,"absolute");b.$TriggerEvent($JssorSlider$.$EVT_LOAD_END,i)}}$Jssor$.$HideElement(n);l&&l(c)}function R(b,d,g,h){if(h==J&&e==i&&F)if(!uc){var a=f(b);m.$Initialize(a,i,d,c,g);d.$HideContentForSlideshow();L.$Shift(a-L.$GetPosition_OuterBegin()-1);L.$GoToPosition(a);l.$PlayCarousel(b,b,0)}}function U(b){if(b==J&&e==i){if(!k){var a=null;if(m)if(m.$Index==i)a=m.$GetProcessor();else m.$Clear();S();k=new nc(j,i,a,q);k.$SetPlayer(n)}!k.$IsPlaying()&&k.$Replay()}}function K(d,b,e){if(d==i){if(d!=b)o[b]&&o[b].$ParkOut();else!e&&k&&k.$AdjustIdleOnPark();n&&n.$Enable();var f=J=$Jssor$.$GetNow();c.$LoadImage($Jssor$.$CreateCallback(null,U,f))}else{var j=Math.abs(i-d),g=h+a.$LazyLoading-1;(!I||j<=g)&&c.$LoadImage()}}function V(){if(e==i&&k){k.$Stop();n&&n.$Quit();n&&n.$Disable();k.$OpenSlideshowPanel()}}function W(){e==i&&k&&k.$Stop()}function T(a){!B&&b.$TriggerEvent($JssorSlider$.$EVT_CLICK,i,a)}function H(){n=s.pInstance;k&&k.$SetPlayer(n)}c.$LoadImage=function(c,a){a=a||r;if(w.length&&!D){$Jssor$.$ShowElement(a);if(!Q){Q=true;b.$TriggerEvent($JssorSlider$.$EVT_LOAD_START,i);$Jssor$.$Each(w,function(a){if(!$Jssor$.$Attribute(a,"src")){a.src=$Jssor$.$AttributeEx(a,"src2");$Jssor$.$CssDisplay(a,a["display-origin"])}})}$Jssor$.$LoadImages(w,g,$Jssor$.$CreateCallback(null,G,c,a))}else G(c,a)};c.$GoForNextSlide=function(){var g=i;if(a.$AutoPlaySteps<0)g-=d;var b=g+a.$AutoPlaySteps*lc;if(p&2)b=f(b);if(!(p&1))b=Math.max(0,Math.min(b,d-h));if(b!=i){if(m){var c=m.$GetTransition(d);if(c){var j=J=$Jssor$.$GetNow(),e=o[f(b)];return e.$LoadImage($Jssor$.$CreateCallback(null,R,b,e,c,j),r)}}bb(b)}};c.$TryActivate=function(){K(i,i,true)};c.$ParkOut=function(){n&&n.$Quit();n&&n.$Disable();c.$UnhideContentForSlideshow();k&&k.$Abort();k=null;A()};c.$StampSlideItemElements=function(a){a=O+"_"+a;$JssorDebug$.$Execute(function(){g&&$Jssor$.$Attribute(g,"debug-id",a+"_slide_item_image_id");$Jssor$.$Attribute(j,"debug-id",a+"_slide_item_item_id")});$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(u,"debug-id",a+"_slide_item_wrapper_id")});$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(r,"debug-id",a+"_loading_container_id")})};c.$HideContentForSlideshow=function(){$Jssor$.$HideElement(j)};c.$UnhideContentForSlideshow=function(){$Jssor$.$ShowElement(j)};c.$EnablePlayer=function(){n&&n.$Enable()};function P(a,b,c){$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(a,"jssor-slider")&&$JssorDebug$.$Log("Child slider found.")});if($Jssor$.$Attribute(a,"jssor-slider"))return;if(!C){if(a.tagName=="IMG"){w.push(a);if(!$Jssor$.$Attribute(a,"src")){I=true;a["display-origin"]=$Jssor$.$CssDisplay(a);$Jssor$.$HideElement(a)}}$Jssor$.$IsBrowserIe9Earlier()&&$Jssor$.$CssZIndex(a,($Jssor$.$CssZIndex(a)||0)+1)}var d=$Jssor$.$Children(a);$Jssor$.$Each(d,function(d){var f=d.tagName,h=$Jssor$.$AttributeEx(d,"u");if(h=="player"&&!s){s=d;if(s.pInstance)H();else $Jssor$.$AddEvent(s,"dataavailable",H)}if(h=="caption"){if(b){$Jssor$.$CssTransformOrigin(d,$Jssor$.$AttributeEx(d,"to"));$Jssor$.$CssBackfaceVisibility(d,$Jssor$.$AttributeEx(d,"bf"));$Jssor$.$CssTransformStyle(d,"preserve-3d")}else if(!$Jssor$.$IsBrowserIE()){var e=$Jssor$.$CloneNode(d,false,true);$Jssor$.$InsertBefore(e,d,a);$Jssor$.$RemoveElement(d,a);d=e;b=true}}else if(!C&&!c&&!g){if(f=="A"){if($Jssor$.$AttributeEx(d,"u")=="image"){g=$Jssor$.$FindChildByTag(d,"IMG");$JssorDebug$.$Execute(function(){!g&&$JssorDebug$.$Error("slide html code definition error, no 'IMG' found in a 'image with link' slide.\r\n"+a.outerHTML)})}else g=$Jssor$.$FindChild(d,"image",true);if(g){t=d;$Jssor$.$CssDisplay(t,"block");$Jssor$.$SetStyles(t,M);z=$Jssor$.$CloneNode(t,true);$Jssor$.$CssPosition(t,"relative");$Jssor$.$CssOpacity(z,0);$Jssor$.$Css(z,"backgroundColor","#000")}}else if(f=="IMG"&&$Jssor$.$AttributeEx(d,"u")=="image")g=d;if(g){g.border=0;$Jssor$.$SetStyles(g,M)}}P(d,b,c+1)})}c.$OnInnerOffsetChange=function(c,b){var a=h-b;Rb(u,a)};c.$Index=i;$JssorObject$.call(c);$Jssor$.$CssPerspective(j,$Jssor$.$AttributeEx(j,"p"));$Jssor$.$CssPerspectiveOrigin(j,$Jssor$.$AttributeEx(j,"po"));var E=$Jssor$.$FindChild(j,"thumb",true);if(E){c.$Thumb=$Jssor$.$CloneNode(E);$Jssor$.$HideElement(E)}$Jssor$.$ShowElement(j);r=$Jssor$.$CloneNode(N);$Jssor$.$CssZIndex(r,1e3);$Jssor$.$AddEvent(j,"click",T);A(true);c.$Image=g;c.$Link=z;c.$Item=j;c.$Wrapper=u=j;$Jssor$.$AppendChild(u,r);b.$On(203,K);b.$On(28,W);b.$On(24,V);$JssorDebug$.$Execute(function(){O=cc++});$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(u,"debug-id","slide-"+i)})}function nc(y,f,l,p){var a=this,j=0,u=0,g,h,d,c,i,t,s,k=o[f];$JssorAnimator$.call(a,0,0);function v(){$Jssor$.$Empty(C);Tb&&i&&k.$Link&&$Jssor$.$AppendChild(C,k.$Link);$Jssor$.$ShowElement(C,!i&&k.$Image)}function w(){a.$Replay()}function x(b){s=b;a.$Stop();a.$Replay()}a.$Replay=function(){var l=a.$GetPosition_Display();if(!n&&!E&&!s&&e==f){if(!l){if(g&&!i){i=true;a.$OpenSlideshowPanel(true);b.$TriggerEvent($JssorSlider$.$EVT_SLIDESHOW_START,f,j,u,g,c)}v()}var m,p=$JssorSlider$.$EVT_STATE_CHANGE;if(l!=c)if(l==d)m=c;else if(l==h)m=d;else if(!l)m=h;else m=a.$GetPlayToPosition();b.$TriggerEvent(p,f,l,j,h,d,c);var o=F&&(!q||r);if(l==c)(d!=c&&!(q&12)||o)&&k.$GoForNextSlide();else(o||l!=d)&&a.$PlayToPosition(m,w)}};a.$AdjustIdleOnPark=function(){d==c&&d==a.$GetPosition_Display()&&a.$GoToPosition(h)};a.$Abort=function(){m&&m.$Index==f&&m.$Clear();var e=a.$GetPosition_Display();e<c&&b.$TriggerEvent($JssorSlider$.$EVT_STATE_CHANGE,f,-e-1,j,h,d,c)};a.$OpenSlideshowPanel=function(a){l&&$Jssor$.$CssOverflow(V,a&&l.$Transition.$Outside?"":"hidden")};a.$OnInnerOffsetChange=function(e,a){if(i&&a>=g){i=false;v();k.$UnhideContentForSlideshow();m.$Clear();b.$TriggerEvent($JssorSlider$.$EVT_SLIDESHOW_END,f,j,u,g,c)}b.$TriggerEvent($JssorSlider$.$EVT_PROGRESS_CHANGE,f,a,j,h,d,c)};a.$SetPlayer=function(a){if(a&&!t){t=a;a.$On($JssorPlayer$.$EVT_SWITCH,x)}};l&&a.$Chain(l);g=a.$GetPosition_OuterEnd();a.$Chain(p);h=g+p.$IdleBegin;d=g+p.$IdleEnd;c=a.$GetPosition_OuterEnd()}function Rb(e,d){var c=j>0?j:H,a=sb*d*(c&1),b=tb*d*(c>>1&1);a=Math.round(a);b=Math.round(b);$Jssor$.$CssLeft(e,a);$Jssor$.$CssTop(e,b)}function Ib(){fb=E;Bb=l.$GetPlayToPosition();s=i.$GetPosition()}function Wb(){Ib();if(n||!r&&q&12){l.$Stop();b.$TriggerEvent($JssorSlider$.$EVT_FREEZE)}}function Ub(f){if(!n&&(r||!(q&12))&&!l.$IsPlaying()){var c=i.$GetPosition(),b=Math.ceil(s);if(f&&Math.abs(t)>=a.$MinDragOffsetToSlide){b=Math.ceil(c);b+=S}if(!(p&1))b=Math.min(d-h,Math.max(b,0));var e=Math.abs(b-c);e=1-Math.pow(1-e,5);if(!B&&fb)l.$Continue(Bb);else if(c==b){kb.$EnablePlayer();kb.$TryActivate()}else l.$PlayCarousel(c,b,e*Nb)}}function Ab(a){!$Jssor$.$AttributeEx($Jssor$.$EvtSrc(a),"nodrag")&&$Jssor$.$CancelEvent(a)}function jc(a){Qb(a,1)}function Qb(a,c){a=$Jssor$.$GetEvent(a);var g=$Jssor$.$EvtSrc(a);if(!z&&!$Jssor$.$AttributeEx(g,"nodrag")&&kc()&&(!c||a.touches.length==1)){n=true;rb=false;J=null;$Jssor$.$AddEvent(document,c?"touchmove":"mousemove",vb);$Jssor$.$GetNow();B=0;Wb();if(!fb)j=0;if(c){var e=a.touches[0];mb=e.clientX;nb=e.clientY}else{var d=$Jssor$.$MousePosition(a);mb=d.x;nb=d.y}t=0;R=0;S=0;b.$TriggerEvent($JssorSlider$.$EVT_DRAG_START,f(s),s,a)}}function vb(b){if(n){b=$Jssor$.$GetEvent(b);var c;if(b.type!="mousemove"){var o=b.touches[0];c={x:o.clientX,y:o.clientY}}else c=$Jssor$.$MousePosition(b);if(c){var k=c.x-mb,m=c.y-nb;if(Math.floor(s)!=s)j=j||H&z;if((k||m)&&!j){if(z==3)if(Math.abs(m)>Math.abs(k))j=2;else j=1;else j=z;if(X&&j==1&&Math.abs(m)-Math.abs(k)>3)rb=true}if(j){var a=m,i=tb;if(j==1){a=k;i=sb}if(!(p&1)){if(a>0){var f=i*e,g=a-f;if(g>0)a=f+Math.sqrt(g)*5}if(a<0){var f=i*(d-h-e),g=-a-f;if(g>0)a=-f-Math.sqrt(g)*5}}if(t-R<-2)S=0;else if(t-R>2)S=-1;R=t;t=a;jb=s-t/i/(Q||1);if(t&&j&&!rb){$Jssor$.$CancelEvent(b);if(!E)l.$StandBy(jb);else l.$SetStandByPosition(jb)}}}}}function ab(){hc();if(n){n=false;$Jssor$.$GetNow();$Jssor$.$RemoveEvent(document,"mousemove",vb);$Jssor$.$RemoveEvent(document,"touchmove",vb);B=t;l.$Stop();var a=i.$GetPosition();b.$TriggerEvent($JssorSlider$.$EVT_DRAG_END,f(a),a,f(s),s);q&12&&Ib();Ub(true)}}function ac(b){if(B){$Jssor$.$StopEvent(b);var a=$Jssor$.$EvtSrc(b);while(a&&g!==a){a.tagName=="A"&&$Jssor$.$CancelEvent(b);try{a=a.parentNode}catch(c){break}}}}function dc(a){o[e];e=f(a);kb=o[e];Mb(a);return e}function vc(a,c){j=0;dc(a);b.$TriggerEvent($JssorSlider$.$EVT_PARK,f(a),c)}function Mb(a,b){pb=a;$Jssor$.$Each(K,function(c){c.$SetCurrentIndex(f(a),a,b)})}function kc(){var b=$JssorSlider$.$DragRegistry||0,a=P;if(X)a&1&&(a&=1);$JssorSlider$.$DragRegistry|=a;return z=a&~b}function hc(){if(z){$JssorSlider$.$DragRegistry&=~P;z=0}}function Pb(){var a=$Jssor$.$CreateDiv();$Jssor$.$SetStyles(a,M);$Jssor$.$CssPosition(a,"absolute");return a}function f(a){return(a%d+d)%d}function bc(b,c){if(c)if(!p){b=Math.min(Math.max(b+pb,0),d-h);c=false}else if(p&2){b=f(b+pb);c=false}bb(b,a.$SlideDuration,c)}function qb(){$Jssor$.$Each(K,function(a){a.$Show(a.$Options.$ChanceToShow<=r)})}function Yb(){if(!r){r=1;qb();if(!n){q&12&&Ub();q&3&&o[e].$TryActivate()}}}function Xb(){if(r){r=0;qb();n||!(q&12)||Wb()}}function Zb(){M={$Width:y,$Height:x,$Top:0,$Left:0};$Jssor$.$Each(D,function(a){$Jssor$.$SetStyles(a,M);$Jssor$.$CssPosition(a,"absolute");$Jssor$.$CssOverflow(a,"hidden");$Jssor$.$HideElement(a)});$Jssor$.$SetStyles(N,M)}function Z(b,a){bb(b,a,true)}function bb(g,e,k){if(Kb&&(!n&&(r||!(q&12))||a.$NaviQuitDrag)){E=true;n=false;l.$Stop();if(e==undefined)e=Nb;var c=xb.$GetPosition_Display(),b=g;if(k){b=c+g;if(g>0)b=Math.ceil(b);else b=Math.floor(b)}if(p&2)b=f(b);if(!(p&1))b=Math.max(0,Math.min(b,d-h));var j=(b-c)%d;b=c+j;var i=c==b?0:e*Math.abs(j);i=Math.min(i,e*h*1.5);l.$PlayCarousel(c,b,i||1)}}b.$PlayTo=bb;b.$GoTo=function(a){i.$GoToPosition(a)};b.$Next=function(){Z(1)};b.$Prev=function(){Z(-1)};b.$Pause=function(){F=false};b.$Play=function(){if(!F){F=true;o[e]&&o[e].$TryActivate()}};b.$SetSlideshowTransitions=function(b){$JssorDebug$.$Execute(function(){(!b||!b.length)&&$JssorDebug$.$Error("Can not set slideshow transitions, no transitions specified.")});a.$SlideshowOptions.$Transitions=b};b.$SetCaptionTransitions=function(a){$JssorDebug$.$Execute(function(){(!a||!a.length)&&$JssorDebug$.$Error("Can not set caption transitions, no transitions specified")});v.$Transitions=a;v.$Version=$Jssor$.$GetNow()};b.$SlidesCount=function(){return D.length};b.$CurrentIndex=function(){return e};b.$IsAutoPlaying=function(){return F};b.$IsDragging=function(){return n};b.$IsSliding=function(){return E};b.$IsMouseOver=function(){return!r};b.$LastDragSucceded=function(){return B};function O(){return $Jssor$.$CssWidth(k||c)}function W(){return $Jssor$.$CssHeight(k||c)}b.$OriginalWidth=b.$GetOriginalWidth=O;b.$OriginalHeight=b.$GetOriginalHeight=W;function zb(d,e){if(d==undefined)return $Jssor$.$CssWidth(c);if(!k){$JssorDebug$.$Execute(function(){var b=$Jssor$.$Css(c,"width"),a=$Jssor$.$Css(c,"height"),e=$Jssor$.$CssP(c,"width"),d=$Jssor$.$CssP(c,"height");(!b||b.indexOf("px")==-1)&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not specified. Please specify 'width' in pixel. e.g. 'width: 600px;'");(!a||a.indexOf("px")==-1)&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not specified. Please specify 'height' in pixel. e.g. 'height: 300px;'");b.indexOf("%")!=-1&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. Please specify 'width' in pixel. e.g. 'width: 600px;'");a.indexOf("%")!=-1&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. Please specify 'height' in pixel. e.g. 'height: 300px;'");!e&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'width' of 'outer container' not valid. 'width' of 'outer container' should be positive number. e.g. 'width: 600px;'");!d&&$JssorDebug$.$Fail("Cannot scale jssor slider, 'height' of 'outer container' not valid. 'height' of 'outer container' should be positive number. e.g. 'height: 300px;'")});var a=$Jssor$.$CreateDiv(document);$Jssor$.$ClassName(a,$Jssor$.$ClassName(c));$Jssor$.$CssCssText(a,$Jssor$.$CssCssText(c));$Jssor$.$CssDisplay(a,"block");$Jssor$.$CssPosition(a,"relative");$Jssor$.$CssTop(a,0);$Jssor$.$CssLeft(a,0);$Jssor$.$CssOverflow(a,"visible");k=$Jssor$.$CreateDiv(document);$Jssor$.$CssPosition(k,"absolute");$Jssor$.$CssTop(k,0);$Jssor$.$CssLeft(k,0);$Jssor$.$CssWidth(k,$Jssor$.$CssWidth(c));$Jssor$.$CssHeight(k,$Jssor$.$CssHeight(c));$Jssor$.$CssTransformOrigin(k,"0 0");$Jssor$.$AppendChild(k,a);var h=$Jssor$.$Children(c);$Jssor$.$AppendChild(c,k);$Jssor$.$Css(c,"backgroundImage","");$Jssor$.$Each(h,function(b){$Jssor$.$AppendChild($Jssor$.$AttributeEx(b,"noscale")?c:a,b);$Jssor$.$AttributeEx(b,"autocenter")&&Cb.push(b)})}$JssorDebug$.$Execute(function(){(!d||d<0)&&$JssorDebug$.$Fail("'$ScaleWidth' error, 'dimension' should be positive value.")});$JssorDebug$.$Execute(function(){if(!Eb)Eb=b.$Elmt.scrollWidth});Q=d/(e?$Jssor$.$CssHeight:$Jssor$.$CssWidth)(k);$Jssor$.$CssScale(k,Q);var g=e?Q*O():d,f=e?d:Q*W();$Jssor$.$CssWidth(c,g);$Jssor$.$CssHeight(c,f);$Jssor$.$Each(Cb,function(a){var b=$Jssor$.$ParseInt($Jssor$.$AttributeEx(a,"autocenter"));$Jssor$.$CenterElement(a,b)})}b.$ScaleHeight=b.$GetScaleHeight=function(a){if(a==undefined)return $Jssor$.$CssHeight(c);zb(a,true)};b.$ScaleWidth=b.$SetScaleWidth=b.$GetScaleWidth=zb;b.$GetVirtualIndex=function(a){var c=Math.ceil(f(T/Sb)),b=f(a-e+c);if(b>h){if(a-e>d/2)a-=d;else if(a-e<=-d/2)a+=d}else a=e+b-c;return a};$JssorObject$.call(b);$JssorDebug$.$Execute(function(){var a=$Jssor$.$GetElement(c);!a&&$JssorDebug$.$Fail("Outer container '"+c+"' not found.")});b.$Elmt=c=$Jssor$.$GetElement(c);var Eb,Db=1,a=$Jssor$.$Extend({$FillMode:0,$LazyLoading:1,$ArrowKeyNavigation:1,$StartIndex:0,$AutoPlay:false,$Loop:1,$NaviQuitDrag:true,$AutoPlaySteps:1,$AutoPlayInterval:3e3,$PauseOnHover:1,$SlideDuration:500,$SlideEasing:$JssorEasing$.$EaseOutQuad,$MinDragOffsetToSlide:20,$SlideSpacing:0,$Cols:1,$Align:0,$UISearchMode:1,$PlayOrientation:1,$DragOrientation:1},Vb);if(a.$Idle!=undefined)a.$AutoPlayInterval=a.$Idle;if(a.$DisplayPieces!=undefined)a.$Cols=a.$DisplayPieces;if(a.$ParkingPosition!=undefined)a.$Align=a.$ParkingPosition;$JssorDebug$.$Execute(function(){a=$Jssor$.$Extend({$SlideWidth:undefined,$SlideHeight:undefined,$SlideshowOptions:undefined,$CaptionSliderOptions:undefined,$BulletNavigatorOptions:undefined,$ArrowNavigatorOptions:undefined,$ThumbnailNavigatorOptions:undefined},a)});var H=a.$PlayOrientation&3,lc=(a.$PlayOrientation&4)/-4||1,w=a.$SlideshowOptions,v=$Jssor$.$Extend({$Class:$JssorCaptionSliderBase$,$PlayInMode:1,$PlayOutMode:1},a.$CaptionSliderOptions);v.$Transitions=v.$Transitions||v.$CaptionTransitions;var G=a.$BulletNavigatorOptions,u=a.$ArrowNavigatorOptions,A=a.$ThumbnailNavigatorOptions;$JssorDebug$.$Execute(function(){w&&!w.$Class&&$JssorDebug$.$Fail("Option $SlideshowOptions error, class not specified.")});$JssorDebug$.$Execute(function(){a.$CaptionSliderOptions&&!a.$CaptionSliderOptions.$Class&&$JssorDebug$.$Fail("Option $CaptionSliderOptions error, class not specified.")});$JssorDebug$.$Execute(function(){G&&!G.$Class&&$JssorDebug$.$Fail("Option $BulletNavigatorOptions error, class not specified.")});$JssorDebug$.$Execute(function(){u&&!u.$Class&&$JssorDebug$.$Fail("Option $ArrowNavigatorOptions error, class not specified.")});$JssorDebug$.$Execute(function(){A&&!A.$Class&&$JssorDebug$.$Fail("Option $ThumbnailNavigatorOptions error, class not specified.")});var I=!a.$UISearchMode,k,g=$Jssor$.$FindChild(c,"slides",I),N=$Jssor$.$FindChild(c,"loading",I)||$Jssor$.$CreateDiv(document),eb=$Jssor$.$FindChild(c,"navigator",I),wb=$Jssor$.$FindChild(c,"arrowleft",I),ub=$Jssor$.$FindChild(c,"arrowright",I),db=$Jssor$.$FindChild(c,"thumbnavigator",I);$JssorDebug$.$Execute(function(){if(eb&&!G)throw new Error("Bullet navigator container defined but $BulletNavigatorOptions not specified.");if((wb||ub)&&!u)throw new Error("arrowleft or arrowright defined, but $ArrowNavigatorOptions not specified.");if(db&&!A)throw new Error("Thumbnail navigator container defined, but $ThumbnailNavigatorOptions not specified.");});var hb=$Jssor$.$CssWidth(g),gb=$Jssor$.$CssHeight(g);$JssorDebug$.$Execute(function(){isNaN(hb)&&$JssorDebug$.$Fail("Width of slides container wrong specification, it should be specified in pixel (like style='width: 600px;').");hb==undefined&&$JssorDebug$.$Fail("Width of slides container not specified, it should be specified in pixel (like style='width: 600px;').");isNaN(gb)&&$JssorDebug$.$Fail("Height of slides container wrong specification, it should be specified in pixel (like style='height: 300px;').");gb==undefined&&$JssorDebug$.$Fail("Height of slides container not specified, it should be specified in pixel (like style='height: 300px;').");var c=$Jssor$.$CssOverflow(g),a=$Jssor$.$Css(g,"overflowX"),b=$Jssor$.$Css(g,"overflowY");c!="hidden"&&(a!="hidden"||b!="hidden")&&$JssorDebug$.$Fail("Overflow of slides container wrong specification, it should be specified as 'hidden' (style='overflow:hidden;').")});$JssorDebug$.$Execute(function(){!$Jssor$.$IsNumeric(a.$Cols)&&$JssorDebug$.$Fail("Option $Cols error, it should be a numeric value and greater than or equal to 1.");a.$Cols<1&&$JssorDebug$.$Fail("Option $Cols error, it should be greater than or equal to 1.");a.$Cols>1&&a.$DragOrientation&&a.$DragOrientation!=H&&$JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $Cols is greater than 1.");!$Jssor$.$IsNumeric(a.$Align)&&$JssorDebug$.$Fail("Option $Align error, it should be a numeric value.");a.$Align&&a.$DragOrientation&&a.$DragOrientation!=H&&$JssorDebug$.$Fail("Option $DragOrientation error, it should be 0 or the same of $PlayOrientation when $Align is not equal to 0.")});var M,D=[],mc=$Jssor$.$Children(g);$Jssor$.$Each(mc,function(a){if(a.tagName=="DIV"&&!$Jssor$.$AttributeEx(a,"u"))D.push(a);else $Jssor$.$IsBrowserIe9Earlier()&&$Jssor$.$CssZIndex(a,($Jssor$.$CssZIndex(a)||0)+1)});$JssorDebug$.$Execute(function(){D.length<1&&$JssorDebug$.$Error("Slides html code definition error, there must be at least 1 slide to initialize a slider.")});var cc=0,e=-1,pb,kb,d=D.length,y=a.$SlideWidth||hb,x=a.$SlideHeight||gb,Ob=a.$SlideSpacing,sb=y+Ob,tb=x+Ob,Sb=H&1?sb:tb,h=Math.min(a.$Cols,d),V,j,z,rb,K=[],Jb,Lb,Hb,Tb,uc,F,q=a.$PauseOnHover,ec=a.$AutoPlayInterval,Nb=a.$SlideDuration,ib,lb,T,Kb=h<d,p=Kb?a.$Loop:0,P,B,r=1,E,n,J,mb=0,nb=0,t,R,S,xb,i,L,l,ob=new gc,Q,Cb=[];F=a.$AutoPlay;b.$Options=Vb;Zb();$Jssor$.$Attribute(c,"jssor-slider",true);$Jssor$.$CssZIndex(g,$Jssor$.$CssZIndex(g)||0);$Jssor$.$CssPosition(g,"absolute");V=$Jssor$.$CloneNode(g,true);$Jssor$.$InsertBefore(V,g);if(w){Tb=w.$ShowLink;ib=w.$Class;$JssorDebug$.$Execute(function(){(!w.$Transitions||!w.$Transitions.length)&&$JssorDebug$.$Error("Invalid '$SlideshowOptions', no '$Transitions' specified.")});lb=h==1&&d>1&&ib&&(!$Jssor$.$IsBrowserIE()||$Jssor$.$BrowserVersion()>=8)}T=lb||h>=d||!(p&1)?0:a.$Align;P=(h>1||T?H:-1)&a.$DragOrientation;var U=g,o=[],m,C,yb=$Jssor$.$Device(),X=yb.$Touchable,s,fb,Bb,jb;yb.$TouchActionAttr&&$Jssor$.$Css(U,yb.$TouchActionAttr,([null,"pan-y","pan-x","none"])[P]||"");L=new rc;if(lb)m=new ib(ob,y,x,w,X);$Jssor$.$AppendChild(V,L.$Wrapper);$Jssor$.$CssOverflow(g,"hidden");C=Pb();$Jssor$.$Css(C,"backgroundColor","#000");$Jssor$.$CssOpacity(C,0);$Jssor$.$InsertBefore(C,U.firstChild,U);for(var cb=0;cb<D.length;cb++){var oc=D[cb],pc=new qc(oc,cb);o.push(pc)}$Jssor$.$HideElement(N);$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(N,"debug-id","loading-container")});xb=new sc;l=new fc(xb,L);$JssorDebug$.$Execute(function(){$Jssor$.$Attribute(U,"debug-id","slide-board")});if(P){$Jssor$.$AddEvent(g,"mousedown",Qb);$Jssor$.$AddEvent(g,"touchstart",jc);$Jssor$.$AddEvent(g,"dragstart",Ab);$Jssor$.$AddEvent(g,"selectstart",Ab);$Jssor$.$AddEvent(document,"mouseup",ab);$Jssor$.$AddEvent(document,"touchend",ab);$Jssor$.$AddEvent(document,"touchcancel",ab);$Jssor$.$AddEvent(window,"blur",ab)}q&=X?10:5;if(eb&&G){Jb=new G.$Class(eb,G,O(),W());K.push(Jb)}if(u&&wb&&ub){u.$Loop=p;u.$Cols=h;Lb=new u.$Class(wb,ub,u,O(),W());K.push(Lb)}if(db&&A){A.$StartIndex=a.$StartIndex;Hb=new A.$Class(db,A);K.push(Hb)}$Jssor$.$Each(K,function(a){a.$Reset(d,o,N);a.$On($JssorNavigatorEvents$.$NAVIGATIONREQUEST,bc)});$Jssor$.$Css(c,"visibility","visible");zb(O());$Jssor$.$AddEvent(g,"click",ac);$Jssor$.$AddEvent(c,"mouseout",$Jssor$.$MouseOverOutFilter(Yb,c));$Jssor$.$AddEvent(c,"mouseover",$Jssor$.$MouseOverOutFilter(Xb,c));qb();a.$ArrowKeyNavigation&&$Jssor$.$AddEvent(document,"keydown",function(b){if(b.keyCode==37)Z(-a.$ArrowKeyNavigation);else b.keyCode==39&&Z(a.$ArrowKeyNavigation)});var Y=a.$StartIndex;if(!(p&1))Y=Math.max(0,Math.min(Y,d-h));l.$PlayCarousel(Y,Y,0)};$JssorSlider$.$EVT_CLICK=21;$JssorSlider$.$EVT_DRAG_START=22;$JssorSlider$.$EVT_DRAG_END=23;$JssorSlider$.$EVT_SWIPE_START=24;$JssorSlider$.$EVT_SWIPE_END=25;$JssorSlider$.$EVT_LOAD_START=26;$JssorSlider$.$EVT_LOAD_END=27;$JssorSlider$.$EVT_FREEZE=28;$JssorSlider$.$EVT_POSITION_CHANGE=202;$JssorSlider$.$EVT_PARK=203;$JssorSlider$.$EVT_SLIDESHOW_START=206;$JssorSlider$.$EVT_SLIDESHOW_END=207;$JssorSlider$.$EVT_PROGRESS_CHANGE=208;$JssorSlider$.$EVT_STATE_CHANGE=209;var $JssorNavigatorEvents$={$NAVIGATIONREQUEST:1,$INDEXCHANGE:2,$RESET:3},$JssorBulletNavigator$=window.$JssorBulletNavigator$=function(b,v){var d=this;$JssorObject$.call(d);b=$Jssor$.$GetElement(b);var l,t,s,k,g=0,a,h,f,p,q,e,c,j,i,u=[],r=[];function o(a){a!=-1&&r[a].$Selected(a==g)}function m(a){d.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST,a*h)}d.$Elmt=b;d.$GetCurrentIndex=function(){return k};d.$SetCurrentIndex=function(a){if(a!=k){var c=g,b=Math.floor(a/h);g=b;k=a;o(c);o(b)}};d.$Show=function(a){$Jssor$.$ShowElement(b,a)};var n;d.$Reset=function(A){if(!n){l=Math.ceil(A/h);g=0;var v=j+p,x=i+q,o=Math.ceil(l/f)-1;t=j+v*(!e?o:f-1);s=i+x*(e?o:f-1);$Jssor$.$CssWidth(b,t);$Jssor$.$CssHeight(b,s);for(var d=0;d<l;d++){var z=$Jssor$.$CreateSpan();$Jssor$.$InnerText(z,d+1);var k=$Jssor$.$BuildElement(c,"numbertemplate",z,true);$Jssor$.$CssPosition(k,"absolute");var y=d%(o+1);$Jssor$.$CssLeft(k,!e?v*y:d%f*v);$Jssor$.$CssTop(k,e?x*y:Math.floor(d/(o+1))*x);$Jssor$.$AppendChild(b,k);u[d]=k;a.$ActionMode&1&&$Jssor$.$AddEvent(k,"click",$Jssor$.$CreateCallback(null,m,d));a.$ActionMode&2&&$Jssor$.$AddEvent(k,"mouseover",$Jssor$.$MouseOverOutFilter($Jssor$.$CreateCallback(null,m,d),k));r[d]=$Jssor$.$Buttonize(k)}n=true}};d.$Options=a=$Jssor$.$Extend({$SpacingX:10,$SpacingY:10,$Orientation:1,$ActionMode:1},v);$JssorDebug$.$Execute(function(){a=$Jssor$.$Extend({$Steps:undefined,$Lanes:undefined},a)});c=$Jssor$.$FindChild(b,"prototype");$JssorDebug$.$Execute(function(){!c&&$JssorDebug$.$Fail("Navigator item prototype not defined.");isNaN($Jssor$.$CssWidth(c))&&$JssorDebug$.$Fail("Width of 'navigator item prototype' not specified.");isNaN($Jssor$.$CssHeight(c))&&$JssorDebug$.$Fail("Height of 'navigator item prototype' not specified.")});j=$Jssor$.$CssWidth(c);i=$Jssor$.$CssHeight(c);$Jssor$.$RemoveElement(c,b);h=a.$Steps||1;f=a.$Lanes||1;p=a.$SpacingX;q=a.$SpacingY;e=a.$Orientation-1;a.$Scale==false&&$Jssor$.$Attribute(b,"noscale",true);a.$AutoCenter&&$Jssor$.$Attribute(b,"autocenter",a.$AutoCenter)},$JssorArrowNavigator$=window.$JssorArrowNavigator$=function(a,b,f){var c=this;$JssorObject$.call(c);$JssorDebug$.$Execute(function(){!a&&$JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowleft' not defined. Define 'arrowleft' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");!b&&$JssorDebug$.$Fail("Option '$ArrowNavigatorOptions' spepcified, but UI 'arrowright' not defined. Define 'arrowright' to enable direct navigation, or remove option '$ArrowNavigatorOptions' to disable direct navigation.");isNaN($Jssor$.$CssWidth(a))&&$JssorDebug$.$Fail("Width of 'arrow left' not specified.");isNaN($Jssor$.$CssWidth(b))&&$JssorDebug$.$Fail("Width of 'arrow right' not specified.");isNaN($Jssor$.$CssHeight(a))&&$JssorDebug$.$Fail("Height of 'arrow left' not specified.");isNaN($Jssor$.$CssHeight(b))&&$JssorDebug$.$Fail("Height of 'arrow right' not specified.")});var l,k,d,e,g;$Jssor$.$CssWidth(a);$Jssor$.$CssHeight(a);function h(a){c.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST,a,true)}function j(c){$Jssor$.$ShowElement(a,c||!f.$Loop&&d==0);$Jssor$.$ShowElement(b,c||!f.$Loop&&d>=k-f.$Cols);l=c}c.$GetCurrentIndex=function(){return d};c.$SetCurrentIndex=function(b,a,c){if(c)d=a;else{d=b;j(l)}};c.$Show=j;var i;c.$Reset=function(c){k=c;d=0;if(!i){$Jssor$.$AddEvent(a,"click",$Jssor$.$CreateCallback(null,h,-g));$Jssor$.$AddEvent(b,"click",$Jssor$.$CreateCallback(null,h,g));$Jssor$.$Buttonize(a);$Jssor$.$Buttonize(b);i=true}};c.$Options=e=$Jssor$.$Extend({$Steps:1},f);g=e.$Steps;if(e.$Scale==false){$Jssor$.$Attribute(a,"noscale",true);$Jssor$.$Attribute(b,"noscale",true)}if(e.$AutoCenter){$Jssor$.$Attribute(a,"autocenter",e.$AutoCenter);$Jssor$.$Attribute(b,"autocenter",e.$AutoCenter)}},$JssorThumbnailNavigator$=window.$JssorThumbnailNavigator$=function(d,t){var e=this,r,h,a,n=[],p,o,b,i,j,m,l,g,k,c,f;$JssorObject$.call(e);d=$Jssor$.$GetElement(d);function s(m,d){var g=this,c,l,j;function n(){l.$Selected(h==d)}function i(g){if(g||!k.$LastDragSucceded()){var a=b-d%b,c=k.$GetVirtualIndex((d+a)/b-1),f=c*b+b-a;e.$TriggerEvent($JssorNavigatorEvents$.$NAVIGATIONREQUEST,f)}}$JssorDebug$.$Execute(function(){g.$Wrapper=undefined});g.$Index=d;g.$Highlight=n;j=m.$Thumb||m.$Image||$Jssor$.$CreateDiv();g.$Wrapper=c=$Jssor$.$BuildElement(f,"thumbnailtemplate",j,true);l=$Jssor$.$Buttonize(c);a.$ActionMode&1&&$Jssor$.$AddEvent(c,"click",$Jssor$.$CreateCallback(null,i,0));a.$ActionMode&2&&$Jssor$.$AddEvent(c,"mouseover",$Jssor$.$MouseOverOutFilter($Jssor$.$CreateCallback(null,i,1),c))}e.$GetCurrentIndex=function(){return h};e.$SetCurrentIndex=function(c,d,e){var a=h;h=c;a!=-1&&n[a].$Highlight();n[c].$Highlight();!e&&k.$PlayTo(k.$GetVirtualIndex(Math.floor(d/b)))};e.$Show=function(a){$Jssor$.$ShowElement(d,a)};var q;e.$Reset=function(A,y){if(!q){r=A;Math.ceil(r/b);h=-1;g=Math.min(g,y.length);var e=a.$Orientation&1,v=m+(m+i)*(b-1)*(1-e),t=l+(l+j)*(b-1)*e,x=v+(v+i)*(g-1)*e,w=t+(t+j)*(g-1)*(1-e);$Jssor$.$CssPosition(c,"absolute");$Jssor$.$CssOverflow(c,"hidden");a.$AutoCenter&1&&$Jssor$.$CssLeft(c,(p-x)/2);a.$AutoCenter&2&&$Jssor$.$CssTop(c,(o-w)/2);$Jssor$.$CssWidth(c,x);$Jssor$.$CssHeight(c,w);var f=[];$Jssor$.$Each(y,function(o,g){var h=new s(o,g),d=h.$Wrapper,a=Math.floor(g/b),k=g%b;$Jssor$.$CssLeft(d,(m+i)*k*(1-e));$Jssor$.$CssTop(d,(l+j)*k*e);if(!f[a]){f[a]=$Jssor$.$CreateDiv();$Jssor$.$AppendChild(c,f[a])}$Jssor$.$AppendChild(f[a],d);n.push(h)});var z=$Jssor$.$Extend({$AutoPlay:false,$NaviQuitDrag:false,$SlideWidth:v,$SlideHeight:t,$SlideSpacing:i*e+j*(1-e),$MinDragOffsetToSlide:12,$SlideDuration:200,$PauseOnHover:1,$PlayOrientation:a.$Orientation,$DragOrientation:a.$NoDrag||a.$DisableDrag?0:a.$Orientation},a);k=new $JssorSlider$(d,z);q=true}};e.$Options=a=$Jssor$.$Extend({$SpacingX:0,$SpacingY:0,$Cols:1,$Orientation:1,$AutoCenter:3,$ActionMode:1},t);if(a.$DisplayPieces!=undefined)a.$Cols=a.$DisplayPieces;if(a.$Rows!=undefined)a.$Lanes=a.$Rows;$JssorDebug$.$Execute(function(){a=$Jssor$.$Extend({$Lanes:undefined,$Width:undefined,$Height:undefined},a)});p=$Jssor$.$CssWidth(d);o=$Jssor$.$CssHeight(d);$JssorDebug$.$Execute(function(){!p&&$JssorDebug$.$Fail("width of 'thumbnavigator' container not specified.");!o&&$JssorDebug$.$Fail("height of 'thumbnavigator' container not specified.")});c=$Jssor$.$FindChild(d,"slides",true);f=$Jssor$.$FindChild(c,"prototype");$JssorDebug$.$Execute(function(){!f&&$JssorDebug$.$Fail("prototype of 'thumbnavigator' not defined.")});m=$Jssor$.$CssWidth(f);l=$Jssor$.$CssHeight(f);$Jssor$.$RemoveElement(f,c);b=a.$Lanes||1;i=a.$SpacingX;j=a.$SpacingY;g=a.$Cols;a.$Scale==false&&$Jssor$.$Attribute(d,"noscale",true)};function $JssorCaptionSliderBase$(d,c,b){var a=this;$JssorAnimator$.call(a,0,b);a.$Revert=$Jssor$.$EmptyFunction;a.$IdleBegin=0;a.$IdleEnd=b}var $JssorCaptionSlider$=window.$JssorCaptionSlider$=function(f,d,g){$JssorDebug$.$Execute(function(){!d.$Transitions&&$JssorDebug$.$Error("'$CaptionSliderOptions' option error, '$CaptionSliderOptions.$Transitions' not specified.")});var a=this;$JssorAnimator$.call(a,0,0);var c,b;function e(l,f,d){var a=this,e,j=d?f.$PlayInMode:f.$PlayOutMode,c=f.$Transitions,k={$Transition:"t",$Delay:"d",$Duration:"du",x:"x",y:"y",$Rotate:"r",$Zoom:"z",$Opacity:"f",$BeginTime:"b"},b={$Default:function(b,a){if(!isNaN(a.$Value))b=a.$Value;else b*=a.$Percent;return b},$Opacity:function(b,a){return this.$Default(b-1,a)}};b.$Zoom=b.$Opacity;$JssorAnimator$.call(a,0,0);function h(p,m){var l=[],g,i=[],a=[];function f(b,c){var a={};$Jssor$.$Each(k,function(f,g){var d=$Jssor$.$AttributeEx(b,f+(c||""));if(d){var e={};if(f=="t")e.$Value=d;else if(d.indexOf("%")+1)e.$Percent=$Jssor$.$ParseFloat(d)/100;else e.$Value=$Jssor$.$ParseFloat(d);a[g]=e}});return a}function n(){return c[Math.floor(Math.random()*c.length)]}function e(d){var f;if(d=="*")f=n();else if(d){var b=c[$Jssor$.$ParseInt(d)]||c[d];if($Jssor$.$IsArray(b)){if(d!=g){g=d;a[d]=0;i[d]=b[Math.floor(Math.random()*b.length)]}else a[d]++;b=i[d];if($Jssor$.$IsArray(b)){b=b.length&&b[a[d]%b.length];if($Jssor$.$IsArray(b))b=b[Math.floor(Math.random()*b.length)]}}f=b;if($Jssor$.$IsString(f))f=e(f)}return f}var o=$Jssor$.$Children(p);$Jssor$.$Each(o,function(a){var c=[];c.$Elmt=a;var g=$Jssor$.$AttributeEx(a,"u")=="caption";$Jssor$.$Each(d?[0,3]:[2],function(l,n){if(g){var k,d;if(l!=2||!$Jssor$.$AttributeEx(a,"t3")){d=f(a,l);if(l==2&&!d.$Transition){d.$Delay=d.$Delay||{$Value:0};d=$Jssor$.$Extend(f(a,0),d)}}if(d&&d.$Transition){k=e(d.$Transition.$Value);if(k){var i=$Jssor$.$Extend({$Delay:0},k);$Jssor$.$Each(d,function(e,a){var c=(b[a]||b.$Default).apply(b,[i[a],d[a]]);if(!isNaN(c))i[a]=c});if(!n)if(d.$BeginTime)i.$BeginTime=d.$BeginTime.$Value||0;else if(j&2)i.$BeginTime=0}}c.push(i)}if(m%2&&!n)c.$Children=h(a,m+1)});l.push(c)});return l}function i(t,a,w){var e={$Easing:a.$Easing,$Round:a.$Round,$During:a.$During,$Reverse:d&&!w},j=t,o=$Jssor$.$ParentNode(t),i=$Jssor$.$CssWidth(j),h=$Jssor$.$CssHeight(j),v=$Jssor$.$CssWidth(o),u=$Jssor$.$CssHeight(o),f={},c={},g=a.$ScaleClip||1;if(a.$Opacity)c.$Opacity=1-a.$Opacity;e.$OriginalWidth=i;e.$OriginalHeight=h;if(a.$Zoom||a.$Rotate){c.$Zoom=(a.$Zoom||2)-2;if($Jssor$.$IsBrowserIe9Earlier()||$Jssor$.$IsBrowserOpera())c.$Zoom=Math.min(c.$Zoom,1);f.$Zoom=1;var y=a.$Rotate||0;c.$Rotate=y*360;f.$Rotate=0}else if(a.$Clip){var p={$Top:0,$Right:i,$Bottom:h,$Left:0},s=$Jssor$.$Extend({},p),b=s.$Offset={},r=a.$Clip&4,m=a.$Clip&8,q=a.$Clip&1,n=a.$Clip&2;if(r&&m){b.$Top=h/2*g;b.$Bottom=-b.$Top}else if(r)b.$Bottom=-h*g;else if(m)b.$Top=h*g;if(q&&n){b.$Left=i/2*g;b.$Right=-b.$Left}else if(q)b.$Right=-i*g;else if(n)b.$Left=i*g;e.$Move=a.$Move;c.$Clip=s;f.$Clip=p}var k=0,l=0;if(a.x)k-=v*a.x;if(a.y)l-=u*a.y;if(k||l||e.$Move){c.$Left=k;c.$Top=l}var x=a.$Duration;f=$Jssor$.$Extend(f,$Jssor$.$GetStyles(j,c));e.$Setter=$Jssor$.$StyleSetterEx();return new $JssorAnimator$(a.$Delay,x,e,j,f,c)}function g(b,c){$Jssor$.$Each(c,function(c,l){$JssorDebug$.$Execute(function(){if(c.length){var f=$Jssor$.$CssTop(c.$Elmt),e=$Jssor$.$CssLeft(c.$Elmt),d=$Jssor$.$CssWidth(c.$Elmt),b=$Jssor$.$CssHeight(c.$Elmt),a=null;if(isNaN(f))a="Style 'top' for caption not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";else if(isNaN(e))a="Style 'left' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";else if(isNaN(d))a="Style 'width' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";else if(isNaN(b))a="Style 'height' not specified. Please always specify caption like 'position: absolute; top: ...px; left: ...px; width: ...px; height: ...px;'.";a&&$JssorDebug$.$Error("Caption "+(l+1)+" definition error, \r\n"+a+"\r\n"+c.$Elmt.outerHTML)}});var d,j=c.$Elmt,h=c[0],k=c[1];if(h){d=i(j,h);$JssorDebug$.$Execute(function(){d.$CaptionAnimator=true});h.$BeginTime==undefined&&d.$Shift(b);b=d.$GetPosition_OuterEnd()}b=g(b,c.$Children);if(k){var f=i(j,k,1);$JssorDebug$.$Execute(function(){f.$CaptionAnimator=true});f.$Shift(b);a.$Combine(f);e.$Combine(f)}d&&a.$Combine(d)});return b}a.$Revert=function(){a.$GoToPosition(a.$GetPosition_OuterEnd()*(d||0));e.$GoToPosition(0)};e=new $JssorAnimator$(0,0);g(0,j?h(l,1):[])}a.$Revert=function(){b.$Revert();c.$Revert()};c=new e(f,d,1);a.$IdleBegin=c.$GetPosition_OuterEnd();a.$IdleEnd=a.$IdleBegin+g;b=new e(f,d);b.$Shift(a.$IdleEnd);a.$Combine(b);a.$Combine(c)},$JssorCaptionSlideo$=window.$JssorCaptionSlideo$=function(j,c,i){$JssorDebug$.$Execute(function(){if(!c.$Transitions)$JssorDebug$.$Error("'$CaptionSlideoOptions' option error, '$CaptionSlideoOptions.$Transitions' not specified.");else!$Jssor$.$IsArray(c.$Transitions)&&$JssorDebug$.$Error("'$CaptionSlideoOptions' option error, '$CaptionSlideoOptions.$Transitions' is not an array.")});var a=this,k,e={},f=c.$Transitions,b=new $JssorAnimator$(0,0);$JssorAnimator$.call(a,0,0);function g(c,b){var a={};$Jssor$.$Each(c,function(c,f){var d=e[f];if(d){if($Jssor$.$IsPlainObject(c))c=g(c,b||f=="e");else if(b)if($Jssor$.$IsNumeric(c))c=k[c];a[d]=c}});return a}function h(d,b){var a=[],c=$Jssor$.$Children(d);$Jssor$.$Each(c,function(c){var i=$Jssor$.$AttributeEx(c,"u")=="caption";if(i){var d=$Jssor$.$AttributeEx(c,"t"),g=f[$Jssor$.$ParseInt(d)]||f[d],e={$Elmt:c,$Transition:g};a.push(e)}if(b<5)a=a.concat(h(c,b+1))});return a}function n(c,d,a){$Jssor$.$Each(d,function(e){var d=g(e),h={$Easing:$Jssor$.$FormatEasings(d.$Easing),$Setter:$Jssor$.$StyleSetterEx(),$OriginalWidth:a.$Width,$OriginalHeight:a.$Height},f=new $JssorAnimator$(e.b,e.d,h,c,a,d);$JssorDebug$.$Execute(function(){f.$CaptionAnimator=true});b.$Combine(f);a=$Jssor$.$AddDif(a,d)});return a}function m(a){$Jssor$.$Each(a,function(a,f){$JssorDebug$.$Execute(function(){if(a.length){var g=$Jssor$.$CssTop(a.$Elmt),e=$Jssor$.$CssLeft(a.$Elmt),d=$Jssor$.$CssWidth(a.$Elmt),c=$Jssor$.$CssHeight(a.$Elmt),b=null;if(isNaN(g))b="style 'top' not specified";else if(isNaN(e))b="style 'left' not specified";else if(isNaN(d))b="style 'width' not specified";else if(isNaN(c))b="style 'height' not specified";if(b)throw new Error("Caption "+(f+1)+" definition error, "+b+".\r\n"+a.$Elmt.outerHTML);}});var b=a.$Elmt,d=$Jssor$.$CssWidth(b),c=$Jssor$.$CssHeight(b),e={$Left:$Jssor$.$CssLeft(b),$Top:$Jssor$.$CssTop(b),$Opacity:1,$ZIndex:$Jssor$.$CssZIndex(b)||0,$Rotate:0,$RotateX:0,$RotateY:0,$ScaleX:1,$ScaleY:1,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0,$Width:d,$Height:c,$Clip:{$Top:0,$Right:d,$Bottom:c,$Left:0}};n(b,a.$Transition,e)})}function p(f,e,g){var d=f.b-e;if(d){var c=new $JssorAnimator$(e,d);$JssorDebug$.$Execute(function(){c.$TrunckedAnimator=true});c.$Combine(b,true);c.$Shift(g);a.$Combine(c)}a.$Expand(f.d);return d}function o(e){var c=b.$GetPosition_OuterBegin(),d=0;$Jssor$.$Each(e,function(b,e){b=$Jssor$.$Extend({d:i},b);p(b,c,d);c=b.b;d+=b.d;if(!e||b.t==2){a.$IdleBegin=c;a.$IdleEnd=c+b.d}})}a.$Revert=function(){a.$GoToPosition(-1,true)};$JssorDebug$.$Execute(function(){a.$CaptionSlider=true;b.$InnerAnimator=true});k=[$Jease$.$Swing,$Jease$.$Linear,$Jease$.$InQuad,$Jease$.$OutQuad,$Jease$.$InOutQuad,$Jease$.$InCubic,$Jease$.$OutCubic,$Jease$.$InOutCubic,$Jease$.$InQuart,$Jease$.$OutQuart,$Jease$.$InOutQuart,$Jease$.$InQuint,$Jease$.$OutQuint,$Jease$.$InOutQuint,$Jease$.$InSine,$Jease$.$OutSine,$Jease$.$InOutSine,$Jease$.$InExpo,$Jease$.$OutExpo,$Jease$.$InOutExpo,$Jease$.$InCirc,$Jease$.$OutCirc,$Jease$.$InOutCirc,$Jease$.$InElastic,$Jease$.$OutElastic,$Jease$.$InOutElastic,$Jease$.$InBack,$Jease$.$OutBack,$Jease$.$InOutBack,$Jease$.$InBounce,$Jease$.$OutBounce,$Jease$.$InOutBounce,$Jease$.$GoBack,$Jease$.$InWave,$Jease$.$OutWave,$Jease$.$OutJump,$Jease$.$InJump];var q={$Top:"y",$Left:"x",$Bottom:"m",$Right:"t",$Rotate:"r",$RotateX:"rX",$RotateY:"rY",$ScaleX:"sX",$ScaleY:"sY",$TranslateX:"tX",$TranslateY:"tY",$TranslateZ:"tZ",$SkewX:"kX",$SkewY:"kY",$Opacity:"o",$Easing:"e",$ZIndex:"i",$Clip:"c"};$Jssor$.$Each(q,function(b,a){e[b]=a});m(h(j,1));b.$GoToPosition(-1);var l=c.$Breaks||[],d=[].concat(l[$Jssor$.$ParseInt($Jssor$.$AttributeEx(j,"b"))]||[]);d.push({b:b.$GetPosition_OuterEnd(),d:d.length?0:i});o(d);a.$GoToPosition(-1)}
;
(function(g,e,b,j,c,i,k){/*! Jssor */
new(function(){this.$DebugMode=c;this.$Log=function(c,d){var a=g.console||{},b=this.$DebugMode;if(b&&a.log)a.log(c);else b&&d&&alert(c)};this.$Error=function(b,d){var c=g.console||{},a=this.$DebugMode;if(a&&c.error)c.error(b);else a&&alert(b);if(a)throw d||new Error(b);};this.$Fail=function(a){throw new Error(a);};this.$Assert=function(b,c){var a=this.$DebugMode;if(a)if(!b)throw new Error("Assert failed "+c||"");};this.$Trace=function(c){var a=g.console||{},b=this.$DebugMode;b&&a.log&&a.log(c)};this.$Execute=function(b){var a=this.$DebugMode;a&&b()};this.$LiveStamp=function(c,d){var b=this.$DebugMode;if(b){var a=e.createElement("DIV");a.setAttribute("id",d);c.$Live=a}};this.$C_AbstractProperty=function(){throw new Error("The property is abstract, it should be implemented by subclass.");};this.$C_AbstractMethod=function(){throw new Error("The method is abstract, it should be implemented by subclass.");};function a(b){if(b.constructor===a.caller)throw new Error("Cannot create instance of an abstract class.");}this.$C_AbstractClass=a});var d=g.$JssorEasing$={$EaseSwing:function(a){return-b.cos(a*b.PI)/2+.5},$EaseLinear:function(a){return a},$EaseInQuad:function(a){return a*a},$EaseOutQuad:function(a){return-a*(a-2)},$EaseInOutQuad:function(a){return(a*=2)<1?1/2*a*a:-1/2*(--a*(a-2)-1)},$EaseInCubic:function(a){return a*a*a},$EaseOutCubic:function(a){return(a-=1)*a*a+1},$EaseInOutCubic:function(a){return(a*=2)<1?1/2*a*a*a:1/2*((a-=2)*a*a+2)},$EaseInQuart:function(a){return a*a*a*a},$EaseOutQuart:function(a){return-((a-=1)*a*a*a-1)},$EaseInOutQuart:function(a){return(a*=2)<1?1/2*a*a*a*a:-1/2*((a-=2)*a*a*a-2)},$EaseInQuint:function(a){return a*a*a*a*a},$EaseOutQuint:function(a){return(a-=1)*a*a*a*a+1},$EaseInOutQuint:function(a){return(a*=2)<1?1/2*a*a*a*a*a:1/2*((a-=2)*a*a*a*a+2)},$EaseInSine:function(a){return 1-b.cos(a*b.PI/2)},$EaseOutSine:function(a){return b.sin(a*b.PI/2)},$EaseInOutSine:function(a){return-1/2*(b.cos(b.PI*a)-1)},$EaseInExpo:function(a){return a==0?0:b.pow(2,10*(a-1))},$EaseOutExpo:function(a){return a==1?1:-b.pow(2,-10*a)+1},$EaseInOutExpo:function(a){return a==0||a==1?a:(a*=2)<1?1/2*b.pow(2,10*(a-1)):1/2*(-b.pow(2,-10*--a)+2)},$EaseInCirc:function(a){return-(b.sqrt(1-a*a)-1)},$EaseOutCirc:function(a){return b.sqrt(1-(a-=1)*a)},$EaseInOutCirc:function(a){return(a*=2)<1?-1/2*(b.sqrt(1-a*a)-1):1/2*(b.sqrt(1-(a-=2)*a)+1)},$EaseInElastic:function(a){if(!a||a==1)return a;var c=.3,d=.075;return-(b.pow(2,10*(a-=1))*b.sin((a-d)*2*b.PI/c))},$EaseOutElastic:function(a){if(!a||a==1)return a;var c=.3,d=.075;return b.pow(2,-10*a)*b.sin((a-d)*2*b.PI/c)+1},$EaseInOutElastic:function(a){if(!a||a==1)return a;var c=.45,d=.1125;return(a*=2)<1?-.5*b.pow(2,10*(a-=1))*b.sin((a-d)*2*b.PI/c):b.pow(2,-10*(a-=1))*b.sin((a-d)*2*b.PI/c)*.5+1},$EaseInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},$EaseOutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},$EaseInOutBack:function(a){var b=1.70158;return(a*=2)<1?1/2*a*a*(((b*=1.525)+1)*a-b):1/2*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},$EaseInBounce:function(a){return 1-d.$EaseOutBounce(1-a)},$EaseOutBounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},$EaseInOutBounce:function(a){return a<1/2?d.$EaseInBounce(a*2)*.5:d.$EaseOutBounce(a*2-1)*.5+.5},$EaseGoBack:function(a){return 1-b.abs(2-1)},$EaseInWave:function(a){return 1-b.cos(a*b.PI*2)},$EaseOutWave:function(a){return b.sin(a*b.PI*2)},$EaseOutJump:function(a){return 1-((a*=2)<1?(a=1-a)*a*a:(a-=1)*a*a)},$EaseInJump:function(a){return(a*=2)<1?a*a*a:(a=2-a)*a*a}},f=g.$Jease$={$Swing:d.$EaseSwing,$Linear:d.$EaseLinear,$InQuad:d.$EaseInQuad,$OutQuad:d.$EaseOutQuad,$InOutQuad:d.$EaseInOutQuad,$InCubic:d.$EaseInCubic,$OutCubic:d.$EaseOutCubic,$InOutCubic:d.$EaseInOutCubic,$InQuart:d.$EaseInQuart,$OutQuart:d.$EaseOutQuart,$InOutQuart:d.$EaseInOutQuart,$InQuint:d.$EaseInQuint,$OutQuint:d.$EaseOutQuint,$InOutQuint:d.$EaseInOutQuint,$InSine:d.$EaseInSine,$OutSine:d.$EaseOutSine,$InOutSine:d.$EaseInOutSine,$InExpo:d.$EaseInExpo,$OutExpo:d.$EaseOutExpo,$InOutExpo:d.$EaseInOutExpo,$InCirc:d.$EaseInCirc,$OutCirc:d.$EaseOutCirc,$InOutCirc:d.$EaseInOutCirc,$InElastic:d.$EaseInElastic,$OutElastic:d.$EaseOutElastic,$InOutElastic:d.$EaseInOutElastic,$InBack:d.$EaseInBack,$OutBack:d.$EaseOutBack,$InOutBack:d.$EaseInOutBack,$InBounce:d.$EaseInBounce,$OutBounce:d.$EaseOutBounce,$InOutBounce:d.$EaseInOutBounce,$GoBack:d.$EaseGoBack,$InWave:d.$EaseInWave,$OutWave:d.$EaseOutWave,$OutJump:d.$EaseOutJump,$InJump:d.$EaseInJump};g.$JssorDirection$={$TO_LEFT:1,$TO_RIGHT:2,$TO_TOP:4,$TO_BOTTOM:8,$HORIZONTAL:3,$VERTICAL:12,$GetDirectionHorizontal:function(a){return a&3},$GetDirectionVertical:function(a){return a&12},$IsHorizontal:function(a){return a&3},$IsVertical:function(a){return a&12}};var a=g.$Jssor$=new function(){var f=this,zb=/\S+/g,S=1,fb=2,jb=3,ib=4,nb=5,I,s=0,l=0,q=0,J=0,C=0,y=navigator,sb=y.appName,n=y.userAgent,v=e.documentElement;function Ib(){if(!I){I={$Touchable:"ontouchstart"in g||"createTouch"in e};var a;if(y.pointerEnabled||(a=y.msPointerEnabled))I.$TouchActionAttr=a?"msTouchAction":"touchAction"}return I}function t(i){if(!s){s=-1;if(sb=="Microsoft Internet Explorer"&&!!g.attachEvent&&!!g.ActiveXObject){var f=n.indexOf("MSIE");s=S;q=o(n.substring(f+5,n.indexOf(";",f)));/*@cc_on J=@_jscript_version@*/;l=e.documentMode||q}else if(sb=="Netscape"&&!!g.addEventListener){var d=n.indexOf("Firefox"),b=n.indexOf("Safari"),h=n.indexOf("Chrome"),c=n.indexOf("AppleWebKit");if(d>=0){s=fb;l=o(n.substring(d+8))}else if(b>=0){var j=n.substring(0,b).lastIndexOf("/");s=h>=0?ib:jb;l=o(n.substring(j+1,b))}else{var a=/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(n);if(a){s=S;l=q=o(a[1])}}if(c>=0)C=o(n.substring(c+12))}else{var a=/(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(n);if(a){s=nb;l=o(a[2])}}}return i==s}function p(){return t(S)}function N(){return p()&&(l<6||e.compatMode=="BackCompat")}function Ab(){return t(fb)}function hb(){return t(jb)}function Db(){return t(ib)}function mb(){return t(nb)}function ab(){return hb()&&C>534&&C<535}function L(){return p()&&l<9}function cb(a){var b;return function(d){if(!b){b=a;var c=a.substr(0,1).toUpperCase()+a.substr(1);m([a].concat(["WebKit","ms","Moz","O","webkit"]),function(g,f){var e=a;if(f)e=g+c;if(d.style[e]!=k)return b=e})}return b}}var bb=cb("transform");function rb(a){return{}.toString.call(a)}var H;function Fb(){if(!H){H={};m(["Boolean","Number","String","Function","Array","Date","RegExp","Object"],function(a){H["[object "+a+"]"]=a.toLowerCase()})}return H}function m(a,d){if(rb(a)=="[object Array]"){for(var b=0;b<a.length;b++)if(d(a[b],b,a))return c}else for(var e in a)if(d(a[e],e,a))return c}function A(a){return a==j?String(a):Fb()[rb(a)]||"object"}function pb(a){for(var b in a)return c}function x(a){try{return A(a)=="object"&&!a.nodeType&&a!=a.window&&(!a.constructor||{}.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))}catch(b){}}function w(a,b){return{x:a,y:b}}function vb(b,a){setTimeout(b,a||0)}function F(b,d,c){var a=!b||b=="inherit"?"":b;m(d,function(c){var b=c.exec(a);if(b){var d=a.substr(0,b.index),e=a.substr(b.lastIndex+1,a.length-(b.lastIndex+1));a=d+e}});a=c+(a.indexOf(" ")!=0?" ":"")+a;return a}function eb(b,a){if(l<9)b.style.filter=a}function Bb(g,a,i){if(!J||J<9){var d=a.$ScaleX,e=a.$ScaleY,j=(a.$Rotate||0)%360,h="";if(j||d!=k||e!=k){if(d==k)d=1;if(e==k)e=1;var c=f.$CreateMatrix(j/180*b.PI,d||1,e||1),i=f.$GetMatrixOffset(c,a.$OriginalWidth,a.$OriginalHeight);f.$CssMarginTop(g,i.y);f.$CssMarginLeft(g,i.x);h="progid:DXImageTransform.Microsoft.Matrix(M11="+c[0][0]+", M12="+c[0][1]+", M21="+c[1][0]+", M22="+c[1][1]+", SizingMethod='auto expand')"}var m=g.style.filter,n=new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),l=F(m,[n],h);eb(g,l)}}f.$Device=Ib;f.$IsBrowserIE=p;f.$IsBrowserIeQuirks=N;f.$IsBrowserFireFox=Ab;f.$IsBrowserSafari=hb;f.$IsBrowserChrome=Db;f.$IsBrowserOpera=mb;f.$IsBrowserBadTransform=ab;f.$IsBrowserIe9Earlier=L;f.$BrowserVersion=function(){return l};f.$BrowserEngineVersion=function(){return q||l};f.$WebKitVersion=function(){t();return C};f.$Delay=vb;f.$Inherit=function(a,b){b.call(a);return z({},a)};function V(a){a.constructor===V.caller&&a.$Construct&&a.$Construct.apply(a,V.caller.arguments)}f.$Construct=V;f.$GetElement=function(a){if(f.$IsString(a))a=e.getElementById(a);return a};function r(a){return a||g.event}f.$GetEvent=r;f.$EvtSrc=function(a){a=r(a);return a.target||a.srcElement||e};f.$EvtTarget=function(a){a=r(a);return a.relatedTarget||a.toElement};f.$EvtWhich=function(a){a=r(a);return a.which||([0,1,3,0,2])[a.button]||a.charCode||a.keyCode};f.$MousePosition=function(a){a=r(a);return{x:a.pageX||a.clientX||0,y:a.pageY||a.clientY||0}};f.$PageScroll=function(){var a=e.body;return{x:(g.pageXOffset||v.scrollLeft||a.scrollLeft||0)-(v.clientLeft||a.clientLeft||0),y:(g.pageYOffset||v.scrollTop||a.scrollTop||0)-(v.clientTop||a.clientTop||0)}};f.$WindowSize=function(){var a=e.body;return{x:a.clientWidth||v.clientWidth,y:a.clientHeight||v.clientHeight}};function B(c,d,a){if(a!==k)c.style[d]=a==k?"":a;else{var b=c.currentStyle||c.style;a=b[d];if(a==""&&g.getComputedStyle){b=c.ownerDocument.defaultView.getComputedStyle(c,j);b&&(a=b.getPropertyValue(d)||b[d])}return a}}function X(b,c,a,d){if(a!=k){if(a==j)a="";else d&&(a+="px");B(b,c,a)}else return o(B(b,c))}function Jb(b,d,a){return X(b,d,a,c)}function h(c,a){var d=a?X:B,b;if(a&4)b=cb(c);return function(e,f){return d(e,b?b(e):c,f,a&2)}}function Cb(b){if(p()&&q<9){var a=/opacity=([^)]*)/.exec(b.style.filter||"");return a?o(a[1])/100:1}else return o(b.style.opacity||"1")}function Eb(c,a,f){if(p()&&q<9){var h=c.style.filter||"",i=new RegExp(/[\s]*alpha\([^\)]*\)/g),e=b.round(100*a),d="";if(e<100||f)d="alpha(opacity="+e+") ";var g=F(h,[i],d);eb(c,g)}else c.style.opacity=a==1?"":b.round(a*100)/100}var xb={$Rotate:["rotate"],$RotateX:["rotateX"],$RotateY:["rotateY"],$ScaleX:["scaleX",2],$ScaleY:["scaleY",2],$TranslateX:["translateX",1],$TranslateY:["translateY",1],$TranslateZ:["translateZ",1],$SkewX:["skewX"],$SkewY:["skewY"]};function Z(e,c){if(p()&&l&&l<10){delete c.$RotateX;delete c.$RotateY}var d=bb(e);if(d){var b="";a.$Each(c,function(e,c){var a=xb[c];if(a){var d=a[1]||0;b+=(b?" ":"")+a[0]+"("+e+(["deg","px",""])[d]+")"}});e.style[d]=b}}f.$SetStyleTransform=function(b,a){if(ab())vb(f.$CreateCallback(j,Z,b,a));else(L()?Bb:Z)(b,a)};f.$CssTransformOrigin=h("transformOrigin",4);f.$CssBackfaceVisibility=h("backfaceVisibility",4);f.$CssTransformStyle=h("transformStyle",4);f.$CssPerspective=h("perspective",6);f.$CssPerspectiveOrigin=h("perspectiveOrigin",4);f.$CssScale=function(a,c){if(p()&&q<9||q<10&&N())a.style.zoom=c==1?"":c;else{var b=bb(a);if(b){var f="scale("+c+")",e=a.style[b],g=new RegExp(/[\s]*scale\(.*?\)/g),d=F(e,[g],f);a.style[b]=d}}};var lb=0,gb=0;f.$WindowResizeFilter=function(b,a){return L()?function(){var g=c,d=N()?b.document.body:b.document.documentElement;if(d){var f=d.offsetWidth-lb,e=d.offsetHeight-gb;if(f||e){lb+=f;gb+=e}else g=i}g&&a()}:a};f.$MouseOverOutFilter=function(b,a){return function(c){c=r(c);var e=c.type,d=c.relatedTarget||(e=="mouseout"?c.toElement:c.fromElement);(!d||d!==a&&!f.$IsChild(a,d))&&b(c)}};f.$AddEvent=function(a,c,d,b){a=f.$GetElement(a);if(a.addEventListener){c=="mousewheel"&&a.addEventListener("DOMMouseScroll",d,b);a.addEventListener(c,d,b)}else if(a.attachEvent){a.attachEvent("on"+c,d);b&&a.setCapture&&a.setCapture()}};f.$RemoveEvent=function(a,c,d,b){a=f.$GetElement(a);if(a.removeEventListener){c=="mousewheel"&&a.removeEventListener("DOMMouseScroll",d,b);a.removeEventListener(c,d,b)}else if(a.detachEvent){a.detachEvent("on"+c,d);b&&a.releaseCapture&&a.releaseCapture()}};f.$FireEvent=function(c,b){var a;if(e.createEvent){a=e.createEvent("HTMLEvents");a.initEvent(b,i,i);c.dispatchEvent(a)}else{var d="on"+b;a=e.createEventObject();c.fireEvent(d,a)}};f.$CancelEvent=function(a){a=r(a);a.preventDefault&&a.preventDefault();a.cancel=c;a.returnValue=i};f.$StopEvent=function(a){a=r(a);a.stopPropagation&&a.stopPropagation();a.cancelBubble=c};f.$CreateCallback=function(d,c){var a=[].slice.call(arguments,2),b=function(){var b=a.concat([].slice.call(arguments,0));return c.apply(d,b)};return b};f.$InnerText=function(a,b){if(b==k)return a.textContent||a.innerText;var c=e.createTextNode(b);f.$Empty(a);a.appendChild(c)};f.$InnerHtml=function(a,b){if(b==k)return a.innerHTML;a.innerHTML=b};f.$GetClientRect=function(b){var a=b.getBoundingClientRect();return{x:a.left,y:a.top,w:a.right-a.left,h:a.bottom-a.top}};f.$ClearInnerHtml=function(a){a.innerHTML=""};f.$EncodeHtml=function(b){var a=f.$CreateDiv();f.$InnerText(a,b);return f.$InnerHtml(a)};f.$DecodeHtml=function(b){var a=f.$CreateDiv();f.$InnerHtml(a,b);return f.$InnerText(a)};f.$SelectElement=function(c){var b;if(g.getSelection)b=g.getSelection();var a=j;if(e.createRange){a=e.createRange();a.selectNode(c)}else{a=e.body.createTextRange();a.moveToElementText(c);a.select()}b&&b.addRange(a)};f.$DeselectElements=function(){if(e.selection)e.selection.empty();else g.getSelection&&g.getSelection().removeAllRanges()};f.$Children=function(d,c){for(var b=[],a=d.firstChild;a;a=a.nextSibling)(c||a.nodeType==1)&&b.push(a);return b};function qb(a,c,e,b){b=b||"u";for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){if(R(a,b)==c)return a;if(!e){var d=qb(a,c,e,b);if(d)return d}}}f.$FindChild=qb;function P(a,d,f,b){b=b||"u";var c=[];for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){R(a,b)==d&&c.push(a);if(!f){var e=P(a,d,f,b);if(e.length)c=c.concat(e)}}return c}function kb(a,c,d){for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){if(a.tagName==c)return a;if(!d){var b=kb(a,c,d);if(b)return b}}}f.$FindChildByTag=kb;function db(a,c,e){var b=[];for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){(!c||a.tagName==c)&&b.push(a);if(!e){var d=db(a,c,e);if(d.length)b=b.concat(d)}}return b}f.$FindChildrenByTag=db;f.$GetElementsByTag=function(b,a){return b.getElementsByTagName(a)};function z(){var e=arguments,d,c,b,a,g=1&e[0],f=1+g;d=e[f-1]||{};for(;f<e.length;f++)if(c=e[f])for(b in c){a=c[b];if(a!==k){a=c[b];var h=d[b];d[b]=g&&(x(h)||x(a))?z(g,{},h,a):a}}return d}f.$Extend=z;function W(f,g){var d={},c,a,b;for(c in f){a=f[c];b=g[c];if(a!==b){var e;if(x(a)&&x(b)){a=W(a,b);e=!pb(a)}!e&&(d[c]=a)}}return d}f.$Unextend=W;f.$IsFunction=function(a){return A(a)=="function"};f.$IsArray=function(a){return A(a)=="array"};f.$IsString=function(a){return A(a)=="string"};f.$IsNumeric=function(a){return!isNaN(o(a))&&isFinite(a)};f.$Type=A;f.$Each=m;f.$IsNotEmpty=pb;f.$IsPlainObject=x;function O(a){return e.createElement(a)}f.$CreateElement=O;f.$CreateDiv=function(){return O("DIV")};f.$CreateSpan=function(){return O("SPAN")};f.$EmptyFunction=function(){};function T(b,c,a){if(a==k)return b.getAttribute(c);b.setAttribute(c,a)}function R(a,b){return T(a,b)||T(a,"data-"+b)}f.$Attribute=T;f.$AttributeEx=R;function u(b,a){if(a==k)return b.className;b.className=a}f.$ClassName=u;function ub(b){var a={};m(b,function(b){a[b]=b});return a}function Hb(b){var a=[];m(b,function(b){a.push(b)});return a}function wb(b,a){return b.match(a||zb)}function M(b,a){return ub(wb(b||"",a))}f.$ToHash=ub;f.$FromHash=Hb;f.$Split=wb;function Y(b,c){var a="";m(c,function(c){a&&(a+=b);a+=c});return a}function E(a,c,b){u(a,Y(" ",z(W(M(u(a)),M(c)),M(b))))}f.$Join=Y;f.$AddClass=function(b,a){E(b,j,a)};f.$RemoveClass=E;f.$ReplaceClass=E;f.$ParentNode=function(a){return a.parentNode};f.$HideElement=function(a){f.$CssDisplay(a,"none")};f.$EnableElement=function(a,b){if(b)f.$Attribute(a,"disabled",c);else f.$RemoveAttribute(a,"disabled")};f.$HideElements=function(b){for(var a=0;a<b.length;a++)f.$HideElement(b[a])};f.$ShowElement=function(a,b){f.$CssDisplay(a,b?"none":"")};f.$ShowElements=function(b,c){for(var a=0;a<b.length;a++)f.$ShowElement(b[a],c)};f.$RemoveAttribute=function(b,a){b.removeAttribute(a)};f.$CanClearClip=function(){return p()&&l<10};f.$SetStyleClip=function(d,c){if(c)d.style.clip="rect("+b.round(c.$Top)+"px "+b.round(c.$Right)+"px "+b.round(c.$Bottom)+"px "+b.round(c.$Left)+"px)";else{var g=d.style.cssText,f=[new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),new RegExp(/[\s]*cliptop: .*?[;]?/i),new RegExp(/[\s]*clipright: .*?[;]?/i),new RegExp(/[\s]*clipbottom: .*?[;]?/i),new RegExp(/[\s]*clipleft: .*?[;]?/i)],e=F(g,f,"");a.$CssCssText(d,e)}};f.$GetNow=function(){return+new Date};f.$AppendChild=function(b,a){b.appendChild(a)};f.$AppendChildren=function(b,a){m(a,function(a){f.$AppendChild(b,a)})};f.$InsertBefore=function(b,a,c){(c||a.parentNode).insertBefore(b,a)};f.$InsertAfter=function(b,a,c){f.$InsertBefore(b,a.nextSibling,c||a.parentNode)};f.$InsertAdjacentHtml=function(b,a,c){b.insertAdjacentHTML(a,c)};f.$RemoveElement=function(a,b){(b||a.parentNode).removeChild(a)};f.$RemoveElements=function(a,b){m(a,function(a){f.$RemoveElement(a,b)})};f.$Empty=function(a){f.$RemoveElements(f.$Children(a,c),a)};f.$CenterElement=function(a,b){var c=f.$ParentNode(a);b&1&&f.$CssLeft(a,(f.$CssWidth(c)-f.$CssWidth(a))/2);b&2&&f.$CssTop(a,(f.$CssHeight(c)-f.$CssHeight(a))/2)};f.$ParseInt=function(b,a){return parseInt(b,a||10)};var o=parseFloat;f.$ParseFloat=o;f.$IsChild=function(b,a){var c=e.body;while(a&&b!==a&&c!==a)try{a=a.parentNode}catch(d){return i}return b===a};function U(d,c,b){var a=d.cloneNode(!c);!b&&f.$RemoveAttribute(a,"id");return a}f.$CloneNode=U;f.$LoadImage=function(e,g){var a=new Image;function b(e,c){f.$RemoveEvent(a,"load",b);f.$RemoveEvent(a,"abort",d);f.$RemoveEvent(a,"error",d);g&&g(a,c)}function d(a){b(a,c)}if(mb()&&l<11.6||!e)b(!e);else{f.$AddEvent(a,"load",b);f.$AddEvent(a,"abort",d);f.$AddEvent(a,"error",d);a.src=e}};f.$LoadImages=function(d,a,e){var c=d.length+1;function b(b){c--;if(a&&b&&b.src==a.src)a=b;!c&&e&&e(a)}m(d,function(a){f.$LoadImage(a.src,b)});b()};f.$BuildElement=function(b,g,i,h){if(h)b=U(b);var c=P(b,g);if(!c.length)c=a.$GetElementsByTag(b,g);for(var f=c.length-1;f>-1;f--){var d=c[f],e=U(i);u(e,u(d));a.$CssCssText(e,d.style.cssText);a.$InsertBefore(e,d);a.$RemoveElement(d)}return b};function Gb(b){var l=this,p="",r=["av","pv","ds","dn"],g=[],q,j=0,h=0,d=0;function i(){E(b,q,g[d||j||h&2||h]);a.$Css(b,"pointer-events",d?"none":"")}function c(){j=0;i();f.$RemoveEvent(e,"mouseup",c);f.$RemoveEvent(e,"touchend",c);f.$RemoveEvent(e,"touchcancel",c)}function o(a){if(d)f.$CancelEvent(a);else{j=4;i();f.$AddEvent(e,"mouseup",c);f.$AddEvent(e,"touchend",c);f.$AddEvent(e,"touchcancel",c)}}l.$Selected=function(a){if(a===k)return h;h=a&2||a&1;i()};l.$Enable=function(a){if(a===k)return!d;d=a?0:3;i()};l.$Elmt=b=f.$GetElement(b);var n=a.$Split(u(b));if(n)p=n.shift();m(r,function(a){g.push(p+a)});q=Y(" ",g);g.unshift("");f.$AddEvent(b,"mousedown",o);f.$AddEvent(b,"touchstart",o)}f.$Buttonize=function(a){return new Gb(a)};f.$Css=B;f.$CssN=X;f.$CssP=Jb;f.$CssOverflow=h("overflow");f.$CssTop=h("top",2);f.$CssLeft=h("left",2);f.$CssWidth=h("width",2);f.$CssHeight=h("height",2);f.$CssMarginLeft=h("marginLeft",2);f.$CssMarginTop=h("marginTop",2);f.$CssPosition=h("position");f.$CssDisplay=h("display");f.$CssZIndex=h("zIndex",1);f.$CssFloat=function(b,a){return B(b,p()?"styleFloat":"cssFloat",a)};f.$CssOpacity=function(b,a,c){if(a!=k)Eb(b,a,c);else return Cb(b)};f.$CssCssText=function(a,b){if(b!=k)a.style.cssText=b;else return a.style.cssText};var Q={$Opacity:f.$CssOpacity,$Top:f.$CssTop,$Left:f.$CssLeft,$Width:f.$CssWidth,$Height:f.$CssHeight,$Position:f.$CssPosition,$Display:f.$CssDisplay,$ZIndex:f.$CssZIndex},K;function G(){if(!K)K=z({$MarginTop:f.$CssMarginTop,$MarginLeft:f.$CssMarginLeft,$Clip:f.$SetStyleClip,$Transform:f.$SetStyleTransform},Q);return K}function ob(){var a={};a.$Transform=a.$Transform;a.$Transform=a.$Rotate;a.$Transform=a.$RotateX;a.$Transform=a.$RotateY;a.$Transform=a.$SkewX;a.$Transform=a.$SkewY;a.$Transform=a.$TranslateX;a.$Transform=a.$TranslateY;a.$Transform=a.$TranslateZ;return G()}f.$StyleSetter=G;f.$StyleSetterEx=ob;f.$GetStyles=function(c,b){G();var a={};m(b,function(d,b){if(Q[b])a[b]=Q[b](c)});return a};f.$SetStyles=function(c,b){var a=G();m(b,function(d,b){a[b]&&a[b](c,d)})};f.$SetStylesEx=function(b,a){ob();f.$SetStyles(b,a)};var D=new function(){var a=this;function b(d,g){for(var j=d[0].length,i=d.length,h=g[0].length,f=[],c=0;c<i;c++)for(var k=f[c]=[],b=0;b<h;b++){for(var e=0,a=0;a<j;a++)e+=d[c][a]*g[a][b];k[b]=e}return f}a.$ScaleX=function(b,c){return a.$ScaleXY(b,c,0)};a.$ScaleY=function(b,c){return a.$ScaleXY(b,0,c)};a.$ScaleXY=function(a,c,d){return b(a,[[c,0],[0,d]])};a.$TransformPoint=function(d,c){var a=b(d,[[c.x],[c.y]]);return w(a[0][0],a[1][0])}};f.$CreateMatrix=function(d,a,c){var e=b.cos(d),f=b.sin(d);return[[e*a,-f*c],[f*a,e*c]]};f.$GetMatrixOffset=function(d,c,a){var e=D.$TransformPoint(d,w(-c/2,-a/2)),f=D.$TransformPoint(d,w(c/2,-a/2)),g=D.$TransformPoint(d,w(c/2,a/2)),h=D.$TransformPoint(d,w(-c/2,a/2));return w(b.min(e.x,f.x,g.x,h.x)+c/2,b.min(e.y,f.y,g.y,h.y)+a/2)};var yb={$Zoom:1,$ScaleX:1,$ScaleY:1,$Rotate:0,$RotateX:0,$RotateY:0,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0};f.$FormatEasings=function(b){var c=b||{};if(b)if(a.$IsFunction(b))c={$Default:c};else if(a.$IsFunction(b.$Clip))c.$Clip={$Default:b.$Clip};return c};function tb(c,a){var b={};m(c,function(c,d){var e=c;if(a[d]!=k)if(f.$IsNumeric(c))e=c+a[d];else e=tb(c,a[d]);b[d]=e});return b}f.$AddDif=tb;f.$Cast=function(h,i,w,n,y,z,o){var c=i;if(h){c={};for(var g in i){var A=z[g]||1,v=y[g]||[0,1],e=(w-v[0])/v[1];e=b.min(b.max(e,0),1);e=e*A;var u=b.floor(e);if(e!=u)e-=u;var l=n.$Default||d.$EaseSwing,m,B=h[g],q=i[g];if(a.$IsNumeric(q)){l=n[g]||l;var x=l(e);m=B+q*x}else{m=a.$Extend({$Offset:{}},h[g]);a.$Each(q.$Offset||q,function(d,a){if(n.$Clip)l=n.$Clip[a]||n.$Clip.$Default||l;var c=l(e),b=d*c;m.$Offset[a]=b;m[a]+=b})}c[g]=m}var t,f={$OriginalWidth:o.$OriginalWidth,$OriginalHeight:o.$OriginalHeight};a.$Each(yb,function(d,a){t=t||i[a];var b=c[a];if(b!=k){if(b!=d)f[a]=b;delete c[a]}else if(h[a]!=k&&h[a]!=d)f[a]=h[a]});if(i.$Zoom&&f.$Zoom){f.$ScaleX=f.$Zoom;f.$ScaleY=f.$Zoom}c.$Transform=f}if(i.$Clip&&o.$Move){var p=c.$Clip.$Offset,s=(p.$Top||0)+(p.$Bottom||0),r=(p.$Left||0)+(p.$Right||0);c.$Left=(c.$Left||0)+r;c.$Top=(c.$Top||0)+s;c.$Clip.$Left-=r;c.$Clip.$Right-=r;c.$Clip.$Top-=s;c.$Clip.$Bottom-=s}if(c.$Clip&&a.$CanClearClip()&&!c.$Clip.$Top&&!c.$Clip.$Left&&c.$Clip.$Right==o.$OriginalWidth&&c.$Clip.$Bottom==o.$OriginalHeight)c.$Clip=j;return c}};function m(){var b=this,d=[],c=[];function i(a,b){d.push({$EventName:a,$Handler:b})}function h(b,c){a.$Each(d,function(a,e){a.$EventName==b&&a.$Handler===c&&d.splice(e,1)})}function f(){d=[]}function e(){a.$Each(c,function(b){a.$RemoveEvent(b.$Obj,b.$EventName,b.$Handler)});c=[]}b.$Listen=function(e,b,d,f){a.$AddEvent(e,b,d,f);c.push({$Obj:e,$EventName:b,$Handler:d})};b.$Unlisten=function(e,b,d){a.$Each(c,function(f,g){if(f.$Obj===e&&f.$EventName==b&&f.$Handler===d){a.$RemoveEvent(e,b,d);c.splice(g,1)}})};b.$UnlistenAll=e;b.$On=b.addEventListener=i;b.$Off=b.removeEventListener=h;b.$TriggerEvent=function(b){var c=[].slice.call(arguments,1);a.$Each(d,function(a){a.$EventName==b&&a.$Handler.apply(g,c)})};b.$Destroy=function(){e();f();for(var a in b)delete b[a]}}var l=g.$JssorAnimator$=function(y,C,k,P,N,J){y=y||0;var d=this,q,M,n,o,v,z=0,H,I,G,B,x=0,h=0,m=0,D,l,s,f,e,p,w=[],A;function O(a){f+=a;e+=a;l+=a;s+=a;h+=a;m+=a;x+=a}function u(n){var g=n;if(p&&(g>=e||g<=f))g=((g-f)%p+p)%p+f;if(!D||v||h!=g){var i=b.min(g,e);i=b.max(i,f);if(!D||v||i!=m){if(J){var j=(i-l)/(C||1);if(k.$Reverse)j=1-j;var o=a.$Cast(N,J,j,H,G,I,k);a.$Each(o,function(b,a){A[a]&&A[a](P,b)})}d.$OnInnerOffsetChange(m-l,i-l);m=i;a.$Each(w,function(b,c){var a=n<h?w[w.length-c-1]:b;a.$GoToPosition(m-x)});var r=h,q=m;h=g;D=c;d.$OnPositionChange(r,q)}}}function E(a,c,d){c&&a.$Shift(e);if(!d){f=b.min(f,a.$GetPosition_OuterBegin()+x);e=b.max(e,a.$GetPosition_OuterEnd()+x)}w.push(a)}var r=g.requestAnimationFrame||g.webkitRequestAnimationFrame||g.mozRequestAnimationFrame||g.msRequestAnimationFrame;if(a.$IsBrowserSafari()&&a.$BrowserVersion()<7)r=j;r=r||function(b){a.$Delay(b,k.$Interval)};function K(){if(q){var d=a.$GetNow(),e=b.min(d-z,k.$IntervalMax),c=h+e*o;z=d;if(c*o>=n*o)c=n;u(c);if(!v&&c*o>=n*o)L(B);else r(K)}}function t(g,i,j){if(!q){q=c;v=j;B=i;g=b.max(g,f);g=b.min(g,e);n=g;o=n<h?-1:1;d.$OnStart();z=a.$GetNow();r(K)}}function L(a){if(q){v=q=B=i;d.$OnStop();a&&a()}}d.$Play=function(a,b,c){t(a?h+a:e,b,c)};d.$PlayToPosition=t;d.$PlayToBegin=function(a,b){t(f,a,b)};d.$PlayToEnd=function(a,b){t(e,a,b)};d.$Stop=L;d.$Continue=function(a){t(a)};d.$GetPosition=function(){return h};d.$GetPlayToPosition=function(){return n};d.$GetPosition_Display=function(){return m};d.$GoToPosition=u;d.$GoToBegin=function(){u(f,c)};d.$GoToEnd=function(){u(e,c)};d.$Move=function(a){u(h+a)};d.$CombineMode=function(){return M};d.$GetDuration=function(){return C};d.$IsPlaying=function(){return q};d.$IsOnTheWay=function(){return h>l&&h<=s};d.$SetLoopLength=function(a){p=a};d.$Shift=O;d.$Join=E;d.$Combine=function(a,b){E(a,0,b)};d.$Chain=function(a){E(a,1)};d.$Expand=function(a){e+=a};d.$GetPosition_InnerBegin=function(){return l};d.$GetPosition_InnerEnd=function(){return s};d.$GetPosition_OuterBegin=function(){return f};d.$GetPosition_OuterEnd=function(){return e};d.$OnPositionChange=d.$OnStart=d.$OnStop=d.$OnInnerOffsetChange=a.$EmptyFunction;d.$Version=a.$GetNow();k=a.$Extend({$Interval:16,$IntervalMax:50},k);p=k.$LoopLength;A=a.$Extend({},a.$StyleSetter(),k.$Setter);f=l=y;e=s=y+C;I=k.$Round||{};G=k.$During||{};H=a.$FormatEasings(k.$Easing)};var o=g.$JssorSlideshowFormations$=new function(){var h=this,d=0,a=1,f=2,e=3,s=1,r=2,t=4,q=8,w=256,x=512,v=1024,u=2048,j=u+s,i=u+r,o=x+s,m=x+r,n=w+t,k=w+q,l=v+t,p=v+q;function y(a){return(a&r)==r}function z(a){return(a&t)==t}function g(b,a,c){c.push(a);b[a]=b[a]||[];b[a].push(c)}h.$FormationStraight=function(f){for(var d=f.$Cols,e=f.$Rows,s=f.$Assembly,t=f.$Count,r=[],a=0,b=0,p=d-1,q=e-1,h=t-1,c,b=0;b<e;b++)for(a=0;a<d;a++){switch(s){case j:c=h-(a*e+(q-b));break;case l:c=h-(b*d+(p-a));break;case o:c=h-(a*e+b);case n:c=h-(b*d+a);break;case i:c=a*e+b;break;case k:c=b*d+(p-a);break;case m:c=a*e+(q-b);break;default:c=b*d+a}g(r,c,[b,a])}return r};h.$FormationSwirl=function(q){var x=q.$Cols,y=q.$Rows,B=q.$Assembly,w=q.$Count,A=[],z=[],u=0,b=0,h=0,r=x-1,s=y-1,t,p,v=0;switch(B){case j:b=r;h=0;p=[f,a,e,d];break;case l:b=0;h=s;p=[d,e,a,f];break;case o:b=r;h=s;p=[e,a,f,d];break;case n:b=r;h=s;p=[a,e,d,f];break;case i:b=0;h=0;p=[f,d,e,a];break;case k:b=r;h=0;p=[a,f,d,e];break;case m:b=0;h=s;p=[e,d,f,a];break;default:b=0;h=0;p=[d,f,a,e]}u=0;while(u<w){t=h+","+b;if(b>=0&&b<x&&h>=0&&h<y&&!z[t]){z[t]=c;g(A,u++,[h,b])}else switch(p[v++%p.length]){case d:b--;break;case f:h--;break;case a:b++;break;case e:h++}switch(p[v%p.length]){case d:b++;break;case f:h++;break;case a:b--;break;case e:h--}}return A};h.$FormationZigZag=function(p){var w=p.$Cols,x=p.$Rows,z=p.$Assembly,v=p.$Count,t=[],u=0,b=0,c=0,q=w-1,r=x-1,y,h,s=0;switch(z){case j:b=q;c=0;h=[f,a,e,a];break;case l:b=0;c=r;h=[d,e,a,e];break;case o:b=q;c=r;h=[e,a,f,a];break;case n:b=q;c=r;h=[a,e,d,e];break;case i:b=0;c=0;h=[f,d,e,d];break;case k:b=q;c=0;h=[a,f,d,f];break;case m:b=0;c=r;h=[e,d,f,d];break;default:b=0;c=0;h=[d,f,a,f]}u=0;while(u<v){y=c+","+b;if(b>=0&&b<w&&c>=0&&c<x&&typeof t[y]=="undefined"){g(t,u++,[c,b]);switch(h[s%h.length]){case d:b++;break;case f:c++;break;case a:b--;break;case e:c--}}else{switch(h[s++%h.length]){case d:b--;break;case f:c--;break;case a:b++;break;case e:c++}switch(h[s++%h.length]){case d:b++;break;case f:c++;break;case a:b--;break;case e:c--}}}return t};h.$FormationStraightStairs=function(q){var u=q.$Cols,v=q.$Rows,e=q.$Assembly,t=q.$Count,r=[],s=0,c=0,d=0,f=u-1,h=v-1,x=t-1;switch(e){case j:case m:case o:case i:var a=0,b=0;break;case k:case l:case n:case p:var a=f,b=0;break;default:e=p;var a=f,b=0}c=a;d=b;while(s<t){if(z(e)||y(e))g(r,x-s++,[d,c]);else g(r,s++,[d,c]);switch(e){case j:case m:c--;d++;break;case o:case i:c++;d--;break;case k:case l:c--;d--;break;case p:case n:default:c++;d++}if(c<0||d<0||c>f||d>h){switch(e){case j:case m:a++;break;case k:case l:case o:case i:b++;break;case p:case n:default:a--}if(a<0||b<0||a>f||b>h){switch(e){case j:case m:a=f;b++;break;case o:case i:b=h;a++;break;case k:case l:b=h;a--;break;case p:case n:default:a=0;b++}if(b>h)b=h;else if(b<0)b=0;else if(a>f)a=f;else if(a<0)a=0}d=b;c=a}}return r};h.$FormationSquare=function(i){var a=i.$Cols||1,c=i.$Rows||1,j=[],d,e,f,h,k;f=a<c?(c-a)/2:0;h=a>c?(a-c)/2:0;k=b.round(b.max(a/2,c/2))+1;for(d=0;d<a;d++)for(e=0;e<c;e++)g(j,k-b.min(d+1+f,e+1+h,a-d+f,c-e+h),[e,d]);return j};h.$FormationRectangle=function(f){var d=f.$Cols||1,e=f.$Rows||1,h=[],a,c,i;i=b.round(b.min(d/2,e/2))+1;for(a=0;a<d;a++)for(c=0;c<e;c++)g(h,i-b.min(a+1,c+1,d-a,e-c),[c,a]);return h};h.$FormationRandom=function(d){for(var e=[],a,c=0;c<d.$Rows;c++)for(a=0;a<d.$Cols;a++)g(e,b.ceil(1e5*b.random())%13,[c,a]);return e};h.$FormationCircle=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,c=0;c<e;c++)for(a=0;a<f;a++)g(h,b.round(b.sqrt(b.pow(c-i,2)+b.pow(a-j,2))),[a,c]);return h};h.$FormationCross=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,c=0;c<e;c++)for(a=0;a<f;a++)g(h,b.round(b.min(b.abs(c-i),b.abs(a-j))),[a,c]);return h};h.$FormationRectangleCross=function(f){for(var h=f.$Cols||1,i=f.$Rows||1,j=[],a,d=h/2-.5,e=i/2-.5,k=b.max(d,e)+1,c=0;c<h;c++)for(a=0;a<i;a++)g(j,b.round(k-b.max(d-b.abs(c-d),e-b.abs(a-e)))-1,[a,c]);return j}};g.$JssorSlideshowRunner$=function(n,s,q,t,y){var f=this,u,g,e,x=0,w=t.$TransitionsOrder,r,h=8;function k(g,f){var e={$Interval:f,$Duration:1,$Delay:0,$Cols:1,$Rows:1,$Opacity:0,$Zoom:0,$Clip:0,$Move:i,$SlideOut:i,$Reverse:i,$Formation:o.$FormationRandom,$Assembly:1032,$ChessMode:{$Column:0,$Row:0},$Easing:d.$EaseSwing,$Round:{},$Blocks:[],$During:{}};a.$Extend(e,g);e.$Count=e.$Cols*e.$Rows;e.$Easing=a.$FormatEasings(e.$Easing);e.$FramesCount=b.ceil(e.$Duration/e.$Interval);e.$GetBlocks=function(b,a){b/=e.$Cols;a/=e.$Rows;var f=b+"x"+a;if(!e.$Blocks[f]){e.$Blocks[f]={$Width:b,$Height:a};for(var c=0;c<e.$Cols;c++)for(var d=0;d<e.$Rows;d++)e.$Blocks[f][d+","+c]={$Top:d*a,$Right:c*b+b,$Bottom:d*a+a,$Left:c*b}}return e.$Blocks[f]};if(e.$Brother){e.$Brother=k(e.$Brother,f);e.$SlideOut=c}return e}function p(A,h,d,v,n,l){var y=this,t,u={},j={},m=[],f,e,r,p=d.$ChessMode.$Column||0,q=d.$ChessMode.$Row||0,g=d.$GetBlocks(n,l),o=B(d),C=o.length-1,s=d.$Duration+d.$Delay*C,w=v+s,k=d.$SlideOut,x;w+=50;function B(a){var b=a.$Formation(a);return a.$Reverse?b.reverse():b}y.$EndTime=w;y.$ShowFrame=function(c){c-=v;var e=c<s;if(e||x){x=e;if(!k)c=s-c;var f=b.ceil(c/d.$Interval);a.$Each(j,function(c,e){var d=b.max(f,c.$Min);d=b.min(d,c.length-1);if(c.$LastFrameIndex!=d){if(!c.$LastFrameIndex&&!k)a.$ShowElement(m[e]);else d==c.$Max&&k&&a.$HideElement(m[e]);c.$LastFrameIndex=d;a.$SetStylesEx(m[e],c[d])}})}};h=a.$CloneNode(h);if(a.$IsBrowserIe9Earlier()){var D=!h["no-image"],z=a.$FindChildrenByTag(h);a.$Each(z,function(b){(D||b["jssor-slider"])&&a.$CssOpacity(b,a.$CssOpacity(b),c)})}a.$Each(o,function(h,m){a.$Each(h,function(G){var K=G[0],J=G[1],v=K+","+J,o=i,s=i,x=i;if(p&&J%2){if(p&3)o=!o;if(p&12)s=!s;if(p&16)x=!x}if(q&&K%2){if(q&3)o=!o;if(q&12)s=!s;if(q&16)x=!x}d.$Top=d.$Top||d.$Clip&4;d.$Bottom=d.$Bottom||d.$Clip&8;d.$Left=d.$Left||d.$Clip&1;d.$Right=d.$Right||d.$Clip&2;var C=s?d.$Bottom:d.$Top,z=s?d.$Top:d.$Bottom,B=o?d.$Right:d.$Left,A=o?d.$Left:d.$Right;d.$Clip=C||z||B||A;r={};e={$Top:0,$Left:0,$Opacity:1,$Width:n,$Height:l};f=a.$Extend({},e);t=a.$Extend({},g[v]);if(d.$Opacity)e.$Opacity=2-d.$Opacity;if(d.$ZIndex){e.$ZIndex=d.$ZIndex;f.$ZIndex=0}var I=d.$Cols*d.$Rows>1||d.$Clip;if(d.$Zoom||d.$Rotate){var H=c;if(a.$IsBrowserIe9Earlier())if(d.$Cols*d.$Rows>1)H=i;else I=i;if(H){e.$Zoom=d.$Zoom?d.$Zoom-1:1;f.$Zoom=1;if(a.$IsBrowserIe9Earlier()||a.$IsBrowserOpera())e.$Zoom=b.min(e.$Zoom,2);var N=d.$Rotate||0;e.$Rotate=N*360*(x?-1:1);f.$Rotate=0}}if(I){var h=t.$Offset={};if(d.$Clip){var w=d.$ScaleClip||1;if(C&&z){h.$Top=g.$Height/2*w;h.$Bottom=-h.$Top}else if(C)h.$Bottom=-g.$Height*w;else if(z)h.$Top=g.$Height*w;if(B&&A){h.$Left=g.$Width/2*w;h.$Right=-h.$Left}else if(B)h.$Right=-g.$Width*w;else if(A)h.$Left=g.$Width*w}r.$Clip=t;f.$Clip=g[v]}var L=o?1:-1,M=s?1:-1;if(d.x)e.$Left+=n*d.x*L;if(d.y)e.$Top+=l*d.y*M;a.$Each(e,function(b,c){if(a.$IsNumeric(b))if(b!=f[c])r[c]=b-f[c]});u[v]=k?f:e;var D=d.$FramesCount,y=b.round(m*d.$Delay/d.$Interval);j[v]=new Array(y);j[v].$Min=y;j[v].$Max=y+D-1;for(var F=0;F<=D;F++){var E=a.$Cast(f,r,F/D,d.$Easing,d.$During,d.$Round,{$Move:d.$Move,$OriginalWidth:n,$OriginalHeight:l});E.$ZIndex=E.$ZIndex||1;j[v].push(E)}})});o.reverse();a.$Each(o,function(b){a.$Each(b,function(c){var f=c[0],e=c[1],d=f+","+e,b=h;if(e||f)b=a.$CloneNode(h);a.$SetStyles(b,u[d]);a.$CssOverflow(b,"hidden");a.$CssPosition(b,"absolute");A.$AddClipElement(b);m[d]=b;a.$ShowElement(b,!k)})})}function v(){var a=this,b=0;l.call(a,0,u);a.$OnPositionChange=function(c,a){if(a-b>h){b=a;e&&e.$ShowFrame(a);g&&g.$ShowFrame(a)}};a.$Transition=r}f.$GetTransition=function(){var a=0,c=t.$Transitions,d=c.length;if(w)a=x++%d;else a=b.floor(b.random()*d);c[a]&&(c[a].$Index=a);return c[a]};f.$Initialize=function(w,x,j,l,a){r=a;a=k(a,h);var i=l.$Item,d=j.$Item;i["no-image"]=!l.$Image;d["no-image"]=!j.$Image;var m=i,o=d,v=a,c=a.$Brother||k({},h);if(!a.$SlideOut){m=d;o=i}var t=c.$Shift||0;g=new p(n,o,c,b.max(t-c.$Interval,0),s,q);e=new p(n,m,v,b.max(c.$Interval-t,0),s,q);g.$ShowFrame(0);e.$ShowFrame(0);u=b.max(g.$EndTime,e.$EndTime);f.$Index=w};f.$Clear=function(){n.$Clear();g=j;e=j};f.$GetProcessor=function(){var a=j;if(e)a=new v;return a};if(a.$IsBrowserIe9Earlier()||a.$IsBrowserOpera()||y&&a.$WebKitVersion()<537)h=16;m.call(f);l.call(f,-1e7,1e7)};var h=g.$JssorSlider$=function(q,fc){var o=this;function Ec(){var a=this;l.call(a,-1e8,2e8);a.$GetCurrentSlideInfo=function(){var c=a.$GetPosition_Display(),d=b.floor(c),f=t(d),e=c-b.floor(c);return{$Index:f,$VirtualIndex:d,$Position:e}};a.$OnPositionChange=function(d,a){var e=b.floor(a);if(e!=a&&a>d)e++;Ub(e,c);o.$TriggerEvent(h.$EVT_POSITION_CHANGE,t(a),t(d),a,d)}}function Dc(){var b=this;l.call(b,0,0,{$LoopLength:r});a.$Each(C,function(a){D&1&&a.$SetLoopLength(r);b.$Chain(a);a.$Shift(fb/bc)})}function Cc(){var a=this,b=Tb.$Elmt;l.call(a,-1,2,{$Easing:d.$EaseLinear,$Setter:{$Position:Zb},$LoopLength:r},b,{$Position:1},{$Position:-2});a.$Wrapper=b}function qc(n,m){var a=this,d,e,g,k,b;l.call(a,-1e8,2e8,{$IntervalMax:100});a.$OnStart=function(){O=c;R=j;o.$TriggerEvent(h.$EVT_SWIPE_START,t(w.$GetPosition()),w.$GetPosition())};a.$OnStop=function(){O=i;k=i;var a=w.$GetCurrentSlideInfo();o.$TriggerEvent(h.$EVT_SWIPE_END,t(w.$GetPosition()),w.$GetPosition());!a.$Position&&Gc(a.$VirtualIndex,s)};a.$OnPositionChange=function(i,h){var a;if(k)a=b;else{a=e;if(g){var c=h/g;a=f.$SlideEasing(c)*(e-d)+d}}w.$GoToPosition(a)};a.$PlayCarousel=function(b,f,c,h){d=b;e=f;g=c;w.$GoToPosition(b);a.$GoToPosition(0);a.$PlayToPosition(c,h)};a.$StandBy=function(d){k=c;b=d;a.$Play(d,j,c)};a.$SetStandByPosition=function(a){b=a};a.$MoveCarouselTo=function(a){w.$GoToPosition(a)};w=new Ec;w.$Combine(n);w.$Combine(m)}function rc(){var c=this,b=Xb();a.$CssZIndex(b,0);a.$Css(b,"pointerEvents","none");c.$Elmt=b;c.$AddClipElement=function(c){a.$AppendChild(b,c);a.$ShowElement(b)};c.$Clear=function(){a.$HideElement(b);a.$Empty(b)}}function Bc(k,e){var d=this,q,H,x,n,y=[],w,B,W,G,Q,F,g,v,p,eb;l.call(d,-u,u+1,{$SlideItemAnimator:c});function E(b){q&&q.$Revert();T(k,b,0);F=c;q=new I.$Class(k,I,a.$ParseFloat(a.$AttributeEx(k,"idle"))||pc);q.$GoToPosition(0)}function Y(){q.$Version<I.$Version&&E()}function N(p,r,m){if(!G){G=c;if(n&&m){var g=m.width,b=m.height,l=g,k=b;if(g&&b&&f.$FillMode){if(f.$FillMode&3&&(!(f.$FillMode&4)||g>K||b>J)){var j=i,q=K/J*b/g;if(f.$FillMode&1)j=q>1;else if(f.$FillMode&2)j=q<1;l=j?g*J/b:K;k=j?J:b*K/g}a.$CssWidth(n,l);a.$CssHeight(n,k);a.$CssTop(n,(J-k)/2);a.$CssLeft(n,(K-l)/2)}a.$CssPosition(n,"absolute");o.$TriggerEvent(h.$EVT_LOAD_END,e)}}a.$HideElement(r);p&&p(d)}function X(b,c,f,g){if(g==R&&s==e&&P)if(!Fc){var a=t(b);A.$Initialize(a,e,c,d,f);c.$HideContentForSlideshow();U.$Shift(a-U.$GetPosition_OuterBegin()-1);U.$GoToPosition(a);z.$PlayCarousel(b,b,0)}}function ab(b){if(b==R&&s==e){if(!g){var a=j;if(A)if(A.$Index==e)a=A.$GetProcessor();else A.$Clear();Y();g=new yc(k,e,a,q);g.$SetPlayer(p)}!g.$IsPlaying()&&g.$Replay()}}function S(h,c,i){if(h==e){if(h!=c)C[c]&&C[c].$ParkOut();else!i&&g&&g.$AdjustIdleOnPark();p&&p.$Enable();var k=R=a.$GetNow();d.$LoadImage(a.$CreateCallback(j,ab,k))}else{var m=b.abs(e-h),l=u+f.$LazyLoading-1;(!Q||m<=l)&&d.$LoadImage()}}function bb(){if(s==e&&g){g.$Stop();p&&p.$Quit();p&&p.$Disable();g.$OpenSlideshowPanel()}}function db(){s==e&&g&&g.$Stop()}function Z(a){!M&&o.$TriggerEvent(h.$EVT_CLICK,e,a)}function O(){p=v.pInstance;g&&g.$SetPlayer(p)}d.$LoadImage=function(d,b){b=b||x;if(y.length&&!G){a.$ShowElement(b);if(!W){W=c;o.$TriggerEvent(h.$EVT_LOAD_START,e);a.$Each(y,function(b){if(!a.$Attribute(b,"src")){b.src=a.$AttributeEx(b,"src2");a.$CssDisplay(b,b["display-origin"])}})}a.$LoadImages(y,n,a.$CreateCallback(j,N,d,b))}else N(d,b)};d.$GoForNextSlide=function(){var h=e;if(f.$AutoPlaySteps<0)h-=r;var c=h+f.$AutoPlaySteps*wc;if(D&2)c=t(c);if(!(D&1))c=b.max(0,b.min(c,r-u));if(c!=e){if(A){var d=A.$GetTransition(r);if(d){var i=R=a.$GetNow(),g=C[t(c)];return g.$LoadImage(a.$CreateCallback(j,X,c,g,d,i),x)}}nb(c)}};d.$TryActivate=function(){S(e,e,c)};d.$ParkOut=function(){p&&p.$Quit();p&&p.$Disable();d.$UnhideContentForSlideshow();g&&g.$Abort();g=j;E()};d.$StampSlideItemElements=function(a){a=eb+"_"+a};d.$HideContentForSlideshow=function(){a.$HideElement(k)};d.$UnhideContentForSlideshow=function(){a.$ShowElement(k)};d.$EnablePlayer=function(){p&&p.$Enable()};function T(b,d,e){if(a.$Attribute(b,"jssor-slider"))return;if(!F){if(b.tagName=="IMG"){y.push(b);if(!a.$Attribute(b,"src")){Q=c;b["display-origin"]=a.$CssDisplay(b);a.$HideElement(b)}}a.$IsBrowserIe9Earlier()&&a.$CssZIndex(b,(a.$CssZIndex(b)||0)+1)}var f=a.$Children(b);a.$Each(f,function(f){var h=f.tagName,j=a.$AttributeEx(f,"u");if(j=="player"&&!v){v=f;if(v.pInstance)O();else a.$AddEvent(v,"dataavailable",O)}if(j=="caption"){if(d){a.$CssTransformOrigin(f,a.$AttributeEx(f,"to"));a.$CssBackfaceVisibility(f,a.$AttributeEx(f,"bf"));a.$CssTransformStyle(f,"preserve-3d")}else if(!a.$IsBrowserIE()){var g=a.$CloneNode(f,i,c);a.$InsertBefore(g,f,b);a.$RemoveElement(f,b);f=g;d=c}}else if(!F&&!e&&!n){if(h=="A"){if(a.$AttributeEx(f,"u")=="image")n=a.$FindChildByTag(f,"IMG");else n=a.$FindChild(f,"image",c);if(n){w=f;a.$CssDisplay(w,"block");a.$SetStyles(w,V);B=a.$CloneNode(w,c);a.$CssPosition(w,"relative");a.$CssOpacity(B,0);a.$Css(B,"backgroundColor","#000")}}else if(h=="IMG"&&a.$AttributeEx(f,"u")=="image")n=f;if(n){n.border=0;a.$SetStyles(n,V)}}T(f,d,e+1)})}d.$OnInnerOffsetChange=function(c,b){var a=u-b;Zb(H,a)};d.$Index=e;m.call(d);a.$CssPerspective(k,a.$AttributeEx(k,"p"));a.$CssPerspectiveOrigin(k,a.$AttributeEx(k,"po"));var L=a.$FindChild(k,"thumb",c);if(L){d.$Thumb=a.$CloneNode(L);a.$HideElement(L)}a.$ShowElement(k);x=a.$CloneNode(cb);a.$CssZIndex(x,1e3);a.$AddEvent(k,"click",Z);E(c);d.$Image=n;d.$Link=B;d.$Item=k;d.$Wrapper=H=k;a.$AppendChild(H,x);o.$On(203,S);o.$On(28,db);o.$On(24,bb)}function yc(y,f,p,q){var b=this,m=0,u=0,g,j,e,d,k,t,r,n=C[f];l.call(b,0,0);function v(){a.$Empty(N);dc&&k&&n.$Link&&a.$AppendChild(N,n.$Link);a.$ShowElement(N,!k&&n.$Image)}function w(){b.$Replay()}function x(a){r=a;b.$Stop();b.$Replay()}b.$Replay=function(){var a=b.$GetPosition_Display();if(!B&&!O&&!r&&s==f){if(!a){if(g&&!k){k=c;b.$OpenSlideshowPanel(c);o.$TriggerEvent(h.$EVT_SLIDESHOW_START,f,m,u,g,d)}v()}var i,p=h.$EVT_STATE_CHANGE;if(a!=d)if(a==e)i=d;else if(a==j)i=e;else if(!a)i=j;else i=b.$GetPlayToPosition();o.$TriggerEvent(p,f,a,m,j,e,d);var l=P&&(!E||F);if(a==d)(e!=d&&!(E&12)||l)&&n.$GoForNextSlide();else(l||a!=e)&&b.$PlayToPosition(i,w)}};b.$AdjustIdleOnPark=function(){e==d&&e==b.$GetPosition_Display()&&b.$GoToPosition(j)};b.$Abort=function(){A&&A.$Index==f&&A.$Clear();var a=b.$GetPosition_Display();a<d&&o.$TriggerEvent(h.$EVT_STATE_CHANGE,f,-a-1,m,j,e,d)};b.$OpenSlideshowPanel=function(b){p&&a.$CssOverflow(hb,b&&p.$Transition.$Outside?"":"hidden")};b.$OnInnerOffsetChange=function(b,a){if(k&&a>=g){k=i;v();n.$UnhideContentForSlideshow();A.$Clear();o.$TriggerEvent(h.$EVT_SLIDESHOW_END,f,m,u,g,d)}o.$TriggerEvent(h.$EVT_PROGRESS_CHANGE,f,a,m,j,e,d)};b.$SetPlayer=function(a){if(a&&!t){t=a;a.$On($JssorPlayer$.$EVT_SWITCH,x)}};p&&b.$Chain(p);g=b.$GetPosition_OuterEnd();b.$Chain(q);j=g+q.$IdleBegin;e=g+q.$IdleEnd;d=b.$GetPosition_OuterEnd()}function Zb(g,f){var e=x>0?x:gb,c=Bb*f*(e&1),d=Cb*f*(e>>1&1);c=b.round(c);d=b.round(d);a.$CssLeft(g,c);a.$CssTop(g,d)}function Pb(){pb=O;Kb=z.$GetPlayToPosition();G=w.$GetPosition()}function gc(){Pb();if(B||!F&&E&12){z.$Stop();o.$TriggerEvent(h.$EVT_FREEZE)}}function ec(e){if(!B&&(F||!(E&12))&&!z.$IsPlaying()){var c=w.$GetPosition(),a=b.ceil(G);if(e&&b.abs(H)>=f.$MinDragOffsetToSlide){a=b.ceil(c);a+=eb}if(!(D&1))a=b.min(r-u,b.max(a,0));var d=b.abs(a-c);d=1-b.pow(1-d,5);if(!M&&pb)z.$Continue(Kb);else if(c==a){tb.$EnablePlayer();tb.$TryActivate()}else z.$PlayCarousel(c,a,d*Vb)}}function Ib(b){!a.$AttributeEx(a.$EvtSrc(b),"nodrag")&&a.$CancelEvent(b)}function uc(a){Yb(a,1)}function Yb(b,d){b=a.$GetEvent(b);var k=a.$EvtSrc(b);if(!L&&!a.$AttributeEx(k,"nodrag")&&vc()&&(!d||b.touches.length==1)){B=c;Ab=i;R=j;a.$AddEvent(e,d?"touchmove":"mousemove",Db);a.$GetNow();M=0;gc();if(!pb)x=0;if(d){var g=b.touches[0];vb=g.clientX;wb=g.clientY}else{var f=a.$MousePosition(b);vb=f.x;wb=f.y}H=0;bb=0;eb=0;o.$TriggerEvent(h.$EVT_DRAG_START,t(G),G,b)}}function Db(e){if(B){e=a.$GetEvent(e);var f;if(e.type!="mousemove"){var l=e.touches[0];f={x:l.clientX,y:l.clientY}}else f=a.$MousePosition(e);if(f){var j=f.x-vb,k=f.y-wb;if(b.floor(G)!=G)x=x||gb&L;if((j||k)&&!x){if(L==3)if(b.abs(k)>b.abs(j))x=2;else x=1;else x=L;if(jb&&x==1&&b.abs(k)-b.abs(j)>3)Ab=c}if(x){var d=k,i=Cb;if(x==1){d=j;i=Bb}if(!(D&1)){if(d>0){var g=i*s,h=d-g;if(h>0)d=g+b.sqrt(h)*5}if(d<0){var g=i*(r-u-s),h=-d-g;if(h>0)d=-g-b.sqrt(h)*5}}if(H-bb<-2)eb=0;else if(H-bb>2)eb=-1;bb=H;H=d;sb=G-H/i/(Z||1);if(H&&x&&!Ab){a.$CancelEvent(e);if(!O)z.$StandBy(sb);else z.$SetStandByPosition(sb)}}}}}function mb(){sc();if(B){B=i;a.$GetNow();a.$RemoveEvent(e,"mousemove",Db);a.$RemoveEvent(e,"touchmove",Db);M=H;z.$Stop();var b=w.$GetPosition();o.$TriggerEvent(h.$EVT_DRAG_END,t(b),b,t(G),G);E&12&&Pb();ec(c)}}function kc(c){if(M){a.$StopEvent(c);var b=a.$EvtSrc(c);while(b&&v!==b){b.tagName=="A"&&a.$CancelEvent(c);try{b=b.parentNode}catch(d){break}}}}function oc(a){C[s];s=t(a);tb=C[s];Ub(a);return s}function Gc(a,b){x=0;oc(a);o.$TriggerEvent(h.$EVT_PARK,t(a),b)}function Ub(b,c){yb=b;a.$Each(S,function(a){a.$SetCurrentIndex(t(b),b,c)})}function vc(){var b=h.$DragRegistry||0,a=Y;if(jb)a&1&&(a&=1);h.$DragRegistry|=a;return L=a&~b}function sc(){if(L){h.$DragRegistry&=~Y;L=0}}function Xb(){var b=a.$CreateDiv();a.$SetStyles(b,V);a.$CssPosition(b,"absolute");return b}function t(a){return(a%r+r)%r}function lc(a,c){if(c)if(!D){a=b.min(b.max(a+yb,0),r-u);c=i}else if(D&2){a=t(a+yb);c=i}nb(a,f.$SlideDuration,c)}function zb(){a.$Each(S,function(a){a.$Show(a.$Options.$ChanceToShow<=F)})}function ic(){if(!F){F=1;zb();if(!B){E&12&&ec();E&3&&C[s].$TryActivate()}}}function hc(){if(F){F=0;zb();B||!(E&12)||gc()}}function jc(){V={$Width:K,$Height:J,$Top:0,$Left:0};a.$Each(T,function(b){a.$SetStyles(b,V);a.$CssPosition(b,"absolute");a.$CssOverflow(b,"hidden");a.$HideElement(b)});a.$SetStyles(cb,V)}function lb(b,a){nb(b,a,c)}function nb(g,e,l){if(Rb&&(!B&&(F||!(E&12))||f.$NaviQuitDrag)){O=c;B=i;z.$Stop();if(e==k)e=Vb;var d=Eb.$GetPosition_Display(),a=g;if(l){a=d+g;if(g>0)a=b.ceil(a);else a=b.floor(a)}if(D&2)a=t(a);if(!(D&1))a=b.max(0,b.min(a,r-u));var j=(a-d)%r;a=d+j;var h=d==a?0:e*b.abs(j);h=b.min(h,e*u*1.5);z.$PlayCarousel(d,a,h||1)}}o.$PlayTo=nb;o.$GoTo=function(a){w.$GoToPosition(a)};o.$Next=function(){lb(1)};o.$Prev=function(){lb(-1)};o.$Pause=function(){P=i};o.$Play=function(){if(!P){P=c;C[s]&&C[s].$TryActivate()}};o.$SetSlideshowTransitions=function(a){f.$SlideshowOptions.$Transitions=a};o.$SetCaptionTransitions=function(b){I.$Transitions=b;I.$Version=a.$GetNow()};o.$SlidesCount=function(){return T.length};o.$CurrentIndex=function(){return s};o.$IsAutoPlaying=function(){return P};o.$IsDragging=function(){return B};o.$IsSliding=function(){return O};o.$IsMouseOver=function(){return!F};o.$LastDragSucceded=function(){return M};function X(){return a.$CssWidth(y||q)}function ib(){return a.$CssHeight(y||q)}o.$OriginalWidth=o.$GetOriginalWidth=X;o.$OriginalHeight=o.$GetOriginalHeight=ib;function Gb(c,d){if(c==k)return a.$CssWidth(q);if(!y){var b=a.$CreateDiv(e);a.$ClassName(b,a.$ClassName(q));a.$CssCssText(b,a.$CssCssText(q));a.$CssDisplay(b,"block");a.$CssPosition(b,"relative");a.$CssTop(b,0);a.$CssLeft(b,0);a.$CssOverflow(b,"visible");y=a.$CreateDiv(e);a.$CssPosition(y,"absolute");a.$CssTop(y,0);a.$CssLeft(y,0);a.$CssWidth(y,a.$CssWidth(q));a.$CssHeight(y,a.$CssHeight(q));a.$CssTransformOrigin(y,"0 0");a.$AppendChild(y,b);var h=a.$Children(q);a.$AppendChild(q,y);a.$Css(q,"backgroundImage","");a.$Each(h,function(c){a.$AppendChild(a.$AttributeEx(c,"noscale")?q:b,c);a.$AttributeEx(c,"autocenter")&&Lb.push(c)})}Z=c/(d?a.$CssHeight:a.$CssWidth)(y);a.$CssScale(y,Z);var g=d?Z*X():c,f=d?c:Z*ib();a.$CssWidth(q,g);a.$CssHeight(q,f);a.$Each(Lb,function(b){var c=a.$ParseInt(a.$AttributeEx(b,"autocenter"));a.$CenterElement(b,c)})}o.$ScaleHeight=o.$GetScaleHeight=function(b){if(b==k)return a.$CssHeight(q);Gb(b,c)};o.$ScaleWidth=o.$SetScaleWidth=o.$GetScaleWidth=Gb;o.$GetVirtualIndex=function(a){var d=b.ceil(t(fb/bc)),c=t(a-s+d);if(c>u){if(a-s>r/2)a-=r;else if(a-s<=-r/2)a+=r}else a=s+c-d;return a};m.call(o);o.$Elmt=q=a.$GetElement(q);var f=a.$Extend({$FillMode:0,$LazyLoading:1,$ArrowKeyNavigation:1,$StartIndex:0,$AutoPlay:i,$Loop:1,$NaviQuitDrag:c,$AutoPlaySteps:1,$AutoPlayInterval:3e3,$PauseOnHover:1,$SlideDuration:500,$SlideEasing:d.$EaseOutQuad,$MinDragOffsetToSlide:20,$SlideSpacing:0,$Cols:1,$Align:0,$UISearchMode:1,$PlayOrientation:1,$DragOrientation:1},fc);if(f.$Idle!=k)f.$AutoPlayInterval=f.$Idle;if(f.$DisplayPieces!=k)f.$Cols=f.$DisplayPieces;if(f.$ParkingPosition!=k)f.$Align=f.$ParkingPosition;var gb=f.$PlayOrientation&3,wc=(f.$PlayOrientation&4)/-4||1,db=f.$SlideshowOptions,I=a.$Extend({$Class:p,$PlayInMode:1,$PlayOutMode:1},f.$CaptionSliderOptions);I.$Transitions=I.$Transitions||I.$CaptionTransitions;var qb=f.$BulletNavigatorOptions,W=f.$ArrowNavigatorOptions,ab=f.$ThumbnailNavigatorOptions,Q=!f.$UISearchMode,y,v=a.$FindChild(q,"slides",Q),cb=a.$FindChild(q,"loading",Q)||a.$CreateDiv(e),Jb=a.$FindChild(q,"navigator",Q),cc=a.$FindChild(q,"arrowleft",Q),ac=a.$FindChild(q,"arrowright",Q),Hb=a.$FindChild(q,"thumbnavigator",Q),nc=a.$CssWidth(v),mc=a.$CssHeight(v),V,T=[],xc=a.$Children(v);a.$Each(xc,function(b){if(b.tagName=="DIV"&&!a.$AttributeEx(b,"u"))T.push(b);else a.$IsBrowserIe9Earlier()&&a.$CssZIndex(b,(a.$CssZIndex(b)||0)+1)});var s=-1,yb,tb,r=T.length,K=f.$SlideWidth||nc,J=f.$SlideHeight||mc,Wb=f.$SlideSpacing,Bb=K+Wb,Cb=J+Wb,bc=gb&1?Bb:Cb,u=b.min(f.$Cols,r),hb,x,L,Ab,S=[],Qb,Sb,Ob,dc,Fc,P,E=f.$PauseOnHover,pc=f.$AutoPlayInterval,Vb=f.$SlideDuration,rb,ub,fb,Rb=u<r,D=Rb?f.$Loop:0,Y,M,F=1,O,B,R,vb=0,wb=0,H,bb,eb,Eb,w,U,z,Tb=new rc,Z,Lb=[];P=f.$AutoPlay;o.$Options=fc;jc();a.$Attribute(q,"jssor-slider",c);a.$CssZIndex(v,a.$CssZIndex(v)||0);a.$CssPosition(v,"absolute");hb=a.$CloneNode(v,c);a.$InsertBefore(hb,v);if(db){dc=db.$ShowLink;rb=db.$Class;ub=u==1&&r>1&&rb&&(!a.$IsBrowserIE()||a.$BrowserVersion()>=8)}fb=ub||u>=r||!(D&1)?0:f.$Align;Y=(u>1||fb?gb:-1)&f.$DragOrientation;var xb=v,C=[],A,N,Fb=a.$Device(),jb=Fb.$Touchable,G,pb,Kb,sb;Fb.$TouchActionAttr&&a.$Css(xb,Fb.$TouchActionAttr,([j,"pan-y","pan-x","none"])[Y]||"");U=new Cc;if(ub)A=new rb(Tb,K,J,db,jb);a.$AppendChild(hb,U.$Wrapper);a.$CssOverflow(v,"hidden");N=Xb();a.$Css(N,"backgroundColor","#000");a.$CssOpacity(N,0);a.$InsertBefore(N,xb.firstChild,xb);for(var ob=0;ob<T.length;ob++){var zc=T[ob],Ac=new Bc(zc,ob);C.push(Ac)}a.$HideElement(cb);Eb=new Dc;z=new qc(Eb,U);if(Y){a.$AddEvent(v,"mousedown",Yb);a.$AddEvent(v,"touchstart",uc);a.$AddEvent(v,"dragstart",Ib);a.$AddEvent(v,"selectstart",Ib);a.$AddEvent(e,"mouseup",mb);a.$AddEvent(e,"touchend",mb);a.$AddEvent(e,"touchcancel",mb);a.$AddEvent(g,"blur",mb)}E&=jb?10:5;if(Jb&&qb){Qb=new qb.$Class(Jb,qb,X(),ib());S.push(Qb)}if(W&&cc&&ac){W.$Loop=D;W.$Cols=u;Sb=new W.$Class(cc,ac,W,X(),ib());S.push(Sb)}if(Hb&&ab){ab.$StartIndex=f.$StartIndex;Ob=new ab.$Class(Hb,ab);S.push(Ob)}a.$Each(S,function(a){a.$Reset(r,C,cb);a.$On(n.$NAVIGATIONREQUEST,lc)});a.$Css(q,"visibility","visible");Gb(X());a.$AddEvent(v,"click",kc);a.$AddEvent(q,"mouseout",a.$MouseOverOutFilter(ic,q));a.$AddEvent(q,"mouseover",a.$MouseOverOutFilter(hc,q));zb();f.$ArrowKeyNavigation&&a.$AddEvent(e,"keydown",function(a){if(a.keyCode==37)lb(-f.$ArrowKeyNavigation);else a.keyCode==39&&lb(f.$ArrowKeyNavigation)});var kb=f.$StartIndex;if(!(D&1))kb=b.max(0,b.min(kb,r-u));z.$PlayCarousel(kb,kb,0)};h.$EVT_CLICK=21;h.$EVT_DRAG_START=22;h.$EVT_DRAG_END=23;h.$EVT_SWIPE_START=24;h.$EVT_SWIPE_END=25;h.$EVT_LOAD_START=26;h.$EVT_LOAD_END=27;h.$EVT_FREEZE=28;h.$EVT_POSITION_CHANGE=202;h.$EVT_PARK=203;h.$EVT_SLIDESHOW_START=206;h.$EVT_SLIDESHOW_END=207;h.$EVT_PROGRESS_CHANGE=208;h.$EVT_STATE_CHANGE=209;var n={$NAVIGATIONREQUEST:1,$INDEXCHANGE:2,$RESET:3};g.$JssorBulletNavigator$=function(e,C){var f=this;m.call(f);e=a.$GetElement(e);var s,A,z,r,l=0,d,o,k,w,x,h,g,q,p,B=[],y=[];function v(a){a!=-1&&y[a].$Selected(a==l)}function t(a){f.$TriggerEvent(n.$NAVIGATIONREQUEST,a*o)}f.$Elmt=e;f.$GetCurrentIndex=function(){return r};f.$SetCurrentIndex=function(a){if(a!=r){var d=l,c=b.floor(a/o);l=c;r=a;v(d);v(c)}};f.$Show=function(b){a.$ShowElement(e,b)};var u;f.$Reset=function(E){if(!u){s=b.ceil(E/o);l=0;var n=q+w,r=p+x,m=b.ceil(s/k)-1;A=q+n*(!h?m:k-1);z=p+r*(h?m:k-1);a.$CssWidth(e,A);a.$CssHeight(e,z);for(var f=0;f<s;f++){var C=a.$CreateSpan();a.$InnerText(C,f+1);var i=a.$BuildElement(g,"numbertemplate",C,c);a.$CssPosition(i,"absolute");var v=f%(m+1);a.$CssLeft(i,!h?n*v:f%k*n);a.$CssTop(i,h?r*v:b.floor(f/(m+1))*r);a.$AppendChild(e,i);B[f]=i;d.$ActionMode&1&&a.$AddEvent(i,"click",a.$CreateCallback(j,t,f));d.$ActionMode&2&&a.$AddEvent(i,"mouseover",a.$MouseOverOutFilter(a.$CreateCallback(j,t,f),i));y[f]=a.$Buttonize(i)}u=c}};f.$Options=d=a.$Extend({$SpacingX:10,$SpacingY:10,$Orientation:1,$ActionMode:1},C);g=a.$FindChild(e,"prototype");q=a.$CssWidth(g);p=a.$CssHeight(g);a.$RemoveElement(g,e);o=d.$Steps||1;k=d.$Lanes||1;w=d.$SpacingX;x=d.$SpacingY;h=d.$Orientation-1;d.$Scale==i&&a.$Attribute(e,"noscale",c);d.$AutoCenter&&a.$Attribute(e,"autocenter",d.$AutoCenter)};g.$JssorArrowNavigator$=function(b,g,h){var d=this;m.call(d);var r,q,e,f,k;a.$CssWidth(b);a.$CssHeight(b);function l(a){d.$TriggerEvent(n.$NAVIGATIONREQUEST,a,c)}function p(c){a.$ShowElement(b,c||!h.$Loop&&e==0);a.$ShowElement(g,c||!h.$Loop&&e>=q-h.$Cols);r=c}d.$GetCurrentIndex=function(){return e};d.$SetCurrentIndex=function(b,a,c){if(c)e=a;else{e=b;p(r)}};d.$Show=p;var o;d.$Reset=function(d){q=d;e=0;if(!o){a.$AddEvent(b,"click",a.$CreateCallback(j,l,-k));a.$AddEvent(g,"click",a.$CreateCallback(j,l,k));a.$Buttonize(b);a.$Buttonize(g);o=c}};d.$Options=f=a.$Extend({$Steps:1},h);k=f.$Steps;if(f.$Scale==i){a.$Attribute(b,"noscale",c);a.$Attribute(g,"noscale",c)}if(f.$AutoCenter){a.$Attribute(b,"autocenter",f.$AutoCenter);a.$Attribute(g,"autocenter",f.$AutoCenter)}};g.$JssorThumbnailNavigator$=function(g,C){var l=this,z,q,d,w=[],A,y,e,r,s,v,u,p,t,f,o;m.call(l);g=a.$GetElement(g);function B(m,f){var g=this,b,k,i;function p(){k.$Selected(q==f)}function h(d){if(d||!t.$LastDragSucceded()){var a=e-f%e,b=t.$GetVirtualIndex((f+a)/e-1),c=b*e+e-a;l.$TriggerEvent(n.$NAVIGATIONREQUEST,c)}}g.$Index=f;g.$Highlight=p;i=m.$Thumb||m.$Image||a.$CreateDiv();g.$Wrapper=b=a.$BuildElement(o,"thumbnailtemplate",i,c);k=a.$Buttonize(b);d.$ActionMode&1&&a.$AddEvent(b,"click",a.$CreateCallback(j,h,0));d.$ActionMode&2&&a.$AddEvent(b,"mouseover",a.$MouseOverOutFilter(a.$CreateCallback(j,h,1),b))}l.$GetCurrentIndex=function(){return q};l.$SetCurrentIndex=function(c,d,f){var a=q;q=c;a!=-1&&w[a].$Highlight();w[c].$Highlight();!f&&t.$PlayTo(t.$GetVirtualIndex(b.floor(d/e)))};l.$Show=function(b){a.$ShowElement(g,b)};var x;l.$Reset=function(F,C){if(!x){z=F;b.ceil(z/e);q=-1;p=b.min(p,C.length);var j=d.$Orientation&1,m=v+(v+r)*(e-1)*(1-j),l=u+(u+s)*(e-1)*j,o=m+(m+r)*(p-1)*j,n=l+(l+s)*(p-1)*(1-j);a.$CssPosition(f,"absolute");a.$CssOverflow(f,"hidden");d.$AutoCenter&1&&a.$CssLeft(f,(A-o)/2);d.$AutoCenter&2&&a.$CssTop(f,(y-n)/2);a.$CssWidth(f,o);a.$CssHeight(f,n);var k=[];a.$Each(C,function(l,g){var h=new B(l,g),d=h.$Wrapper,c=b.floor(g/e),i=g%e;a.$CssLeft(d,(v+r)*i*(1-j));a.$CssTop(d,(u+s)*i*j);if(!k[c]){k[c]=a.$CreateDiv();a.$AppendChild(f,k[c])}a.$AppendChild(k[c],d);w.push(h)});var E=a.$Extend({$AutoPlay:i,$NaviQuitDrag:i,$SlideWidth:m,$SlideHeight:l,$SlideSpacing:r*j+s*(1-j),$MinDragOffsetToSlide:12,$SlideDuration:200,$PauseOnHover:1,$PlayOrientation:d.$Orientation,$DragOrientation:d.$NoDrag||d.$DisableDrag?0:d.$Orientation},d);t=new h(g,E);x=c}};l.$Options=d=a.$Extend({$SpacingX:0,$SpacingY:0,$Cols:1,$Orientation:1,$AutoCenter:3,$ActionMode:1},C);if(d.$DisplayPieces!=k)d.$Cols=d.$DisplayPieces;if(d.$Rows!=k)d.$Lanes=d.$Rows;A=a.$CssWidth(g);y=a.$CssHeight(g);f=a.$FindChild(g,"slides",c);o=a.$FindChild(f,"prototype");v=a.$CssWidth(o);u=a.$CssHeight(o);a.$RemoveElement(o,f);e=d.$Lanes||1;r=d.$SpacingX;s=d.$SpacingY;p=d.$Cols;d.$Scale==i&&a.$Attribute(g,"noscale",c)};function p(e,d,c){var b=this;l.call(b,0,c);b.$Revert=a.$EmptyFunction;b.$IdleBegin=0;b.$IdleEnd=c}g.$JssorCaptionSlider$=function(h,f,i){var c=this;l.call(c,0,0);var e,d;function g(p,h,f){var c=this,g,n=f?h.$PlayInMode:h.$PlayOutMode,e=h.$Transitions,o={$Transition:"t",$Delay:"d",$Duration:"du",x:"x",y:"y",$Rotate:"r",$Zoom:"z",$Opacity:"f",$BeginTime:"b"},d={$Default:function(b,a){if(!isNaN(a.$Value))b=a.$Value;else b*=a.$Percent;return b},$Opacity:function(b,a){return this.$Default(b-1,a)}};d.$Zoom=d.$Opacity;l.call(c,0,0);function j(r,m){var l=[],i,k=[],c=[];function h(c,d){var b={};a.$Each(o,function(g,h){var e=a.$AttributeEx(c,g+(d||""));if(e){var f={};if(g=="t")f.$Value=e;else if(e.indexOf("%")+1)f.$Percent=a.$ParseFloat(e)/100;else f.$Value=a.$ParseFloat(e);b[h]=f}});return b}function p(){return e[b.floor(b.random()*e.length)]}function g(f){var h;if(f=="*")h=p();else if(f){var d=e[a.$ParseInt(f)]||e[f];if(a.$IsArray(d)){if(f!=i){i=f;c[f]=0;k[f]=d[b.floor(b.random()*d.length)]}else c[f]++;d=k[f];if(a.$IsArray(d)){d=d.length&&d[c[f]%d.length];if(a.$IsArray(d))d=d[b.floor(b.random()*d.length)]}}h=d;if(a.$IsString(h))h=g(h)}return h}var q=a.$Children(r);a.$Each(q,function(b){var c=[];c.$Elmt=b;var e=a.$AttributeEx(b,"u")=="caption";a.$Each(f?[0,3]:[2],function(l,o){if(e){var k,f;if(l!=2||!a.$AttributeEx(b,"t3")){f=h(b,l);if(l==2&&!f.$Transition){f.$Delay=f.$Delay||{$Value:0};f=a.$Extend(h(b,0),f)}}if(f&&f.$Transition){k=g(f.$Transition.$Value);if(k){var i=a.$Extend({$Delay:0},k);a.$Each(f,function(c,a){var b=(d[a]||d.$Default).apply(d,[i[a],f[a]]);if(!isNaN(b))i[a]=b});if(!o)if(f.$BeginTime)i.$BeginTime=f.$BeginTime.$Value||0;else if(n&2)i.$BeginTime=0}}c.push(i)}if(m%2&&!o)c.$Children=j(b,m+1)});l.push(c)});return l}function m(w,c,z){var g={$Easing:c.$Easing,$Round:c.$Round,$During:c.$During,$Reverse:f&&!z},m=w,r=a.$ParentNode(w),k=a.$CssWidth(m),j=a.$CssHeight(m),y=a.$CssWidth(r),x=a.$CssHeight(r),h={},e={},i=c.$ScaleClip||1;if(c.$Opacity)e.$Opacity=1-c.$Opacity;g.$OriginalWidth=k;g.$OriginalHeight=j;if(c.$Zoom||c.$Rotate){e.$Zoom=(c.$Zoom||2)-2;if(a.$IsBrowserIe9Earlier()||a.$IsBrowserOpera())e.$Zoom=b.min(e.$Zoom,1);h.$Zoom=1;var B=c.$Rotate||0;e.$Rotate=B*360;h.$Rotate=0}else if(c.$Clip){var s={$Top:0,$Right:k,$Bottom:j,$Left:0},v=a.$Extend({},s),d=v.$Offset={},u=c.$Clip&4,p=c.$Clip&8,t=c.$Clip&1,q=c.$Clip&2;if(u&&p){d.$Top=j/2*i;d.$Bottom=-d.$Top}else if(u)d.$Bottom=-j*i;else if(p)d.$Top=j*i;if(t&&q){d.$Left=k/2*i;d.$Right=-d.$Left}else if(t)d.$Right=-k*i;else if(q)d.$Left=k*i;g.$Move=c.$Move;e.$Clip=v;h.$Clip=s}var n=0,o=0;if(c.x)n-=y*c.x;if(c.y)o-=x*c.y;if(n||o||g.$Move){e.$Left=n;e.$Top=o}var A=c.$Duration;h=a.$Extend(h,a.$GetStyles(m,e));g.$Setter=a.$StyleSetterEx();return new l(c.$Delay,A,g,m,h,e)}function i(b,d){a.$Each(d,function(d){var a,h=d.$Elmt,e=d[0],j=d[1];if(e){a=m(h,e);e.$BeginTime==k&&a.$Shift(b);b=a.$GetPosition_OuterEnd()}b=i(b,d.$Children);if(j){var f=m(h,j,1);f.$Shift(b);c.$Combine(f);g.$Combine(f)}a&&c.$Combine(a)});return b}c.$Revert=function(){c.$GoToPosition(c.$GetPosition_OuterEnd()*(f||0));g.$GoToPosition(0)};g=new l(0,0);i(0,n?j(p,1):[])}c.$Revert=function(){d.$Revert();e.$Revert()};e=new g(h,f,1);c.$IdleBegin=e.$GetPosition_OuterEnd();c.$IdleEnd=c.$IdleBegin+i;d=new g(h,f);d.$Shift(c.$IdleEnd);c.$Combine(d);c.$Combine(e)};g.$JssorCaptionSlideo$=function(n,g,m){var b=this,o,h={},i=g.$Transitions,d=new l(0,0);l.call(b,0,0);function j(d,c){var b={};a.$Each(d,function(d,f){var e=h[f];if(e){if(a.$IsPlainObject(d))d=j(d,c||f=="e");else if(c)if(a.$IsNumeric(d))d=o[d];b[e]=d}});return b}function k(e,c){var b=[],d=a.$Children(e);a.$Each(d,function(d){var h=a.$AttributeEx(d,"u")=="caption";if(h){var e=a.$AttributeEx(d,"t"),g=i[a.$ParseInt(e)]||i[e],f={$Elmt:d,$Transition:g};b.push(f)}if(c<5)b=b.concat(k(d,c+1))});return b}function r(c,e,b){a.$Each(e,function(f){var e=j(f),g={$Easing:a.$FormatEasings(e.$Easing),$Setter:a.$StyleSetterEx(),$OriginalWidth:b.$Width,$OriginalHeight:b.$Height},h=new l(f.b,f.d,g,c,b,e);d.$Combine(h);b=a.$AddDif(b,e)});return b}function q(b){a.$Each(b,function(e){var b=e.$Elmt,d=a.$CssWidth(b),c=a.$CssHeight(b),f={$Left:a.$CssLeft(b),$Top:a.$CssTop(b),$Opacity:1,$ZIndex:a.$CssZIndex(b)||0,$Rotate:0,$RotateX:0,$RotateY:0,$ScaleX:1,$ScaleY:1,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0,$Width:d,$Height:c,$Clip:{$Top:0,$Right:d,$Bottom:c,$Left:0}};r(b,e.$Transition,f)})}function t(g,f,h){var e=g.b-f;if(e){var a=new l(f,e);a.$Combine(d,c);a.$Shift(h);b.$Combine(a)}b.$Expand(g.d);return e}function s(f){var c=d.$GetPosition_OuterBegin(),e=0;a.$Each(f,function(d,f){d=a.$Extend({d:m},d);t(d,c,e);c=d.b;e+=d.d;if(!f||d.t==2){b.$IdleBegin=c;b.$IdleEnd=c+d.d}})}b.$Revert=function(){b.$GoToPosition(-1,c)};o=[f.$Swing,f.$Linear,f.$InQuad,f.$OutQuad,f.$InOutQuad,f.$InCubic,f.$OutCubic,f.$InOutCubic,f.$InQuart,f.$OutQuart,f.$InOutQuart,f.$InQuint,f.$OutQuint,f.$InOutQuint,f.$InSine,f.$OutSine,f.$InOutSine,f.$InExpo,f.$OutExpo,f.$InOutExpo,f.$InCirc,f.$OutCirc,f.$InOutCirc,f.$InElastic,f.$OutElastic,f.$InOutElastic,f.$InBack,f.$OutBack,f.$InOutBack,f.$InBounce,f.$OutBounce,f.$InOutBounce,f.$GoBack,f.$InWave,f.$OutWave,f.$OutJump,f.$InJump];var u={$Top:"y",$Left:"x",$Bottom:"m",$Right:"t",$Rotate:"r",$RotateX:"rX",$RotateY:"rY",$ScaleX:"sX",$ScaleY:"sY",$TranslateX:"tX",$TranslateY:"tY",$TranslateZ:"tZ",$SkewX:"kX",$SkewY:"kY",$Opacity:"o",$Easing:"e",$ZIndex:"i",$Clip:"c"};a.$Each(u,function(b,a){h[b]=a});q(k(n,1));d.$GoToPosition(-1);var p=g.$Breaks||[],e=[].concat(p[a.$ParseInt(a.$AttributeEx(n,"b"))]||[]);e.push({b:d.$GetPosition_OuterEnd(),d:e.length?0:m});s(e);b.$GoToPosition(-1)}})(window,document,Math,null,true,false)
;
(function(g,e,b,j,c,i,k){/*! Jssor */
new(function(){});var d=g.$JssorEasing$={$EaseSwing:function(a){return-b.cos(a*b.PI)/2+.5},$EaseLinear:function(a){return a},$EaseInQuad:function(a){return a*a},$EaseOutQuad:function(a){return-a*(a-2)},$EaseInOutQuad:function(a){return(a*=2)<1?1/2*a*a:-1/2*(--a*(a-2)-1)},$EaseInCubic:function(a){return a*a*a},$EaseOutCubic:function(a){return(a-=1)*a*a+1},$EaseInOutCubic:function(a){return(a*=2)<1?1/2*a*a*a:1/2*((a-=2)*a*a+2)},$EaseInQuart:function(a){return a*a*a*a},$EaseOutQuart:function(a){return-((a-=1)*a*a*a-1)},$EaseInOutQuart:function(a){return(a*=2)<1?1/2*a*a*a*a:-1/2*((a-=2)*a*a*a-2)},$EaseInQuint:function(a){return a*a*a*a*a},$EaseOutQuint:function(a){return(a-=1)*a*a*a*a+1},$EaseInOutQuint:function(a){return(a*=2)<1?1/2*a*a*a*a*a:1/2*((a-=2)*a*a*a*a+2)},$EaseInSine:function(a){return 1-b.cos(a*b.PI/2)},$EaseOutSine:function(a){return b.sin(a*b.PI/2)},$EaseInOutSine:function(a){return-1/2*(b.cos(b.PI*a)-1)},$EaseInExpo:function(a){return a==0?0:b.pow(2,10*(a-1))},$EaseOutExpo:function(a){return a==1?1:-b.pow(2,-10*a)+1},$EaseInOutExpo:function(a){return a==0||a==1?a:(a*=2)<1?1/2*b.pow(2,10*(a-1)):1/2*(-b.pow(2,-10*--a)+2)},$EaseInCirc:function(a){return-(b.sqrt(1-a*a)-1)},$EaseOutCirc:function(a){return b.sqrt(1-(a-=1)*a)},$EaseInOutCirc:function(a){return(a*=2)<1?-1/2*(b.sqrt(1-a*a)-1):1/2*(b.sqrt(1-(a-=2)*a)+1)},$EaseInElastic:function(a){if(!a||a==1)return a;var c=.3,d=.075;return-(b.pow(2,10*(a-=1))*b.sin((a-d)*2*b.PI/c))},$EaseOutElastic:function(a){if(!a||a==1)return a;var c=.3,d=.075;return b.pow(2,-10*a)*b.sin((a-d)*2*b.PI/c)+1},$EaseInOutElastic:function(a){if(!a||a==1)return a;var c=.45,d=.1125;return(a*=2)<1?-.5*b.pow(2,10*(a-=1))*b.sin((a-d)*2*b.PI/c):b.pow(2,-10*(a-=1))*b.sin((a-d)*2*b.PI/c)*.5+1},$EaseInBack:function(a){var b=1.70158;return a*a*((b+1)*a-b)},$EaseOutBack:function(a){var b=1.70158;return(a-=1)*a*((b+1)*a+b)+1},$EaseInOutBack:function(a){var b=1.70158;return(a*=2)<1?1/2*a*a*(((b*=1.525)+1)*a-b):1/2*((a-=2)*a*(((b*=1.525)+1)*a+b)+2)},$EaseInBounce:function(a){return 1-d.$EaseOutBounce(1-a)},$EaseOutBounce:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},$EaseInOutBounce:function(a){return a<1/2?d.$EaseInBounce(a*2)*.5:d.$EaseOutBounce(a*2-1)*.5+.5},$EaseGoBack:function(a){return 1-b.abs(2-1)},$EaseInWave:function(a){return 1-b.cos(a*b.PI*2)},$EaseOutWave:function(a){return b.sin(a*b.PI*2)},$EaseOutJump:function(a){return 1-((a*=2)<1?(a=1-a)*a*a:(a-=1)*a*a)},$EaseInJump:function(a){return(a*=2)<1?a*a*a:(a=2-a)*a*a}},f=g.$Jease$={$Swing:d.$EaseSwing,$Linear:d.$EaseLinear,$InQuad:d.$EaseInQuad,$OutQuad:d.$EaseOutQuad,$InOutQuad:d.$EaseInOutQuad,$InCubic:d.$EaseInCubic,$OutCubic:d.$EaseOutCubic,$InOutCubic:d.$EaseInOutCubic,$InQuart:d.$EaseInQuart,$OutQuart:d.$EaseOutQuart,$InOutQuart:d.$EaseInOutQuart,$InQuint:d.$EaseInQuint,$OutQuint:d.$EaseOutQuint,$InOutQuint:d.$EaseInOutQuint,$InSine:d.$EaseInSine,$OutSine:d.$EaseOutSine,$InOutSine:d.$EaseInOutSine,$InExpo:d.$EaseInExpo,$OutExpo:d.$EaseOutExpo,$InOutExpo:d.$EaseInOutExpo,$InCirc:d.$EaseInCirc,$OutCirc:d.$EaseOutCirc,$InOutCirc:d.$EaseInOutCirc,$InElastic:d.$EaseInElastic,$OutElastic:d.$EaseOutElastic,$InOutElastic:d.$EaseInOutElastic,$InBack:d.$EaseInBack,$OutBack:d.$EaseOutBack,$InOutBack:d.$EaseInOutBack,$InBounce:d.$EaseInBounce,$OutBounce:d.$EaseOutBounce,$InOutBounce:d.$EaseInOutBounce,$GoBack:d.$EaseGoBack,$InWave:d.$EaseInWave,$OutWave:d.$EaseOutWave,$OutJump:d.$EaseOutJump,$InJump:d.$EaseInJump};var a=new function(){var f=this,zb=/\S+/g,S=1,fb=2,jb=3,ib=4,nb=5,I,s=0,l=0,q=0,J=0,C=0,y=navigator,sb=y.appName,n=y.userAgent;function Ib(){if(!I){I={Rg:"ontouchstart"in g||"createTouch"in e};var a;if(y.pointerEnabled||(a=y.msPointerEnabled))I.Bd=a?"msTouchAction":"touchAction"}return I}function t(i){if(!s){s=-1;if(sb=="Microsoft Internet Explorer"&&!!g.attachEvent&&!!g.ActiveXObject){var f=n.indexOf("MSIE");s=S;q=o(n.substring(f+5,n.indexOf(";",f)));/*@cc_on J=@_jscript_version@*/;l=e.documentMode||q}else if(sb=="Netscape"&&!!g.addEventListener){var d=n.indexOf("Firefox"),b=n.indexOf("Safari"),h=n.indexOf("Chrome"),c=n.indexOf("AppleWebKit");if(d>=0){s=fb;l=o(n.substring(d+8))}else if(b>=0){var j=n.substring(0,b).lastIndexOf("/");s=h>=0?ib:jb;l=o(n.substring(j+1,b))}else{var a=/Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(n);if(a){s=S;l=q=o(a[1])}}if(c>=0)C=o(n.substring(c+12))}else{var a=/(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(n);if(a){s=nb;l=o(a[2])}}}return i==s}function p(){return t(S)}function N(){return p()&&(l<6||e.compatMode=="BackCompat")}function hb(){return t(jb)}function mb(){return t(nb)}function ab(){return hb()&&C>534&&C<535}function L(){return p()&&l<9}function cb(a){var b;return function(d){if(!b){b=a;var c=a.substr(0,1).toUpperCase()+a.substr(1);m([a].concat(["WebKit","ms","Moz","O","webkit"]),function(g,f){var e=a;if(f)e=g+c;if(d.style[e]!=k)return b=e})}return b}}var bb=cb("transform");function rb(a){return{}.toString.call(a)}var H;function Fb(){if(!H){H={};m(["Boolean","Number","String","Function","Array","Date","RegExp","Object"],function(a){H["[object "+a+"]"]=a.toLowerCase()})}return H}function m(a,d){if(rb(a)=="[object Array]"){for(var b=0;b<a.length;b++)if(d(a[b],b,a))return c}else for(var e in a)if(d(a[e],e,a))return c}function A(a){return a==j?String(a):Fb()[rb(a)]||"object"}function pb(a){for(var b in a)return c}function x(a){try{return A(a)=="object"&&!a.nodeType&&a!=a.window&&(!a.constructor||{}.hasOwnProperty.call(a.constructor.prototype,"isPrototypeOf"))}catch(b){}}function w(a,b){return{x:a,y:b}}function vb(b,a){setTimeout(b,a||0)}function F(b,d,c){var a=!b||b=="inherit"?"":b;m(d,function(c){var b=c.exec(a);if(b){var d=a.substr(0,b.index),e=a.substr(b.lastIndex+1,a.length-(b.lastIndex+1));a=d+e}});a=c+(a.indexOf(" ")!=0?" ":"")+a;return a}function eb(b,a){if(l<9)b.style.filter=a}function Bb(g,a,i){if(!J||J<9){var d=a.$ScaleX,e=a.$ScaleY,j=(a.$Rotate||0)%360,h="";if(j||d!=k||e!=k){if(d==k)d=1;if(e==k)e=1;var c=f.Tg(j/180*b.PI,d||1,e||1),i=f.Og(c,a.$OriginalWidth,a.$OriginalHeight);f.Dd(g,i.y);f.Id(g,i.x);h="progid:DXImageTransform.Microsoft.Matrix(M11="+c[0][0]+", M12="+c[0][1]+", M21="+c[1][0]+", M22="+c[1][1]+", SizingMethod='auto expand')"}var m=g.style.filter,n=new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g),l=F(m,[n],h);eb(g,l)}}f.Pg=Ib;f.Jd=p;f.Ng=hb;f.tc=mb;f.V=L;f.sd=function(){return l};f.ng=function(){t();return C};f.$Delay=vb;function V(a){a.constructor===V.caller&&a.xd&&a.xd.apply(a,V.caller.arguments)}f.xd=V;f.qb=function(a){if(f.ud(a))a=e.getElementById(a);return a};function r(a){return a||g.event}f.vd=r;f.yc=function(a){a=r(a);return a.target||a.srcElement||e};f.Qd=function(a){a=r(a);return{x:a.pageX||a.clientX||0,y:a.pageY||a.clientY||0}};function B(c,d,a){if(a!==k)c.style[d]=a==k?"":a;else{var b=c.currentStyle||c.style;a=b[d];if(a==""&&g.getComputedStyle){b=c.ownerDocument.defaultView.getComputedStyle(c,j);b&&(a=b.getPropertyValue(d)||b[d])}return a}}function X(b,c,a,d){if(a!=k){if(a==j)a="";else d&&(a+="px");B(b,c,a)}else return o(B(b,c))}function h(c,a){var d=a?X:B,b;if(a&4)b=cb(c);return function(e,f){return d(e,b?b(e):c,f,a&2)}}function Cb(b){if(p()&&q<9){var a=/opacity=([^)]*)/.exec(b.style.filter||"");return a?o(a[1])/100:1}else return o(b.style.opacity||"1")}function Eb(c,a,f){if(p()&&q<9){var h=c.style.filter||"",i=new RegExp(/[\s]*alpha\([^\)]*\)/g),e=b.round(100*a),d="";if(e<100||f)d="alpha(opacity="+e+") ";var g=F(h,[i],d);eb(c,g)}else c.style.opacity=a==1?"":b.round(a*100)/100}var xb={$Rotate:["rotate"],$RotateX:["rotateX"],$RotateY:["rotateY"],$ScaleX:["scaleX",2],$ScaleY:["scaleY",2],$TranslateX:["translateX",1],$TranslateY:["translateY",1],$TranslateZ:["translateZ",1],$SkewX:["skewX"],$SkewY:["skewY"]};function Z(e,c){if(p()&&l&&l<10){delete c.$RotateX;delete c.$RotateY}var d=bb(e);if(d){var b="";a.c(c,function(e,c){var a=xb[c];if(a){var d=a[1]||0;b+=(b?" ":"")+a[0]+"("+e+(["deg","px",""])[d]+")"}});e.style[d]=b}}f.jg=function(b,a){if(ab())vb(f.K(j,Z,b,a));else(L()?Bb:Z)(b,a)};f.Sc=h("transformOrigin",4);f.ig=h("backfaceVisibility",4);f.kg=h("transformStyle",4);f.mg=h("perspective",6);f.lg=h("perspectiveOrigin",4);f.sg=function(a,c){if(p()&&q<9||q<10&&N())a.style.zoom=c==1?"":c;else{var b=bb(a);if(b){var f="scale("+c+")",e=a.style[b],g=new RegExp(/[\s]*scale\(.*?\)/g),d=F(e,[g],f);a.style[b]=d}}};f.Ib=function(b,a){return function(c){c=r(c);var e=c.type,d=c.relatedTarget||(e=="mouseout"?c.toElement:c.fromElement);(!d||d!==a&&!f.zg(a,d))&&b(c)}};f.e=function(a,c,d,b){a=f.qb(a);if(a.addEventListener){c=="mousewheel"&&a.addEventListener("DOMMouseScroll",d,b);a.addEventListener(c,d,b)}else if(a.attachEvent){a.attachEvent("on"+c,d);b&&a.setCapture&&a.setCapture()}};f.R=function(a,c,d,b){a=f.qb(a);if(a.removeEventListener){c=="mousewheel"&&a.removeEventListener("DOMMouseScroll",d,b);a.removeEventListener(c,d,b)}else if(a.detachEvent){a.detachEvent("on"+c,d);b&&a.releaseCapture&&a.releaseCapture()}};f.bc=function(a){a=r(a);a.preventDefault&&a.preventDefault();a.cancel=c;a.returnValue=i};f.Kg=function(a){a=r(a);a.stopPropagation&&a.stopPropagation();a.cancelBubble=c};f.K=function(d,c){var a=[].slice.call(arguments,2),b=function(){var b=a.concat([].slice.call(arguments,0));return c.apply(d,b)};return b};f.ug=function(a,b){if(b==k)return a.textContent||a.innerText;var c=e.createTextNode(b);f.sc(a);a.appendChild(c)};f.O=function(d,c){for(var b=[],a=d.firstChild;a;a=a.nextSibling)(c||a.nodeType==1)&&b.push(a);return b};function qb(a,c,e,b){b=b||"u";for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){if(R(a,b)==c)return a;if(!e){var d=qb(a,c,e,b);if(d)return d}}}f.D=qb;function P(a,d,f,b){b=b||"u";var c=[];for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){R(a,b)==d&&c.push(a);if(!f){var e=P(a,d,f,b);if(e.length)c=c.concat(e)}}return c}function kb(a,c,d){for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){if(a.tagName==c)return a;if(!d){var b=kb(a,c,d);if(b)return b}}}f.xg=kb;function db(a,c,e){var b=[];for(a=a?a.firstChild:j;a;a=a.nextSibling)if(a.nodeType==1){(!c||a.tagName==c)&&b.push(a);if(!e){var d=db(a,c,e);if(d.length)b=b.concat(d)}}return b}f.vg=db;f.tg=function(b,a){return b.getElementsByTagName(a)};function z(){var e=arguments,d,c,b,a,g=1&e[0],f=1+g;d=e[f-1]||{};for(;f<e.length;f++)if(c=e[f])for(b in c){a=c[b];if(a!==k){a=c[b];var h=d[b];d[b]=g&&(x(h)||x(a))?z(g,{},h,a):a}}return d}f.p=z;function W(f,g){var d={},c,a,b;for(c in f){a=f[c];b=g[c];if(a!==b){var e;if(x(a)&&x(b)){a=W(a,b);e=!pb(a)}!e&&(d[c]=a)}}return d}f.fd=function(a){return A(a)=="function"};f.uc=function(a){return A(a)=="array"};f.ud=function(a){return A(a)=="string"};f.Zb=function(a){return!isNaN(o(a))&&isFinite(a)};f.c=m;f.yg=x;function O(a){return e.createElement(a)}f.mb=function(){return O("DIV")};f.Cg=function(){return O("SPAN")};f.kd=function(){};function T(b,c,a){if(a==k)return b.getAttribute(c);b.setAttribute(c,a)}function R(a,b){return T(a,b)||T(a,"data-"+b)}f.C=T;f.j=R;function u(b,a){if(a==k)return b.className;b.className=a}f.Zc=u;function ub(b){var a={};m(b,function(b){a[b]=b});return a}function wb(b,a){return b.match(a||zb)}function M(b,a){return ub(wb(b||"",a))}f.Bg=wb;function Y(b,c){var a="";m(c,function(c){a&&(a+=b);a+=c});return a}function E(a,c,b){u(a,Y(" ",z(W(M(u(a)),M(c)),M(b))))}f.Yc=function(a){return a.parentNode};f.S=function(a){f.Y(a,"none")};f.A=function(a,b){f.Y(a,b?"none":"")};f.qg=function(b,a){b.removeAttribute(a)};f.rg=function(){return p()&&l<10};f.pg=function(d,c){if(c)d.style.clip="rect("+b.round(c.$Top)+"px "+b.round(c.$Right)+"px "+b.round(c.$Bottom)+"px "+b.round(c.$Left)+"px)";else{var g=d.style.cssText,f=[new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i),new RegExp(/[\s]*cliptop: .*?[;]?/i),new RegExp(/[\s]*clipright: .*?[;]?/i),new RegExp(/[\s]*clipbottom: .*?[;]?/i),new RegExp(/[\s]*clipleft: .*?[;]?/i)],e=F(g,f,"");a.Nb(d,e)}};f.T=function(){return+new Date};f.H=function(b,a){b.appendChild(a)};f.Pb=function(b,a,c){(c||a.parentNode).insertBefore(b,a)};f.Hb=function(a,b){(b||a.parentNode).removeChild(a)};f.Jg=function(a,b){m(a,function(a){f.Hb(a,b)})};f.sc=function(a){f.Jg(f.O(a,c),a)};f.Oe=function(a,b){var c=f.Yc(a);b&1&&f.E(a,(f.l(c)-f.l(a))/2);b&2&&f.G(a,(f.m(c)-f.m(a))/2)};f.Kb=function(b,a){return parseInt(b,a||10)};var o=parseFloat;f.Nc=o;f.zg=function(b,a){var c=e.body;while(a&&b!==a&&c!==a)try{a=a.parentNode}catch(d){return i}return b===a};function U(d,c,b){var a=d.cloneNode(!c);!b&&f.qg(a,"id");return a}f.X=U;f.Cb=function(e,g){var a=new Image;function b(e,c){f.R(a,"load",b);f.R(a,"abort",d);f.R(a,"error",d);g&&g(a,c)}function d(a){b(a,c)}if(mb()&&l<11.6||!e)b(!e);else{f.e(a,"load",b);f.e(a,"abort",d);f.e(a,"error",d);a.src=e}};f.Ud=function(d,a,e){var c=d.length+1;function b(b){c--;if(a&&b&&b.src==a.src)a=b;!c&&e&&e(a)}m(d,function(a){f.Cb(a.src,b)});b()};f.Xc=function(b,g,i,h){if(h)b=U(b);var c=P(b,g);if(!c.length)c=a.tg(b,g);for(var f=c.length-1;f>-1;f--){var d=c[f],e=U(i);u(e,u(d));a.Nb(e,d.style.cssText);a.Pb(e,d);a.Hb(d)}return b};function Gb(b){var l=this,p="",r=["av","pv","ds","dn"],g=[],q,j=0,h=0,d=0;function i(){E(b,q,g[d||j||h&2||h]);a.W(b,"pointer-events",d?"none":"")}function c(){j=0;i();f.R(e,"mouseup",c);f.R(e,"touchend",c);f.R(e,"touchcancel",c)}function o(a){if(d)f.bc(a);else{j=4;i();f.e(e,"mouseup",c);f.e(e,"touchend",c);f.e(e,"touchcancel",c)}}l.jd=function(a){if(a===k)return h;h=a&2||a&1;i()};l.$Enable=function(a){if(a===k)return!d;d=a?0:3;i()};l.$Elmt=b=f.qb(b);var n=a.Bg(u(b));if(n)p=n.shift();m(r,function(a){g.push(p+a)});q=Y(" ",g);g.unshift("");f.e(b,"mousedown",o);f.e(b,"touchstart",o)}f.ac=function(a){return new Gb(a)};f.W=B;f.ib=h("overflow");f.G=h("top",2);f.E=h("left",2);f.l=h("width",2);f.m=h("height",2);f.Id=h("marginLeft",2);f.Dd=h("marginTop",2);f.z=h("position");f.Y=h("display");f.J=h("zIndex",1);f.Ab=function(b,a,c){if(a!=k)Eb(b,a,c);else return Cb(b)};f.Nb=function(a,b){if(b!=k)a.style.cssText=b;else return a.style.cssText};var Q={$Opacity:f.Ab,$Top:f.G,$Left:f.E,N:f.l,P:f.m,Bb:f.z,Kh:f.Y,$ZIndex:f.J},K;function G(){if(!K)K=z({Mh:f.Dd,Lh:f.Id,$Clip:f.pg,B:f.jg},Q);return K}function ob(){var a={};a.B=a.B;a.B=a.$Rotate;a.B=a.$RotateX;a.B=a.$RotateY;a.B=a.$SkewX;a.B=a.$SkewY;a.B=a.$TranslateX;a.B=a.$TranslateY;a.B=a.$TranslateZ;return G()}f.ne=G;f.Pc=ob;f.xe=function(c,b){G();var a={};m(b,function(d,b){if(Q[b])a[b]=Q[b](c)});return a};f.bb=function(c,b){var a=G();m(b,function(d,b){a[b]&&a[b](c,d)})};f.Wd=function(b,a){ob();f.bb(b,a)};var D=new function(){var a=this;function b(d,g){for(var j=d[0].length,i=d.length,h=g[0].length,f=[],c=0;c<i;c++)for(var k=f[c]=[],b=0;b<h;b++){for(var e=0,a=0;a<j;a++)e+=d[c][a]*g[a][b];k[b]=e}return f}a.$ScaleX=function(b,c){return a.Vc(b,c,0)};a.$ScaleY=function(b,c){return a.Vc(b,0,c)};a.Vc=function(a,c,d){return b(a,[[c,0],[0,d]])};a.Ub=function(d,c){var a=b(d,[[c.x],[c.y]]);return w(a[0][0],a[1][0])}};f.Tg=function(d,a,c){var e=b.cos(d),f=b.sin(d);return[[e*a,-f*c],[f*a,e*c]]};f.Og=function(d,c,a){var e=D.Ub(d,w(-c/2,-a/2)),f=D.Ub(d,w(c/2,-a/2)),g=D.Ub(d,w(c/2,a/2)),h=D.Ub(d,w(-c/2,a/2));return w(b.min(e.x,f.x,g.x,h.x)+c/2,b.min(e.y,f.y,g.y,h.y)+a/2)};var yb={$Zoom:1,$ScaleX:1,$ScaleY:1,$Rotate:0,$RotateX:0,$RotateY:0,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0};f.Lc=function(b){var c=b||{};if(b)if(a.fd(b))c={kb:c};else if(a.fd(b.$Clip))c.$Clip={kb:b.$Clip};return c};function tb(c,a){var b={};m(c,function(c,d){var e=c;if(a[d]!=k)if(f.Zb(c))e=c+a[d];else e=tb(c,a[d]);b[d]=e});return b}f.Je=tb;f.Kd=function(h,i,w,n,y,z,o){var c=i;if(h){c={};for(var g in i){var A=z[g]||1,v=y[g]||[0,1],e=(w-v[0])/v[1];e=b.min(b.max(e,0),1);e=e*A;var u=b.floor(e);if(e!=u)e-=u;var l=n.kb||d.$EaseSwing,m,B=h[g],q=i[g];if(a.Zb(q)){l=n[g]||l;var x=l(e);m=B+q*x}else{m=a.p({wb:{}},h[g]);a.c(q.wb||q,function(d,a){if(n.$Clip)l=n.$Clip[a]||n.$Clip.kb||l;var c=l(e),b=d*c;m.wb[a]=b;m[a]+=b})}c[g]=m}var t,f={$OriginalWidth:o.$OriginalWidth,$OriginalHeight:o.$OriginalHeight};a.c(yb,function(d,a){t=t||i[a];var b=c[a];if(b!=k){if(b!=d)f[a]=b;delete c[a]}else if(h[a]!=k&&h[a]!=d)f[a]=h[a]});if(i.$Zoom&&f.$Zoom){f.$ScaleX=f.$Zoom;f.$ScaleY=f.$Zoom}c.B=f}if(i.$Clip&&o.$Move){var p=c.$Clip.wb,s=(p.$Top||0)+(p.$Bottom||0),r=(p.$Left||0)+(p.$Right||0);c.$Left=(c.$Left||0)+r;c.$Top=(c.$Top||0)+s;c.$Clip.$Left-=r;c.$Clip.$Right-=r;c.$Clip.$Top-=s;c.$Clip.$Bottom-=s}if(c.$Clip&&a.rg()&&!c.$Clip.$Top&&!c.$Clip.$Left&&c.$Clip.$Right==o.$OriginalWidth&&c.$Clip.$Bottom==o.$OriginalHeight)c.$Clip=j;return c}};function m(){var b=this,d=[];function i(a,b){d.push({vc:a,Ec:b})}function h(b,c){a.c(d,function(a,e){a.vc==b&&a.Ec===c&&d.splice(e,1)})}b.$On=b.addEventListener=i;b.$Off=b.removeEventListener=h;b.n=function(b){var c=[].slice.call(arguments,1);a.c(d,function(a){a.vc==b&&a.Ec.apply(g,c)})}}var l=function(y,C,k,P,N,J){y=y||0;var d=this,q,n,o,v,z=0,H,I,G,B,x=0,h=0,m=0,D,l,f,e,p,w=[],A;function O(a){f+=a;e+=a;l+=a;h+=a;m+=a;x+=a}function u(n){var g=n;if(p&&(g>=e||g<=f))g=((g-f)%p+p)%p+f;if(!D||v||h!=g){var i=b.min(g,e);i=b.max(i,f);if(!D||v||i!=m){if(J){var j=(i-l)/(C||1);if(k.$Reverse)j=1-j;var o=a.Kd(N,J,j,H,G,I,k);a.c(o,function(b,a){A[a]&&A[a](P,b)})}d.Ic(m-l,i-l);m=i;a.c(w,function(b,c){var a=n<h?w[w.length-c-1]:b;a.v(m-x)});var r=h,q=m;h=g;D=c;d.Qb(r,q)}}}function E(a,c,d){c&&a.$Shift(e);if(!d){f=b.min(f,a.Fc()+x);e=b.max(e,a.gb()+x)}w.push(a)}var r=g.requestAnimationFrame||g.webkitRequestAnimationFrame||g.mozRequestAnimationFrame||g.msRequestAnimationFrame;if(a.Ng()&&a.sd()<7)r=j;r=r||function(b){a.$Delay(b,k.$Interval)};function K(){if(q){var d=a.T(),e=b.min(d-z,k.Uc),c=h+e*o;z=d;if(c*o>=n*o)c=n;u(c);if(!v&&c*o>=n*o)L(B);else r(K)}}function t(g,i,j){if(!q){q=c;v=j;B=i;g=b.max(g,f);g=b.min(g,e);n=g;o=n<h?-1:1;d.Od();z=a.T();r(K)}}function L(a){if(q){v=q=B=i;d.Ld();a&&a()}}d.$Play=function(a,b,c){t(a?h+a:e,b,c)};d.Cd=t;d.rb=L;d.Ke=function(a){t(a)};d.db=function(){return h};d.Sd=function(){return n};d.yb=function(){return m};d.v=u;d.$Move=function(a){u(h+a)};d.$IsPlaying=function(){return q};d.Ae=function(a){p=a};d.$Shift=O;d.I=function(a,b){E(a,0,b)};d.Oc=function(a){E(a,1)};d.ye=function(a){e+=a};d.Fc=function(){return f};d.gb=function(){return e};d.Qb=d.Od=d.Ld=d.Ic=a.kd;d.rc=a.T();k=a.p({$Interval:16,Uc:50},k);p=k.Tc;A=a.p({},a.ne(),k.xc);f=l=y;e=y+C;I=k.$Round||{};G=k.$During||{};H=a.Lc(k.$Easing)};var o=g.$JssorSlideshowFormations$=new function(){var h=this,d=0,a=1,f=2,e=3,s=1,r=2,t=4,q=8,w=256,x=512,v=1024,u=2048,j=u+s,i=u+r,o=x+s,m=x+r,n=w+t,k=w+q,l=v+t,p=v+q;function y(a){return(a&r)==r}function z(a){return(a&t)==t}function g(b,a,c){c.push(a);b[a]=b[a]||[];b[a].push(c)}h.$FormationStraight=function(f){for(var d=f.$Cols,e=f.$Rows,s=f.$Assembly,t=f.hc,r=[],a=0,b=0,p=d-1,q=e-1,h=t-1,c,b=0;b<e;b++)for(a=0;a<d;a++){switch(s){case j:c=h-(a*e+(q-b));break;case l:c=h-(b*d+(p-a));break;case o:c=h-(a*e+b);case n:c=h-(b*d+a);break;case i:c=a*e+b;break;case k:c=b*d+(p-a);break;case m:c=a*e+(q-b);break;default:c=b*d+a}g(r,c,[b,a])}return r};h.$FormationSwirl=function(q){var x=q.$Cols,y=q.$Rows,B=q.$Assembly,w=q.hc,A=[],z=[],u=0,b=0,h=0,r=x-1,s=y-1,t,p,v=0;switch(B){case j:b=r;h=0;p=[f,a,e,d];break;case l:b=0;h=s;p=[d,e,a,f];break;case o:b=r;h=s;p=[e,a,f,d];break;case n:b=r;h=s;p=[a,e,d,f];break;case i:b=0;h=0;p=[f,d,e,a];break;case k:b=r;h=0;p=[a,f,d,e];break;case m:b=0;h=s;p=[e,d,f,a];break;default:b=0;h=0;p=[d,f,a,e]}u=0;while(u<w){t=h+","+b;if(b>=0&&b<x&&h>=0&&h<y&&!z[t]){z[t]=c;g(A,u++,[h,b])}else switch(p[v++%p.length]){case d:b--;break;case f:h--;break;case a:b++;break;case e:h++}switch(p[v%p.length]){case d:b++;break;case f:h++;break;case a:b--;break;case e:h--}}return A};h.$FormationZigZag=function(p){var w=p.$Cols,x=p.$Rows,z=p.$Assembly,v=p.hc,t=[],u=0,b=0,c=0,q=w-1,r=x-1,y,h,s=0;switch(z){case j:b=q;c=0;h=[f,a,e,a];break;case l:b=0;c=r;h=[d,e,a,e];break;case o:b=q;c=r;h=[e,a,f,a];break;case n:b=q;c=r;h=[a,e,d,e];break;case i:b=0;c=0;h=[f,d,e,d];break;case k:b=q;c=0;h=[a,f,d,f];break;case m:b=0;c=r;h=[e,d,f,d];break;default:b=0;c=0;h=[d,f,a,f]}u=0;while(u<v){y=c+","+b;if(b>=0&&b<w&&c>=0&&c<x&&typeof t[y]=="undefined"){g(t,u++,[c,b]);switch(h[s%h.length]){case d:b++;break;case f:c++;break;case a:b--;break;case e:c--}}else{switch(h[s++%h.length]){case d:b--;break;case f:c--;break;case a:b++;break;case e:c++}switch(h[s++%h.length]){case d:b++;break;case f:c++;break;case a:b--;break;case e:c--}}}return t};h.$FormationStraightStairs=function(q){var u=q.$Cols,v=q.$Rows,e=q.$Assembly,t=q.hc,r=[],s=0,c=0,d=0,f=u-1,h=v-1,x=t-1;switch(e){case j:case m:case o:case i:var a=0,b=0;break;case k:case l:case n:case p:var a=f,b=0;break;default:e=p;var a=f,b=0}c=a;d=b;while(s<t){if(z(e)||y(e))g(r,x-s++,[d,c]);else g(r,s++,[d,c]);switch(e){case j:case m:c--;d++;break;case o:case i:c++;d--;break;case k:case l:c--;d--;break;case p:case n:default:c++;d++}if(c<0||d<0||c>f||d>h){switch(e){case j:case m:a++;break;case k:case l:case o:case i:b++;break;case p:case n:default:a--}if(a<0||b<0||a>f||b>h){switch(e){case j:case m:a=f;b++;break;case o:case i:b=h;a++;break;case k:case l:b=h;a--;break;case p:case n:default:a=0;b++}if(b>h)b=h;else if(b<0)b=0;else if(a>f)a=f;else if(a<0)a=0}d=b;c=a}}return r};h.$FormationSquare=function(i){var a=i.$Cols||1,c=i.$Rows||1,j=[],d,e,f,h,k;f=a<c?(c-a)/2:0;h=a>c?(a-c)/2:0;k=b.round(b.max(a/2,c/2))+1;for(d=0;d<a;d++)for(e=0;e<c;e++)g(j,k-b.min(d+1+f,e+1+h,a-d+f,c-e+h),[e,d]);return j};h.$FormationRectangle=function(f){var d=f.$Cols||1,e=f.$Rows||1,h=[],a,c,i;i=b.round(b.min(d/2,e/2))+1;for(a=0;a<d;a++)for(c=0;c<e;c++)g(h,i-b.min(a+1,c+1,d-a,e-c),[c,a]);return h};h.$FormationRandom=function(d){for(var e=[],a,c=0;c<d.$Rows;c++)for(a=0;a<d.$Cols;a++)g(e,b.ceil(1e5*b.random())%13,[c,a]);return e};h.$FormationCircle=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,c=0;c<e;c++)for(a=0;a<f;a++)g(h,b.round(b.sqrt(b.pow(c-i,2)+b.pow(a-j,2))),[a,c]);return h};h.$FormationCross=function(d){for(var e=d.$Cols||1,f=d.$Rows||1,h=[],a,i=e/2-.5,j=f/2-.5,c=0;c<e;c++)for(a=0;a<f;a++)g(h,b.round(b.min(b.abs(c-i),b.abs(a-j))),[a,c]);return h};h.$FormationRectangleCross=function(f){for(var h=f.$Cols||1,i=f.$Rows||1,j=[],a,d=h/2-.5,e=i/2-.5,k=b.max(d,e)+1,c=0;c<h;c++)for(a=0;a<i;a++)g(j,b.round(k-b.max(d-b.abs(c-d),e-b.abs(a-e)))-1,[a,c]);return j}};g.$JssorSlideshowRunner$=function(n,s,q,t,y){var f=this,u,g,e,x=0,w=t.$TransitionsOrder,r,h=8;function k(g,f){var e={$Interval:f,$Duration:1,$Delay:0,$Cols:1,$Rows:1,$Opacity:0,$Zoom:0,$Clip:0,$Move:i,$SlideOut:i,$Reverse:i,$Formation:o.$FormationRandom,$Assembly:1032,$ChessMode:{$Column:0,$Row:0},$Easing:d.$EaseSwing,$Round:{},Ob:[],$During:{}};a.p(e,g);e.hc=e.$Cols*e.$Rows;e.$Easing=a.Lc(e.$Easing);e.fe=b.ceil(e.$Duration/e.$Interval);e.ie=function(b,a){b/=e.$Cols;a/=e.$Rows;var f=b+"x"+a;if(!e.Ob[f]){e.Ob[f]={N:b,P:a};for(var c=0;c<e.$Cols;c++)for(var d=0;d<e.$Rows;d++)e.Ob[f][d+","+c]={$Top:d*a,$Right:c*b+b,$Bottom:d*a+a,$Left:c*b}}return e.Ob[f]};if(e.$Brother){e.$Brother=k(e.$Brother,f);e.$SlideOut=c}return e}function p(A,h,d,v,n,l){var y=this,t,u={},j={},m=[],f,e,r,p=d.$ChessMode.$Column||0,q=d.$ChessMode.$Row||0,g=d.ie(n,l),o=B(d),C=o.length-1,s=d.$Duration+d.$Delay*C,w=v+s,k=d.$SlideOut,x;w+=50;function B(a){var b=a.$Formation(a);return a.$Reverse?b.reverse():b}y.td=w;y.Vb=function(c){c-=v;var e=c<s;if(e||x){x=e;if(!k)c=s-c;var f=b.ceil(c/d.$Interval);a.c(j,function(c,e){var d=b.max(f,c.ue);d=b.min(d,c.length-1);if(c.Rc!=d){if(!c.Rc&&!k)a.A(m[e]);else d==c.me&&k&&a.S(m[e]);c.Rc=d;a.Wd(m[e],c[d])}})}};h=a.X(h);if(a.V()){var D=!h["no-image"],z=a.vg(h);a.c(z,function(b){(D||b["jssor-slider"])&&a.Ab(b,a.Ab(b),c)})}a.c(o,function(h,m){a.c(h,function(G){var K=G[0],J=G[1],v=K+","+J,o=i,s=i,x=i;if(p&&J%2){if(p&3)o=!o;if(p&12)s=!s;if(p&16)x=!x}if(q&&K%2){if(q&3)o=!o;if(q&12)s=!s;if(q&16)x=!x}d.$Top=d.$Top||d.$Clip&4;d.$Bottom=d.$Bottom||d.$Clip&8;d.$Left=d.$Left||d.$Clip&1;d.$Right=d.$Right||d.$Clip&2;var C=s?d.$Bottom:d.$Top,z=s?d.$Top:d.$Bottom,B=o?d.$Right:d.$Left,A=o?d.$Left:d.$Right;d.$Clip=C||z||B||A;r={};e={$Top:0,$Left:0,$Opacity:1,N:n,P:l};f=a.p({},e);t=a.p({},g[v]);if(d.$Opacity)e.$Opacity=2-d.$Opacity;if(d.$ZIndex){e.$ZIndex=d.$ZIndex;f.$ZIndex=0}var I=d.$Cols*d.$Rows>1||d.$Clip;if(d.$Zoom||d.$Rotate){var H=c;if(a.V())if(d.$Cols*d.$Rows>1)H=i;else I=i;if(H){e.$Zoom=d.$Zoom?d.$Zoom-1:1;f.$Zoom=1;if(a.V()||a.tc())e.$Zoom=b.min(e.$Zoom,2);var N=d.$Rotate||0;e.$Rotate=N*360*(x?-1:1);f.$Rotate=0}}if(I){var h=t.wb={};if(d.$Clip){var w=d.$ScaleClip||1;if(C&&z){h.$Top=g.P/2*w;h.$Bottom=-h.$Top}else if(C)h.$Bottom=-g.P*w;else if(z)h.$Top=g.P*w;if(B&&A){h.$Left=g.N/2*w;h.$Right=-h.$Left}else if(B)h.$Right=-g.N*w;else if(A)h.$Left=g.N*w}r.$Clip=t;f.$Clip=g[v]}var L=o?1:-1,M=s?1:-1;if(d.x)e.$Left+=n*d.x*L;if(d.y)e.$Top+=l*d.y*M;a.c(e,function(b,c){if(a.Zb(b))if(b!=f[c])r[c]=b-f[c]});u[v]=k?f:e;var D=d.fe,y=b.round(m*d.$Delay/d.$Interval);j[v]=new Array(y);j[v].ue=y;j[v].me=y+D-1;for(var F=0;F<=D;F++){var E=a.Kd(f,r,F/D,d.$Easing,d.$During,d.$Round,{$Move:d.$Move,$OriginalWidth:n,$OriginalHeight:l});E.$ZIndex=E.$ZIndex||1;j[v].push(E)}})});o.reverse();a.c(o,function(b){a.c(b,function(c){var f=c[0],e=c[1],d=f+","+e,b=h;if(e||f)b=a.X(h);a.bb(b,u[d]);a.ib(b,"hidden");a.z(b,"absolute");A.se(b);m[d]=b;a.A(b,!k)})})}function v(){var a=this,b=0;l.call(a,0,u);a.Qb=function(c,a){if(a-b>h){b=a;e&&e.Vb(a);g&&g.Vb(a)}};a.ab=r}f.Ie=function(){var a=0,c=t.$Transitions,d=c.length;if(w)a=x++%d;else a=b.floor(b.random()*d);c[a]&&(c[a].nb=a);return c[a]};f.Ne=function(w,x,j,l,a){r=a;a=k(a,h);var i=l.Wc,d=j.Wc;i["no-image"]=!l.cc;d["no-image"]=!j.cc;var m=i,o=d,v=a,c=a.$Brother||k({},h);if(!a.$SlideOut){m=d;o=i}var t=c.$Shift||0;g=new p(n,o,c,b.max(t-c.$Interval,0),s,q);e=new p(n,m,v,b.max(c.$Interval-t,0),s,q);g.Vb(0);e.Vb(0);u=b.max(g.td,e.td);f.nb=w};f.Db=function(){n.Db();g=j;e=j};f.de=function(){var a=j;if(e)a=new v;return a};if(a.V()||a.tc()||y&&a.ng()<537)h=16;m.call(f);l.call(f,-1e7,1e7)};var h=g.$JssorSlider$=function(q,fc){var o=this;function Ec(){var a=this;l.call(a,-1e8,2e8);a.ge=function(){var c=a.yb(),d=b.floor(c),f=t(d),e=c-b.floor(c);return{nb:f,ce:d,Bb:e}};a.Qb=function(d,a){var e=b.floor(a);if(e!=a&&a>d)e++;Ub(e,c);o.n(h.$EVT_POSITION_CHANGE,t(a),t(d),a,d)}}function Dc(){var b=this;l.call(b,0,0,{Tc:r});a.c(C,function(a){D&1&&a.Ae(r);b.Oc(a);a.$Shift(fb/bc)})}function Cc(){var a=this,b=Tb.$Elmt;l.call(a,-1,2,{$Easing:d.$EaseLinear,xc:{Bb:Zb},Tc:r},b,{Bb:1},{Bb:-2});a.Mb=b}function qc(n,m){var a=this,d,e,g,k,b;l.call(a,-1e8,2e8,{Uc:100});a.Od=function(){O=c;R=j;o.n(h.$EVT_SWIPE_START,t(w.db()),w.db())};a.Ld=function(){O=i;k=i;var a=w.ge();o.n(h.$EVT_SWIPE_END,t(w.db()),w.db());!a.Bb&&Gc(a.ce,s)};a.Qb=function(i,h){var a;if(k)a=b;else{a=e;if(g){var c=h/g;a=f.$SlideEasing(c)*(e-d)+d}}w.v(a)};a.ic=function(b,f,c,h){d=b;e=f;g=c;w.v(b);a.v(0);a.Cd(c,h)};a.je=function(d){k=c;b=d;a.$Play(d,j,c)};a.le=function(a){b=a};w=new Ec;w.I(n);w.I(m)}function rc(){var c=this,b=Xb();a.J(b,0);a.W(b,"pointerEvents","none");c.$Elmt=b;c.se=function(c){a.H(b,c);a.A(b)};c.Db=function(){a.S(b);a.sc(b)}}function Bc(k,e){var d=this,q,H,x,n,y=[],w,B,W,G,Q,F,g,v,p;l.call(d,-u,u+1,{});function E(b){q&&q.jb();T(k,b,0);F=c;q=new I.$Class(k,I,a.Nc(a.j(k,"idle"))||pc);q.v(0)}function Y(){q.rc<I.rc&&E()}function N(p,r,m){if(!G){G=c;if(n&&m){var g=m.width,b=m.height,l=g,k=b;if(g&&b&&f.$FillMode){if(f.$FillMode&3&&(!(f.$FillMode&4)||g>K||b>J)){var j=i,q=K/J*b/g;if(f.$FillMode&1)j=q>1;else if(f.$FillMode&2)j=q<1;l=j?g*J/b:K;k=j?J:b*K/g}a.l(n,l);a.m(n,k);a.G(n,(J-k)/2);a.E(n,(K-l)/2)}a.z(n,"absolute");o.n(h.$EVT_LOAD_END,e)}}a.S(r);p&&p(d)}function X(b,c,f,g){if(g==R&&s==e&&P)if(!Fc){var a=t(b);A.Ne(a,e,c,d,f);c.be();U.$Shift(a-U.Fc()-1);U.v(a);z.ic(b,b,0)}}function ab(b){if(b==R&&s==e){if(!g){var a=j;if(A)if(A.nb==e)a=A.de();else A.Db();Y();g=new yc(k,e,a,q);g.gd(p)}!g.$IsPlaying()&&g.wc()}}function S(h,c,i){if(h==e){if(h!=c)C[c]&&C[c].Be();else!i&&g&&g.Le();p&&p.$Enable();var k=R=a.T();d.Cb(a.K(j,ab,k))}else{var m=b.abs(e-h),l=u+f.$LazyLoading-1;(!Q||m<=l)&&d.Cb()}}function bb(){if(s==e&&g){g.rb();p&&p.$Quit();p&&p.$Disable();g.nd()}}function db(){s==e&&g&&g.rb()}function Z(a){!M&&o.n(h.$EVT_CLICK,e,a)}function O(){p=v.pInstance;g&&g.gd(p)}d.Cb=function(d,b){b=b||x;if(y.length&&!G){a.A(b);if(!W){W=c;o.n(h.$EVT_LOAD_START,e);a.c(y,function(b){if(!a.C(b,"src")){b.src=a.j(b,"src2");a.Y(b,b["display-origin"])}})}a.Ud(y,n,a.K(j,N,d,b))}else N(d,b)};d.ze=function(){var h=e;if(f.$AutoPlaySteps<0)h-=r;var c=h+f.$AutoPlaySteps*wc;if(D&2)c=t(c);if(!(D&1))c=b.max(0,b.min(c,r-u));if(c!=e){if(A){var d=A.Ie(r);if(d){var i=R=a.T(),g=C[t(c)];return g.Cb(a.K(j,X,c,g,d,i),x)}}nb(c)}};d.pc=function(){S(e,e,c)};d.Be=function(){p&&p.$Quit();p&&p.$Disable();d.od();g&&g.he();g=j;E()};d.be=function(){a.S(k)};d.od=function(){a.A(k)};d.Yd=function(){p&&p.$Enable()};function T(b,d,e){if(a.C(b,"jssor-slider"))return;if(!F){if(b.tagName=="IMG"){y.push(b);if(!a.C(b,"src")){Q=c;b["display-origin"]=a.Y(b);a.S(b)}}a.V()&&a.J(b,(a.J(b)||0)+1)}var f=a.O(b);a.c(f,function(f){var h=f.tagName,j=a.j(f,"u");if(j=="player"&&!v){v=f;if(v.pInstance)O();else a.e(v,"dataavailable",O)}if(j=="caption"){if(d){a.Sc(f,a.j(f,"to"));a.ig(f,a.j(f,"bf"));a.kg(f,"preserve-3d")}else if(!a.Jd()){var g=a.X(f,i,c);a.Pb(g,f,b);a.Hb(f,b);f=g;d=c}}else if(!F&&!e&&!n){if(h=="A"){if(a.j(f,"u")=="image")n=a.xg(f,"IMG");else n=a.D(f,"image",c);if(n){w=f;a.Y(w,"block");a.bb(w,V);B=a.X(w,c);a.z(w,"relative");a.Ab(B,0);a.W(B,"backgroundColor","#000")}}else if(h=="IMG"&&a.j(f,"u")=="image")n=f;if(n){n.border=0;a.bb(n,V)}}T(f,d,e+1)})}d.Ic=function(c,b){var a=u-b;Zb(H,a)};d.nb=e;m.call(d);a.mg(k,a.j(k,"p"));a.lg(k,a.j(k,"po"));var L=a.D(k,"thumb",c);if(L){d.Ee=a.X(L);a.S(L)}a.A(k);x=a.X(cb);a.J(x,1e3);a.e(k,"click",Z);E(c);d.cc=n;d.Ad=B;d.Wc=k;d.Mb=H=k;a.H(H,x);o.$On(203,S);o.$On(28,db);o.$On(24,bb)}function yc(y,f,p,q){var b=this,m=0,u=0,g,j,e,d,k,t,r,n=C[f];l.call(b,0,0);function v(){a.sc(N);dc&&k&&n.Ad&&a.H(N,n.Ad);a.A(N,!k&&n.cc)}function w(){b.wc()}function x(a){r=a;b.rb();b.wc()}b.wc=function(){var a=b.yb();if(!B&&!O&&!r&&s==f){if(!a){if(g&&!k){k=c;b.nd(c);o.n(h.$EVT_SLIDESHOW_START,f,m,u,g,d)}v()}var i,p=h.$EVT_STATE_CHANGE;if(a!=d)if(a==e)i=d;else if(a==j)i=e;else if(!a)i=j;else i=b.Sd();o.n(p,f,a,m,j,e,d);var l=P&&(!E||F);if(a==d)(e!=d&&!(E&12)||l)&&n.ze();else(l||a!=e)&&b.Cd(i,w)}};b.Le=function(){e==d&&e==b.yb()&&b.v(j)};b.he=function(){A&&A.nb==f&&A.Db();var a=b.yb();a<d&&o.n(h.$EVT_STATE_CHANGE,f,-a-1,m,j,e,d)};b.nd=function(b){p&&a.ib(hb,b&&p.ab.$Outside?"":"hidden")};b.Ic=function(b,a){if(k&&a>=g){k=i;v();n.od();A.Db();o.n(h.$EVT_SLIDESHOW_END,f,m,u,g,d)}o.n(h.$EVT_PROGRESS_CHANGE,f,a,m,j,e,d)};b.gd=function(a){if(a&&!t){t=a;a.$On($JssorPlayer$.Ce,x)}};p&&b.Oc(p);g=b.gb();b.Oc(q);j=g+q.dc;e=g+q.Yb;d=b.gb()}function Zb(g,f){var e=x>0?x:gb,c=Bb*f*(e&1),d=Cb*f*(e>>1&1);c=b.round(c);d=b.round(d);a.E(g,c);a.G(g,d)}function Pb(){pb=O;Kb=z.Sd();G=w.db()}function gc(){Pb();if(B||!F&&E&12){z.rb();o.n(h.De)}}function ec(e){if(!B&&(F||!(E&12))&&!z.$IsPlaying()){var c=w.db(),a=b.ceil(G);if(e&&b.abs(H)>=f.$MinDragOffsetToSlide){a=b.ceil(c);a+=eb}if(!(D&1))a=b.min(r-u,b.max(a,0));var d=b.abs(a-c);d=1-b.pow(1-d,5);if(!M&&pb)z.Ke(Kb);else if(c==a){tb.Yd();tb.pc()}else z.ic(c,a,d*Vb)}}function Ib(b){!a.j(a.yc(b),"nodrag")&&a.bc(b)}function uc(a){Yb(a,1)}function Yb(b,d){b=a.vd(b);var k=a.yc(b);if(!L&&!a.j(k,"nodrag")&&vc()&&(!d||b.touches.length==1)){B=c;Ab=i;R=j;a.e(e,d?"touchmove":"mousemove",Db);a.T();M=0;gc();if(!pb)x=0;if(d){var g=b.touches[0];vb=g.clientX;wb=g.clientY}else{var f=a.Qd(b);vb=f.x;wb=f.y}H=0;bb=0;eb=0;o.n(h.$EVT_DRAG_START,t(G),G,b)}}function Db(e){if(B){e=a.vd(e);var f;if(e.type!="mousemove"){var l=e.touches[0];f={x:l.clientX,y:l.clientY}}else f=a.Qd(e);if(f){var j=f.x-vb,k=f.y-wb;if(b.floor(G)!=G)x=x||gb&L;if((j||k)&&!x){if(L==3)if(b.abs(k)>b.abs(j))x=2;else x=1;else x=L;if(jb&&x==1&&b.abs(k)-b.abs(j)>3)Ab=c}if(x){var d=k,i=Cb;if(x==1){d=j;i=Bb}if(!(D&1)){if(d>0){var g=i*s,h=d-g;if(h>0)d=g+b.sqrt(h)*5}if(d<0){var g=i*(r-u-s),h=-d-g;if(h>0)d=-g-b.sqrt(h)*5}}if(H-bb<-2)eb=0;else if(H-bb>2)eb=-1;bb=H;H=d;sb=G-H/i/(Z||1);if(H&&x&&!Ab){a.bc(e);if(!O)z.je(sb);else z.le(sb)}}}}}function mb(){sc();if(B){B=i;a.T();a.R(e,"mousemove",Db);a.R(e,"touchmove",Db);M=H;z.rb();var b=w.db();o.n(h.$EVT_DRAG_END,t(b),b,t(G),G);E&12&&Pb();ec(c)}}function kc(c){if(M){a.Kg(c);var b=a.yc(c);while(b&&v!==b){b.tagName=="A"&&a.bc(c);try{b=b.parentNode}catch(d){break}}}}function oc(a){C[s];s=t(a);tb=C[s];Ub(a);return s}function Gc(a,b){x=0;oc(a);o.n(h.$EVT_PARK,t(a),b)}function Ub(b,c){yb=b;a.c(S,function(a){a.Mc(t(b),b,c)})}function vc(){var b=h.ed||0,a=Y;if(jb)a&1&&(a&=1);h.ed|=a;return L=a&~b}function sc(){if(L){h.ed&=~Y;L=0}}function Xb(){var b=a.mb();a.bb(b,V);a.z(b,"absolute");return b}function t(a){return(a%r+r)%r}function lc(a,c){if(c)if(!D){a=b.min(b.max(a+yb,0),r-u);c=i}else if(D&2){a=t(a+yb);c=i}nb(a,f.$SlideDuration,c)}function zb(){a.c(S,function(a){a.Jc(a.Jb.$ChanceToShow<=F)})}function ic(){if(!F){F=1;zb();if(!B){E&12&&ec();E&3&&C[s].pc()}}}function hc(){if(F){F=0;zb();B||!(E&12)||gc()}}function jc(){V={N:K,P:J,$Top:0,$Left:0};a.c(T,function(b){a.bb(b,V);a.z(b,"absolute");a.ib(b,"hidden");a.S(b)});a.bb(cb,V)}function lb(b,a){nb(b,a,c)}function nb(g,e,l){if(Rb&&(!B&&(F||!(E&12))||f.$NaviQuitDrag)){O=c;B=i;z.rb();if(e==k)e=Vb;var d=Eb.yb(),a=g;if(l){a=d+g;if(g>0)a=b.ceil(a);else a=b.floor(a)}if(D&2)a=t(a);if(!(D&1))a=b.max(0,b.min(a,r-u));var j=(a-d)%r;a=d+j;var h=d==a?0:e*b.abs(j);h=b.min(h,e*u*1.5);z.ic(d,a,h||1)}}o.$PlayTo=nb;o.$GoTo=function(a){w.v(a)};o.$Next=function(){lb(1)};o.$Prev=function(){lb(-1)};o.$Pause=function(){P=i};o.$Play=function(){if(!P){P=c;C[s]&&C[s].pc()}};o.$SetSlideshowTransitions=function(a){f.$SlideshowOptions.$Transitions=a};o.$SetCaptionTransitions=function(b){I.$Transitions=b;I.rc=a.T()};o.$SlidesCount=function(){return T.length};o.$CurrentIndex=function(){return s};o.$IsAutoPlaying=function(){return P};o.$IsDragging=function(){return B};o.$IsSliding=function(){return O};o.$IsMouseOver=function(){return!F};o.$LastDragSucceded=function(){return M};function X(){return a.l(y||q)}function ib(){return a.m(y||q)}o.$OriginalWidth=o.$GetOriginalWidth=X;o.$OriginalHeight=o.$GetOriginalHeight=ib;function Gb(c,d){if(c==k)return a.l(q);if(!y){var b=a.mb(e);a.Zc(b,a.Zc(q));a.Nb(b,a.Nb(q));a.Y(b,"block");a.z(b,"relative");a.G(b,0);a.E(b,0);a.ib(b,"visible");y=a.mb(e);a.z(y,"absolute");a.G(y,0);a.E(y,0);a.l(y,a.l(q));a.m(y,a.m(q));a.Sc(y,"0 0");a.H(y,b);var h=a.O(q);a.H(q,y);a.W(q,"backgroundImage","");a.c(h,function(c){a.H(a.j(c,"noscale")?q:b,c);a.j(c,"autocenter")&&Lb.push(c)})}Z=c/(d?a.m:a.l)(y);a.sg(y,Z);var g=d?Z*X():c,f=d?c:Z*ib();a.l(q,g);a.m(q,f);a.c(Lb,function(b){var c=a.Kb(a.j(b,"autocenter"));a.Oe(b,c)})}o.$ScaleHeight=o.$GetScaleHeight=function(b){if(b==k)return a.m(q);Gb(b,c)};o.$ScaleWidth=o.$SetScaleWidth=o.$GetScaleWidth=Gb;o.Ed=function(a){var d=b.ceil(t(fb/bc)),c=t(a-s+d);if(c>u){if(a-s>r/2)a-=r;else if(a-s<=-r/2)a+=r}else a=s+c-d;return a};m.call(o);o.$Elmt=q=a.qb(q);var f=a.p({$FillMode:0,$LazyLoading:1,$ArrowKeyNavigation:1,$StartIndex:0,$AutoPlay:i,$Loop:1,$NaviQuitDrag:c,$AutoPlaySteps:1,$AutoPlayInterval:3e3,$PauseOnHover:1,$SlideDuration:500,$SlideEasing:d.$EaseOutQuad,$MinDragOffsetToSlide:20,$SlideSpacing:0,$Cols:1,$Align:0,$UISearchMode:1,$PlayOrientation:1,$DragOrientation:1},fc);if(f.$Idle!=k)f.$AutoPlayInterval=f.$Idle;if(f.$DisplayPieces!=k)f.$Cols=f.$DisplayPieces;if(f.$ParkingPosition!=k)f.$Align=f.$ParkingPosition;var gb=f.$PlayOrientation&3,wc=(f.$PlayOrientation&4)/-4||1,db=f.$SlideshowOptions,I=a.p({$Class:p,$PlayInMode:1,$PlayOutMode:1},f.$CaptionSliderOptions);I.$Transitions=I.$Transitions||I.$CaptionTransitions;var qb=f.$BulletNavigatorOptions,W=f.$ArrowNavigatorOptions,ab=f.$ThumbnailNavigatorOptions,Q=!f.$UISearchMode,y,v=a.D(q,"slides",Q),cb=a.D(q,"loading",Q)||a.mb(e),Jb=a.D(q,"navigator",Q),cc=a.D(q,"arrowleft",Q),ac=a.D(q,"arrowright",Q),Hb=a.D(q,"thumbnavigator",Q),nc=a.l(v),mc=a.m(v),V,T=[],xc=a.O(v);a.c(xc,function(b){if(b.tagName=="DIV"&&!a.j(b,"u"))T.push(b);else a.V()&&a.J(b,(a.J(b)||0)+1)});var s=-1,yb,tb,r=T.length,K=f.$SlideWidth||nc,J=f.$SlideHeight||mc,Wb=f.$SlideSpacing,Bb=K+Wb,Cb=J+Wb,bc=gb&1?Bb:Cb,u=b.min(f.$Cols,r),hb,x,L,Ab,S=[],Qb,Sb,Ob,dc,Fc,P,E=f.$PauseOnHover,pc=f.$AutoPlayInterval,Vb=f.$SlideDuration,rb,ub,fb,Rb=u<r,D=Rb?f.$Loop:0,Y,M,F=1,O,B,R,vb=0,wb=0,H,bb,eb,Eb,w,U,z,Tb=new rc,Z,Lb=[];P=f.$AutoPlay;o.Jb=fc;jc();a.C(q,"jssor-slider",c);a.J(v,a.J(v)||0);a.z(v,"absolute");hb=a.X(v,c);a.Pb(hb,v);if(db){dc=db.$ShowLink;rb=db.$Class;ub=u==1&&r>1&&rb&&(!a.Jd()||a.sd()>=8)}fb=ub||u>=r||!(D&1)?0:f.$Align;Y=(u>1||fb?gb:-1)&f.$DragOrientation;var xb=v,C=[],A,N,Fb=a.Pg(),jb=Fb.Rg,G,pb,Kb,sb;Fb.Bd&&a.W(xb,Fb.Bd,([j,"pan-y","pan-x","none"])[Y]||"");U=new Cc;if(ub)A=new rb(Tb,K,J,db,jb);a.H(hb,U.Mb);a.ib(v,"hidden");N=Xb();a.W(N,"backgroundColor","#000");a.Ab(N,0);a.Pb(N,xb.firstChild,xb);for(var ob=0;ob<T.length;ob++){var zc=T[ob],Ac=new Bc(zc,ob);C.push(Ac)}a.S(cb);Eb=new Dc;z=new qc(Eb,U);if(Y){a.e(v,"mousedown",Yb);a.e(v,"touchstart",uc);a.e(v,"dragstart",Ib);a.e(v,"selectstart",Ib);a.e(e,"mouseup",mb);a.e(e,"touchend",mb);a.e(e,"touchcancel",mb);a.e(g,"blur",mb)}E&=jb?10:5;if(Jb&&qb){Qb=new qb.$Class(Jb,qb,X(),ib());S.push(Qb)}if(W&&cc&&ac){W.$Loop=D;W.$Cols=u;Sb=new W.$Class(cc,ac,W,X(),ib());S.push(Sb)}if(Hb&&ab){ab.$StartIndex=f.$StartIndex;Ob=new ab.$Class(Hb,ab);S.push(Ob)}a.c(S,function(a){a.Gc(r,C,cb);a.$On(n.fc,lc)});a.W(q,"visibility","visible");Gb(X());a.e(v,"click",kc);a.e(q,"mouseout",a.Ib(ic,q));a.e(q,"mouseover",a.Ib(hc,q));zb();f.$ArrowKeyNavigation&&a.e(e,"keydown",function(a){if(a.keyCode==37)lb(-f.$ArrowKeyNavigation);else a.keyCode==39&&lb(f.$ArrowKeyNavigation)});var kb=f.$StartIndex;if(!(D&1))kb=b.max(0,b.min(kb,r-u));z.ic(kb,kb,0)};h.$EVT_CLICK=21;h.$EVT_DRAG_START=22;h.$EVT_DRAG_END=23;h.$EVT_SWIPE_START=24;h.$EVT_SWIPE_END=25;h.$EVT_LOAD_START=26;h.$EVT_LOAD_END=27;h.De=28;h.$EVT_POSITION_CHANGE=202;h.$EVT_PARK=203;h.$EVT_SLIDESHOW_START=206;h.$EVT_SLIDESHOW_END=207;h.$EVT_PROGRESS_CHANGE=208;h.$EVT_STATE_CHANGE=209;var n={fc:1};g.$JssorBulletNavigator$=function(e,C){var f=this;m.call(f);e=a.qb(e);var s,A,z,r,l=0,d,o,k,w,x,h,g,q,p,B=[],y=[];function v(a){a!=-1&&y[a].jd(a==l)}function t(a){f.n(n.fc,a*o)}f.$Elmt=e;f.Mc=function(a){if(a!=r){var d=l,c=b.floor(a/o);l=c;r=a;v(d);v(c)}};f.Jc=function(b){a.A(e,b)};var u;f.Gc=function(E){if(!u){s=b.ceil(E/o);l=0;var n=q+w,r=p+x,m=b.ceil(s/k)-1;A=q+n*(!h?m:k-1);z=p+r*(h?m:k-1);a.l(e,A);a.m(e,z);for(var f=0;f<s;f++){var C=a.Cg();a.ug(C,f+1);var i=a.Xc(g,"numbertemplate",C,c);a.z(i,"absolute");var v=f%(m+1);a.E(i,!h?n*v:f%k*n);a.G(i,h?r*v:b.floor(f/(m+1))*r);a.H(e,i);B[f]=i;d.$ActionMode&1&&a.e(i,"click",a.K(j,t,f));d.$ActionMode&2&&a.e(i,"mouseover",a.Ib(a.K(j,t,f),i));y[f]=a.ac(i)}u=c}};f.Jb=d=a.p({$SpacingX:10,$SpacingY:10,$Orientation:1,$ActionMode:1},C);g=a.D(e,"prototype");q=a.l(g);p=a.m(g);a.Hb(g,e);o=d.$Steps||1;k=d.$Lanes||1;w=d.$SpacingX;x=d.$SpacingY;h=d.$Orientation-1;d.$Scale==i&&a.C(e,"noscale",c);d.$AutoCenter&&a.C(e,"autocenter",d.$AutoCenter)};g.$JssorArrowNavigator$=function(b,g,h){var d=this;m.call(d);var r,q,e,f,k;a.l(b);a.m(b);function l(a){d.n(n.fc,a,c)}function p(c){a.A(b,c||!h.$Loop&&e==0);a.A(g,c||!h.$Loop&&e>=q-h.$Cols);r=c}d.Mc=function(b,a,c){if(c)e=a;else{e=b;p(r)}};d.Jc=p;var o;d.Gc=function(d){q=d;e=0;if(!o){a.e(b,"click",a.K(j,l,-k));a.e(g,"click",a.K(j,l,k));a.ac(b);a.ac(g);o=c}};d.Jb=f=a.p({$Steps:1},h);k=f.$Steps;if(f.$Scale==i){a.C(b,"noscale",c);a.C(g,"noscale",c)}if(f.$AutoCenter){a.C(b,"autocenter",f.$AutoCenter);a.C(g,"autocenter",f.$AutoCenter)}};g.$JssorThumbnailNavigator$=function(g,C){var l=this,z,q,d,w=[],A,y,e,r,s,v,u,p,t,f,o;m.call(l);g=a.qb(g);function B(m,f){var g=this,b,k,i;function p(){k.jd(q==f)}function h(d){if(d||!t.$LastDragSucceded()){var a=e-f%e,b=t.Ed((f+a)/e-1),c=b*e+e-a;l.n(n.fc,c)}}g.nb=f;g.bd=p;i=m.Ee||m.cc||a.mb();g.Mb=b=a.Xc(o,"thumbnailtemplate",i,c);k=a.ac(b);d.$ActionMode&1&&a.e(b,"click",a.K(j,h,0));d.$ActionMode&2&&a.e(b,"mouseover",a.Ib(a.K(j,h,1),b))}l.Mc=function(c,d,f){var a=q;q=c;a!=-1&&w[a].bd();w[c].bd();!f&&t.$PlayTo(t.Ed(b.floor(d/e)))};l.Jc=function(b){a.A(g,b)};var x;l.Gc=function(F,C){if(!x){z=F;b.ceil(z/e);q=-1;p=b.min(p,C.length);var j=d.$Orientation&1,m=v+(v+r)*(e-1)*(1-j),l=u+(u+s)*(e-1)*j,o=m+(m+r)*(p-1)*j,n=l+(l+s)*(p-1)*(1-j);a.z(f,"absolute");a.ib(f,"hidden");d.$AutoCenter&1&&a.E(f,(A-o)/2);d.$AutoCenter&2&&a.G(f,(y-n)/2);a.l(f,o);a.m(f,n);var k=[];a.c(C,function(l,g){var h=new B(l,g),d=h.Mb,c=b.floor(g/e),i=g%e;a.E(d,(v+r)*i*(1-j));a.G(d,(u+s)*i*j);if(!k[c]){k[c]=a.mb();a.H(f,k[c])}a.H(k[c],d);w.push(h)});var E=a.p({$AutoPlay:i,$NaviQuitDrag:i,$SlideWidth:m,$SlideHeight:l,$SlideSpacing:r*j+s*(1-j),$MinDragOffsetToSlide:12,$SlideDuration:200,$PauseOnHover:1,$PlayOrientation:d.$Orientation,$DragOrientation:d.$NoDrag||d.$DisableDrag?0:d.$Orientation},d);t=new h(g,E);x=c}};l.Jb=d=a.p({$SpacingX:0,$SpacingY:0,$Cols:1,$Orientation:1,$AutoCenter:3,$ActionMode:1},C);if(d.$DisplayPieces!=k)d.$Cols=d.$DisplayPieces;if(d.$Rows!=k)d.$Lanes=d.$Rows;A=a.l(g);y=a.m(g);f=a.D(g,"slides",c);o=a.D(f,"prototype");v=a.l(o);u=a.m(o);a.Hb(o,f);e=d.$Lanes||1;r=d.$SpacingX;s=d.$SpacingY;p=d.$Cols;d.$Scale==i&&a.C(g,"noscale",c)};function p(e,d,c){var b=this;l.call(b,0,c);b.jb=a.kd;b.dc=0;b.Yb=c}g.$JssorCaptionSlider$=function(h,f,i){var c=this;l.call(c,0,0);var e,d;function g(p,h,f){var c=this,g,n=f?h.$PlayInMode:h.$PlayOutMode,e=h.$Transitions,o={ab:"t",$Delay:"d",$Duration:"du",x:"x",y:"y",$Rotate:"r",$Zoom:"z",$Opacity:"f",Gb:"b"},d={kb:function(b,a){if(!isNaN(a.sb))b=a.sb;else b*=a.Kf;return b},$Opacity:function(b,a){return this.kb(b-1,a)}};d.$Zoom=d.$Opacity;l.call(c,0,0);function j(r,m){var l=[],i,k=[],c=[];function h(c,d){var b={};a.c(o,function(g,h){var e=a.j(c,g+(d||""));if(e){var f={};if(g=="t")f.sb=e;else if(e.indexOf("%")+1)f.Kf=a.Nc(e)/100;else f.sb=a.Nc(e);b[h]=f}});return b}function p(){return e[b.floor(b.random()*e.length)]}function g(f){var h;if(f=="*")h=p();else if(f){var d=e[a.Kb(f)]||e[f];if(a.uc(d)){if(f!=i){i=f;c[f]=0;k[f]=d[b.floor(b.random()*d.length)]}else c[f]++;d=k[f];if(a.uc(d)){d=d.length&&d[c[f]%d.length];if(a.uc(d))d=d[b.floor(b.random()*d.length)]}}h=d;if(a.ud(h))h=g(h)}return h}var q=a.O(r);a.c(q,function(b){var c=[];c.$Elmt=b;var e=a.j(b,"u")=="caption";a.c(f?[0,3]:[2],function(l,o){if(e){var k,f;if(l!=2||!a.j(b,"t3")){f=h(b,l);if(l==2&&!f.ab){f.$Delay=f.$Delay||{sb:0};f=a.p(h(b,0),f)}}if(f&&f.ab){k=g(f.ab.sb);if(k){var i=a.p({$Delay:0},k);a.c(f,function(c,a){var b=(d[a]||d.kb).apply(d,[i[a],f[a]]);if(!isNaN(b))i[a]=b});if(!o)if(f.Gb)i.Gb=f.Gb.sb||0;else if(n&2)i.Gb=0}}c.push(i)}if(m%2&&!o)c.O=j(b,m+1)});l.push(c)});return l}function m(w,c,z){var g={$Easing:c.$Easing,$Round:c.$Round,$During:c.$During,$Reverse:f&&!z},m=w,r=a.Yc(w),k=a.l(m),j=a.m(m),y=a.l(r),x=a.m(r),h={},e={},i=c.$ScaleClip||1;if(c.$Opacity)e.$Opacity=1-c.$Opacity;g.$OriginalWidth=k;g.$OriginalHeight=j;if(c.$Zoom||c.$Rotate){e.$Zoom=(c.$Zoom||2)-2;if(a.V()||a.tc())e.$Zoom=b.min(e.$Zoom,1);h.$Zoom=1;var B=c.$Rotate||0;e.$Rotate=B*360;h.$Rotate=0}else if(c.$Clip){var s={$Top:0,$Right:k,$Bottom:j,$Left:0},v=a.p({},s),d=v.wb={},u=c.$Clip&4,p=c.$Clip&8,t=c.$Clip&1,q=c.$Clip&2;if(u&&p){d.$Top=j/2*i;d.$Bottom=-d.$Top}else if(u)d.$Bottom=-j*i;else if(p)d.$Top=j*i;if(t&&q){d.$Left=k/2*i;d.$Right=-d.$Left}else if(t)d.$Right=-k*i;else if(q)d.$Left=k*i;g.$Move=c.$Move;e.$Clip=v;h.$Clip=s}var n=0,o=0;if(c.x)n-=y*c.x;if(c.y)o-=x*c.y;if(n||o||g.$Move){e.$Left=n;e.$Top=o}var A=c.$Duration;h=a.p(h,a.xe(m,e));g.xc=a.Pc();return new l(c.$Delay,A,g,m,h,e)}function i(b,d){a.c(d,function(d){var a,h=d.$Elmt,e=d[0],j=d[1];if(e){a=m(h,e);e.Gb==k&&a.$Shift(b);b=a.gb()}b=i(b,d.O);if(j){var f=m(h,j,1);f.$Shift(b);c.I(f);g.I(f)}a&&c.I(a)});return b}c.jb=function(){c.v(c.gb()*(f||0));g.v(0)};g=new l(0,0);i(0,n?j(p,1):[])}c.jb=function(){d.jb();e.jb()};e=new g(h,f,1);c.dc=e.gb();c.Yb=c.dc+i;d=new g(h,f);d.$Shift(c.Yb);c.I(d);c.I(e)};g.$JssorCaptionSlideo$=function(n,g,m){var b=this,o,h={},i=g.$Transitions,d=new l(0,0);l.call(b,0,0);function j(d,c){var b={};a.c(d,function(d,f){var e=h[f];if(e){if(a.yg(d))d=j(d,c||f=="e");else if(c)if(a.Zb(d))d=o[d];b[e]=d}});return b}function k(e,c){var b=[],d=a.O(e);a.c(d,function(d){var h=a.j(d,"u")=="caption";if(h){var e=a.j(d,"t"),g=i[a.Kb(e)]||i[e],f={$Elmt:d,ab:g};b.push(f)}if(c<5)b=b.concat(k(d,c+1))});return b}function r(c,e,b){a.c(e,function(f){var e=j(f),g={$Easing:a.Lc(e.$Easing),xc:a.Pc(),$OriginalWidth:b.N,$OriginalHeight:b.P},h=new l(f.b,f.d,g,c,b,e);d.I(h);b=a.Je(b,e)});return b}function q(b){a.c(b,function(e){var b=e.$Elmt,d=a.l(b),c=a.m(b),f={$Left:a.E(b),$Top:a.G(b),$Opacity:1,$ZIndex:a.J(b)||0,$Rotate:0,$RotateX:0,$RotateY:0,$ScaleX:1,$ScaleY:1,$TranslateX:0,$TranslateY:0,$TranslateZ:0,$SkewX:0,$SkewY:0,N:d,P:c,$Clip:{$Top:0,$Right:d,$Bottom:c,$Left:0}};r(b,e.ab,f)})}function t(g,f,h){var e=g.b-f;if(e){var a=new l(f,e);a.I(d,c);a.$Shift(h);b.I(a)}b.ye(g.d);return e}function s(f){var c=d.Fc(),e=0;a.c(f,function(d,f){d=a.p({d:m},d);t(d,c,e);c=d.b;e+=d.d;if(!f||d.t==2){b.dc=c;b.Yb=c+d.d}})}b.jb=function(){b.v(-1,c)};o=[f.$Swing,f.$Linear,f.$InQuad,f.$OutQuad,f.$InOutQuad,f.$InCubic,f.$OutCubic,f.$InOutCubic,f.$InQuart,f.$OutQuart,f.$InOutQuart,f.$InQuint,f.$OutQuint,f.$InOutQuint,f.$InSine,f.$OutSine,f.$InOutSine,f.$InExpo,f.$OutExpo,f.$InOutExpo,f.$InCirc,f.$OutCirc,f.$InOutCirc,f.$InElastic,f.$OutElastic,f.$InOutElastic,f.$InBack,f.$OutBack,f.$InOutBack,f.$InBounce,f.$OutBounce,f.$InOutBounce,f.$GoBack,f.$InWave,f.$OutWave,f.$OutJump,f.$InJump];var u={$Top:"y",$Left:"x",$Bottom:"m",$Right:"t",$Rotate:"r",$RotateX:"rX",$RotateY:"rY",$ScaleX:"sX",$ScaleY:"sY",$TranslateX:"tX",$TranslateY:"tY",$TranslateZ:"tZ",$SkewX:"kX",$SkewY:"kY",$Opacity:"o",$Easing:"e",$ZIndex:"i",$Clip:"c"};a.c(u,function(b,a){h[b]=a});q(k(n,1));d.v(-1);var p=g.$Breaks||[],e=[].concat(p[a.Kb(a.j(n,"b"))]||[]);e.push({b:d.gb(),d:e.length?0:m});s(e);b.v(-1)}})(window,document,Math,null,true,false)
;
// This file is autogenerated via the `commonjs` Grunt task. You can require() this file in a CommonJS environment.
require('../../js/transition.js')
require('../../js/alert.js')
require('../../js/button.js')
require('../../js/carousel.js')
require('../../js/collapse.js')
require('../../js/dropdown.js')
require('../../js/modal.js')
require('../../js/tooltip.js')
require('../../js/popover.js')
require('../../js/scrollspy.js')
require('../../js/tab.js')
require('../../js/affix.js')
;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//



;
