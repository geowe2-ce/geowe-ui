import { UIElement } from "../base/UIElement";
const defaultHtmlTemplate = require('./SideNav.html');

/**
 * Representa contenido lateral plegable.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import {SideNav} from './src/api/sidenav/SideNav';
 * import './src/style/ui-lib.scss'
 * 
 * const sideNav:SideNav = new SideNav("sideNavId");
 * 
 *  ...
 * dataTable.setData(data);
 * 
 * sideNav.setTitle(`<i class="fas fa-globe-americas"> GeoWE</i>`);
 * sideNav.addUIElement(dataTable);
 * 
 * ...
 * 
 * if (sideNav.isVisible())
 *  sideNav.hide();
 * else
 *  sideNav.show();
 * 
 * ```
 */

export class SideNav extends UIElement {
    protected title:HTMLElement;
    protected closeButton: HTMLElement;
    protected elements:Array<UIElement>;    
    protected width:string;

    constructor(id: string, width: string = "250px") {
        super(id, 'gw-sidenav', defaultHtmlTemplate);
        this.elements = new Array<UIElement>();
        this.width = width;

        this.hide();

        this.title = this.findDomElement("sideNavTitle");        
        this.closeButton = this.findDomElement("sideNavCloseButton");
        this.closeButton.addEventListener("click", (e) => this.hide());
    }

    show() {
        super.show();
        this.elements.forEach((element) => {element.show()});
        this.getDOMObject().style.width = this.width;
    }

    hide() {
        this.getDOMObject().style.width = "0px";
    }

    isVisible() {
        return this.getDOMObject().style.width != "0px";
    }

    setTitle(title:string) {
        this.title.innerHTML = title;
    }

    addContent(content:HTMLElement) {
        this.getDOMObject().appendChild(content);
    }

    addUIElement(element:UIElement) {
        this.elements.push(element);
        this.addContent(element.getDOMObject());
    }
}