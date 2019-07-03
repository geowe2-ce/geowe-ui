import { UIElement } from '../base/UIElement';
const defaultHtmlTemplate = require('./TabBar.html');
import {TabBarListener} from './listener/TabBarListener';

import jquery = require("jquery");
const $: JQueryStatic = jquery;

import "bootstrap/js/dist/tab";

/**
 * Representa un conjunto de contenedores cuya navegación está basada en pestañas (Tab).
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import {TabBar} from './src/api/tabs/TabBar';
 * import './src/style/ui-lib.scss'
 * 
 * const tabBar = new TabBar("gwTabs");
 * tabBar.addTab({id:"tab1", iconFont:"fas fa-table", label:"Capas", content:"Estas son las capas del catálogo", selected:true});
 * tabBar.addTab({id:"tab2", iconFont:"fas fa-ruler-combined", label:"Herramientas", content:"Estas son las herramientas del catálogo"});
 * tabBar.addListener(new TabEntity());
 * 
 * tabBar.show();
 *
 * ```
 * 
 * ```
 * export class TabEntity implements TabBarListener {
 *   constructor() {
 *
 *   }
 *
 *   onTabSelectionChanged(id:string) {
 *       alert("Ha cambiado el tab seleccionado " + id);
 *      };
 * }
 * ```
 */

export class TabBar extends UIElement {
    protected tabs:HTMLElement;
    protected contents:HTMLElement;
    protected selectedTabId:string;
    protected listeners: Array<TabBarListener>;

    constructor(id: string, htmlTemplate:string=defaultHtmlTemplate) {
        super(id, "", htmlTemplate);

        this.tabs = this.findDomElement("tabs");
        this.contents = this.findDomElement("contents");
        this.listeners = new Array<TabBarListener>();
    }

    addTab(options:any) {
        var newTabButton = this.createTabButton(options.id, options.iconFont, options.label, options.selected);
        var newTabContent = this.createTabContent(options.id, options.content, options.selected);
        
        this.tabs.appendChild(newTabButton);
        this.contents.appendChild(newTabContent);
             
    }

    private createTabButton(id:string, iconFont:string = undefined, label:string = undefined, selected:boolean = false) {
        var tabButton = document.createElement("li");
        tabButton.className = "gw-nav-item";

        var anchor = document.createElement("a");
        anchor.className = selected ? "nav-link active" : "nav-link";
        anchor.id = `${id}-tab`;
        anchor.setAttribute("data-toggle", "tab");
        anchor.href = `#${id}`;
        anchor.setAttribute("role", "tab");
        anchor.setAttribute("aria-controls", id);
        anchor.setAttribute("aria-selected", `${selected}`);
        
        anchor.innerHTML = iconFont != undefined ? `<i class="${iconFont}"></i>` : "";
        anchor.innerHTML += label != undefined ? ` ${label}` : "";

        tabButton.appendChild(anchor);

        if(selected)
            this.selectedTabId = id;


        tabButton.addEventListener("click", (e)=>{
           this.setSelectedTab(id);
        });

        return tabButton;
    }

    private createTabContent(id:string, content:any = undefined, selected:boolean = false) {
        var tabContent = document.createElement("div");
        tabContent.id = id;
        tabContent.className = selected ? "tab-pane fade show active" : "tab-pane fade";
        tabContent.setAttribute("role", "tabpanel");
        tabContent.setAttribute("aria-labelledby", `${id}-tab`);

        if(content != undefined) {
            if (content instanceof HTMLElement)
                tabContent.innerHTML = content.outerHTML;
            else
                tabContent.innerHTML = content;
        }

        return tabContent;
    }    

    getSelectedTabId() {        
        return this.selectedTabId;
    }

    getTabContent(id:string) {
        return this.findDomElement(id, this.contents);        
    }

    setSelectedTab(id:string) {
        $('.nav-tabs a[href="#' + id + '"]').tab('show');       
        this.selectedTabId = id;
        this.onChangeSelectedTab(id); 
    }

    addListener(listener: TabBarListener) {
        this.listeners.push(listener);
    }

    private onChangeSelectedTab(id:string) {
        this.listeners.forEach((listener)=> {
            listener.onTabSelectionChanged(id);
        });
    }
}