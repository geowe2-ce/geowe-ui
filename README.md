# geowe-ui

Librería Typescript Open Source de componentes para el desarrollo de interfaz de usuario en la web.

## Requerimientos

Para comenzar a trabajar con el proyecto necesitará tener Node.js instalado en su entorno. Para **geowe-ui** se han utilizado las siguientes versiones: 

    $ node --version
    v10.15.3

    $ npm --version
    6.4.1

## Instalación para Javascript

Para usar la librería desde un proyecto Javascript basado en NodeJS, ejecute el siguiente comando:

    npm install --save geowe-ui-js

## Construcción de la librería para Javascript

Para generar la distribución en formato Javascript desde el actual proyecto Typescript, ejecute la siguiente línea de comandos:

    npm run build && npm run build:css && npm run copy:html && npm run copy:package && npm run copy:readme && npm run pack-ui-lib

Se obtendrán los ficheros fuente en Javascript dentro de la carpeta **jslib/geowe-ui-js** y en el raíz del proyecto se habrá generado el fichero **geowe-ui-js-X.Y.Z.tgz**.  

## Ejemplo básico de geowe-ui usando Javascript

```javascript
import { SimpleButton } from 'geowe-ui-js/api/button/SimpleButton';
import { ToggleButton } from 'geowe-ui-js/api/button/ToggleButton';
import 'geowe-ui-lib/style/ui-lib.css'

//Integrado para usar directamente fuente de iconos (https://fontawesome.com/start)
const zoomExtentButton = new SimpleButton("zoomExtentId", "Zoom to extent", 'fas fa-globe-americas', execute);
//ToggleButton sin etiqueta
const selectToggletButton = new ToggleButton("selectId", "", 'fas fa-mouse-pointer', execute);

zoomExtentButton.show();
selectToggletButton.show();

function execute() {
    alert("executed!!");
}
```

## Contributors

* Atanasio Muñoz <ata@geowe.org>
* Rafael López <rafa@geowe.org>
* José María Martínez <jose@geowe.org>
