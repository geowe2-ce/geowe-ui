import { SelectableItem } from "../SelectableItem";

/**
 * Notificador de cambio de selección de un elemento de la lista. Si se habilita el Check también se notificará cuando cambia su estado.
 * @author jmmluna, atamunoz
 * 
 */
export interface ListListener {
    /** 
   * Notifica cuando un elemento cambia su selección
   * @event
   */
    onSelectionChanged(item: SelectableItem, selectedItems: Array<SelectableItem>):void;

    /** 
   * Notifica cuando un elemento cambia su estado del Check
   * @event
   */
    onCheckStateChanged(item: SelectableItem):void;
}