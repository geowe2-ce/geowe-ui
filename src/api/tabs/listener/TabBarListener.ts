
/**
 * Notificador de cambio de selección de una pestaña en un TabBar
 * @author jmmluna, atamunoz
 * 
 */
export interface TabBarListener {
 /** 
   * Notifica un cambio en la pestaña activa de un TabBar
   * @event
   */
    onTabSelectionChanged(id: string):void;
}