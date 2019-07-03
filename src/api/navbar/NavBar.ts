import { UIElement } from '../base/UIElement';
import { SimpleButton } from '../button/SimpleButton';
const defaultHtmlTemplate = require('./NavBar.html');
import { ToggleButton } from '../button/ToggleButton';

/**
 * Representa una barra de navegación responsive.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import {NavBar} from './src/api/navbar/NavBar';
 * import './src/style/ui-lib.scss'
 * 
 * const navBar = new NavBar("navBarId");
 * navBar.addButton(layerManagerToggleButton);
 * navBar.addButton(zoomExtentButton);
 * navBar.setBrand({name: "GeoWE", icon: 'fas fa-layer-group', link: "https://www.geowe.org"});
 * navBar.setResponsiveControlIcon("fas fa-table")
 *
 * navBar.show();
 * 
 * ```
 * 
 */

export class NavBar extends UIElement {
    protected responsiveControl:HTMLElement;
    protected brand:HTMLElement;
    protected items:HTMLElement;

    constructor(id: string) {
        super(id, "", defaultHtmlTemplate);

        this.responsiveControl = this.findDomElement("navBarControl");
        this.brand = this.findDomElement("navBarBrand");
        this.items = this.findDomElement("navBarItems");
    }

    setResponsiveControlIcon(iconFont:string) {
        this.responsiveControl.className = iconFont;
    }

    setBrand(options:JSON) {        
        this.brand.innerHTML = options["icon"] != undefined ? `<i class="${options["icon"]}"></i>` : "";
        this.brand.innerHTML += options["name"] != undefined ? " " + options["name"] : "";
        
        this.brand["href"] = options["link"] != undefined ? options["link"] : "#";
    }

    addButton(button: SimpleButton) {
        var li = document.createElement("li");
        li.className = "gw-nav-item";
        button.setClassName("gw-nav-btn");
        if (button instanceof ToggleButton)
            button.setActiveClassName("gw-nav-btn-active");

        li.appendChild(button.getDOMObject());
        this.items.appendChild(li);
    }

    addUIElement(element: UIElement) {
        var li = document.createElement("li");
        li.className = "gw-nav-item";
        
        li.appendChild(element.getDOMObject());
        this.items.appendChild(li);
    }
}