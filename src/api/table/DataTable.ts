import { UIElement } from '../base/UIElement';
import Tabulator = require( 'tabulator-tables');
import 'tabulator-tables/dist/css/tabulator.css';

/**
 * Representa una tabla de datos.
 * @author jmmluna, atamunoz
 * 
 * ### Ejemplo básico de uso:
 * ```ts
 * import { DataTable } from './src/api/table/DataTable';
 * import data = require('./test/data-table.json');
 * import './src/style/ui-lib.scss'
 * 
 * const dataTable: DataTable = new DataTable({ id: "myTable" });
 * dataTable.setData(data);
 * dataTable.show();
 * ...
 * ```
 * 
 */

export class DataTable extends UIElement {
    protected table:Tabulator;
    protected data:Array<JSON>;
    protected editable: boolean;
    protected columnMinWidth: number;
    protected height: string;
    protected idColumn: string;
    protected layout: string;
    protected multiSelection: number;

    constructor(options: any) {
        options.className = options.className != undefined ? options.className : "gw-table";
        super(options.id, options.className);

        this.id = options.id;
        this.editable = (options.editable !== undefined) ? options.editable : false;
        this.columnMinWidth = (options.columnMinWidth !== undefined) ? options.columnMinWidth : 140;
        this.height = (options.height !== undefined) ? options.height : "380px";
        this.idColumn = (options.idColumn !== undefined) ? options.idColumn : 'id';
        this.layout = (options.layout !== undefined) ? options.layout : "fitColumns";
        this.multiSelection = (options.multiSelection !== undefined) ? options.multiSelection : 1;
    
        // $(window).resize(function() {
        //     $("#" + this.id).tabulator("redraw");
        // });           
    }

    show() {
        super.show();    
        this.initialize();    
        this.table.setColumns(this.getColumnDefs());
        this.table.setData(this.data);
    
        this.onDataLoaded(this.data);
    }

    refresh() {
        this.table.redraw(true);
    }

    private initialize() {        
        this.table = new Tabulator("#" + this.id, {
            index: this.idColumn,
            layout: this.layout,
            responsiveLayout: true,
            movableColumns: true,        
            layoutColumnsOnNewData:true,
            columnMinWidth: this.columnMinWidth,
            height: this.height,
            addRowPos: "top",
            tooltips: true,
            rowClick: (e, row) =>
                this.onRowClicked(row)
            ,
            dataFiltered: (filters, rows) =>
                this.onDataFiltered(rows)
            ,
            autoResize: true,        
            selectable: this.multiSelection,
            placeholder: "No hay datos cargados",
            // data:[],           //load row data from array            
            // responsiveLayout:"hide",  //hide columns that dont fit on the table                        
            // history:true,             //allow undo and redo actions on the table
            // pagination:"local",       //paginate the data
            // paginationSize:7,         //allow 7 rows per page of data
            // movableColumns:true,      //allow column order to be changed
            // resizableRows:true,       //allow row order to be changed
            // initialSort:[             //set the initial sort order of the data
            //     {column:"name", dir:"asc"},
            // ],
            columns:[                 //define the table columns
                {title:"Name", field:"name", editor:"input"},
                {title:"Task Progress", field:"progress", align:"left", formatter:"progress", editor:true},
                {title:"Gender", field:"gender", width:95, editor:"select", editorParams:{values:["male", "female"]}},
                {title:"Rating", field:"rating", formatter:"star", align:"center", width:100, editor:true},
                {title:"Color", field:"col", width:130, editor:"input"},
                {title:"Date Of Birth", field:"dob", width:130, sorter:"date", align:"center"},
                {title:"Driver", field:"car", width:90,  align:"center", formatter:"tickCross", sorter:"boolean", editor:true},
            ],
        });
    }

    setData(jsonData:JSON, objectRenderer?:any) {
        this.data = [];
    
        if (objectRenderer != undefined) {
            for (var id in jsonData) {
                this.data.push(objectRenderer.render(jsonData[id]));
            }
        } else {
            for (var id in jsonData) {
                this.data.push(jsonData[id]);
            }
        }    
    }    

    onRowClicked(row) {        
        //Metodo a ser implementado en la super-clase
    }

    onDataLoaded(data) {
        //Metodo a ser implementado en la super-clase    
    }

    onDataFiltered(rows) {
        //Metodo a ser implementado en la super-clase
    }

    onCellEdited(id, column, value) {
        //Metodo a ser implementado en la super-clase
    }

    getTable():Tabulator {
        return this.table;
    }

    private getColumnDefs() {
        var columns = [];
    
        if (this.data != undefined) {
            var row:JSON = this.data[0];
    
            for (var key in row) {
                //Tipo por defecto
                var typeName = "string";
                
                if (this.isInt(row[key]) || this.isFloat(row[key])) {
                    typeName = "number";
                }
    
                var column = this.createColumnDef(key, typeName);
                columns.push(column);
            }
        }
    
        return columns;
    }

    private createColumnDef(name:string, typeName:string) {        
        var column = {};
    
        column['title'] = name.toUpperCase();
        column['field'] = name;
        column['sorter'] = typeName;
        column['responsive'] = 0;
    
        if (this.editable && name != this.idColumn) {
            column['editor'] = 'input';
            column['cellEdited'] = (cell) => {
                    this.onCellEdited(
                        cell.getRow().getData()[this.idColumn],
                        cell.getColumn().getField(),
                        cell.getValue()
                    );
            };
            //Se selecciona la fila automaticamente al editar
            column['cellEditing'] = (cell) => {
                cell.getRow().select();
                this.onRowClicked(cell.getRow());
            };
        }
    
        //Filtrado por columna
        column['headerFilter'] = true;
        column['headerFilterPlaceholder'] = "Filtrar por...";
    
        if (name == this.idColumn) {
            column['frozen'] = true;
        }
    
        return column;
    }

    private isInt(value) {
        return Number(value) === value && value % 1 === 0;
    }
    
    private isFloat(value) {
        return Number(value) === value && value % 1 !== 0;
    }
}