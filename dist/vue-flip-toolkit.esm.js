var script = {
  name: "flipped",
  inject: ["addFlippedElement", "addInvertedElement"],
  props: {
    flipId: String,
    inverseFlipId: String,
    stagger: String,
    shouldFlip: Function,
    shouldInvert: Function
  },
  mounted() {
    if (this.flipId) {
      this.addFlippedElement({
        element: this.$el,
        flipId: this.flipId,
        shouldFlip: this.shouldFlip,
        shouldInvert: this.shouldInvert,
        onStart: el => this.$emit("on-start", { el, id: this.flipId }),
        onComplete: el => this.$emit("on-complete", { el, id: this.flipId }),
        stagger: this.stagger
      });
    } else if (this.inverseFlipId) {
      this.addInvertedElement({
        element: this.$el,
        parent: this.$parent.$el
      });
    }
  },
  render() {
    return this.$scopedSlots.default({});
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
const __vue_script__ = script;

/* template */

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Flipped = normalizeComponent_1(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var animateUnflippedElements = function (_a) {
    var unflippedIds = _a.unflippedIds, flipCallbacks = _a.flipCallbacks, getElement = _a.getElement, flippedElementPositionsBeforeUpdate = _a.flippedElementPositionsBeforeUpdate, flippedElementPositionsAfterUpdate = _a.flippedElementPositionsAfterUpdate, inProgressAnimations = _a.inProgressAnimations;
    var enteringElements = unflippedIds.filter(function (id) { return flippedElementPositionsAfterUpdate[id] && flipCallbacks[id]; });
    var exitingElementIds = unflippedIds.filter(function (id) {
        return flippedElementPositionsBeforeUpdate[id] &&
            flipCallbacks[id] &&
            flipCallbacks[id].onExit;
    });
    var hideEnteringElements = function () {
        enteringElements.forEach(function (id) {
            if (flipCallbacks[id] && flipCallbacks[id].onAppear) {
                var element = getElement(id);
                element.style.opacity = '0';
            }
        });
    };
    var animateEnteringElements = function () {
        enteringElements.forEach(function (id, i) {
            var element = getElement(id);
            if (flipCallbacks[id] && flipCallbacks[id].onAppear) {
                flipCallbacks[id].onAppear(element, i);
            }
        });
    };
    var closureResolve;
    var promiseToReturn = new Promise(function (resolve) {
        closureResolve = resolve;
    });
    var fragmentTuples = [];
    var exitingElementCount = 0;
    var onExitCallbacks = exitingElementIds.map(function (id, i) {
        var _a = flippedElementPositionsBeforeUpdate[id].domDataForExitAnimations, element = _a.element, parent = _a.parent, _b = _a.childPosition, top = _b.top, left = _b.left, width = _b.width, height = _b.height;
        // insert back into dom
        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }
        element.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
        element.style.position = 'absolute';
        element.style.top = top + 'px';
        element.style.left = left + 'px';
        // taken out of the dom flow, the element might have lost these dimensions
        element.style.height = height + 'px';
        element.style.width = width + 'px';
        var fragmentTuple = fragmentTuples.filter(function (t) { return t[0] === parent; })[0];
        if (!fragmentTuple) {
            fragmentTuple = [parent, document.createDocumentFragment()];
            fragmentTuples.push(fragmentTuple);
        }
        fragmentTuple[1].appendChild(element);
        exitingElementCount += 1;
        var stop = function () {
            try {
                parent.removeChild(element);
            }
            catch (DOMException) {
                // the element is already gone
            }
            finally {
                exitingElementCount -= 1;
                if (exitingElementCount === 0) {
                    closureResolve();
                }
            }
        };
        inProgressAnimations[id] = { stop: stop };
        return function () { return flipCallbacks[id].onExit(element, i, stop); };
    });
    // now append all the fragments from the onExit callbacks
    // (we use fragments for performance)
    fragmentTuples.forEach(function (t) {
        var parent = t[0];
        var fragment = t[1];
        parent.appendChild(fragment);
    });
    if (!onExitCallbacks.length) {
        closureResolve();
    }
    var animateExitingElements = function () {
        onExitCallbacks.forEach(function (c) { return c(); });
        return promiseToReturn;
    };
    return {
        hideEnteringElements: hideEnteringElements,
        animateEnteringElements: animateEnteringElements,
        animateExitingElements: animateExitingElements
    };
};

/*! @license Rematrix v0.2.2

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/
/**
 * @module Rematrix
 */

/**
 * Transformation matrices in the browser come in two flavors:
 *
 *  - `matrix` using 6 values (short)
 *  - `matrix3d` using 16 values (long)
 *
 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
 * to expand short form matrices to their equivalent long form.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function format(source) {
	if (source.constructor !== Array) {
		throw new TypeError('Expected array.')
	}
	if (source.length === 16) {
		return source
	}
	if (source.length === 6) {
		var matrix = identity();
		matrix[0] = source[0];
		matrix[1] = source[1];
		matrix[4] = source[2];
		matrix[5] = source[3];
		matrix[12] = source[4];
		matrix[13] = source[5];
		return matrix
	}
	throw new RangeError('Expected array with either 6 or 16 values.')
}

/**
 * Returns a matrix representing no transformation. The product of any matrix
 * multiplied by the identity matrix will be the original matrix.
 *
 * > **Tip:** Similar to how `5 * 1 === 5`, where `1` is the identity.
 *
 * @return {array}
 */
function identity() {
	var matrix = [];
	for (var i = 0; i < 16; i++) {
		i % 5 == 0 ? matrix.push(1) : matrix.push(0);
	}
	return matrix
}

/**
 * Returns a 4x4 matrix describing the combined transformations
 * of both arguments.
 *
 * > **Note:** Order is very important. For example, rotating 45°
 * along the Z-axis, followed by translating 500 pixels along the
 * Y-axis... is not the same as translating 500 pixels along the
 * Y-axis, followed by rotating 45° along on the Z-axis.
 *
 * @param  {array} m - Accepts both short and long form matrices.
 * @param  {array} x - Accepts both short and long form matrices.
 * @return {array}
 */
function multiply(m, x) {
	var fm = format(m);
	var fx = format(x);
	var product = [];

	for (var i = 0; i < 4; i++) {
		var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];
		for (var j = 0; j < 4; j++) {
			var k = j * 4;
			var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
			var result =
				row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];

			product[i + k] = result;
		}
	}

	return product
}

/**
 * Attempts to return a 4x4 matrix describing the CSS transform
 * matrix passed in, but will return the identity matrix as a
 * fallback.
 *
 * **Tip:** In virtually all cases, this method is used to convert
 * a CSS matrix (retrieved as a `string` from computed styles) to
 * its equivalent array format.
 *
 * @param  {string} source - String containing a valid CSS `matrix` or `matrix3d` property.
 * @return {array}
 */
function parse(source) {
	if (typeof source === 'string') {
		var match = source.match(/matrix(3d)?\(([^)]+)\)/);
		if (match) {
			var raw = match[2].split(', ').map(parseFloat);
			return format(raw)
		}
	}
	return identity()
}

/**
 * Returns a 4x4 matrix describing X-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleX(scalar) {
	var matrix = identity();
	matrix[0] = scalar;
	return matrix
}

/**
 * Returns a 4x4 matrix describing Y-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */
function scaleY(scalar) {
	var matrix = identity();
	matrix[5] = scalar;
	return matrix
}

/**
 * Returns a 4x4 matrix describing X-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateX(distance) {
	var matrix = identity();
	matrix[12] = distance;
	return matrix
}

/**
 * Returns a 4x4 matrix describing Y-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */
function translateY(distance) {
	var matrix = identity();
	matrix[13] = distance;
	return matrix
}

