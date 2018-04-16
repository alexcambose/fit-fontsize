# fit-fontsize
Small library for fitting text perfectly into it's container.

[**Demo**]()

## Install
Install using [npm](https://www.npmjs.com/package/inttorowords)
```
npm install -S fit-fontsize
```
Install using [bower](https://bower.io/)
```
bower install fit-fontsize
```

## Usage
### Html only
```html
<div style="height: 200px; width: 200px; border: 1px solid black;">
    <span fit-fontsize>Lorem ipsum dolor sit amet</span>
</div>
```
Css like properties can be added to the attribute
```html
<div style="height: 200px; width: 200px; border: 1px solid black;">
    <span fit-fontsize="type: height; ifParentBigger: false">Lorem ipsum dolor sit amet</span>
</div>
```
### Javascript
```javascript
<div style="height: 200px; width: 200px; border: 1px solid black;">
    <span id="element">Lorem ipsum dolor sit amet</span>
</div>
<script>
    fit.apply(document.getElementById('element'));
</script>
```
Fit only with the width of the parent and also watch for changes.
```javascript
<div style="height: 200px; width: 200px; border: 1px solid black;">
    <span id="element">Lorem ipsum dolor sit amet</span>
</div>
<script>
    fit.watch(document.getElementById('element'), { type: 'width' });
</script>
```
Each time *#element* changes it will recalculate it's font-size in order to fit.
## API
<a name="Fit"></a>

## Fit
**Kind**: global class

* [Fit](#Fit)
    * [new Fit(attribute)](#new_Fit_new)
    * [.apply(element, options)](#Fit+apply)
    * [.watch(element, options)](#Fit+watch) ⇒ <code>number</code>
    * [.stop(index)](#Fit+stop)

<a name="new_Fit_new"></a>

### new Fit(attribute)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attribute | <code>string</code> | <code>'fit-fontsize'</code> | Attribute that will be used to select the element that sould be fitted |

<a name="Fit+apply"></a>

### fit.apply(element, options)
Resize

**Kind**: instance method of [<code>Fit</code>](#Fit)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>object</code> |  | The DOM element that needs the font to be resized so that it will fit it's container |
| options | <code>object</code> |  | Resizing options |
| [options.type] | <code>&#x27;both&#x27;</code> \| <code>&#x27;width&#x27;</code> \| <code>&#x27;height&#x27;</code> | <code>&#x27;both&#x27;</code> | Type of the resize. |
| [options.ifParentBigger] | <code>boolean</code> | <code>true</code> | Resize text bigger until it fits perfectly |
| [options.ifParentSmaller] | <code>boolean</code> | <code>true</code> | Resize text smaller until it fits perfectly |

**Example**
```js
fit.apply(document.getElementById('elem'), { type: 'width' });
```
<a name="Fit+watch"></a>

### fit.watch(element, options) ⇒ <code>number</code>
Calls apply each time the element changes

**Kind**: instance method of [<code>Fit</code>](#Fit)
**Returns**: <code>number</code> - Id of the watcher
**See**: [#apply](#apply)

| Param | Type | Description |
| --- | --- | --- |
| element | <code>object</code> | Same as the apply method |
| options | <code>object</code> | Same as the apply method |

**Example**
```js
fit.watch(document.getElementById('elem'), { type: 'height' }); // 0
```
<a name="Fit+stop"></a>

### fit.stop(index)
Stops a watcher

**Kind**: instance method of [<code>Fit</code>](#Fit)

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Id of the watcher |

**Example**
```js
fit.stop(0);
```