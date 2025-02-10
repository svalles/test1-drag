const contenedorTabla = document.getElementById('contenedor-tabla');
let isDragging = false;
let offsetX, offsetY;

contenedorTabla.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - contenedorTabla.offsetLeft;
    offsetY = e.clientY - contenedorTabla.offsetTop;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    contenedorTabla.style.left = (e.clientX - offsetX) + 'px';
    contenedorTabla.style.top = (e.clientY - offsetY) + 'px';
});