var isNumber = function (x) { return typeof x === 'number'; };
var isFunction = function (x) { return typeof x === 'function'; };
var isObject = function (x) {
    return Object.prototype.toString.call(x) === '[object Object]';
};
var toArray = function (arrayLike) {
    return Array.prototype.slice.apply(arrayLike);
};
var getDuplicateValsAsStrings = function (arr) {
    var obj = arr.reduce(function (acc, curr) {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(obj).filter(function (val) { return obj[val] > 1; });
};
// tslint only likes this with a regular function, not an arrow function
function assign(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    args.forEach(function (arg) {
        if (!arg) {
            return;
        }
        // Skip over if undefined or null
        for (var nextKey in arg) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(arg, nextKey)) {
                target[nextKey] = arg[nextKey];
            }
        }
    });
    return target;
}

// adapted from
// https://github.com/chenglou/react-motion/blob/master/src/presets.js
var springPresets = {
    noWobble: { stiffness: 200, damping: 26 },
    gentle: { stiffness: 120, damping: 14 },
    veryGentle: { stiffness: 130, damping: 17 },
    wobbly: { stiffness: 180, damping: 12 },
    stiff: { stiffness: 260, damping: 26 }
};
var getSpringConfig = function (_a) {
    var _b = _a === void 0 ? {} : _a, flipperSpring = _b.flipperSpring, flippedSpring = _b.flippedSpring;
    var normalizeSpring = function (spring) {
        if (isObject(spring)) {
            return spring;
        }
        else if (springPresets[spring]) {
            return springPresets[spring];
        }
        else {
            return {};
        }
    };
    return assign({}, springPresets.noWobble, normalizeSpring(flipperSpring), normalizeSpring(flippedSpring));
};

var DATA_FLIP_ID = 'data-flip-id';
var DATA_INVERSE_FLIP_ID = 'data-inverse-flip-id';
var DATA_PORTAL_KEY = 'data-portal-key';
var DATA_EXIT_CONTAINER = 'data-exit-container';

// scoped selector makes sure we're querying inside the right Flipper
// container, either internally or with the right portal key
var selectFlipChildIds = function (scopedSelector, selector, flippedIds) {
    var childIds = scopedSelector(selector).map(function (el) { return el.dataset.flipId; });
    // now return an array ordered by the original order in the DOM
    return flippedIds.filter(function (id) { return childIds.indexOf(id) > -1; });
};
var baseSelector = "[" + DATA_FLIP_ID + "]";
var filterFlipDescendants = (function (_a) {
    var flipDataDict = _a.flipDataDict, flippedIds = _a.flippedIds, scopedSelector = _a.scopedSelector;
    var levelToChildren = {};
    var buildHierarchy = function (selector, level, oldResult) {
        var newSelector = selector + " " + baseSelector;
        // make sure this is scoped to the Flipper element in case there are
        // mulitiple Flipper elements on the page
        var newResult = selectFlipChildIds(scopedSelector, newSelector, flippedIds);
        var oldLevelChildren = oldResult.filter(function (id) { return newResult.indexOf(id) === -1; });
        levelToChildren[level] = oldLevelChildren;
        oldLevelChildren.forEach(function (childId) {
            if (flipDataDict[childId]) {
                flipDataDict[childId].level = level;
            }
        });
        if (newResult.length !== 0) {
            buildHierarchy(newSelector, level + 1, newResult);
        }
    };
    // the top level selectChildFlipIds should use the scopedSelector
    buildHierarchy(baseSelector, 0, selectFlipChildIds(scopedSelector, baseSelector, flippedIds));
    // now make sure childIds in each flippedData contains only direct children
    // since to enable nested stagger we want each parent to be able to kick off
    // the animations only for its direct children
    Object.keys(flipDataDict).forEach(function (flipId) {
        var data = flipDataDict[flipId];
        // scope by parent element
        data.childIds = selectFlipChildIds(function (selector) { return toArray(data.element.querySelectorAll(selector)); }, baseSelector, flippedIds);
        data.childIds = data.childIds.filter(function (id) {
            return levelToChildren[data.level + 1] &&
                levelToChildren[data.level + 1].indexOf(id) > -1;
        });
    });
    return levelToChildren['0'];
});

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 *  Copyright (c) 2013, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 */
var _onFrame;

if (typeof window !== "undefined") {
  _onFrame = window.requestAnimationFrame;
}

_onFrame = _onFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60);
};

var _onFrame$1 = _onFrame;

function onFrame(func) {
  return _onFrame$1(func);
}
var start = Date.now();
var performanceNow = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === "object" && typeof performance.now === "function" ? function () {
  return performance.now();
} : function () {
  return Date.now() - start;
}; // Lop off the first occurence of the reference in the Array.

function removeFirst(array, item) {
  var idx = array.indexOf(item);
  idx !== -1 && array.splice(idx, 1);
}

/**
 * Plays each frame of the SpringSystem on animation
 * timing loop. This is the default type of looper for a new spring system
 * as it is the most common when developing UI.
 * @public
 */

var AnimationLooper =
/*#__PURE__*/
function () {
  function AnimationLooper() {
    _classCallCheck(this, AnimationLooper);
  }

  _createClass(AnimationLooper, [{
    key: "run",
    value: function run() {
      var _this = this;

      onFrame(function () {
        _this.springSystem.loop(performanceNow());
      });
    }
  }]);

  return AnimationLooper;
}();

var PhysicsState = function PhysicsState() {
  _classCallCheck(this, PhysicsState);

  this.position = 0;
  this.velocity = 0;
};
/**
 * Provides a model of a classical spring acting to
 * resolve a body to equilibrium. Springs have configurable
 * tension which is a force multipler on the displacement of the
 * spring from its rest point or `endValue` as defined by [Hooke's
 * law](http://en.wikipedia.org/wiki/Hooke's_law). Springs also have
 * configurable friction, which ensures that they do not oscillate
 * infinitely. When a Spring is displaced by updating it's resting
 * or `currentValue`, the SpringSystems that contain that Spring
 * will automatically start looping to solve for equilibrium. As each
 * timestep passes, `SpringListener` objects attached to the Spring
 * will be notified of the updates providing a way to drive an
 * animation off of the spring's resolution curve.
 * @public
 */


