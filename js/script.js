const contenedorTabla = document.getElementById('contenedor-tabla');
const contenedorTablaPaginas = document.getElementById('contenedor-tabla-paginas');
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
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mousemove', onMouseMove);