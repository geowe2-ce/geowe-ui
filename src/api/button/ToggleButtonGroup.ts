import { ToggleButtonListener } from "./listener/ToggleButtonListener";
import { ToggleButton } from "./ToggleButton";

/**
 * Representa la agrupación de un conjunto de botones con estado. ToggleButtonGroup garantiza que solo un único botón puede estar activo en cada momento. Permite definir cual será el botón activo por defecto si no se encuentra ningun activo.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { ToggleButtonGroup } from './src/api/button/ToggleButtonGroup';
 * 
 * const group:ToggleButtonGroup = new ToggleButtonGroup("group-1", [panToggleButton, selectToggletButton, measureLineToggleButton, measurePolygonToggleButton], panToggleButton);
 * 
 * ```
 * 
 */

export class ToggleButtonGroup implements ToggleButtonListener {
    private buttons: Array<ToggleButton>;
    private defaultActiveButton: ToggleButton;
    private id:string;

    constructor(id:string, buttons?: Array<ToggleButton>, defaultActiveButton?: ToggleButton){        
        this.buttons = new Array<ToggleButton>();
        this.id = id;

        if (buttons != undefined) {
            this.buttons = buttons;
                
            this.buttons.forEach((button) => { 
                button.addListener(this);
            });  
        }
    
        if (defaultActiveButton != undefined) {
            this.defaultActiveButton = defaultActiveButton;    
            this.defaultActiveButton.setActive(false);
        }
    }

    onStateChanged(button: ToggleButton) {        
        if (button.isActive()) {
            this.inactiveAllBut(button);
        } else {
            if (this.defaultActiveButton != undefined) {
                this.defaultActiveButton.setActive(true);
            }
        }
    }

    inactiveAllBut(activeButton: ToggleButton) {
        this.buttons.forEach((button) => {
            if (button.getId() != activeButton.getId()) {
                button.setInactive(false); //Se inactiva sin notificar a los listeners
            }
        });
    }

    addButton(button:ToggleButton, isDefaultActiveButton:boolean=false) {
        button.addListener(this);
        this.buttons.push(button);

        if (isDefaultActiveButton) {
            this.defaultActiveButton = button;    
            this.defaultActiveButton.setActive(true);
        }
    }
}