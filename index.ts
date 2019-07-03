import { SimpleButton } from './src/api/button/SimpleButton';
import { ToggleButton } from './src/api/button/ToggleButton';
import { ToolBar } from './src/api/toolbar/ToolBar';
import { ToggleButtonGroup } from './src/api/button/ToggleButtonGroup';
import { ModalDialog } from './src/api/dialog/ModalDialog';
import { LoadingDialog } from './src/api/dialog/LoadingDialog';
import { DataTable } from './src/api/table/DataTable';
import data = require('./test/data-table.json');
import { SimpleDialog } from './src/api/dialog/SimpleDialog';
import {NavBar} from './src/api/navbar/NavBar';
import {TabBar} from './src/api/tabs/TabBar';
import {SideNav} from './src/api/sidenav/SideNav';


// import Tabulator = require( 'tabulator-tables');
// import 'tabulator-tables/dist/css/bootstrap/tabulator_bootstrap4.min.css';

import './src/style/ui-lib.scss'

//import '@fortawesome/fontawesome-free/css/all.min.css';
import './test/test.css';
import { TabEntity } from './test/TabEntity';
import {SelectableList} from './src/api/list/SelectableList';
import { ListListenerTest } from './test/ListListenerTest';
import {CarTest} from './test/CarTest';


var container = document.createElement("div");

var button1 = document.createElement("button");
var button2 = document.createElement("button");
button1.innerHTML = "b1";
button2.innerHTML = "b2";
container.appendChild(button1);
container.appendChild(button2);

var panelOptions: JSON = {
  title: "Mi titulo",
  iconFont: 'fas fa-info-circle',

  content: `
    <label><b>hola</b></label>
    <br>
    <input type="text" value="pepe"/>
    yyyyyyyyyyyyyyyyyyyyyyyy
   `,
  closeCallback: buttonAction.bind(this, "hola")
  //buttons:[{name: "Mi boton", actionMethod: buttonAction}, {name: "Otro botón", actionMethod: buttonAction, className: "btn btn-primary"}]
};


const panel = new ModalDialog(panelOptions);
panel.addToFooter(`<input type="text" value="pepe"/>`);
panel.addButton({ name: "Mi boton", actionMethod: buttonAction });


var layerManagerOptions: JSON = {
  title: "Layer Manager",
  iconFont: 'fas fa-info-circle',
  className: "gw-layer-manager",
  showCloseButton: false,
  content: `
    <label><b>Mi Layer Manager</b></label>
    <br>
    
   `
};


const layerManager: SimpleDialog = new SimpleDialog(layerManagerOptions);
layerManager.showHeader(false);
layerManager.showFooter(false);

const toolbar: ToolBar = new ToolBar("toolBarId");


const zoomExtentButton: SimpleButton = new SimpleButton("zoomExtentId", "", 'fas fa-globe-americas', execute);
const selectToggletButton: ToggleButton = new ToggleButton("selectId", "", 'fas fa-mouse-pointer', execute);
const panToggleButton: ToggleButton = new ToggleButton("panId", "", "far fa-hand-paper", execute);
const measureLineToggleButton: ToggleButton = new ToggleButton("measureLineId", "", "fas fa-ruler", execute);
const measurePolygonToggleButton: ToggleButton = new ToggleButton("measurePolygonId", "", "fas fa-ruler-combined", execute);

const layerManagerToggleButton: ToggleButton = new ToggleButton("measurePolygonId", "", "fas fa-layer-group", showLayerManager);

const dataTableToggleButton: ToggleButton = new ToggleButton("dataTableId", "", "fas fa-table", showDataTable);



toolbar.addTool(layerManagerToggleButton);
toolbar.addTool(panToggleButton, "tools", true);
toolbar.addTool(selectToggletButton, "tools");
toolbar.addTool(zoomExtentButton);
toolbar.addTool(dataTableToggleButton);
toolbar.addTool(measureLineToggleButton, "tools");
toolbar.addTool(measurePolygonToggleButton, "tools");




const navBar = new NavBar("navBarId");
//layerManagerToggleButton.setClassName("gw-nav-btn");
//layerManagerToggleButton.setActiveClassName("gw-nav-btn-active");

navBar.addButton(layerManagerToggleButton);
navBar.addButton(zoomExtentButton);
navBar.setBrand({name: "GeoWE", icon: 'fas fa-layer-group', link: "https://www.geowe.org"});
navBar.setResponsiveControlIcon("fas fa-table")
//navBar.addUIElement(toolbar);
navBar.show();
toolbar.show();

const tabBar = new TabBar("gwTabs");
tabBar.addTab({id:"tab1", iconFont:"fas fa-table", label:"Capas", content:"Estas son las capas del catálogo", selected:true});
tabBar.addTab({id:"tab2", iconFont:"fas fa-ruler-combined", label:"Herramientas", content:"Estas son las herramientas del catálogo"});
tabBar.addListener(new TabEntity());
  

tabBar.show();




//layerManager.addUIElement(tabBar);

//const group:ToggleButtonGroup = new ToggleButtonGroup("group-1", [panToggleButton, selectToggletButton, measureLineToggleButton, measurePolygonToggleButton], panToggleButton);



const loadingDialog: LoadingDialog = new LoadingDialog({ message: "cargando....." });

const dataTable: DataTable = new DataTable({ id: "myTable" });

const sideNav:SideNav = new SideNav("idSideNav");
dataTable.setData(data);
sideNav.setTitle(`<i class="fas fa-globe-americas"> GeoWE</i>`);
sideNav.addUIElement(dataTable);




const list:SelectableList = new SelectableList("listId", true);
/*list.add("1", 'elemento 1', false, "fas fa-globe-americas", true);
list.add("2", "elemento 2", false, "", true);
list.add("3", "elemento 3", false, "", true);*/

const carTest = new CarTest();

//list.addJSONArray(data, "manufacturer");

list.addObjectArray(carTest.getArray())

//const listListener:ListListenerTest = new ListListenerTest();
//list.addListener(listListener);
list.show();



function execute() {
  panel.show();
}

function buttonAction(message) {
  /*alert("Tab seleccionado: " + tabBar.getSelectedTabId());
alert("Content Tab seleccionado: " + tabBar.getTabContent(tabBar.getSelectedTabId()).innerHTML);*/

tabBar.setSelectedTab("tab2");
  panel.hide();
}

function showLayerManager() {
 

  if (sideNav.isVisible())
  sideNav.hide();
else
sideNav.show();

  /*if (layerManager.isVisible())
    layerManager.hide();
  else
    layerManager.show();*/
}



function showDataTable() {
  dataTable.setData(data);
  if (dataTable.isVisible())
    dataTable.hide();
  else
    dataTable.show();
}
