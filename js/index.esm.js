var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var fails$7 = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$6 = fails$7;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$6(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$5 = fails$7;

var functionBindNative = !fails$5(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$1 = Function.prototype;
var bind = FunctionPrototype$1.bind;
var call$4 = FunctionPrototype$1.call;
var uncurryThis$6 = NATIVE_BIND$1 && bind.bind(call$4, call$4);

var functionUncurryThis = NATIVE_BIND$1 ? function (fn) {
  return fn && uncurryThis$6(fn);
} : function (fn) {
  return fn && function () {
    return call$4.apply(fn, arguments);
  };
};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$l =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var global$k = global$l;

var TypeError$7 = global$k.TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$1 = function (it) {
  if (it == undefined) throw TypeError$7("Can't call method on " + it);
  return it;
};

var global$j = global$l;
var requireObjectCoercible = requireObjectCoercible$1;

var Object$3 = global$j.Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$1 = function (argument) {
  return Object$3(requireObjectCoercible(argument));
};

var uncurryThis$5 = functionUncurryThis;
var toObject = toObject$1;

var hasOwnProperty = uncurryThis$5({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

var DESCRIPTORS$5 = descriptors;
var hasOwn$4 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

var EXISTS$1 = hasOwn$4(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS$5 || (DESCRIPTORS$5 && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS$1,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE$1
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$a = function (argument) {
  return typeof argument == 'function';
};

var objectDefineProperty = {};

var isCallable$9 = isCallable$a;

var isObject$5 = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$9(it);
};

var global$i = global$l;
var isObject$4 = isObject$5;

var document$1 = global$i.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$4(document$1) && isObject$4(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var DESCRIPTORS$4 = descriptors;
var fails$4 = fails$7;
var createElement = documentCreateElement;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$4 && !fails$4(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$3 = descriptors;
var fails$3 = fails$7;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$3 && fails$3(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var global$h = global$l;
var isObject$3 = isObject$5;

var String$3 = global$h.String;
var TypeError$6 = global$h.TypeError;

// `Assert: Type(argument) is Object`
var anObject$3 = function (argument) {
  if (isObject$3(argument)) return argument;
  throw TypeError$6(String$3(argument) + ' is not an object');
};

var NATIVE_BIND = functionBindNative;

var call$3 = Function.prototype.call;

var functionCall = NATIVE_BIND ? call$3.bind(call$3) : function () {
  return call$3.apply(call$3, arguments);
};

var global$g = global$l;
var isCallable$8 = isCallable$a;

var aFunction = function (argument) {
  return isCallable$8(argument) ? argument : undefined;
};

var getBuiltIn$2 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$g[namespace]) : global$g[namespace] && global$g[namespace][method];
};

var uncurryThis$4 = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$4({}.isPrototypeOf);

var getBuiltIn$1 = getBuiltIn$2;

var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

var global$f = global$l;
var userAgent = engineUserAgent;

var process = global$f.process;
var Deno = global$f.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es-x/no-symbol -- required for testing */

var V8_VERSION = engineV8Version;
var fails$2 = fails$7;

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$2(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/* eslint-disable es-x/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var global$e = global$l;
var getBuiltIn = getBuiltIn$2;
var isCallable$7 = isCallable$a;
var isPrototypeOf$1 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var Object$2 = global$e.Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable$7($Symbol) && isPrototypeOf$1($Symbol.prototype, Object$2(it));
};

var global$d = global$l;

var String$2 = global$d.String;

var tryToString$1 = function (argument) {
  try {
    return String$2(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$c = global$l;
var isCallable$6 = isCallable$a;
var tryToString = tryToString$1;

var TypeError$5 = global$c.TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$1 = function (argument) {
  if (isCallable$6(argument)) return argument;
  throw TypeError$5(tryToString(argument) + ' is not a function');
};

var aCallable = aCallable$1;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$1 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

var global$b = global$l;
var call$2 = functionCall;
var isCallable$5 = isCallable$a;
var isObject$2 = isObject$5;

var TypeError$4 = global$b.TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$5(fn = input.toString) && !isObject$2(val = call$2(fn, input))) return val;
  if (isCallable$5(fn = input.valueOf) && !isObject$2(val = call$2(fn, input))) return val;
  if (pref !== 'string' && isCallable$5(fn = input.toString) && !isObject$2(val = call$2(fn, input))) return val;
  throw TypeError$4("Can't convert object to primitive value");
};

var shared$3 = { exports: {} };

var global$a = global$l;

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$1 = Object.defineProperty;

var setGlobal$2 = function (key, value) {
  try {
    defineProperty$1(global$a, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$a[key] = value;
  } return value;
};

var global$9 = global$l;
var setGlobal$1 = setGlobal$2;

var SHARED = '__core-js_shared__';
var store$3 = global$9[SHARED] || setGlobal$1(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.22.5',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.22.5/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var uncurryThis$3 = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$2 = uncurryThis$3(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$2(++id + postfix, 36);
};

var global$8 = global$l;
var shared$2 = shared$3.exports;
var hasOwn$3 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$2('wks');
var Symbol$1 = global$8.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$3 = function (name) {
  if (!hasOwn$3(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$3(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var global$7 = global$l;
var call$1 = functionCall;
var isObject$1 = isObject$5;
var isSymbol$1 = isSymbol$2;
var getMethod = getMethod$1;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$2 = wellKnownSymbol$3;

var TypeError$3 = global$7.TypeError;
var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$1(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$1(exoticToPrim, input, pref);
    if (!isObject$1(result) || isSymbol$1(result)) return result;
    throw TypeError$3("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$1 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$6 = global$l;
var DESCRIPTORS$2 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var anObject$2 = anObject$3;
var toPropertyKey = toPropertyKey$1;

var TypeError$2 = global$6.TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$2 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject$2(O);
  P = toPropertyKey(P);
  anObject$2(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$2(O);
  P = toPropertyKey(P);
  anObject$2(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError$2('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var createPropertyDescriptor$1 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var DESCRIPTORS$1 = descriptors;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$1;

var createNonEnumerableProperty$2 = DESCRIPTORS$1 ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$2 = { exports: {} };

var uncurryThis$2 = functionUncurryThis;
var isCallable$4 = isCallable$a;
var store$1 = sharedStore;

var functionToString = uncurryThis$2(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$4(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$2 = store$1.inspectSource;

var global$5 = global$l;
var isCallable$3 = isCallable$a;
var inspectSource$1 = inspectSource$2;

var WeakMap$1 = global$5.WeakMap;

var nativeWeakMap = isCallable$3(WeakMap$1) && /native code/.test(inspectSource$1(WeakMap$1));

var shared$1 = shared$3.exports;
var uid = uid$2;

var keys = shared$1('keys');

var sharedKey$1 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$1 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$4 = global$l;
var uncurryThis$1 = functionUncurryThis;
var isObject = isObject$5;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$2;
var hasOwn$2 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey = sharedKey$1;
var hiddenKeys = hiddenKeys$1;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = global$4.TypeError;
var WeakMap = global$4.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis$1(store.get);
  var wmhas = uncurryThis$1(store.has);
  var wmset = uncurryThis$1(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$2(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$1(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$2(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$2(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var fails$1 = fails$7;
var isCallable$2 = isCallable$a;
var hasOwn$1 = hasOwnProperty_1;
var DESCRIPTORS = descriptors;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var inspectSource = inspectSource$2;
var InternalStateModule = internalState;

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails$1(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    defineProperty(value, 'name', { value: name, configurable: true });
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$1(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  if (options && hasOwn$1(options, 'constructor') && options.constructor) {
    if (DESCRIPTORS) try {
      defineProperty(value, 'prototype', { writable: false });
    } catch (error) { /* empty */ }
  } else value.prototype = undefined;
  var state = enforceInternalState(value);
  if (!hasOwn$1(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$2(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

var global$3 = global$l;
var isCallable$1 = isCallable$a;
var createNonEnumerableProperty = createNonEnumerableProperty$2;
var makeBuiltIn = makeBuiltIn$2.exports;
var setGlobal = setGlobal$2;

var defineBuiltIn$1 = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  if (isCallable$1(value)) makeBuiltIn(value, name, options);
  if (O === global$3) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return O;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
  return O;
};

var wellKnownSymbol$1 = wellKnownSymbol$3;

var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var uncurryThis = functionUncurryThis;

var toString$1 = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice(toString$1(it), 8, -1);
};

var global$2 = global$l;
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable = isCallable$a;
var classofRaw = classofRaw$1;
var wellKnownSymbol = wellKnownSymbol$3;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object$1 = global$2.Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
        // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

var global$1 = global$l;
var classof = classof$1;

var String$1 = global$1.String;

var toString = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String$1(argument);
};

var anObject$1 = anObject$3;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject$1(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var call = functionCall;
var hasOwn = hasOwnProperty_1;
var isPrototypeOf = objectIsPrototypeOf;
var regExpFlags = regexpFlags;

var RegExpPrototype$1 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$1) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype$1, R)
    ? call(regExpFlags, R) : flags;
};

var PROPER_FUNCTION_NAME = functionName.PROPER;
var defineBuiltIn = defineBuiltIn$1;
var anObject = anObject$3;
var $toString = toString;
var fails = fails$7;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return n$ToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

/**
 * Copyright (c) 2021 Peyton Gasink
 * Distributed under MIT License.
 *
 * This file contains all the necessary scripting to programmatically
 * generate Bootstrap toasts. It first inserts a container at the bottom
 * of the DOM, then fills a toast template and inserts it into the container.
 *
 * Configuration options are also provided for toast placement, light & dark themes,
 * and the maximum number of toasts allowed on the page at a given time.
 */

/** Container that generated toasts will be inserted into. */
const TOAST_CONTAINER = document.createElement("div");
TOAST_CONTAINER.id = "toastContainer";
TOAST_CONTAINER.className = "toast-container position-fixed top-0 end-0";
TOAST_CONTAINER.setAttribute("aria-live", "polite");
document.body.appendChild(TOAST_CONTAINER);
/** HTML markup for the toast template. */

const TOAST_TEMPLATE = document.createElement("div");
TOAST_TEMPLATE.className = "toast";
TOAST_TEMPLATE.setAttribute("role", "status");
TOAST_TEMPLATE.setAttribute("aria-live", "polite");
TOAST_TEMPLATE.setAttribute("aria-atomic", "true");
TOAST_TEMPLATE.setAttribute("data-bs-autohide", "false");
TOAST_TEMPLATE.innerHTML = `
        <div class="toast-header">
            <span class="status-icon bi me-2" aria-hidden="true"></span>
            <strong class="me-auto toast-title"></strong>
            <small class="timer" aria-hidden="true"></small>
            <button type="button" class="btn-close ms-2" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body"></div>`;
/** Defines the valid status options for toasts. */

var TOAST_STATUS;

(function (TOAST_STATUS) {
  TOAST_STATUS[TOAST_STATUS["SUCCESS"] = 1] = "SUCCESS";
  TOAST_STATUS[TOAST_STATUS["DANGER"] = 2] = "DANGER";
  TOAST_STATUS[TOAST_STATUS["WARNING"] = 3] = "WARNING";
  TOAST_STATUS[TOAST_STATUS["INFO"] = 4] = "INFO";
})(TOAST_STATUS || (TOAST_STATUS = {}));
/** Defines the valid placement options for the toast container. */


var TOAST_PLACEMENT;

(function (TOAST_PLACEMENT) {
  TOAST_PLACEMENT[TOAST_PLACEMENT["TOP_LEFT"] = 1] = "TOP_LEFT";
  TOAST_PLACEMENT[TOAST_PLACEMENT["TOP_CENTER"] = 2] = "TOP_CENTER";
  TOAST_PLACEMENT[TOAST_PLACEMENT["TOP_RIGHT"] = 3] = "TOP_RIGHT";
  TOAST_PLACEMENT[TOAST_PLACEMENT["MIDDLE_LEFT"] = 4] = "MIDDLE_LEFT";
  TOAST_PLACEMENT[TOAST_PLACEMENT["MIDDLE_CENTER"] = 5] = "MIDDLE_CENTER";
  TOAST_PLACEMENT[TOAST_PLACEMENT["MIDDLE_RIGHT"] = 6] = "MIDDLE_RIGHT";
  TOAST_PLACEMENT[TOAST_PLACEMENT["BOTTOM_LEFT"] = 7] = "BOTTOM_LEFT";
  TOAST_PLACEMENT[TOAST_PLACEMENT["BOTTOM_CENTER"] = 8] = "BOTTOM_CENTER";
  TOAST_PLACEMENT[TOAST_PLACEMENT["BOTTOM_RIGHT"] = 9] = "BOTTOM_RIGHT";
})(TOAST_PLACEMENT || (TOAST_PLACEMENT = {}));
/** Defines the valid options for toast themes. */


var TOAST_THEME;

(function (TOAST_THEME) {
  TOAST_THEME[TOAST_THEME["LIGHT"] = 1] = "LIGHT";
  TOAST_THEME[TOAST_THEME["DARK"] = 2] = "DARK";
})(TOAST_THEME || (TOAST_THEME = {}));
/** Defines the valid options for toast header timers. */


var TOAST_TIMERS;

(function (TOAST_TIMERS) {
  TOAST_TIMERS[TOAST_TIMERS["DISABLED"] = 0] = "DISABLED";
  TOAST_TIMERS[TOAST_TIMERS["ELAPSED"] = 1] = "ELAPSED";
  TOAST_TIMERS[TOAST_TIMERS["COUNTDOWN"] = 2] = "COUNTDOWN";
})(TOAST_TIMERS || (TOAST_TIMERS = {}));
/** Maximum amount of toasts to be allowed on the page at once. */


let maxToastCount = 4;
/** Number of toasts currently rendered on the page. */

let currentToastCount = 0;
/** Controls whether toasts will have elapsed or countdown timers. */

let timersEnabled = TOAST_TIMERS.ELAPSED;
/** Controls whether to queue toasts that exceed the maximum toast count. */

let queueEnabled = true;
let queue = [];
/**
 * Shorthand function for quickly setting multiple global toast configurations.
 * @param {IConfiguration} options Object containing all the desired toast options.
 */

function configure(options) {
  setMaxCount(options === null || options === void 0 ? void 0 : options.maxToasts);
  setPlacement(options === null || options === void 0 ? void 0 : options.placement);
  setTheme(options === null || options === void 0 ? void 0 : options.theme);
  enableTimers(options === null || options === void 0 ? void 0 : options.enableTimers);
  enableQueue(options === null || options === void 0 ? void 0 : options.enableQueue);
}
/**
 * Sets the maximum number of toasts allowed on the page at once.
 * @param {number} maxToasts Maximum number of toasts allowed on the page at once.
 */


function setMaxCount(maxToasts) {
  if (maxToasts !== null) {
    if (maxToasts > 0) {
      maxToastCount = maxToasts;
    } else {
      console.error("The maximum number of toasts must be greater than 0. Reverting to default.");
    }
  }
}
/**
 * Sets the toast container's placement.
 * @param {TOAST_PLACEMENT} placement Placement of the toast container.
 */


function setPlacement(placement) {
  TOAST_CONTAINER.className = "toast-container position-fixed";

  switch (placement) {
    case TOAST_PLACEMENT.TOP_LEFT:
      TOAST_CONTAINER.classList.add("top-0", "start-0");
      break;

    case TOAST_PLACEMENT.TOP_CENTER:
      TOAST_CONTAINER.classList.add("top-0", "start-50", "translate-middle-x");
      break;

    case TOAST_PLACEMENT.TOP_RIGHT:
      TOAST_CONTAINER.classList.add("top-0", "end-0");
      break;

    case TOAST_PLACEMENT.MIDDLE_LEFT:
      TOAST_CONTAINER.classList.add("top-50", "start-0", "translate-middle-y");
      break;

    case TOAST_PLACEMENT.MIDDLE_CENTER:
      TOAST_CONTAINER.classList.add("top-50", "start-50", "translate-middle");
      break;

    case TOAST_PLACEMENT.MIDDLE_RIGHT:
      TOAST_CONTAINER.classList.add("top-50", "end-0", "translate-middle-y");
      break;

    case TOAST_PLACEMENT.BOTTOM_LEFT:
      TOAST_CONTAINER.classList.add("bottom-0", "start-0");
      break;

    case TOAST_PLACEMENT.BOTTOM_CENTER:
      TOAST_CONTAINER.classList.add("bottom-0", "start-50", "translate-middle-x");
      break;

    case TOAST_PLACEMENT.BOTTOM_RIGHT:
      TOAST_CONTAINER.classList.add("bottom-0", "end-0");
      break;

    default:
      TOAST_CONTAINER.classList.add("top-0", "end-0");
      break;
  }
}
/**
 * Sets the toasts' theme to light or dark. If unset, they will follow OS light/dark preference.
 * @param {TOAST_THEME} theme The toast theme.
 */


function setTheme(theme = null) {
  const header = TOAST_TEMPLATE.querySelector(".toast-header");
  const close = header.querySelector(".btn-close");

  switch (theme) {
    case TOAST_THEME.LIGHT:
      TOAST_TEMPLATE.style.backgroundColor = "var(--body-bg-color-light)";
      TOAST_TEMPLATE.style.color = "var(--text-color-light)";
      header.style.backgroundColor = "var(--header-bg-color-light)";
      header.style.color = "var(--header-color-light)";
      close.style.filter = "unset";
      break;

    case TOAST_THEME.DARK:
      TOAST_TEMPLATE.style.backgroundColor = "var(--body-bg-color-dark)";
      TOAST_TEMPLATE.style.color = "var(--text-color-dark)";
      header.style.backgroundColor = "var(--header-bg-color-dark)";
      header.style.color = "var(--header-color-dark)";
      close.style.filter = "invert(1) grayscale(100%) brightness(200%)";
      break;

    default:
      TOAST_TEMPLATE.removeAttribute("style");
      header.removeAttribute("style");
      close.removeAttribute("style");
      break;
  }
}
/**
 * Sets whether timers in the toast header will display elapsed time or a countdown.
 * Timers display elapsed time by default.
 * @param type The timer type.
 */


function enableTimers(type) {
  timersEnabled = type;
}
/**
 * Enables or disables toasts queueing after the maximum toast count is reached.
 * Queuing is enabled by default.
 * @param {boolean} enabled Controls whether queue is enabled.
 */


function enableQueue(enabled = true) {
  queueEnabled = enabled; // Empty the queue once it's disabled.

  if (!enabled) queue = [];
}
/**
 * Endpoint to generate Bootstrap toasts from a template and insert their HTML onto the page,
 * run timers for each's elapsed time since appearing, and remove them from the
 * DOM after they are hidden. Caps toast count at maxToastCount.
 * @param {IToastOptions} toastOptions Object containing all the desired toast options.
 */


function create(toastOptions) {
  const toastEl = TOAST_TEMPLATE.cloneNode(true);
  const toastTitle = toastEl.querySelector(".toast-title");
  toastTitle.innerText = toastOptions.title;
  const toastBody = toastEl.querySelector(".toast-body");
  toastBody.innerHTML = toastOptions.message;
  setStatus(toastEl, toastOptions.status); // Add toast to the queue if it would exceed maxToastCount

  if (currentToastCount >= maxToastCount) {
    if (!queueEnabled) return;
    const toastToQueue = {
      toast: toastEl,
      timeout: toastOptions.timeout
    };
    queue.push(toastToQueue);
    return;
  }

  const toastInfo = {
    toast: toastEl,
    timeout: toastOptions.timeout
  };
  render(toastInfo);
}
/**
 * Sets the status icon and modifies ARIA properties if the context necessitates it
 * @param {HTMLElement} toastEl The HTML of the toast being modified.
 * @param {TOAST_STATUS} status The integer value representing the toast's status.
 */


function setStatus(toastEl, status) {
  const statusIcon = toastEl.querySelector(".status-icon");

  switch (status) {
    case TOAST_STATUS.SUCCESS:
      statusIcon.classList.add("text-success", "bi-check-circle-fill");
      break;

    case TOAST_STATUS.DANGER:
      statusIcon.classList.add("text-danger", "bi-x-circle-fill");
      toastEl.setAttribute("role", "alert");
      toastEl.setAttribute("aria-live", "assertive");
      break;

    case TOAST_STATUS.WARNING:
      statusIcon.classList.add("text-warning", "bi-exclamation-circle-fill");
      toastEl.setAttribute("role", "alert");
      toastEl.setAttribute("aria-live", "assertive");
      break;

    case TOAST_STATUS.INFO:
      statusIcon.classList.add("text-info", "bi-info-circle-fill");
      break;

    default:
      statusIcon.classList.add("d-none");
      break;
  }
}
/**
 * Inserts toast HTML onto page and sets up for toast deletion.
 * @param {IToast} toastInfo The toast object to be rendered.
 */


function render(toastInfo) {
  // If the timeout is 0, the toast must be dismissed manually
  if (toastInfo.timeout > 0) {
    toastInfo.toast.setAttribute("data-bs-delay", toastInfo.timeout.toString());
    toastInfo.toast.setAttribute("data-bs-autohide", "true");
  }

  renderTimer(toastInfo);
  TOAST_CONTAINER.appendChild(toastInfo.toast); // Initialize Bootstrap 5's toast plugin

  const bsToast = new window["bootstrap"].Toast(toastInfo.toast);
  bsToast.show();
  currentToastCount++; // When the toast hides, remove it from the DOM

  toastInfo.toast.addEventListener('hidden.bs.toast', () => {
    TOAST_CONTAINER.removeChild(toastInfo.toast);
    currentToastCount--;

    if (queueEnabled && queue.length > 0 && currentToastCount < maxToastCount) {
      const queuedToast = queue.shift();
      render(queuedToast);
    }
  });
}
/**
 * Handles the rendering of the timer in the toast header.
 * @param toastInfo The toast object to be rendered.
 */


function renderTimer(toastInfo) {
  const timer = toastInfo.toast.querySelector(".timer");

  switch (timersEnabled) {
    case TOAST_TIMERS.ELAPSED:
      {
        timer.innerText = "just now"; // Start a timer that updates the text of the time indicator every minute
        // Initially set to 1 because for the first minute the indicator reads "just now"

        let minutes = 1;
        const elapsedTimer = setInterval(() => {
          timer.innerText = `${minutes}m ago`;
          minutes++;
        }, 60 * 1000); // When the toast hides, delete its timer instance

        toastInfo.toast.addEventListener('hidden.bs.toast', () => {
          clearInterval(elapsedTimer);
        });
        break;
      }

    case TOAST_TIMERS.COUNTDOWN:
      {
        if (toastInfo.timeout > 0) {
          // Start a timer that updates the text of the time indicator every minute
          // Initially set to 1 because for the first minute the indicator reads "just now"
          let seconds = toastInfo.timeout / 1000;
          timer.innerText = `${seconds}s`;
          const countdownTimer = setInterval(() => {
            timer.innerText = `${seconds - 1}s`;
            seconds--;
          }, 1000); // When the toast hides, delete its timer instance

          toastInfo.toast.addEventListener('hidden.bs.toast', () => {
            clearInterval(countdownTimer);
          });
        }

        break;
      }

    default:
      {
        const toastHeader = toastInfo.toast.querySelector(".toast-header");
        toastHeader.removeChild(timer);
        break;
      }
  }
}

export { TOAST_PLACEMENT, TOAST_STATUS, TOAST_THEME, TOAST_TIMERS, configure, create, enableQueue, enableTimers, setMaxCount, setPlacement, setStatus, setTheme };
