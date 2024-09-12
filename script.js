
const textCanvas = document.getElementById('textCanvas');
const textCtx = textCanvas.getContext('2d');

const scratchCanvas = document.getElementById('scratchCanvas');
const scratchCtx = scratchCanvas.getContext('2d');

let isDrawing = false;

// Detectar si es dispositivo táctil
const isTouchDevice = 'ontouchstart' in document.documentElement;

// Función para dibujar el texto en el canvas inferior
function drawText() {
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  const fontSize = textCanvas.width / 10;  // Ajusta el tamaño de la fuente basado en el ancho
  textCtx.font = `${fontSize}px Arial`;
  textCtx.fillStyle = '#000'; // Color del texto
  textCtx.textAlign = 'center';
  textCtx.textBaseline = 'middle';
  textCtx.fillText('Cupón: GANA10', textCanvas.width / 2, textCanvas.height / 2); // El texto está centrado
}

// Función para dibujar la capa gris en el canvas superior
function drawScratchArea() {
  scratchCtx.fillStyle = '#C0C0C0'; // Color de la capa gris
  scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height); // Cubre todo el canvas superior
}

// Función para manejar el raspado
function startDrawing(x, y) {
  scratchCtx.globalCompositeOperation = 'destination-out'; // Borra parte de la capa gris
  scratchCtx.beginPath();
  scratchCtx.arc(x, y, 20, 0, Math.PI * 2); // Simula un raspado con un círculo
  scratchCtx.fill();
}

// Funciones para ratón
scratchCanvas.addEventListener('mousedown', function (e) {
  isDrawing = true;
  startDrawing(e.offsetX, e.offsetY);
});

scratchCanvas.addEventListener('mousemove', function (e) {
  if (isDrawing) {
    startDrawing(e.offsetX, e.offsetY);
  }
});

scratchCanvas.addEventListener('mouseup', function () {
  isDrawing = false;
});

// Funciones para dispositivos táctiles
scratchCanvas.addEventListener('touchstart', function (e) {
  isDrawing = true;
  const touch = e.touches[0];
  const rect = scratchCanvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  startDrawing(x, y);
});

scratchCanvas.addEventListener('touchmove', function (e) {
  if (isDrawing) {
    const touch = e.touches[0];
    const rect = scratchCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    startDrawing(x, y);
  }
});

scratchCanvas.addEventListener('touchend', function () {
  isDrawing = false;
});

// Prevenir scroll mientras se raspa en móviles
scratchCanvas.addEventListener('touchmove', function (e) {
  e.preventDefault();
}, { passive: false });

// Dibuja el texto en el canvas inferior
drawText();

// Dibuja la capa gris en el canvas superior
drawScratchArea();
