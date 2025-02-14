const contenedorTabla = document.getElementById('contenedor-tabla');
const contenedorTablaPaginas = document.getElementById('contenedor-tabla-paginas');
const contenedorTablaPagina = document.getElementById('contenedor-tabla-pagina');
const contenedorCr3 = document.getElementById('contenedor-cr3');
const contenedorOffset = document.getElementById('contenedor-offset');
const flecha = document.getElementById('flecha').querySelector('line');
const flechaCr3 = document.getElementById('flecha-cr3').querySelector('line');
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
    updateArrows();
}

function onMouseUp() {
    isDragging = false;
    currentElement = null;
}

function updateArrows() {
    const dirCell = contenedorTabla.querySelectorAll('tbody tr')[1].querySelector('input[name="puntero-tabla-paginas"]');
    const pageCell = contenedorTablaPaginas.querySelectorAll('tbody tr')[1].querySelector('input[name="puntero-a-pagina"]');
    const dirRect = dirCell.getBoundingClientRect();
    const pageRect = pageCell.getBoundingClientRect();
    flecha.setAttribute('x1', dirRect.right);
    flecha.setAttribute('y1', dirRect.top + dirRect.height / 2);
    flecha.setAttribute('x2', pageRect.left);
    flecha.setAttribute('y2', pageRect.top + pageRect.height / 2);

    const cr3Rect = contenedorCr3.getBoundingClientRect();
    const dirTableRect = contenedorTabla.getBoundingClientRect();
    flechaCr3.setAttribute('x1', cr3Rect.right);
    flechaCr3.setAttribute('y1', cr3Rect.top + cr3Rect.height / 2);
    flechaCr3.setAttribute('x2', dirTableRect.left);
    flechaCr3.setAttribute('y2', dirTableRect.top);
}

contenedorTabla.addEventListener('mousedown', (e) => onMouseDown(e, contenedorTabla));
contenedorTablaPaginas.addEventListener('mousedown', (e) => onMouseDown(e, contenedorTablaPaginas));
contenedorTablaPagina.addEventListener('mousedown', (e) => onMouseDown(e, contenedorTablaPagina));
contenedorCr3.addEventListener('mousedown', (e) => onMouseDown(e, contenedorCr3));
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mousemove', onMouseMove);
window.addEventListener('load', updateArrows);
window.addEventListener('resize', updateArrows);

function calcularDireccionFisica() {
    const direccionVirtual = document.getElementById('direccion-virtual').value;
    const cr3 = document.getElementById('cr3').value;
    const directorio = document.querySelectorAll('#contenedor-tabla input[name="puntero-tabla-paginas"]');
    const tablaPaginas = document.querySelectorAll('#contenedor-tabla-paginas input[name="puntero-a-pagina"]');
    const pagina = document.querySelectorAll('#contenedor-tabla-pagina input');

    if (!/^[0-9a-fA-F]{8}$/.test(direccionVirtual)) {
        alert('Por favor, ingrese una dirección virtual válida de 8 caracteres hexadecimales.');
        return;
    }

    if (!/^[0-9a-fA-F]{8}$/.test(cr3)) {
        document.getElementById('cr3-error').innerText = 'Por favor, ingrese un valor CR3 válido de 8 caracteres hexadecimales.';
        return;
    } else {
        document.getElementById('cr3-error').innerText = '';
    }

    // Extraer los 12 bits menos significativos
    const offset = parseInt(direccionVirtual, 16) & 0xFFF;
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