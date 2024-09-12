const textCanvas = document.getElementById('textCanvas');
const textCtx = textCanvas.getContext('2d');

const scratchCanvas = document.getElementById('scratchCanvas');
const scratchCtx = scratchCanvas.getContext('2d');

let isDrawing = false;

// Función para dibujar el texto en el canvas inferior
function drawText() {
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
  textCtx.font = '24px Arial';
  textCtx.fillStyle = '#000'; // Color del texto
  textCtx.textAlign = 'center';
  textCtx.textBaseline = 'middle';
  textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height); // Limpia el lienzo antes de dibujar el texto
  textCtx.fillText('Cupón: GANA10', textCanvas.width / 2, textCanvas.height / 2); // Centra el texto  
}

// Función para dibujar la capa gris en el canvas superior
function drawScratchArea() {
  scratchCtx.fillStyle = '#FF1135'; // Color de la capa roja
  scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height); // Cubre todo el canvas superior
}

// Comienza el raspado cuando el mouse está presionado
scratchCanvas.addEventListener('mousedown', function () {
  isDrawing = true;
});

// Detiene el raspado cuando se suelta el mouse
scratchCanvas.addEventListener('mouseup', function () {
  isDrawing = false;
});

// Al mover el mouse, borra la capa gris
scratchCanvas.addEventListener('mousemove', function (e) {
  if (isDrawing) {
    scratchCtx.globalCompositeOperation = 'destination-out'; // Borra parte de la capa gris
    scratchCtx.beginPath();
    scratchCtx.arc(e.offsetX, e.offsetY, 20, 0, Math.PI * 2); // Simula un raspado con un círculo
    scratchCtx.fill();
  }
});

// Dibuja el texto en el canvas inferior
drawText();

// Dibuja la capa gris en el canvas superior
drawScratchArea();
