import { UIElement } from "../base/UIElement";
import { ListListener } from "./listener/ListListener";

/**
 * Representa un elemento de una lista (List).
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { SelectableItem } from './src/api/list/SelectableItem';
 * import './src/style/ui-lib.scss'
 * 
 * const elemento: SelectableItem = new SelectableItem("1", 'elemento 1', false, "fas fa-globe-americas", true);
 * ...
 * 
 * ```
 * 
 */

export class SelectableItem extends UIElement {
    protected id: string;
    protected value: string;
    protected selected: boolean;
    protected iconFont: string;
    protected checkbox: HTMLInputElement;
    protected listeners: Array<ListListener>;

    constructor(id: string, value?: string, selected: boolean = false, iconFont: string = "", checkbox: boolean = false) {
        super(id, "gw-list-item");
        this.id = id;

        this.setSelected(selected);
        this.setIconFont(iconFont);
        this.showCheckBox(checkbox);
        this.setValue(value);

        this.listeners = new Array<ListListener>();
    }

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
        // this.getDOMObject().innerHTML += " " + value;
        var label = document.createElement('span');
        label.innerHTML = " " + value;
        this.getDOMObject().appendChild(label);
    }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(state: boolean) {
        this.selected = state;
        this.setClassName(state ? " gw-list-item active" : "gw-list-item");
    }

    setIconFont(iconFont: string) {
        this.iconFont = iconFont;
        this.getDOMObject().innerHTML += `<i class="${this.iconFont}"></i> `;
    }

    addListener(listener:ListListener) {
        this.listeners.push(listener);
    }

    private showCheckBox(visible: boolean) {
        if (visible) {
            this.checkbox = document.createElement("input");
            this.checkbox.setAttribute("type", "checkbox");            
            this.checkbox.id = this.id + "-check";                        
                        
            this.getDOMObject().appendChild(this.checkbox);
            
            this.checkbox.addEventListener("click", (e:any) => {
                this.setChecked(e.target.checked);
            });                      
        }
    }

    getCheckBox() {
        return  this.checkbox;
    }

    setChecked(checked:boolean) {
        this.checkbox.checked = checked; 
        
        this.listeners.forEach((listener) => {
            listener.onCheckStateChanged(this);
        });
    }

    isChecked() {
        if (this.checkbox == undefined)
            return false;
        else
            return this.checkbox.checked;
    }
}