var Spring =
/*#__PURE__*/
function () {
  function Spring(springSystem) {
    _classCallCheck(this, Spring);

    this._id = "s" + Spring._ID++;
    this._springSystem = springSystem;
    this.listeners = [];
    this._startValue = 0;
    this._currentState = new PhysicsState();
    this._displacementFromRestThreshold = 0.001;
    this._endValue = 0;
    this._overshootClampingEnabled = false;
    this._previousState = new PhysicsState();
    this._restSpeedThreshold = 0.001;
    this._tempState = new PhysicsState();
    this._timeAccumulator = 0;
    this._wasAtRest = true;
  }

  _createClass(Spring, [{
    key: "getId",
    value: function getId() {
      return this._id;
    }
    /**
     * Remove a Spring from simulation and clear its listeners.
     * @public
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.listeners = [];

      this._springSystem.deregisterSpring(this);
    }
    /**
     * Set the configuration values for this Spring. A SpringConfig
     * contains the tension and friction values used to solve for the
     * equilibrium of the Spring in the physics loop.
     * @public
     */

  }, {
    key: "setSpringConfig",
    value: function setSpringConfig(springConfig) {
      this._springConfig = springConfig;
      return this;
    }
    /**
     * Retrieve the current value of the Spring.
     * @public
     */

  }, {
    key: "getCurrentValue",
    value: function getCurrentValue() {
      return this._currentState.position;
    }
    /**
     * Get the absolute distance of the Spring from a given state value
     */

  }, {
    key: "getDisplacementDistanceForState",
    value: function getDisplacementDistanceForState(state) {
      return Math.abs(this._endValue - state.position);
    }
    /**
     * Set the endValue or resting position of the spring. If this
     * value is different than the current value, the SpringSystem will
     * be notified and will begin running its solver loop to resolve
     * the Spring to equilibrium. Any listeners that are registered
     * for onSpringEndStateChange will also be notified of this update
     * immediately.
     * @public
     */

  }, {
    key: "setEndValue",
    value: function setEndValue(endValue) {
      if (this._endValue === endValue && this.isAtRest()) {
        return this;
      }

      this._startValue = this.getCurrentValue();
      this._endValue = endValue;

      this._springSystem.activateSpring(this.getId());

      for (var i = 0, len = this.listeners.length; i < len; i++) {
        var listener = this.listeners[i];
        var onChange = listener.onSpringEndStateChange;
        onChange && onChange(this);
      }

      return this;
    }
    /**
     * Set the current velocity of the Spring, in pixels per second. As
     * previously mentioned, this can be useful when you are performing
     * a direct manipulation gesture. When a UI element is released you
     * may call setVelocity on its animation Spring so that the Spring
     * continues with the same velocity as the gesture ended with. The
     * friction, tension, and displacement of the Spring will then
     * govern its motion to return to rest on a natural feeling curve.
     * @public
     */

  }, {
    key: "setVelocity",
    value: function setVelocity(velocity) {
      if (velocity === this._currentState.velocity) {
        return this;
      }

      this._currentState.velocity = velocity;

      this._springSystem.activateSpring(this.getId());

      return this;
    }
    /**
     * Enable overshoot clamping. This means that the Spring will stop
     * immediately when it reaches its resting position regardless of
     * any existing momentum it may have. This can be useful for certain
     * types of animations that should not oscillate such as a scale
     * down to 0 or alpha fade.
     * @public
     */

  }, {
    key: "setOvershootClampingEnabled",
    value: function setOvershootClampingEnabled(enabled) {
      this._overshootClampingEnabled = enabled;
      return this;
    }
    /**
     * Check if the Spring has gone past its end point by comparing
     * the direction it was moving in when it started to the current
     * position and end value.
     * @public
     */

  }, {
    key: "isOvershooting",
    value: function isOvershooting() {
      var start = this._startValue;
      var end = this._endValue;
      return this._springConfig.tension > 0 && (start < end && this.getCurrentValue() > end || start > end && this.getCurrentValue() < end);
    }
    /**
     * The main solver method for the Spring. It takes
     * the current time and delta since the last time step and performs
     * an RK4 integration to get the new position and velocity state
     * for the Spring based on the tension, friction, velocity, and
     * displacement of the Spring.
     * @public
     */

  }, {
    key: "advance",
    value: function advance(time, realDeltaTime) {
      var isAtRest = this.isAtRest();

      if (isAtRest && this._wasAtRest) {
        return;
      }

      var adjustedDeltaTime = realDeltaTime;

      if (realDeltaTime > Spring.MAX_DELTA_TIME_SEC) {
        adjustedDeltaTime = Spring.MAX_DELTA_TIME_SEC;
      }

      this._timeAccumulator += adjustedDeltaTime;
      var tension = this._springConfig.tension;
      var friction = this._springConfig.friction;
      var position = this._currentState.position;
      var velocity = this._currentState.velocity;
      var tempPosition = this._tempState.position;
      var tempVelocity = this._tempState.velocity;
      var aVelocity;
      var aAcceleration;
      var bVelocity;
      var bAcceleration;
      var cVelocity;
      var cAcceleration;
      var dVelocity;
      var dAcceleration;
      var dxdt;
      var dvdt;

      while (this._timeAccumulator >= Spring.SOLVER_TIMESTEP_SEC) {
        this._timeAccumulator -= Spring.SOLVER_TIMESTEP_SEC;

        if (this._timeAccumulator < Spring.SOLVER_TIMESTEP_SEC) {
          this._previousState.position = position;
          this._previousState.velocity = velocity;
        }

        aVelocity = velocity;
        aAcceleration = tension * (this._endValue - tempPosition) - friction * velocity;
        tempPosition = position + aVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
        tempVelocity = velocity + aAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
        bVelocity = tempVelocity;
        bAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;
        tempPosition = position + bVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
        tempVelocity = velocity + bAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
        cVelocity = tempVelocity;
        cAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;
        tempPosition = position + cVelocity * Spring.SOLVER_TIMESTEP_SEC;
        tempVelocity = velocity + cAcceleration * Spring.SOLVER_TIMESTEP_SEC;
        dVelocity = tempVelocity;
        dAcceleration = tension * (this._endValue - tempPosition) - friction * tempVelocity;
        dxdt = 1.0 / 6.0 * (aVelocity + 2.0 * (bVelocity + cVelocity) + dVelocity);
        dvdt = 1.0 / 6.0 * (aAcceleration + 2.0 * (bAcceleration + cAcceleration) + dAcceleration);
        position += dxdt * Spring.SOLVER_TIMESTEP_SEC;
        velocity += dvdt * Spring.SOLVER_TIMESTEP_SEC;
      }

      this._tempState.position = tempPosition;
      this._tempState.velocity = tempVelocity;
      this._currentState.position = position;
      this._currentState.velocity = velocity;

      if (this._timeAccumulator > 0) {
        this._interpolate(this._timeAccumulator / Spring.SOLVER_TIMESTEP_SEC);
      }

      if (this.isAtRest() || this._overshootClampingEnabled && this.isOvershooting()) {
        if (this._springConfig.tension > 0) {
          this._startValue = this._endValue;
          this._currentState.position = this._endValue;
        } else {
          this._endValue = this._currentState.position;
          this._startValue = this._endValue;
        }

        this.setVelocity(0);
        isAtRest = true;
      }

      var notifyActivate = false;

      if (this._wasAtRest) {
        this._wasAtRest = false;
        notifyActivate = true;
      }

      var notifyAtRest = false;

      if (isAtRest) {
        this._wasAtRest = true;
        notifyAtRest = true;
      }

      this.notifyPositionUpdated(notifyActivate, notifyAtRest);
    }
  }, {
    key: "notifyPositionUpdated",
    value: function notifyPositionUpdated(notifyActivate, notifyAtRest) {
      for (var i = 0, len = this.listeners.length; i < len; i++) {
        var listener = this.listeners[i];

        if (notifyActivate && listener.onSpringActivate) {
          listener.onSpringActivate(this);
        }

        if (listener.onSpringUpdate) {
          listener.onSpringUpdate(this);
        }

        if (notifyAtRest && listener.onSpringAtRest) {
          listener.onSpringAtRest(this);
        }
      }
    }
    /**
     * Check if the SpringSystem should advance. Springs are advanced
     * a final frame after they reach equilibrium to ensure that the
     * currentValue is exactly the requested endValue regardless of the
     * displacement threshold.
     * @public
     */

  }, {
    key: "systemShouldAdvance",
    value: function systemShouldAdvance() {
      return !this.isAtRest() || !this.wasAtRest();
    }
  }, {
    key: "wasAtRest",
    value: function wasAtRest() {
      return this._wasAtRest;
    }
    /**
     * Check if the Spring is atRest meaning that it's currentValue and
     * endValue are the same and that it has no velocity. The previously
     * described thresholds for speed and displacement define the bounds
     * of this equivalence check. If the Spring has 0 tension, then it will
     * be considered at rest whenever its absolute velocity drops below the
     * restSpeedThreshold.
     * @public
     */

  }, {
    key: "isAtRest",
    value: function isAtRest() {
      return Math.abs(this._currentState.velocity) < this._restSpeedThreshold && (this.getDisplacementDistanceForState(this._currentState) <= this._displacementFromRestThreshold || this._springConfig.tension === 0);
    }
  }, {
    key: "_interpolate",
    value: function _interpolate(alpha) {
      this._currentState.position = this._currentState.position * alpha + this._previousState.position * (1 - alpha);
      this._currentState.velocity = this._currentState.velocity * alpha + this._previousState.velocity * (1 - alpha);
    }
  }, {
    key: "addListener",
    value: function addListener(newListener) {
      this.listeners.push(newListener);
      return this;
    }
  }, {
    key: "removeListener",
    value: function removeListener(listenerToRemove) {
      removeFirst(this.listeners, listenerToRemove);
      return this;
    }
  }]);

  return Spring;
}();

