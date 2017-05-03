/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(nodes) {

    // Has to be array parameter, as NodeList has no forEach method.
    this.nodes = nodes;
  }

  each(cb) {
    // Passes in node then index
    this.nodes.forEach(cb);
  }

  on(eventName, callback) {
    this.each(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `Event-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }

      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.each(node => {
      const eventKey = `Event-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }

  html(html) {
    if (typeof html === "string") {
      this.each(node => node.innerHTML = html);
    } else {
      if (this.nodes.length > 0) {
        return this.nodes[0].innerHTML;
      }
    }
  }

  empty() {
    this.html('');
  }

  // Must clone so that child isn't duplicate of original, each child can only have
  // one parent
  append(children) {
    if (this.nodes.length === 0) return;

    if (typeof children === 'object' &&
        !(children instanceof DomNodeCollection)) {
      children = $l(children);
    }
    if (typeof children === "string") {
      this.each(node => node.innerHTML += children);
    } else if (children instanceof DomNodeCollection) {
      this.each(node => {
        children.each(childNode => {
          node.appendChild(childNode.cloneNode(true))
        });
      })
    }
  }

  css(hash){
    let keys = Object.keys(hash);
    this.each(node => {
      keys.forEach(key => {
        // debugger
          if(key === 'top' ||  key === 'left'){
            if (node.style[key] === ""){
              node.style[key] = 0;
            }
          }
          if (hash[key].includes('+=')){

            node.style[key] = (parseInt(node.style[key])+parseInt(hash[key].replace('+=', '')) + 'px');
          }
          if (hash[key].includes('-=')){
            node.style[key] = (parseInt(node.style[key])-parseInt(hash[key].replace('-=', '')) + 'px');
          }else{

            node.style[key] = hash[key];
          }
          if (parseInt(node.style[key]) <= 0){
            node.style[key] = 0;
          }
      });
    });
  }

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.each( node => node.setAttribute(key, val) );
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(toggleClass) {
    this.each(node => node.classList.toggle(toggleClass));
  }

  find(selector) {
    let foundNodes = [];
    this.each(node => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    });
    return new DomNodeCollection(foundNodes);
  }

  children() {
    let childNodes = [];
    this.each(node => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DomNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];
    //
    this.each(node =>
        {
      // node.parentNode.visited ? node.parentNodes.push(parentNode) : node.parentNode.visited = true;
      if (node.parentNode.visited){
        node.parentNodes.push(parentNode)
      }
      else{
        node.parentNode.visited = true;
      }
    }
    )

    parentNodes.forEach(node => node.visited = false)
    return new DomNodeCollection(parentNodes);
  }
}

module.exports = DomNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(0);

const docCallbacks = [];
let _docReady = false;

window.$l = arg => {
  switch(typeof(arg)){
    case "function":
      return docReadyCallback(arg);
    case "string":
      return getNodesFromDom(arg);
    case "object":
      if(arg instanceof HTMLElement){
        return new DomNodeCollection([arg]);
      }
  }
};

$l.extend = (base, ...totalObjs) => {
  totalObjs.forEach( obj => {
    for(let prop in obj){
      base[prop] = obj[prop];
    }
  });
  return base;
};

$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    //NB: Triggered when request.readyState === XMLHttpRequest.DONE ===  4
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

toQueryString = obj => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};
//Not ready, add more functions to be queued
docReadyCallback = func => {
  if(!_docReady){
    docCallbacks.push(func);
  } else {
    func();
  }
};
//String to nodes
getNodesFromDom = selector => {
  const nodes = document.querySelectorAll(selector);
  const nodes_array = Array.from(nodes);
  return new DomNodeCollection(nodes_array);
};

document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  docCallbacks.forEach( func => func() );
});


/***/ })
/******/ ]);
//# sourceMappingURL=jacquery.js.map