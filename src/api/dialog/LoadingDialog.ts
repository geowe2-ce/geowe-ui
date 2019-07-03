import jquery = require("jquery");
const $: JQueryStatic = jquery;

import { UIElement } from '../base/UIElement';
import defaultHtmlTemplate = require('./LoadingDialog.html');

/**
 * Representa un diálogo modal de carga para monitorizar las tareas/operaciones a llevar cabo.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { LoadingDialog } from './src/api/dialog/LoadingDialog';
 * import './src/style/ui-lib.scss'
 * 
 * const loadingDialog: LoadingDialog = new LoadingDialog({ message: "cargando....." });
 * 
 * ```
 * 
 */
export class LoadingDialog extends UIElement {
    protected parent: HTMLElement;   
    protected message: HTMLElement;
   
    constructor(options: JSON) {
        options["id"] = options["id"] != undefined ? options["id"] : "loadingDialog";
        options["className"] = options["className"] != undefined ? options["className"] : "gw-modal";
        options["htmlTemplate"] = options["htmlTemplate"] != undefined ? options["htmlTemplate"] : defaultHtmlTemplate;
       
        super(options["id"], options["className"], options["htmlTemplate"]);

        this.message = this.findDomElement("loadingMessage");
                
        if (options["message"] != undefined)
            this.setHTMLContent(options["message"]);
    }

    show() {
        if (this.parent == undefined) {
            this.parent = document.body;
            this.parent.appendChild(this.getDOMObject());
        }

        $('#' + this.getId()).modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });

    }

    hide() {
        $('#' + this.getId()).modal('hide');
    }

    bind(parentId: string) {
        this.parent = document.getElementById(parentId);
        this.parent.appendChild(this.getDOMObject());
    }

    setHTMLContent(content:any) {        
        if (content instanceof HTMLElement)
            this.message.innerHTML = content.outerHTML;
        else
            this.message.innerHTML = content;
    }

    setMessage(message:string) {
        this.message.innerHTML = message;
    }
}