Spring._ID = 0;
Spring.MAX_DELTA_TIME_SEC = 0.064;
Spring.SOLVER_TIMESTEP_SEC = 0.001;

/**
 * A set of Springs that all run on the same physics
 * timing loop. To get started with a Rebound animation, first
 * create a new SpringSystem and then add springs to it.
 * @public
 */

var SpringSystem =
/*#__PURE__*/
function () {
  function SpringSystem(looper) {
    _classCallCheck(this, SpringSystem);

    this.looper = looper || new AnimationLooper();
    this.looper.springSystem = this;
    this.listeners = [];
    this._activeSprings = [];
    this._idleSpringIndices = [];
    this._isIdle = true;
    this._lastTimeMillis = -1;
    this._springRegistry = {};
  }
  /**
   * Add a new spring to this SpringSystem. This Spring will now be solved for
   * during the physics iteration loop. By default the spring will use the
   * default Origami spring config with 40 tension and 7 friction, but you can
   * also provide your own values here.
   * @public
   */


  _createClass(SpringSystem, [{
    key: "createSpring",
    value: function createSpring(tension, friction) {
      return this.createSpringWithConfig({
        tension: tension,
        friction: friction
      });
    }
    /**
     * Add a spring with the provided SpringConfig.
     * @public
     */

  }, {
    key: "createSpringWithConfig",
    value: function createSpringWithConfig(springConfig) {
      var spring = new Spring(this);
      this.registerSpring(spring);
      spring.setSpringConfig(springConfig);
      return spring;
    }
    /**
     * Check if a SpringSystem is idle or active. If all of the Springs in the
     * SpringSystem are at rest, i.e. the physics forces have reached equilibrium,
     * then this method will return true.
     * @public
     */

  }, {
    key: "getIsIdle",
    value: function getIsIdle() {
      return this._isIdle;
    }
    /**
     * Manually add a spring to this system. This is called automatically
     * if a Spring is created with SpringSystem#createSpring.
     *
     * This method sets the spring up in the registry so that it can be solved
     * in the solver loop.
     * @public
     */

  }, {
    key: "registerSpring",
    value: function registerSpring(spring) {
      this._springRegistry[spring.getId()] = spring;
    }
    /**
     * Deregister a spring with this SpringSystem. The SpringSystem will
     * no longer consider this Spring during its integration loop once
     * this is called. This is normally done automatically for you when
     * you call Spring#destroy.
     * @public
     */

  }, {
    key: "deregisterSpring",
    value: function deregisterSpring(spring) {
      removeFirst(this._activeSprings, spring);
      delete this._springRegistry[spring.getId()];
    }
  }, {
    key: "advance",
    value: function advance(time, deltaTime) {
      var _this = this;

      while (this._idleSpringIndices.length > 0) {
        this._idleSpringIndices.pop();
      }

      this._activeSprings.filter(Boolean).forEach(function (spring) {
        if (spring.systemShouldAdvance()) {
          spring.advance(time / 1000.0, deltaTime / 1000.0);
        } else {
          _this._idleSpringIndices.push(_this._activeSprings.indexOf(spring));
        }
      });

      while (this._idleSpringIndices.length > 0) {
        var idx = this._idleSpringIndices.pop();

        idx >= 0 && this._activeSprings.splice(idx, 1);
      }
    }
    /**
     * This is the main solver loop called to move the simulation
     * forward through time. Before each pass in the solver loop
     * onBeforeIntegrate is called on an any listeners that have
     * registered themeselves with the SpringSystem. This gives you
     * an opportunity to apply any constraints or adjustments to
     * the springs that should be enforced before each iteration
     * loop. Next the advance method is called to move each Spring in
     * the systemShouldAdvance forward to the current time. After the
     * integration step runs in advance, onAfterIntegrate is called
     * on any listeners that have registered themselves with the
     * SpringSystem. This gives you an opportunity to run any post
     * integration constraints or adjustments on the Springs in the
     * SpringSystem.
     * @public
     */

  }, {
    key: "loop",
    value: function loop(currentTimeMillis) {
      var listener;

      if (this._lastTimeMillis === -1) {
        this._lastTimeMillis = currentTimeMillis - 1;
      }

      var ellapsedMillis = currentTimeMillis - this._lastTimeMillis;
      this._lastTimeMillis = currentTimeMillis;
      var i = 0;
      var len = this.listeners.length;

      for (i = 0; i < len; i++) {
        listener = this.listeners[i];
        listener.onBeforeIntegrate && listener.onBeforeIntegrate(this);
      }

      this.advance(currentTimeMillis, ellapsedMillis);

      if (this._activeSprings.length === 0) {
        this._isIdle = true;
        this._lastTimeMillis = -1;
      }

      for (i = 0; i < len; i++) {
        listener = this.listeners[i];
        listener.onAfterIntegrate && listener.onAfterIntegrate(this);
      }

      if (!this._isIdle) {
        this.looper.run();
      }
    }
    /**
     * Used to notify the SpringSystem that a Spring has become displaced.
     * The system responds by starting its solver loop up if it is currently idle.
     */

  }, {
    key: "activateSpring",
    value: function activateSpring(springId) {
      var spring = this._springRegistry[springId];

      if (this._activeSprings.indexOf(spring) === -1) {
        this._activeSprings.push(spring);
      }

      if (this.getIsIdle()) {
        this._isIdle = false;
        this.looper.run();
      }
    }
  }]);

  return SpringSystem;
}();

/**
 *  Copyright (c) 2013, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 *      
 */

// this should get created only 1x
var springSystem = new SpringSystem();
var createSuspendedSpring = function (_a) {
    var _b = _a.springConfig, stiffness = _b.stiffness, damping = _b.damping, overshootClamping = _b.overshootClamping, noOp = _a.noOp, onSpringActivate = _a.onSpringActivate, getOnUpdateFunc = _a.getOnUpdateFunc, onAnimationEnd = _a.onAnimationEnd;
    if (noOp) {
        return null;
    }
    var spring = springSystem.createSpring(stiffness, damping);
    spring.setOvershootClampingEnabled(!!overshootClamping);
    spring.addListener({
        onSpringActivate: onSpringActivate,
        onSpringUpdate: getOnUpdateFunc(spring.destroy.bind(spring)),
        onSpringAtRest: function () {
            // prevent SpringSystem from caching unused springs
            spring.destroy();
            onAnimationEnd();
        }
    });
    return spring;
};
var createSpring = function (flipped) {
    var spring = createSuspendedSpring(flipped);
    if (spring) {
        spring.setEndValue(1);
    }
    else {
        // even if it was a noop,
        // we still need to call onSpringActivate in case it calls
        // cascading flip initiation functions
        flipped.onSpringActivate();
    }
};
var staggeredSprings = function (flippedArray, staggerConfig) {
    if (staggerConfig === void 0) { staggerConfig = {}; }
    if (!flippedArray || !flippedArray.length) {
        return;
    }
    if (staggerConfig.reverse) {
        flippedArray.reverse();
    }
    var normalizedSpeed = staggerConfig.speed
        ? 1 + Math.max(Math.min(staggerConfig.speed, 0), 1)
        : 1.1;
    var nextThreshold = 1 / Math.max(Math.min(flippedArray.length, 100), 10);
    var springFuncs = flippedArray
        .filter(function (flipped) { return !flipped.noOp; })
        .map(function (flipped, i) {
        var cachedGetOnUpdate = flipped.getOnUpdateFunc;
        // modify the update function to adjust
        // the end value of the trailing Flipped component
        flipped.getOnUpdateFunc = function (stop) {
            var onUpdate = cachedGetOnUpdate(stop);
            return function (spring) {
                var currentValue = spring.getCurrentValue();
                if (currentValue > nextThreshold) {
                    if (springFuncs[i + 1]) {
                        springFuncs[i + 1].setEndValue(Math.min(currentValue * normalizedSpeed, 1));
                    }
                }
                // now call the actual update function
                onUpdate(spring);
            };
        };
        return flipped;
    })
        .map(function (flipped) { return createSuspendedSpring(flipped); });
    if (springFuncs[0]) {
        springFuncs[0].setEndValue(1);
    }
};

