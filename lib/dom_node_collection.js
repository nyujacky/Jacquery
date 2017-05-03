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
