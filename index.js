/*
* Main class
*/
class Fit {
    /**
     * @param  {string} attribute="fit-fontsize" Attribute that will be used to select the element that sould be fitted
     */
    constructor(attribute = "fit-fontsize") {
        this.observers = [];
        const elements = document.querySelectorAll(`[${attribute}]`);
                
        for(let element of elements){
            const elementAttr = element.getAttribute(attribute)
                .trim()
                .replace(';', ',')
                .replace(/'/g, '"')
                .replace(/([a-z][^:,]*)(?=\s*:)/g, '"$1"')
                .replace(/:[\s]*([a-zA-Z]*)[\s]?[,]?/g, ':"$1",')
                .slice(0, -1);
                try {
                    this.apply(element, JSON.parse(`{${elementAttr}}`));
                } catch(error) {
                    console.warn('Invalid config: ', elementAttr);
                    return;
                }
        }
    }
    
    /**
     * Resize
     * @example
     * fit.apply(document.getElementById('elem'), { type: 'width' });
     * 
     * @param  {object} element - The DOM element that needs the font to be resized so that it will fit it's container
     * @param  {object} options - Resizing options
     * @param  {('both'|'width'|'height')} [options.type='both'] - Type of the resize.
     * @param  {boolean} [options.ifParentBigger=true] - Resize text bigger until it fits perfectly
     * @param  {boolean} [options.ifParentSmaller=true] - Resize text smaller until it fits perfectly
     */
    apply(element, options = { type: 'both', ifParentBigger: true, ifParentSmaller: true }) {
        if(!element){ console.warn('Unknown selected element!'); return; }
        options.type = (options.type === undefined ? 'both' : options.type);
        options.ifParentBigger = (options.ifParentBigger === undefined ? true : options.ifParentBigger);
        options.ifParentSmaller = (options.ifParentSmaller === undefined ? true : options.ifParentSmaller);
        if(element.offsetWidth === 0 || element.offsetHeight === 0) return;
        const { parentElement } = element;
        if(options.type !== 'both') {
            this._resize(element, parentElement, options);
        } else {
            this._resizeBoth(element, parentElement, options);
        }
    }
    /**  
     * Calls apply each time the element changes
     * @example
     * fit.watch(document.getElementById('elem'), { type: 'height' }); // 0
     * 
     * @see {@link #apply}
     * @param  {object} element - Same as the apply method
     * @param  {object} options - Same as the apply method
     * @returns {number} Id of the watcher
     */
    watch(element, options) {
        this.apply(element, options);            
        const index = this.observers.push(new MutationObserver(() => {
            this.apply(element, options);
        })) - 1;
        this.observers[index].observe(element.parentElement,  { attributes: true, characterData: true, subtree: false, });
        this.observers[index].observe(element,  { characterData: true, subtree: true, });
        return index;
    }
    
    /**
     * Stops a watcher
     * @example
     * fit.stop(0);
     * 
     * @param  {number} index - Id of the watcher
     */
    stop(index) {
        console.log(this.observers, index);        
        if(index && this.observers.length && this.observers[index]){
            console.log(index);
            this.observers[index].disconnect();
            delete this.observers[index];    
        }
    }

    _resize(element, parent, { type, ifParentBigger, ifParentSmaller }) {
        let elementFontSize = this._elementFontSize(element);
        const parentSize = (type === 'height' ? element.parentElement.clientHeight : element.parentElement.clientWidth);
        let elementSize = (type === 'height' ? element.offsetHeight : element.offsetWidth);
        if(ifParentSmaller) {
            while (parentSize < elementSize) {
                elementFontSize--;
                element.style.fontSize = elementFontSize + 'px';
                elementSize = (type === 'height' ? element.offsetHeight : element.offsetWidth);
            }
        }
        if(ifParentBigger) {
            while(parentSize > elementSize) {
                elementFontSize++;
                element.style.fontSize = elementFontSize + 'px';
                elementSize = (type === 'height' ? element.offsetHeight : element.offsetWidth);
            }
            if(parentSize < elementSize) element.style.fontSize = elementFontSize - 1 + 'px';
        }
    }
    _resizeBoth(element, parent, { ifParentBigger, ifParentSmaller }) {
        let elementFontSize = parseInt(this._elementFontSize(element));
        const parentHeight = element.parentElement.clientHeight;
        const parentWidth = element.parentElement.clientWidth;
        let elementHeight = element.offsetHeight;
        let elementWidth = element.offsetWidth;
        if(ifParentBigger) {
            while(parentHeight > elementHeight && parentWidth > elementWidth) {
                elementFontSize++;
                element.style.fontSize = elementFontSize + 'px';
                elementHeight = element.offsetHeight;
                elementWidth = element.offsetWidth;
            }
        }
        if(ifParentSmaller) {
            while(parentHeight < elementHeight || parentWidth < elementWidth) {
                elementFontSize--;
                element.style.fontSize = elementFontSize + 'px';
                elementHeight = element.offsetHeight;
                elementWidth = element.offsetWidth;
            }
        }
    }
    _elementFontSize(element) {
        const fs = window.getComputedStyle(element, null).getPropertyValue('font-size');
        return parseInt(fs.substring(0, fs.length - 2));
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = new Fit();
  else
    window.fit = new Fit();