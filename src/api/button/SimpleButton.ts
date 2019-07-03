import { UIElement } from '../base/UIElement';

/**
 * Representa un botón simple.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { SimpleButton } from './src/api/button/SimpleButton';
 * import './src/style/ui-lib.scss'
 * 
 * const zoomExtentButton: SimpleButton = new SimpleButton("zoomExtentId", "", 'fas fa-globe-americas', execute);
 * zoomExtentButton.show();
 * ...
 * 
 * function execute() {
 *   ...
 * }
 * ```
 * 
 */

export class SimpleButton extends UIElement {
    private label: string;    
    private icon: HTMLElement;

    constructor(id: string, label: string, iconFont: string, actionMethod: { (): void }) {
        super(id, 'gw-btn', document.createElement('button').outerHTML);

        this.label = label;        
        //this.element = document.createElement('button');

        this.element.addEventListener("click", (e: Event) => actionMethod());
        this.setDefaultStyle();

        if (iconFont != undefined) {
            this.addIcon(iconFont);
        }

        if (this.label != undefined) {
            if (this.icon != undefined) {
                this.icon.className += " gw-btn-icon";
            }
            this.element.innerHTML += label;
        }
    }

    getLabel() {
        return this.element.textContent;
    }

    showLabel(show: boolean) {
        this.element.innerHTML = "";

        if (this.icon != undefined) {
            this.element.appendChild(this.icon);
        }

        if (show) {
            this.element.innerHTML += this.label;
        }
    }

    addIcon(iconClassName) {
        this.icon = document.createElement('i');
        this.icon.className = iconClassName;
        this.element.appendChild(this.icon);
    }
}