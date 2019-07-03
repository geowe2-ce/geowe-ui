import { UIElement } from "../base/UIElement";
const defaultHtmlTemplate = require('./SelectableList.html');
import {SelectableItem} from './SelectableItem';
import { ListListener } from "./listener/ListListener";

/**
 * Representa una lista de elementos para la interfaz de usuario.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import {SelectableList} from './src/api/list/SelectableList';
 * import './src/style/ui-lib.scss'
 * 
 * const list:SelectableList = new SelectableList("listId", true);
 * list.add("1", 'elemento 1', false, "fas fa-globe-americas", true);
 * list.add("2", "elemento 2", false, "", true);
 * list.add("3", "elemento 3", false, "", true);
 * 
 * list.show();
 * 
 * -----------------------------
 * 
 * // json array de elementos
 * import data = require('./test/data-table.json');
 * 
 * //manufacturer: atributo que se desea visualizar en el elemento
 * list.addJSONArray(data, "manufacturer");
 * list.show();
 * 
 * -----------------------------
 * 
 * // La visualización del elemento a partir de objetos será a través del método toString()
 * const carTest = new CarTest();
 * list.addObjectArray(carTest.getArray());
 * list.show();
 * 
 * .........
 * 
 * 
 * ```
 * 
 *  ```
 * 
 * import { Car } from "./Car";
 * export class CarTest {
 *
 *  constructor() {}
 *   
 *  getArray() {
 *      const cars:Array<Car> = new Array<Car>();
 *      cars.push(new Car("Porsche", "911", 135000));
 *      cars.push(new Car("Nissan", "GT-R", 80000));
 *      cars.push(new Car("BMW", "M3", 60500));
 *      cars.push(new Car("Audi", "S5", 53000));
 *      cars.push(new Car("Audi", "TT", 40000));        
 *
 *      return cars;
 *  }
 * }
*
*  ```
 */

export class SelectableList extends UIElement {
    protected items: Array<SelectableItem>;
    protected multipleSelection: boolean;
    protected listeners: Array<ListListener>;

    constructor(id: string, multipleSelection: boolean = false, htmlTemplate: string = defaultHtmlTemplate) {
        super(id, "gw-list", htmlTemplate);

        this.items = new Array<SelectableItem>();
        this.multipleSelection = multipleSelection;
        this.listeners = new Array<ListListener>();
    }

    show() {
        super.show();        
    }

    add(id: string, value: string, selected: boolean = false, iconFont:string="", checked:boolean=false) {
        const item = new SelectableItem(id, value, selected, iconFont, checked);
        this.addItem(item);        
    }

    addJSONArray(elements:Array<JSON>, attributeName:string) {
        elements.forEach((element:JSON)=>{
            this.add(element[attributeName], element[attributeName]);
        });
    }

    addObjectArray(elements:Array<Object>) {
        elements.forEach((element:Object)=>{
            this.add(element.toString(), element.toString());
        });
    }

    addListener(listener:ListListener) {
        this.listeners.push(listener);

        this.items.forEach((item) => {
            item.addListener(listener);
        });
    }

    addItem(item:SelectableItem) {
        this.items.push(item);
        this.getDOMObject().appendChild(item.getDOMObject());

        this.listeners.forEach((listener) => {
            item.addListener(listener);
        });
            
        item.getDOMObject().addEventListener("click", (e) => {            
            if (this.multipleSelection) {
                if (item.isSelected()) 
                    item.setSelected(false);                
                else 
                    item.setSelected(true);                
            }
            else {
                var state:boolean = item.isSelected();               
                this.clearAllSelected();
                item.setSelected(!state);               
            }

            this.listeners.forEach((listener) => {
                listener.onSelectionChanged(item, this.getSelectedItems());
            });
        });        
    }

    getSelectedItems() {
        var selected:Array<SelectableItem> = new Array<SelectableItem>();

        this.items.forEach((element) => {
           if(element.isSelected()) 
            selected.push(element);
        })

        return selected;
    }

    isSelectionEmpty() {
        return this.getSelectedItems().length == 0;
    }

    private clearAllSelected() {
        this.items.forEach((element) => {
            element.setSelected(false);           
        })
    }
}