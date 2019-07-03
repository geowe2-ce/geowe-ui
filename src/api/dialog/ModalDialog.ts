import jquery = require("jquery");
const $: JQueryStatic = jquery;
import "bootstrap/js/dist/modal";
import { SimpleDialog } from './SimpleDialog';

/**
 * Representa un diálogo modal como contenedor de elementos para la interfaz de usuario.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { ModalDialog } from './src/api/dialog/ModalDialog';
 * import './src/style/ui-lib.scss'
 * 
 * var panelOptions: JSON = {
 * title: "Mi título",
 * iconFont: 'fas fa-info-circle',
 * content: `
 *      <label><b>Introduce tu nombre</b></label>
 *      <br>
 *      <input type="text" value=""/>    
 * `,
 * closeCallback: buttonAction.bind(this, "param1")
 * buttons:[{name: "btn1", actionMethod: buttonAction}, {name: "btn2", actionMethod: buttonAction, className: "btn btn-primary"}]
 * };
 *
 * const panel = new ModalDialog(panelOptions);
 * panel.addToFooter(`<input type="text" value=""/>`);
 * panel.addButton({ name: "btn1", actionMethod: buttonAction });
 * 
 * function buttonAction(message) {
 *  ...
 * }
 * 
 * ```
 */

export class ModalDialog extends SimpleDialog {
    
    constructor(options: JSON) {
        options["id"] = options["id"] != undefined ? options["id"] : "modalDialog";
        options["className"] = options["className"] != undefined ? options["className"] : "gw-modal";
        
        super(options);        
    }

    show() {
        super.show(false);

        $('#' + this.getId()).modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });

        this.elements.forEach((element) => {element.show()});
    }

    hide() {
        $('#' + this.getId()).modal('hide');
    }
}