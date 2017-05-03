# Jacquery -- Cross Platform Javascript Library

Jacquery is a cross platform javascript library that is open source. It is meant to be used as an easier way to navigate through a document, select DOM elements, create animations, handle events, and develop Ajax applications. Developers can also create plugins on top of the JavaScript library, as it also simplifies the client-side scripting of HTML.

Jacquery is very modular and dynamic, allowing users to create powerful web pages and applications.

## Getting Started

The quickest way to get started with Jacquery is to download this library into your project and include the webpack output `jacquery.js` in your source code.

```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/reset.css">
  <script type="text/javascript" src="../jacquery.js"></script>
  ...
</head>
```
## API

[`$l`](#l)  

[DOM Traversal](#dom-traversal)  
  * [`each`](#each)  
  * [`children`](#children)  
  * [`parent`](#parent)  

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)  
  * [`toggleClass`](#toggleclass)  
  * [`css`](#css)

[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`$l.ajax`](#lajax)  



### $l

The Jacquery library utilizes the global variable of `$l` as a wrapper for all of the methods in the Jacquery library.  

`$l` is most commonly used to select elements with CSS selectors.  `$l("div")` returns a `DOMNodeCollection` object which is an object custom to the Jacquery library that is an array of `HTMLElement`s.  

`$l` can also be used to create `DOMNodeCollection` objects from unwrapped `HTMLElement`s giving these elements access to Jacquery methods.  

The third use of `$l` takes in a string of HTML code, builds `HTMLElement`(s) from the code, and then wraps the `HTMLElement`(s) in a `DOMNodeCollection` object.

The final use of `$l` is as tool to queue functions to run once the COM is fully loaded.



### DOM Traversal

`DOMNodeCollection` methods to navigate DOM elements

#### `each`

Iterates through the elements in a `DOMNodeCollection` and applies a callback function passed as an argument

```javascript
const elements = $l("div");
elements.each(callbackFunction);
```

#### `children`

Returns a `DOMNodeCollection` object containing all of the children elements of every `HTMLElement` in the original `DOMNodeCollection`.  Note that this only includes the direct children.

#### `parent`

Returns a `DOMNodeCollection` object containing the parent elements of every `HTMLElement` in the original `DOMNodeCollection`.  

### DOM Manipulation

`DOMNodeCollection` methods to view and/or change DOM elements

#### `html`

Returns the `innerHTML` for the first element in the `DOMNodeCollection` if no argument is given.  If a string argument is given, changes the `innerHTML` of each `DOMNodeCollection` element to the string argument.

#### `empty`

Empties the innerHTML of each `DOMNodeCollection` element

#### `append`

Takes a single `HTMLElement`, `DOMNodeCollection`, or `string` argument and appends it to each `DOMNodeCollection` element.

#### `remove`

Remove each `DOMNodeCollection` element from the DOM.

#### `attr`

Takes either one (`attr(attribute)`) or two (`attr(attribute, value)`) arguments.  If given one argument, the method gets the value of the attribute given for the the first element in the `DOMNodeCollection`.  The method sets the attribute, given as the first argument, as the value, given as the second argument, for each `DOMNodeCollection` element.

#### `addClass`

Adds a class, given as an argument, to each `DOMNodeCollection` element.

#### `removeClass`

Removes a class, given as an argument, from each `DOMNodeCollection` element.

#### `toggleClass`

Toggles a class, given as an argument, for each `DOMNodeCollection` element.

#### `css`

Change the style, given a key-pair value, for each `DOMNodeCollection` element.

### Event Listeners

```javascript
function handler () {
  console.log("Someone clicked!"
}
domnodecollection.on("click", handler);
domnodecollection.off("click");
```

#### `on`

Adds event listener to each `DOMNodeCollection` element.  List of events are available [here](https://developer.mozilla.org/en-US/docs/Web/Events).

#### `off`

Removes event listener from each `DOMNodeCollection` element.




## Example

For an example of a project using the Jacquery library, view the NinjaCat Demo [code](https://github.com/nyujacky/jacquery).  To run the demo, clone the DOMDOMDOM library and view the html file locally.