var initiateImmediateAnimations = function (immediate) {
    if (!immediate) {
        return;
    }
    immediate.forEach(function (flipped) {
        createSpring(flipped);
        initiateImmediateAnimations(flipped.immediateChildren);
    });
};
var createCallTree = function (_a) {
    var flipDataDict = _a.flipDataDict, topLevelChildren = _a.topLevelChildren, initiateStaggeredAnimations = _a.initiateStaggeredAnimations;
    // build a data struct to run the springs
    var tree = {
        root: {
            staggeredChildren: {},
            immediateChildren: []
        }
    };
    // helper function to build the nested structure
    var appendChild = function (parent, childId) {
        var flipData = flipDataDict[childId];
        // might have been filtered (e.g. because it was off screen)
        if (!flipData) {
            return;
        }
        if (flipData.stagger) {
            parent.staggeredChildren[flipData.stagger]
                ? parent.staggeredChildren[flipData.stagger].push(flipData)
                : (parent.staggeredChildren[flipData.stagger] = [flipData]);
        }
        else {
            parent.immediateChildren.push(flipData);
        }
        // only when the spring is first activated, activate the child animations as well
        // this enables nested stagger
        flipData.onSpringActivate = function () {
            initiateImmediateAnimations(flipData.immediateChildren);
            initiateStaggeredAnimations(flipData.staggeredChildren);
        };
        flipData.staggeredChildren = {};
        flipData.immediateChildren = [];
        flipData.childIds.forEach(function (childId) { return appendChild(flipData, childId); });
    };
    // create the nested structure
    topLevelChildren.forEach(function (c) {
        appendChild(tree.root, c);
    });
    return tree;
};
var initiateAnimations = (function (_a) {
    var staggerConfig = _a.staggerConfig, flipDataDict = _a.flipDataDict, topLevelChildren = _a.topLevelChildren;
    var initiateStaggeredAnimations = function (staggered) {
        if (!staggered || !Object.keys(staggered).length) {
            return;
        }
        Object.keys(staggered).forEach(function (staggerKey) {
            return staggeredSprings(staggered[staggerKey], staggerConfig[staggerKey]);
        });
    };
    var tree = createCallTree({
        flipDataDict: flipDataDict,
        topLevelChildren: topLevelChildren,
        initiateStaggeredAnimations: initiateStaggeredAnimations
    });
    initiateImmediateAnimations(tree.root.immediateChildren);
    initiateStaggeredAnimations(tree.root.staggeredChildren);
});

