import { ToggleButton } from "../ToggleButton";


/**
 * Notificador de cambio de estado de botones con estado
 * @author jmmluna, atamunoz
 * 
 */
export interface ToggleButtonListener {
 /** 
   * Notifica cuando un botón cambia de estado
   * @event
   */
    onStateChanged(button: ToggleButton):void;
}