
import { SimpleButton } from './SimpleButton';
import { ToggleButtonListener } from './listener/ToggleButtonListener';
/**
 * Representa un botón con estado.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { ToggleButton } from './src/api/button/ToggleButton';
 * import './src/style/ui-lib.scss'
 * 
 * const selectToggletButton: ToggleButton = new ToggleButton("selectId", "", 'fas fa-mouse-pointer', execute);
 * zoomExtentButton.show();
 * ...
 * 
 * function execute() {
 *   ...
 * }
 * ```
 * 
 */
export class ToggleButton extends SimpleButton {
    protected listeners: Array<ToggleButtonListener>;
    private defaultActiveClassName:string = "gw-btn-active";    

    constructor(id: string, label: string, iconFont: string, actionMethod: { (): void }) {
        super(id, label, iconFont, actionMethod);

        this.getDOMObject().addEventListener("click", (e: Event) => {
            this.changeState(true);
        });

        this.getDOMObject().setAttribute("data-toggle", "button");
        this.getDOMObject().setAttribute("aria-pressed", "false");

        this.listeners = new Array<ToggleButtonListener>();
    }

    changeState(notify: boolean) {
        if (this.isActive())
            this.setInactive(notify);
        else
            this.setActive(notify);
    }

    setActive(notify: boolean) {
        this.getDOMObject().setAttribute("aria-pressed", "true");        
        this.addClassName(this.defaultActiveClassName);

        if (notify)
            this.notifyState();
    }

    setActiveClassName(className: string) {
        this.defaultActiveClassName = className;
    }   

    setInactive(notify: boolean) {
        this.getDOMObject().setAttribute("aria-pressed", "false");
        this.setDefaultStyle();

        if (notify)
            this.notifyState();
    }

    isActive() {
        return this.getDOMObject().getAttribute("aria-pressed") == "true";
    }

    addListener(listener: ToggleButtonListener) {
        this.listeners.push(listener);
    }

    notifyState() {     
        this.listeners.forEach((listener) => { 
            try {                
                listener.onStateChanged(this);
            } catch (e) { }
        });  
    }
}