// 3d transforms were causing weird issues in chrome,
// especially when opacity was also being tweened,
// so convert to a 2d matrix
var convertMatrix3dArrayTo2dArray = function (matrix) {
    return [0, 1, 4, 5, 12, 13].map(function (index) { return matrix[index]; });
};
var convertMatrix2dArrayToString = function (matrix) {
    return "matrix(" + matrix.join(', ') + ")";
};
var invertTransformsForChildren = function (_a) {
    var invertedChildren = _a.invertedChildren, matrix = _a.matrix, body = _a.body;
    invertedChildren.forEach(function (_a) {
        var child = _a[0], childFlipConfig = _a[1];
        if (!body.contains(child)) {
            return;
        }
        var scaleX$$1 = matrix[0];
        var scaleY$$1 = matrix[3];
        var translateX$$1 = matrix[4];
        var translateY$$1 = matrix[5];
        var inverseVals = { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 };
        var transformString = '';
        if (childFlipConfig.translate) {
            inverseVals.translateX = -translateX$$1 / scaleX$$1;
            inverseVals.translateY = -translateY$$1 / scaleY$$1;
            transformString += "translate(" + inverseVals.translateX + "px, " + inverseVals.translateY + "px)";
        }
        if (childFlipConfig.scale) {
            inverseVals.scaleX = 1 / scaleX$$1;
            inverseVals.scaleY = 1 / scaleY$$1;
            transformString += " scale(" + inverseVals.scaleX + ", " + inverseVals.scaleY + ")";
        }
        child.style.transform = transformString;
    });
};
var createApplyStylesFunc = function (_a) {
    var element = _a.element, invertedChildren = _a.invertedChildren, body = _a.body, retainTransform = _a.retainTransform;
    return function (_a) {
        var matrix = _a.matrix, opacity = _a.opacity, forceMinVals = _a.forceMinVals;
        if (isNumber(opacity)) {
            element.style.opacity = opacity + '';
        }
        if (forceMinVals) {
            element.style.minHeight = '1px';
            element.style.minWidth = '1px';
        }
        if (!matrix) {
            return;
        }
        var identityTransform = 'matrix(1, 0, 0, 1, 0, 0)';
        var transformWithInvisibleSkew = 'matrix(1, 0.00001, -0.00001, 1, 0, 0)';
        var stringTransform = convertMatrix2dArrayToString(matrix);
        if (stringTransform === identityTransform) {
            if (retainTransform) {
                stringTransform = transformWithInvisibleSkew;
            }
            else {
                stringTransform = '';
            }
        }
        element.style.transform = stringTransform;
        if (invertedChildren) {
            invertTransformsForChildren({
                invertedChildren: invertedChildren,
                matrix: matrix,
                body: body
            });
        }
    };
};
var rectInViewport = function (_a) {
    var top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right;
    return (top < window.innerHeight &&
        bottom > 0 &&
        left < window.innerWidth &&
        right > 0);
};
var getInvertedChildren = function (element, id) {
    return toArray(element.querySelectorAll("[" + DATA_INVERSE_FLIP_ID + "=\"" + id + "\"]"));
};
var tweenProp = function (start, end, position) {
    return start + (end - start) * position;
};
var animateFlippedElements = (function (_a) {
    var flippedIds = _a.flippedIds, flipCallbacks = _a.flipCallbacks, inProgressAnimations = _a.inProgressAnimations, flippedElementPositionsBeforeUpdate = _a.flippedElementPositionsBeforeUpdate, flippedElementPositionsAfterUpdate = _a.flippedElementPositionsAfterUpdate, applyTransformOrigin = _a.applyTransformOrigin, spring = _a.spring, getElement = _a.getElement, debug = _a.debug, staggerConfig = _a.staggerConfig, decisionData = _a.decisionData, scopedSelector = _a.scopedSelector, retainTransform = _a.retainTransform;
    var body = document.querySelector('body');
    // the stuff below is used so we can return a promise that resolves when all FLIP animations have
    // completed
    var closureResolve;
    var flipCompletedPromise = new Promise(function (resolve) {
        closureResolve = resolve;
    });
    var withInitFuncs;
    var completedAnimationIds = [];
    if (debug) {
        // eslint-disable-next-line no-console
        console.error('[react-flip-toolkit]\nThe "debug" prop is set to true. All FLIP animations will return at the beginning of the transition.');
    }
    var duplicateFlipIds = getDuplicateValsAsStrings(flippedIds);
    if (duplicateFlipIds.length) {
        // eslint-disable-next-line no-console
        console.error("[react-flip-toolkit]\nThere are currently multiple elements with the same flipId on the page.\nThe animation will only work if each Flipped component has a unique flipId.\nDuplicate flipId" + (duplicateFlipIds.length > 1 ? 's' : '') + ": " + duplicateFlipIds.join('\n'));
    }
    var flipDataArray = flippedIds
        // take all the measurements we need
        // and return an object with animation functions + necessary data
        .map(function (id) {
        var prevRect = flippedElementPositionsBeforeUpdate[id].rect;
        var currentRect = flippedElementPositionsAfterUpdate[id].rect;
        var prevOpacity = flippedElementPositionsBeforeUpdate[id].opacity;
        var currentOpacity = flippedElementPositionsAfterUpdate[id].opacity;
        var needsForcedMinVals = currentRect.width < 1 || currentRect.height < 1;
        // don't animate elements outside of the user's viewport
        if (!rectInViewport(prevRect) && !rectInViewport(currentRect)) {
            return false;
        }
        // it's never going to be visible, so dont animate it
        if ((prevRect.width === 0 && currentRect.width === 0) ||
            (prevRect.height === 0 && currentRect.height === 0)) {
            return false;
        }
        var element = getElement(id);
        // this might happen if we are rapidly adding & removing elements(?)
        if (!element) {
            return false;
        }
        var flipConfig = JSON.parse(element.dataset.flipConfig);
        var springConfig = getSpringConfig({
            flipperSpring: spring,
            flippedSpring: flipConfig.spring
        });
        var stagger = flipConfig.stagger === true ? 'default' : flipConfig.stagger;
        var toReturn = {
            element: element,
            id: id,
            stagger: stagger,
            springConfig: springConfig,
            noOp: true
        };
        if (flipCallbacks[id] && flipCallbacks[id].shouldFlip) {
            var elementShouldFlip = flipCallbacks[id].shouldFlip(decisionData.prev, decisionData.current);
            // this element wont be animated, but its children might be
            if (!elementShouldFlip) {
                return toReturn;
            }
        }
        // don't animate elements that didn't visbly change
        // but possibly animate their children
        var transformDifference = Math.abs(prevRect.left - currentRect.left) +
            Math.abs(prevRect.top - currentRect.top);
        var sizeDifference = Math.abs(prevRect.width - currentRect.width) +
            Math.abs(prevRect.height - currentRect.height);
        var opacityDifference = Math.abs(currentOpacity - prevOpacity);
        if (transformDifference < 0.5 &&
            sizeDifference < 0.5 &&
            opacityDifference < 0.01) {
            // this element wont be animated, but its children might be
            return toReturn;
        }
        toReturn.noOp = false;
        var currentTransform = parse(flippedElementPositionsAfterUpdate[id].transform);
        var toVals = { matrix: currentTransform };
        var fromVals = { matrix: [] };
        var transformsArray = [currentTransform];
        // we're only going to animate the values that the child wants animated
        if (flipConfig.translate) {
            transformsArray.push(translateX(prevRect.left - currentRect.left));
            transformsArray.push(translateY(prevRect.top - currentRect.top));
        }
        // going any smaller than 1px breaks transitions in Chrome
        if (flipConfig.scale) {
            transformsArray.push(scaleX(Math.max(prevRect.width, 1) / Math.max(currentRect.width, 1)));
            transformsArray.push(scaleY(Math.max(prevRect.height, 1) / Math.max(currentRect.height, 1)));
        }
        if (flipConfig.opacity) {
            fromVals.opacity = prevOpacity;
            toVals.opacity = currentOpacity;
        }
        var invertedChildren = [];
        if (!flipCallbacks[id] ||
            !flipCallbacks[id].shouldInvert ||
            flipCallbacks[id].shouldInvert(decisionData.prev, decisionData.current)) {
            var invertedChildElements = getInvertedChildren(element, id);
            invertedChildren = invertedChildElements.map(function (c) { return [
                c,
                JSON.parse(c.dataset.flipConfig)
            ]; });
        }
        fromVals.matrix = convertMatrix3dArrayTo2dArray(transformsArray.reduce(multiply));
        toVals.matrix = convertMatrix3dArrayTo2dArray(toVals.matrix);
        var applyStyles = createApplyStylesFunc({
            element: element,
            invertedChildren: invertedChildren,
            body: body,
            retainTransform: retainTransform
        });
        var onComplete;
        if (flipCallbacks[id] && flipCallbacks[id].onComplete) {
            // must cache or else this could cause an error
            var cachedOnComplete_1 = flipCallbacks[id].onComplete;
            onComplete = function () {
                return cachedOnComplete_1(element, decisionData.prev, decisionData.current);
            };
        }
        // this should be called when animation ends naturally
        // but also when it is interrupted
        // when it is called, the animation has already been cancelled
        var onAnimationEnd = function () {
            delete inProgressAnimations[id];
            if (isFunction(onComplete)) {
                onComplete();
            }
            if (needsForcedMinVals && element) {
                element.style.minHeight = '';
                element.style.minWidth = '';
            }
            completedAnimationIds.push(id);
            if (completedAnimationIds.length >= withInitFuncs.length) {
                // we can theoretically call multiple times since a promise only resolves 1x
                // but that shouldnt happen
                closureResolve();
            }
        };
        var animateOpacity = isNumber(fromVals.opacity) &&
            isNumber(toVals.opacity) &&
            fromVals.opacity !== toVals.opacity;
        var onStartCalled = false;
        var getOnUpdateFunc = function (stop) {
            inProgressAnimations[id] = {
                stop: stop,
                onComplete: onComplete
            };
            var onUpdate = function (spring) {
                // trigger the user provided onStart function
                if (!onStartCalled) {
                    onStartCalled = true;
                    if (flipCallbacks[id] && flipCallbacks[id].onStart) {
                        flipCallbacks[id].onStart(element, decisionData.prev, decisionData.current);
                    }
                }
                var currentValue = spring.getCurrentValue();
                if (!body.contains(element)) {
                    stop();
                    return;
                }
                var vals = { matrix: [] };
                vals.matrix = fromVals.matrix.map(function (fromVal, index) {
                    return tweenProp(fromVal, toVals.matrix[index], currentValue);
                });
                if (animateOpacity) {
                    vals.opacity = tweenProp(fromVals.opacity, toVals.opacity, currentValue);
                }
                applyStyles(vals);
            };
            return onUpdate;
        };
        var initializeFlip = function () {
            // before animating, immediately apply FLIP styles to prevent flicker
            applyStyles({
                matrix: fromVals.matrix,
                opacity: animateOpacity ? fromVals.opacity : undefined,
                forceMinVals: needsForcedMinVals
            });
            if (flipCallbacks[id] && flipCallbacks[id].onStartImmediate) {
                flipCallbacks[id].onStartImmediate(element, decisionData.prev, decisionData.current);
            }
            // and batch any other style updates if necessary
            if (flipConfig.transformOrigin) {
                element.style.transformOrigin = flipConfig.transformOrigin;
            }
            else if (applyTransformOrigin) {
                element.style.transformOrigin = '0 0';
            }
            invertedChildren.forEach(function (_a) {
                var child = _a[0], childFlipConfig = _a[1];
                if (childFlipConfig.transformOrigin) {
                    child.style.transformOrigin = childFlipConfig.transformOrigin;
                }
                else if (applyTransformOrigin) {
                    child.style.transformOrigin = '0 0';
                }
            });
        };
        return assign({}, toReturn, {
            stagger: stagger,
            springConfig: springConfig,
            getOnUpdateFunc: getOnUpdateFunc,
            initializeFlip: initializeFlip,
            onAnimationEnd: onAnimationEnd
        });
    })
        // filter out data for all non-animated elements first
        .filter(function (x) { return x; });
    // we use this array to compare with completed animations
    // to decide when all animations are completed
    withInitFuncs = flipDataArray.filter(function (_a) {
        var initializeFlip = _a.initializeFlip;
        return Boolean(initializeFlip);
    });
    //  put items back in place
    withInitFuncs.forEach(function (_a) {
        var initializeFlip = _a.initializeFlip;
        return initializeFlip();
    });
    if (debug) {
        return function () { };
    }
    var flipDataDict = flipDataArray.reduce(function (acc, curr) {
        acc[curr.id] = curr;
        return acc;
    }, {});
    // this function modifies flipDataDict in-place
    // by removing references to non-direct children
    // to enable recursive stagger
    var topLevelChildren = filterFlipDescendants({
        flipDataDict: flipDataDict,
        flippedIds: flippedIds,
        scopedSelector: scopedSelector
    });
    return function () {
        // there are no active FLIP animations, so immediately resolve the
        // returned promise
        if (!withInitFuncs.length) {
            closureResolve();
        }
        initiateAnimations({ topLevelChildren: topLevelChildren, flipDataDict: flipDataDict, staggerConfig: staggerConfig });
        return flipCompletedPromise;
    };
});

