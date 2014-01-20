;(window.Q = (function (window, document, Q, undefined) {

  // Set to ES5 Strict mode
  'use strict';

  /***********************************************************************************************/

  // DOM

  /**
   * Selects DOM nodes using the specified CSS `selector` and `context`.
   *
   * @param {String} selector One or more CSS selectors.
   * @param {Node} [context=document] Limit selection to node within the `context` node.
   * @returns {Node|Array} Returns a Node if a single node is found, or an Array of Nodes if
   *   multiple nodes are found, else returns undefined.
   */
  Q = function (selector, context) {
    var result = (typeof context === 'undefined' ? document : context).querySelectorAll(selector);
    return result.length < 2 ? result[0] : Array.prototype.slice.call(result);
  };

  /**
   * Creates a new node with the specified `tagName` and `innerHTML`.
   *
   * @param {String} tagName The tag name of the new node.
   * @param {String} innerHTML The HTML contained by the new node.
   * @returns {Node} The newly-created node.
   */
  Q.create = function (tagName, innerHTML) {
    var elem = document.createElement(tagName);
    if (typeof innerHTML !== 'undefined') {
      elem.innerHTML = innerHTML;
    }
    return elem;
  };

  /**
   * Removes a node.
   *
   * @param {Node} el The node to be removed.
   * @returns {Node} The node that was removed.
   */
  Q.remove = function (el) {
    return el.parentNode.removeChild(el);
  };

  /**
   * Replaces a node with another.
   *
   * @param {Node} el The node that replaces the old node.
   * @param {Node} old The node to be replaced.
   * @returns {Node} The node that was replaced.
   */
  Q.replace = function (old, el) {
    return old.parentNode.replaceChild(el, old);
  };

  /**
   * Gets the previous sibiling of a node.
   *
   * @param {Node} el The reference node.
   * @returns {Node|null} Returns the previous sibiling of the reference node if it exists, else returns null.
   */
  Q.prev = function (el) {
    return el.previousElementSibling;
  };

  /**
   * Gets the next sibiling of a node.
   *
   * @param {Node} el The reference node.
   * @returns {Node|null} Returns the next sibiling of the reference node if it exists, else returns null.
   */
  Q.next = function (el) {
    return el.nextElementSibling;
  };

  /**
   * Inserts a node before a reference node.
   *
   * @param {Node} el The node to be inserted.
   * @param {Node} ref The reference node.
   * @returns {Node} The node that was inserted.
   */
  Q.insertBefore = function (el, ref) {
    return ref.parentNode.insertBefore(el, ref);
  };

  /**
   * Inserts a node after a reference node.
   *
   * @param {Node} el The node to be inserted.
   * @param {Node} ref The reference node.
   * @returns {Node} The node that was inserted.
   */
  Q.insertAfter = function (el, ref) {
    return ref.parentNode.insertBefore(el, ref.nextSibling);
  };

  /**
   * Inserts a node as the first child of a reference node.
   *
   * @param {Node} el The node to be inserted.
   * @param {Node} ref The reference node.
   * @returns {Node} The node that was inserted.
   */
  Q.prepend = function (el, ref) {
    return ref.insertBefore(el, ref.firstChild);
  };

  /**
   * Inserts a node as the last child of a reference node.
   *
   * @param {Node} el The node to be inserted.
   * @param {Node} ref The reference node.
   * @returns {Node} The node that was inserted.
   */
  Q.append = function (el, ref) {
    ref.appendChild(el);
  };

  /**
   * Sets the attribute of the node if `val` was specified, then gets the value of
   * the attribute.
   *
   * @param {Node} el The node of interest.
   * @param {String} key The name of the attribute.
   * @param {String} [val=undefined] The value to assign to the attribute.
   * @returns {String} Returns the value of the attribute if it exists, else returns null.
   */
  Q.attr = function (el, key, val) {
    if (typeof val !== 'undefined') {
      el.setAttribute(key, val);
    }
    var get = el.getAttribute(key);
    return get ? get : null;
  };

  /**
   * Sets a data-attribute of the node if `val` was specified, then gets the value of
   * the data attribute.
   *
   * @param {Node} el The node of interest.
   * @param {String} key The name of the data attribute.
   * @param {String} [val=undefined] The value to assign to the data attribute.
   * @returns {String} Returns the value of the data attribute if it exists, else returns null.
   */
  Q.data = function (el, key, val) { // val must be a str
    if (typeof val !== 'undefined') {
      return Q.attr(el, 'data-' + key, val);
    }
    return Q.attr(el, 'data-' + key);
  };

  // classList is not supported in IE9
  var classList = document.documentElement.classList;

  /**
   * Check if the node has the specified `className`.
   *
   * @param {Node} el The node of interest.
   * @param {String} className A single CSS class name.
   * @returns {Boolean} Returns true if the node has `className`, else returns false.
   */
  Q.hasClass = function (el, className) {
    if (classList) {
      return el.classList.contains(className);
    }
    return new RegExp('(^|\\s)' + className + '(\\s|Q)').test(el.className);
  };

  /**
   * Adds the `className` to the node.
   *
   * @param {Node} el The node of interest.
   * @param {String} className A single CSS class name.
   * @returns {Node} Returns the node with `className` added.
   */
  Q.addClass = function (el, className) {
    if (classList) {
      el.classList.add(className);
    } else {
      if (!Q.hasClass(el, className)) {
        el.className += (el.className ? ' ' : '') + className;
      }
    }
    return el;
  };

  /**
   * Removes the `className` from the node.
   *
   * @param {Node} el The node of interest.
   * @param {String} className A single CSS class name.
   * @returns {Node} Returns the node with `className` removed.
   */
  Q.removeClass = function (el, className) {
    if (classList) {
      el.classList.remove(className);
    } else {
      if (Q.hasClass(el, className)) {
        el.className = el.className.replace(new RegExp('(^|\\s)*' + className +
          '(\\s|Q)*', 'g'), '');
      }
    }
    return el;
  };

  /**
   * Adds `className` to the node if the class is not present, else removes `classname` from the
   * the node if the class is present.
   *
   * @param {Node} el The node of interest.
   * @param {String} className A single CSS class name.
   * @returns {Node} Returns the node with the specified class added or removed.
   */
  Q.toggleClass = function (el, className) {
    if (classList) {
      el.classList.toggle(className);
    } else {
      if (Q.hasClass(el, className)) {
        Q.removeClass(el, className);
      } else {
        Q.addClass(el, className);
      }
    }
    return el;
  };

  /**
   * Sets the specified `css` as inline styles for the node.
   *
   * @param {Node} el The node of interest.
   * @param {Object} className An object literal comprising CSS property names and property values
   *   as key-value pairs.
   * @returns {Node} Returns the node with the inline styles applied.
   */
  Q.css = function (el, css) {
    var key,
      camelCase = function (str, letter) {
        return letter.toUpperCase();
      };
    for (key in css) {
      if (css.hasOwnProperty(key)) {
        el.style[key.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, camelCase)] = css[key];
      }
    }
    return el;
  };

  /***********************************************************************************************/

  // OBJECT

  /**
   * Checks if `obj` is an Object.
   *
   * @param {*} obj The object to check.
   * @returns {Boolean} Returns true if `obj` is an object, else returns false.
   */
  Q.isObject = function(obj) {
    return obj === Object(obj);
  };

  /**
   * Checks if `obj` is an Array.
   *
   * @param {*} obj The object to check.
   * @returns {Boolean} Returns true if `obj` is an Array, else returns false.
   */
  Q.isArray = function (obj) {
    return toString.call(obj) == '[object Array]';
  };

  /**
   * Checks if `obj` is a Function.
   *
   * @param {*} obj The object to check.
   * @returns {Boolean} Returns true if `obj` is a Function, else returns false.
   */
  Q.isFunction = function (obj) {
    return toString.call(obj) == '[object Function]';
  };

  /**
   * Checks if `obj` is a String.
   *
   * @param {*} obj The object to check.
   * @returns {Boolean} Returns true if `obj` is a String, else returns false.
   */
  Q.isString = function (obj) {
    return toString.call(obj) == '[object String]';
  };

  /**
   * Checks if `obj` is an integer.
   *
   * @param {*} obj The object to check.
   * @returns {Boolean} Returns true if `obj` is an integer, else returns false.
   */
  Q.isInteger = function (obj) {
    return parseInt(obj, 10) === obj;
  };

  /**
   * Checks if `obj` is a float.
   *
   * @param {*} obj The object to check.
   * @returns {Boolean} Returns true if `obj` is a float, else returns false.
   */
  Q.isFloat = function (obj) {
    return obj === +obj && obj !== (obj | 0);
  };

  /**
   * Gets all the keys of `obj`.
   *
   * @param {Object} obj The object of interest.
   * @returns {Array} Returns all the keys of `obj`.
   */
  Q.keys = function (obj) {
    var key,
      keys = [];
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  };

  /**
   * Gets all the values of `obj`.
   *
   * Note: Values that are objects are *not* copied to the returned array; they are stored by
   * reference in the returned array.
   *
   * @param {Object} obj The object of interest.
   * @returns {Array} Returns all the values of `obj`.
   */
  Q.vals = function (obj) {
    var keys = Q.keys(obj),
      values = [];
    for (var i=0, len=keys.length; i<len; i++) {
      values.push(obj[keys[i]]);
    }
    return values;
  };

  /**
   * If `obj` is an Array, deletes a value. If `obj` is an Object, deletes a key-value pair.
   *
   * @param {Object|Array} obj The object to delete an item from.
   * @returns {Object|Array} Returns the object or array with the item with `key` deleted.
   */
  Q.delete = function(obj, key) {
    if (Q.isArray(obj)) {
      obj.splice(key, 1);
    } else {
      delete obj[key];
    }
    return obj;
  };

  /***********************************************************************************************/

  // COLLECTION

  // Sentinel to short circuit Q.each().
  var breaker = {};

  /**
   * Executes `fn` for each item in `obj`.
   *
   * @param {Object|Array} obj The Object or Array to iterate over.
   * @param {Function} The function called per iteration.
   * @param {Object} context The `this` binding of `fn`.
   * @returns {Object|Array} Returns `obj`.
   */
  Q.each = function (obj, fn, context) {
    context = context || obj;
    if (Q.isArray(obj)) {
      for (var i=0, len=obj.length; i<len; i++) {
        val = obj[i];
        if (fn.call(context, val, i, obj) === breaker) {
          return;
        }
      }
    } else {
      var key,
        val;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          val = obj[key];
          if (fn.call(context, val, key, obj) === breaker) {
            return;
          }
        }
      }
    }
    return obj;
  };

  // Function definition for `Q.any` and `Q.every`
  var breakableEach = function(bool, obj, fn, context) {
    var result = false;
    context = context || obj;
    Q.each(obj, function (val, key, obj) {
      if (fn.call(context, val, key, obj) === bool) {
        result = true;
        return breaker; // Break from loop
      }
    }, context);
    return result;
  };

  /**
   * Executes `fn` for each item in `obj` until `fn` returns `true`.
   *
   * @param {Object|Array} obj The Object or Array to iterate over.
   * @param {Function} The function called per iteration.
   * @param {Object} context The `this` binding of `fn`.
   * @returns {Boolean} Returns `true` if any `fn` returns true.
   */
  Q.any = breakableEach.bind(this, true);

  /**
   * Executes `fn` for each item in `obj` until `fn` returns `false`.
   *
   * @param {Object|Array} obj The Object or Array to iterate over.
   * @param {Function} The function called per iteration.
   * @param {Object} context The `this` binding of `fn`.
   * @returns {Boolean} Returns `true` if every `fn` returns true.
   */
  Q.every = breakableEach.bind(this, false);

  // Function definition for `Q.filter` and `Q.filterKeys`
  var filter = function (returnKeys, obj, fn, context) {
    var results = [];
    context = context || obj;
    Q.each(obj, function (val, key, obj) {
      if (fn.call(context, val, key, obj)) {
        if (!returnKeys) {
          results.push(val);
        } else {
          results.push(key);
        }
      }
    }, context);
    return results;
  };

  /**
   * Executes `fn` for each item in `obj`. Gets an Array of values in `obj` for which `fn`
   * returns true.
   *
   * @param {Object|Array} obj The Object or Array to iterate over.
   * @param {Function} The function called per iteration.
   * @param {Object} context The `this` binding of `fn`.
   * @returns {Array} Returns an Array of values in `obj` for which `fn` returns true.
   */
  Q.filter = filter.bind(this, false);

  /**
   * Executes `fn` for each item in `obj`. Gets an Array of keys from `obj` for which `fn`
   * returns true.
   *
   * @param {Object|Array} obj The Object or Array to iterate over.
   * @param {Function} The function called per iteration.
   * @param {Object} context The `this` binding of `fn`.
   * @returns {Array} Returns an Array of keys in `obj` for which `fn` returns true.
   */
  Q.filterKeys = filter.bind(this, true);

  // Function definition for `Q.find` and `Q.findKey`
  var find = function (returnKey, obj, fn, context) {
    var result = false;
    context = context || obj;
    Q.each(obj, function (val, key, obj) {
      if (fn.call(context, val, key, obj)) {
        if (!returnKey) {
          result = val;
        } else {
          result = key;
        }
        return breaker; // Break from loop
      }
    }, context);
    return result;
  };

  /**
   * Executes `fn` for each item in `obj` until `fn` returns `true`. Returns the first value for
   * which `fn` returns `true`.
   *
   * @param {Object|Array} obj The Object or Array to iterate over.
   * @param {Function} The function called per iteration.
   * @param {Object} context The `this` binding of `fn`.
   * @returns {*} Returns the first value for which `fn` returns `true`.
   */
  Q.find = find.bind(this, false);

  /**
   * Executes `fn` for each item in `obj` until `fn` returns `true`. Returns the first key for
   * which `fn` returns `true`.
   *
   * @param {Object|Array} obj The Object or Array to iterate over.
   * @param {Function} The function called per iteration.
   * @param {Object} context The `this` binding of `fn`.
   * @returns {String} Returns the first key for which `fn` returns `true`.
   */
  Q.findKey = find.bind(this, true);

  /**
   * Boils down a list of values into a single value. `memo` is the initial state, and each
   * iteration of `fn` should return memo.
   *
   * @param {Object|Array} obj The Object or Array to iterate over.
   * @param {Function} The function called per iteration that should return the value to be
   *   assigned to `memo`.
   * @param {Object} context The `this` binding of `fn`.
   * @returns {String} Returns `memo`.
   */
  Q.inject = function (obj, fn, memo, context) {
    var result = false;
    context = context || obj;
    Q.each(obj, function (val, key, obj) {
      memo = fn.call(context, memo, val, key, obj);
    }, context);
    return memo;
  };

  /**
   * Find the index of `el` in `arr`.
   *
   * @param {Array} arr The Array to search in.
   * @param {Object} el The object to search for.
   * @returns {String} Returns the index of `el` in `arr` if `el` is found, else returns -1.
   */
  Q.indexOf = function (el, arr) {
    var i,
      len = arr.length;
    for (i=0; i<len; i++) {
      if (a[i] === el) {
        return i;
      }
    }
    return -1;
  };

  /**
   * Check if `obj` contains `el`.
   *
   * @param {Object|Array} obj The Object/Array to search in.
   * @param {Object} el The object to search for.
   * @returns {Boolean} Returns true if `obj` contains `el`, else returns false.
   */
  Q.contains = function(obj, el) {
    if (Q.isArray(obj)) {
      return Q.indexOf(obj, el) !== -1;
    } else {
      if (obj === null) {
        return false;
      }
      return Q.any(obj, function(val) {
        return val === el;
      });
    }
    return false;
  };

  /***********************************************************************************************/

  // EVENTS

  /**
   * Binds the `fn` function to `el` and its `eventName` event.
   *
   * @param {Node} el The node of interest.
   * @param {String} eventName The name of the event on which to bind `fn`.
   * @param {Function} fn The function to be bound.
   * @returns {Node} Returns `el`.
   */
  Q.on = function (el, eventName, fn) {
    el.addEventListener(eventName, fn, false);
    return el;
  };

  /**
   * Unbinds the `fn` function from `el` and its `eventName` event.
   *
   * @param {Node} el The node of interest.
   * @param {String} eventName The name of the event on which to bind `fn`.
   * @param {Function} fn The function to be unbound.
   * @returns {Node} Returns `el`.
   */
  Q.off = function (el, eventName, fn) {
    el.removeEventListener(eventName, fn, false);
    return el;
  };

  /**
   * Binds a one-time `fn` function to `el` and its `eventName` event; `fn` will be executed at
   * most once.
   *
   * @param {Node} el The node of interest.
   * @param {String} eventName The name of the event on which to bind `fn`.
   * @param {Function} fn The function to be bound.
   * @returns {Node} Returns `el`.
   */
  Q.one = function (el, eventName, fn) {
    var one = function () {
      fn.call(el);
      Q.off(el, eventName, one);
    };
    Q.on(el, eventName, one);
    return el;
  };

  /**
   * Set `el` to listen for triggers of the `eventName` event on child nodes of `el` that match
   * the specified `selector`, and execute the `fn` function on each matched child nodes.
   *
   * @param {Node} el The node that listens for triggers of the `eventName` event.
   * @param {String} selector One or more CSS selectors.
   * @param {String} eventName The name of the event on which to bind `fn`.
   * @param {Function} fn The function to be bound to the child nodes.
   * @returns {Node} Returns `el`.
   */
  Q.delegate = function (el, selector, eventName, fn) {
    var matchesSelector = el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector || el.msMatchesSelector || el.matchesSelector;
    Q.on(el, eventName, function (event) {
      if (matchesSelector.call(event.target, selector)) {
        fn.call(event.target, event);
      }
    });
  };

  /**
   * Trigger the `eventName` event on `el`, with the specified `data`.
   *
   * @param {Node} el The node to trigger the `eventName` event on.
   * @param {String} eventName The name of the event to trigger.
   * @param {Object} data The data to attach to the `eventName` event.
   * @returns {Node} Returns `el`.
   */
  Q.trigger = function (el, eventName, data) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
    event.data = data || {};
    event.eventName = eventName;
    el.dispatchEvent(event);
    return el;
  };

  /***********************************************************************************************/

  // HTTP GET & POST

  // Function definition for `Q.get` and `Q.post`
  var request = function (type, url, param, fn) {
    var xhr = (function () {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      } else {
        if (window.ActiveXObject) {
          return new ActiveXObject('Microsoft.XMLHTTP');
        }
      }
      return false;
    })();
    if (xhr !== false) {
      if (typeof param == 'function') { // set param to null for GET
        fn = param;
        param = null;
      }
      xhr.open(type, url, true);
      if (type === 'POST' && param) {
        param = 'data=' + encodeURIComponent(JSON.stringify(param));
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          fn.call(xhr, false, xhr.response);
        }
      };
      xhr.onerror = function () {
        fn.call(xhr, true);
      };
      xhr.send(param ? param : null); // send param for POST only
    }
    return xhr;
  };

  /**
   * Perform a GET request for the specified `url`, executing the callback function `fn` at
   * the end of the request.
   *
   * @param {String} url The URL being requested.
   * @param {Function} fn The callback function executed at the end of the GET request. The first
   * argument is a Boolean indicating whether the request was successful. The second argument is
   * the response of the GET request.
   * @returns {XMLHttpRequest} Returns the XMLHttpRequest object.
   */
  Q.get = request.bind(this, 'GET');

  /**
   * Perform a POST request for the specified `url` and `param`, executing the callback function
   * `fn` at the end of the request.
   *
   * @param {String} url The URL being requested.
   * @param {Object|String} fn The string that is sent in the body of the POST request.
   * @param {Function} fn The callback function executed at the end of the POST request. The first
   * argument is a Boolean indicating whether the request was successful. The second argument is
   * the response of the POST request.
   * @returns {XMLHttpRequest} Returns the XMLHttpRequest object.
   */
  Q.post = request.bind(this, 'POST');

  return Q;

})(this, document, {}));
