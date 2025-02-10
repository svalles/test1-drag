const contenedorTabla = document.getElementById('contenedor-tabla');
const contenedorTablaPaginas = document.getElementById('contenedor-tabla-paginas');
const contenedorTablaPagina = document.getElementById('contenedor-tabla-pagina');
let isDragging = false;
let offsetX, offsetY;
let currentElement = null;

function onMouseDown(e, element) {
    isDragging = true;
    currentElement = element;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
}

function onMouseMove(e) {
    if (!isDragging || !currentElement) return;
    currentElement.style.left = (e.clientX - offsetX) + 'px';
    currentElement.style.top = (e.clientY - offsetY) + 'px';
}

function onMouseUp() {
    isDragging = false;
    currentElement = null;
}

contenedorTabla.addEventListener('mousedown', (e) => onMouseDown(e, contenedorTabla));
contenedorTablaPaginas.addEventListener('mousedown', (e) => onMouseDown(e, contenedorTablaPaginas));
contenedorTablaPagina.addEventListener('mousedown', (e) => onMouseDown(e, contenedorTablaPagina));
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mousemove', onMouseMove);

function calcularDireccionFisica() {
    const direccionVirtual = document.getElementById('direccion-virtual').value;
    const directorio = document.querySelectorAll('#contenedor-tabla input');
    const tablaPaginas = document.querySelectorAll('#contenedor-tabla-paginas input');
    const pagina = document.querySelectorAll('#contenedor-tabla-pagina input');

    if (!/^[0-9a-fA-F]{8}$/.test(direccionVirtual)) {
        alert('Por favor, ingrese una dirección virtual válida de 8 caracteres hexadecimales.');
        return;
    }

    // Extraer los 20 bits menos significativos
    const offset = parseInt(direccionVirtual, 16) & 0xFFFFF;
    document.getElementById('offset').innerText = `Offset: ${offset.toString(16).toUpperCase()}`;

    // Extraer los 10 bits entre el bit 12 y el bit 21
    const indiceTablaPagina = (parseInt(direccionVirtual, 16) >> 12) & 0x3FF;
    document.getElementById('indice-tabla-pagina').innerText = `Índice Tabla de Página: ${indiceTablaPagina.toString(16).toUpperCase()}`;

    // Extraer los 10 bits más significativos (bit 22 al bit 31)
    const indiceDirectorio = (parseInt(direccionVirtual, 16) >> 22) & 0x3FF;
    document.getElementById('indice-directorio').innerText = `Índice Directorio: ${indiceDirectorio.toString(16).toUpperCase()}`;

    // Aquí debes implementar la lógica para calcular la dirección física
    // según la paginación de Intel x86. Este es un ejemplo básico:
    const dirEntry = directorio[indiceDirectorio].value;
    const tablaEntry = tablaPaginas[indiceTablaPagina].value;

    const direccionFisica = (parseInt(tablaEntry, 16) << 12) | offset;

    document.getElementById('direccion-fisica').innerText = `Dirección Física: ${direccionFisica.toString(16).toUpperCase()}`;
}