var addTupleToObject = function (acc, curr) {
    var _a;
    return assign(acc, (_a = {}, _a[curr[0]] = curr[1], _a));
};
var getAllElements = function (element, portalKey) {
    if (portalKey) {
        return toArray(document.querySelectorAll("[" + DATA_PORTAL_KEY + "=\"" + portalKey + "\"]"));
    }
    else {
        return toArray(element.querySelectorAll("[" + DATA_FLIP_ID + "]"));
    }
};

var getFlippedElementPositionsAfterUpdate = function (_a) {
    var element = _a.element, portalKey = _a.portalKey;
    return (getAllElements(element, portalKey)
        .map(function (child) {
        var computedStyle = window.getComputedStyle(child);
        var rect = child.getBoundingClientRect();
        return [
            child.dataset.flipId,
            {
                rect: rect,
                opacity: parseFloat(computedStyle.opacity),
                transform: computedStyle.transform
            }
        ];
    })
        // @ts-ignore
        .reduce(addTupleToObject, {}));
};

var createScopedSelector = function (element, portalKey) {
    if (portalKey) {
        return function (selector) {
            return toArray(document.querySelectorAll("[" + DATA_PORTAL_KEY + "=" + portalKey + "]" + selector));
        };
    }
    else if (element) {
        return function (selector) { return toArray(element.querySelectorAll(selector)); };
    }
    else {
        return function () { return []; };
    }
};
var createGetElementFunc = function (element, portalKey) {
    // this should only ever return 1 element
    if (!element && !portalKey) {
        throw new Error('either portalKey or element must be provided');
    }
    return function (id) {
        return createScopedSelector(element, portalKey)("[" + DATA_FLIP_ID + "=\"" + id + "\"]")[0];
    };
};
var onFlipKeyUpdate = function (_a) {
    var _b = _a.cachedOrderedFlipIds, cachedOrderedFlipIds = _b === void 0 ? [] : _b, _c = _a.inProgressAnimations, inProgressAnimations = _c === void 0 ? {} : _c, _d = _a.flippedElementPositionsBeforeUpdate, flippedElementPositionsBeforeUpdate = _d === void 0 ? {} : _d, _e = _a.flipCallbacks, flipCallbacks = _e === void 0 ? {} : _e, containerEl = _a.containerEl, applyTransformOrigin = _a.applyTransformOrigin, spring = _a.spring, debug = _a.debug, portalKey = _a.portalKey, _f = _a.staggerConfig, staggerConfig = _f === void 0 ? {} : _f, _g = _a.decisionData, decisionData = _g === void 0 ? {} : _g, handleEnterUpdateDelete = _a.handleEnterUpdateDelete, retainTransform = _a.retainTransform;
    var flippedElementPositionsAfterUpdate = getFlippedElementPositionsAfterUpdate({
        element: containerEl,
        portalKey: portalKey
    });
    var scopedSelector = createScopedSelector(containerEl, portalKey);
    var getElement = createGetElementFunc(containerEl, portalKey);
    var isFlipped = function (id) {
        return flippedElementPositionsBeforeUpdate[id] &&
            flippedElementPositionsAfterUpdate[id];
    };
    var unflippedIds = Object.keys(flippedElementPositionsBeforeUpdate)
        .concat(Object.keys(flippedElementPositionsAfterUpdate))
        .filter(function (id) { return !isFlipped(id); });
    var baseArgs = {
        flipCallbacks: flipCallbacks,
        getElement: getElement,
        flippedElementPositionsBeforeUpdate: flippedElementPositionsBeforeUpdate,
        flippedElementPositionsAfterUpdate: flippedElementPositionsAfterUpdate,
        inProgressAnimations: inProgressAnimations
    };
    // @ts-ignore
    var animateUnFlippedElementsArgs = assign({}, baseArgs, {
        unflippedIds: unflippedIds
    });
    var _h = animateUnflippedElements(animateUnFlippedElementsArgs), hideEnteringElements = _h.hideEnteringElements, animateEnteringElements = _h.animateEnteringElements, animateExitingElements = _h.animateExitingElements;
    var flippedIds = cachedOrderedFlipIds.filter(isFlipped);
    // @ts-ignore
    var animateFlippedElementsArgs = assign({}, baseArgs, {
        flippedIds: flippedIds,
        applyTransformOrigin: applyTransformOrigin,
        spring: spring,
        debug: debug,
        staggerConfig: staggerConfig,
        decisionData: decisionData,
        scopedSelector: scopedSelector,
        retainTransform: retainTransform
    });
    // the function handles putting flipped elements back in their original positions
    // and returns another function to actually call the flip animation
    var flip = animateFlippedElements(animateFlippedElementsArgs);
    if (handleEnterUpdateDelete) {
        handleEnterUpdateDelete({
            hideEnteringElements: hideEnteringElements,
            animateEnteringElements: animateEnteringElements,
            animateExitingElements: animateExitingElements,
            animateFlippedElements: flip
        });
    }
    else {
        hideEnteringElements();
        animateExitingElements().then(animateEnteringElements);
        flip();
    }
};

