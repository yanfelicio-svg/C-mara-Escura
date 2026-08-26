// Elementos do DOM
const canvas = document.getElementById('cameraCanvas');
const ctx = canvas.getContext('2d');

const distInput = document.getElementById('distance');
const heightInput = document.getElementById('height');

const distValueSpan = document.getElementById('distValue');
const heightValueSpan = document.getElementById('heightValue');
const calcResultSpan = document.getElementById('calcResult');

// Configurações da Câmara Escura
const holeX = 450;             // Posição X do orifício
const boxWidth = 150;          // Profundidade da câmara (p')
const centerY = canvas.height / 2; // Linha central

function drawSimulation() {
    const p = parseFloat(distInput.value);  // Distância do objeto ao orifício
    const o = parseFloat(heightInput.value); // Altura do objeto
    const pPrime = boxWidth;                // Distância da imagem ao orifício (fixa)

    // Atualiza os textos da interface
    distValueSpan.textContent = p;
    heightValueSpan.textContent = o;

    // Cálculo exato da física: (i / o) = (p' / p) => i = o * (p' / p)
    const i = o * (pPrime / p);
    calcResultSpan.textContent = i.toFixed(1);

    // Coordenadas
    const objectX = holeX - p;
    const objectTopY = centerY - o;
    const objectBottomY = centerY;

    const imageX = holeX + pPrime;
    const imageTopY = centerY + i; // Invertido para baixo

    // 1. Limpar Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Desenhar a Caixa (Câmara Escura)
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(holeX, centerY - 120, boxWidth, 240);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(holeX, centerY - 120, boxWidth, 240);

    // 3. Orifício da Câmara
    ctx.fillStyle = "#ff9d00";
    ctx.beginPath();
    ctx.arc(holeX, centerY, 4, 0, Math.PI * 2);
    ctx.fill();

    // 4. Desenhar o Objeto (Vela / Seta amarela)
    ctx.strokeStyle = "#ff9d00";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(objectX, objectBottomY);
    ctx.lineTo(objectX, objectTopY);
    ctx.stroke();

    // Chama da Vela (Topo do objeto)
    ctx.fillStyle = "#ff4500";
    ctx.beginPath();
    ctx.arc(objectX, objectTopY, 6, 0, Math.PI * 2);
    ctx.fill();

    // 5. Desenhar Raios de Luz (Linhas Vermelhas Traçadas)
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 3]);

    // Raio 1: Do topo do objeto -> passa pelo furo -> fundo da câmara
    ctx.strokeStyle = "#ff4d4d";
    ctx.beginPath();
    ctx.moveTo(objectX, objectTopY);
    ctx.lineTo(imageX, imageTopY);
    ctx.stroke();

    // Raio 2: Da base do objeto -> passa pelo furo -> fundo da câmara
    ctx.strokeStyle = "#4da6ff";
    ctx.beginPath();
    ctx.moveTo(objectX, objectBottomY);
    ctx.lineTo(imageX, centerY);
    ctx.stroke();

    ctx.setLineDash([]); // Reseta linha tracejada

    // 6. Desenhar a Imagem Projetada (Invertida)
    ctx.strokeStyle = "#ff9d00";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(imageX, centerY);
    ctx.lineTo(imageX, imageTopY);
    ctx.stroke();

    // Chama Invertida
    ctx.fillStyle = "#ff4500";
    ctx.beginPath();
    ctx.arc(imageX, imageTopY, (6 * (pPrime / p)), 0, Math.PI * 2);
    ctx.fill();
}

// Event Listeners para atualização imediata
distInput.addEventListener('input', drawSimulation);
heightInput.addEventListener('input', drawSimulation);

// Desenho inicial ao carregar a página
drawSimulation();
