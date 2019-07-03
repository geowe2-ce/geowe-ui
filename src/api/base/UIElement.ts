/**
 * Representa un elemento de la interfaz de usuario. 
 * @author jmmluna, atamunoz
 */

export class UIElement {    
    /** Identificador del elemento en el DOM */
    protected id:string;
    protected element:any; 
    protected parent:HTMLElement; 
    protected defaultStyle:string;
    private subElement:HTMLElement;

    constructor(id:string, className:string, htmlTemplate?: string) {
        this.id = id;
        this.defaultStyle = className;
        var template = document.createElement('div');        

        if(htmlTemplate != undefined) {                        
            template.innerHTML = htmlTemplate.trim();
            this.element = template.firstChild;
            this.removeChildren(template);
        } else {
            this.element = template;
        }
        this.element.setAttribute("id", this.id);
        this.setDefaultStyle();
    }

    setDefaultStyle() {
        if(this.defaultStyle != undefined && this.defaultStyle.trim().length > 0)
            this.setClassName(this.defaultStyle);  
    }

    getId() {
        return this.id;
    }

    getDOMObject() {
        return this.element;
    }

    bind(parentId: string) {
        this.parent = document.getElementById(parentId);
        this.parent.appendChild(this.getDOMObject());
    }

    show() {
        if (this.parent == undefined) {
            if(this.getDOMObject().parentNode != undefined) {                
                this.parent = this.getDOMObject().parentNode;                
            } else {
                this.parent = document.body;
                this.parent.appendChild(this.getDOMObject());
            }
        }        

        this.getDOMObject().style.display = 'block';
    }

    hide() {
        this.getDOMObject().style.display = 'none';
    }

    isVisible() {
        return this.getDOMObject().style.display == 'block';
    }

    setClassName(className:string) {       
        this.element.className = className;
        this.defaultStyle = className;
    }

    addClassName(className:string) {
        this.element.className += " " + className;
    }

    findDomElement(id:string, rootElement?:HTMLElement) {
        var nodes = rootElement != undefined ? rootElement.childNodes : this.element.childNodes;
        
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].id == id) {
               this.subElement = nodes[i];
            } else {
                if (nodes[i].hasChildNodes()) {
                    this.subElement = this.findDomElement(id, nodes[i]);
                }
            }
        }
    
        return this.subElement;
    }

    removeChildren(rootElement?:HTMLElement) {
        var domElement = rootElement != undefined ? rootElement : this.element;
    
        while (domElement.firstChild) {
            domElement.removeChild(domElement.firstChild);
        }
    }
}