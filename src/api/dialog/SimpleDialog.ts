import { UIElement } from '../base/UIElement';
import defaultHtmlTemplate = require('./SimpleDialog.html');

/**
 * Representa un diálogo como contenedor de elementos para la interfaz de usuario.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { SimpleDialog } from './src/api/dialog/SimpleDialog';
 * import './src/style/ui-lib.scss'
 * 
 * var layerManagerOptions: JSON = {
 *      title: "Layer Manager",
 *      iconFont: 'fas fa-info-circle',
 *      className: "gw-layer-manager",
 *      showCloseButton: false,
 *      content: `
 *          <label><b>Mi Layer Manager</b></label>
 *          <br>
 *          ....
 *      `
 * };

 * const layerManager: SimpleDialog = new SimpleDialog(layerManagerOptions);
 * layerManager.showHeader(false);
 * layerManager.showFooter(false);
 *
 * if (layerManager.isVisible())
 *   layerManager.hide();
 * else
 *   layerManager.show(); 
 * ```
 */

export class SimpleDialog extends UIElement {
    protected parent: HTMLElement;
    protected buttons: Array<HTMLButtonElement>;
    protected title: HTMLElement;
    protected closeButton: HTMLElement;
    protected content: HTMLElement;
    protected footer: HTMLElement;
    protected elements: Array<UIElement>;
    protected bound: HTMLElement;
    protected header: HTMLElement;

    constructor(options: JSON) {
        options["id"] = options["id"] != undefined ? options["id"] : "simpleDialog";
        options["className"] = options["className"] != undefined ? options["className"] : "gw-dialog";        
        options["htmlTemplate"] = options["htmlTemplate"] != undefined ? options["htmlTemplate"] : defaultHtmlTemplate;
        options["title"] = options["title"] != undefined ? options["title"] : "";

        super(options["id"], options["className"], options["htmlTemplate"]);
        
        this.title = this.findDomElement("dialogTitle");
        this.closeButton = this.findDomElement("dialogCloseButton");
        this.content = this.findDomElement("dialogBody");
        this.footer = this.findDomElement("dialogFooter");
        this.bound = this.findDomElement("dialogBound");
        this.header = this.findDomElement("dialogHeader");
        this.elements = new Array<UIElement>();

        this.setTitle(options["title"], options["iconFont"]);

        if(options["showCloseButton"] != undefined && options["showCloseButton"] == false) {
            this.hideCloseButton();
        }

        this.registerCloseAction(options["closeCallback"]);
        
        if (options["content"] != undefined)
            this.setHTMLContent(options["content"]);

        this.buttons = new Array<HTMLButtonElement>();
        if (options["buttons"] != undefined && options["buttons"].length > 0) {
            options["buttons"].forEach((button) => {
                this.addButton(button);
            });
        }
    }

    show(clearBounds:boolean = true) {
        super.show(); 
        if(clearBounds)      
            this.bound.className = "";
    }

    showHeader(show:boolean = true) {
        this.header.style.display = show ? 'block' : 'none';
    }

    showFooter(show:boolean = true) {
        this.footer.style.display = show ? 'block' : 'none';
    }

    setTitle(title: string, iconFont?: string) {        
        this.title.innerHTML = "<i class='" + iconFont + "'></i> " + title;
    }

    setHTMLContent(content: any) {        
        if (content instanceof HTMLElement)
            this.content.innerHTML = content.outerHTML;
        else
            this.content.innerHTML = content;
    }

    addContent(content:HTMLElement) {
        this.content.appendChild(content);
    }

    addUIElement(element:UIElement) {
        this.elements.push(element);
        this.addContent(element.getDOMObject());
    }

    addButton(buttonDef: JSON) {        
        var button = document.createElement('button');
        button.className = buttonDef["className"] != undefined ? buttonDef["className"] : 'gw-btn';
        button.innerHTML = buttonDef["name"];
        button.addEventListener("click", buttonDef["actionMethod"]);

        this.buttons[buttonDef["name"]] = button;
        this.footer.appendChild(button);

        return button;
    }

    getButton(buttonName: string): HTMLButtonElement {
        return this.buttons[buttonName];
    }

    showButton(buttonName: string) {
        this.buttons[buttonName].style.display = 'block';
    }
    
    hideButton(buttonName: string) {
        this.buttons[buttonName].style.display = 'none';
    }

    showCloseButton() {        
        this.closeButton.style.display = 'block';
    }
    
    hideCloseButton() {        
        this.closeButton.style.display = 'none';        
    }

    addToFooter(content: any) {
        if (content instanceof HTMLElement)
            this.footer.innerHTML += content.outerHTML;
        else
            this.footer.innerHTML += content;
    }

    private registerCloseAction(actionMethod: { (): void }) {                
        this.closeButton.addEventListener('click', actionMethod != undefined ? actionMethod : () => {this.hide();});
    }
}