var cancelInProgressAnimations = function (inProgressAnimations) {
    Object.keys(inProgressAnimations).forEach(function (id) {
        if (inProgressAnimations[id].stop) {
            inProgressAnimations[id].stop();
        }
        delete inProgressAnimations[id];
    });
};
var getFlippedElementPositionsBeforeUpdate = function (_a) {
    var element = _a.element, _b = _a.flipCallbacks, flipCallbacks = _b === void 0 ? {} : _b, _c = _a.inProgressAnimations, inProgressAnimations = _c === void 0 ? {} : _c, portalKey = _a.portalKey;
    var flippedElements = getAllElements(element, portalKey);
    var inverseFlippedElements = toArray(element.querySelectorAll("[" + DATA_INVERSE_FLIP_ID + "]"));
    var childIdsToParentBCRs = {};
    var parentBCRs = [];
    var childIdsToParents = {};
    // this is for exit animations so we can re-insert exiting elements in the
    // DOM later
    flippedElements
        .filter(function (el) {
        return flipCallbacks &&
            flipCallbacks[el.dataset.flipId] &&
            flipCallbacks[el.dataset.flipId].onExit;
    })
        .forEach(function (el) {
        var parent = el.parentNode;
        // this won't work for IE11
        if (el.closest) {
            var exitContainer = el.closest("[" + DATA_EXIT_CONTAINER + "]");
            if (exitContainer) {
                parent = exitContainer;
            }
        }
        var bcrIndex = parentBCRs.findIndex(function (n) { return n[0] === parent; });
        if (bcrIndex === -1) {
            parentBCRs.push([parent, parent.getBoundingClientRect()]);
            bcrIndex = parentBCRs.length - 1;
        }
        childIdsToParentBCRs[el.dataset.flipId] = parentBCRs[bcrIndex][1];
        childIdsToParents[el.dataset.flipId] = parent;
    });
    var flippedElementPositions = flippedElements
        .map(function (child) {
        var domDataForExitAnimations = {};
        var childBCR = child.getBoundingClientRect();
        // only cache extra data for exit animations
        // if the element has an onExit listener
        if (flipCallbacks &&
            flipCallbacks[child.dataset.flipId] &&
            flipCallbacks[child.dataset.flipId].onExit) {
            var parentBCR = childIdsToParentBCRs[child.dataset.flipId];
            assign(domDataForExitAnimations, {
                element: child,
                parent: childIdsToParents[child.dataset.flipId],
                childPosition: {
                    top: childBCR.top - parentBCR.top,
                    left: childBCR.left - parentBCR.left,
                    width: childBCR.width,
                    height: childBCR.height
                }
            });
        }
        return [
            child.dataset.flipId,
            {
                rect: childBCR,
                opacity: parseFloat(window.getComputedStyle(child).opacity || '1'),
                domDataForExitAnimations: domDataForExitAnimations
            }
        ];
    })
        // @ts-ignore
        .reduce(addTupleToObject, {});
    // do this at the very end since we want to cache positions of elements
    // while they are mid-transition
    cancelInProgressAnimations(inProgressAnimations);
    flippedElements.concat(inverseFlippedElements).forEach(function (el) {
        el.style.transform = '';
        el.style.opacity = '';
    });
    return {
        flippedElementPositions: flippedElementPositions,
        cachedOrderedFlipIds: flippedElements.map(function (el) { return el.dataset.flipId; })
    };
};

var Flipper = /** @class */ (function () {
    function Flipper(options) {
        this.applyTransformOrigin = true;
        this.retainTransform = false;
        assign(this, options);
        this.inProgressAnimations = {};
        this.flipCallbacks = {};
        this.recordBeforeUpdate = this.recordBeforeUpdate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.addFlipped = this.addFlipped.bind(this);
        this.addInverted = this.addInverted.bind(this);
    }
    Flipper.prototype.recordBeforeUpdate = function () {
        this.snapshot = getFlippedElementPositionsBeforeUpdate({
            element: this.element,
            flipCallbacks: this.flipCallbacks,
            inProgressAnimations: this.inProgressAnimations
        });
    };
    Flipper.prototype.onUpdate = function () {
        if (this.snapshot) {
            onFlipKeyUpdate({
                flippedElementPositionsBeforeUpdate: this.snapshot
                    .flippedElementPositions,
                cachedOrderedFlipIds: this.snapshot.cachedOrderedFlipIds,
                containerEl: this.element,
                inProgressAnimations: this.inProgressAnimations,
                flipCallbacks: this.flipCallbacks,
                applyTransformOrigin: this.applyTransformOrigin,
                spring: this.spring,
                debug: this.debug,
                staggerConfig: this.staggerConfig,
                handleEnterUpdateDelete: this.handleEnterUpdateDelete,
                retainTransform: this.retainTransform
            });
            delete this.snapshot;
        }
    };
    Flipper.prototype.addFlipped = function (_a) {
        var element = _a.element, flipId = _a.flipId, opacity = _a.opacity, translate = _a.translate, scale = _a.scale, transformOrigin = _a.transformOrigin, spring = _a.spring, stagger = _a.stagger, onAppear = _a.onAppear, onStart = _a.onStart, onComplete = _a.onComplete, onExit = _a.onExit, shouldFlip = _a.shouldFlip, shouldInvert = _a.shouldInvert;
        if (!element) {
            throw new Error('no element provided');
        }
        if (!flipId) {
            throw new Error('No flipId provided');
        }
        var flipConfig = {
            scale: scale,
            translate: translate,
            opacity: opacity,
            transformOrigin: transformOrigin,
            spring: spring,
            stagger: stagger
        };
        if (!flipConfig.scale && !flipConfig.translate && !flipConfig.opacity) {
            assign(flipConfig, {
                translate: true,
                scale: true,
                opacity: true
            });
        }
        if (flipId) {
            element.dataset.flipId = flipId;
        }
        element.dataset.flipConfig = JSON.stringify(flipConfig);
        // finally, add callbacks
        this.flipCallbacks[flipId] = {
            shouldFlip: shouldFlip,
            shouldInvert: shouldInvert,
            onAppear: onAppear,
            onStart: onStart,
            onComplete: onComplete,
            onExit: onExit
        };
    };
    Flipper.prototype.addInverted = function (_a) {
        var element = _a.element, parent = _a.parent, opacity = _a.opacity, translate = _a.translate, scale = _a.scale, transformOrigin = _a.transformOrigin;
        if (!element) {
            throw new Error('no element provided');
        }
        if (!parent) {
            throw new Error('parent must be provided');
        }
        var inverseFlipId = parent.dataset.flipId;
        var flipConfig = {
            scale: scale,
            translate: translate,
            opacity: opacity,
            transformOrigin: transformOrigin
        };
        if (!flipConfig.scale && !flipConfig.translate && !flipConfig.opacity) {
            assign(flipConfig, {
                translate: true,
                scale: true,
                opacity: true
            });
        }
        element.dataset.inverseFlipId = inverseFlipId;
        element.dataset.flipConfig = JSON.stringify(flipConfig);
    };
    return Flipper;
}());

//
var script$1 = {
  name: "flipper",
  provide() {
    return {
      addFlippedElement: this.addFlippedElement,
      addInvertedElement: this.addInvertedElement
    };
  },
  props: {
    className: String,
    spring: {
      type: String,
      default: "noWobble"
    },
    flipKey: String,
    staggerConfig: Object
  },
  data() {
    return {
      flipInstance: null,
      ready: false
    };
  },
  methods: {
    addFlippedElement({
      element,
      flipId,
      stagger,
      shouldFlip,
      shouldInvert,
      onStart,
      onComplete
    }) {
      this.flipInstance.addFlipped({
        element,
        flipId,
        ...(stagger ? { stagger } : undefined),
        ...(shouldFlip ? { shouldFlip } : undefined),
        ...(shouldInvert ? { shouldInvert } : undefined),
        ...(onStart ? { onStart } : undefined),
        ...(onComplete ? { onComplete } : undefined)
      });
    },
    addInvertedElement({ element, parent }) {
      this.$nextTick(() => {
        this.flipInstance.addInverted({
          element,
          parent
        });
      });
    }
  },
  mounted() {
    this.flipInstance = new Flipper({
      element: this.$el,
      spring: this.spring,
      ...(this.staggerConfig ? { staggerConfig: this.staggerConfig } : null)
    });
    this.ready = true;
  },
  beforeUpdate() {
    this.flipInstance.recordBeforeUpdate();
  },
  watch: {
    flipKey(nv, ov) {
      if (nv !== ov) {
        this.$nextTick(() => {
          this.flipInstance.onUpdate();
        });
      }
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.className },
    [_vm.ready ? _vm._t("default") : _vm._e()],
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Flipper$1 = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var index = { Flipped, Flipper: Flipper$1 };

export default index;
export { Flipped, Flipper$1 as Flipper };
