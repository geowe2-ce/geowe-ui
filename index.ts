import { SimpleButton } from './src/api/button/SimpleButton';
import { ToggleButton } from './src/api/button/ToggleButton';
import { ToolBar } from './src/api/toolbar/ToolBar';
import {NavBar} from './src/api/navbar/NavBar';

import './src/style/main.scss'

const toolbar: ToolBar = new ToolBar("toolBarId");

const zoomExtentButton: SimpleButton = new SimpleButton("zoomExtentId", "", 'fas fa-globe-americas', execute);
const selectToggletButton: ToggleButton = new ToggleButton("selectId", "", 'fas fa-mouse-pointer', execute);
const panToggleButton: ToggleButton = new ToggleButton("panId", "", "far fa-hand-paper", execute);
const measureLineToggleButton: ToggleButton = new ToggleButton("measureLineId", "", "fas fa-ruler", execute);
const measurePolygonToggleButton: ToggleButton = new ToggleButton("measurePolygonId", "", "fas fa-ruler-combined", execute);

toolbar.addTool(panToggleButton, "tools", true);
toolbar.addTool(selectToggletButton, "tools");
toolbar.addTool(zoomExtentButton);
toolbar.addTool(measureLineToggleButton, "tools");
toolbar.addTool(measurePolygonToggleButton, "tools");

const navBar = new NavBar("navBarId");

navBar.addButton(zoomExtentButton);
navBar.setBrand({name: "GeoWE", icon: 'fas fa-layer-group', link: "https://www.geowe.org"});
navBar.setResponsiveControlIcon("fas fa-table")

navBar.show();
toolbar.show();

function execute() {
  alert("executed!!");
}
