import { UIElement } from '../base/UIElement';
import { ToggleButtonGroup } from '../button/ToggleButtonGroup';
import { ToggleButton } from '../button/ToggleButton';

/**
 * Representa una barra de botones (herramientas) con (ToggleButton) o sin (SimpleButton) estado.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { ToolBar } from './src/api/toolbar/ToolBar';
 * import './src/style/ui-lib.scss'
 * 
 * const toolbar: ToolBar = new ToolBar("toolBarId");
 * 
 * toolbar.addTool(layerManagerToggleButton);
 * toolbar.addTool(panToggleButton, "tools", true);
 * toolbar.addTool(selectToggletButton, "tools");
 * toolbar.addTool(zoomExtentButton);
 * toolbar.addTool(dataTableToggleButton);
 * toolbar.addTool(measureLineToggleButton, "tools");
 * toolbar.addTool(measurePolygonToggleButton, "tools");
 *
 * toolbar.show();
 * ```
 * 
 */

export class ToolBar extends UIElement {
    protected tools:Array<UIElement>;
    protected lastAddedComponent:UIElement;
    protected groups:Array<ToggleButtonGroup>;

    //const group:ToggleButtonGroup = new ToggleButtonGroup("group-1", [panToggleButton, selectToggletButton, measureLineToggleButton, measurePolygonToggleButton], panToggleButton);

    constructor(id:string) {
        super(id, 'gw-toolbar');

        this.tools = new Array<UIElement>();
        this.groups = new Array<ToggleButtonGroup>();
        this.getDOMObject().setAttribute("role", "group");
        
    }

    addTool(tool:UIElement, groupName:string = undefined, isDefaultTool:boolean = false) {    
        this.element.appendChild(tool.getDOMObject());

        this.tools[tool.getId()] = tool;
        this.lastAddedComponent = tool;

        if(groupName != undefined && tool instanceof ToggleButton) {
            if (this.groups[groupName] == undefined) {
                this.groups[groupName] = new ToggleButtonGroup(groupName, [tool], (isDefaultTool) ? tool : undefined);
            }
            else  {
                var group:ToggleButtonGroup = this.groups[groupName];
                group.addButton(tool, isDefaultTool);
            }

        }
    }
}