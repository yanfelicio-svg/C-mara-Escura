document.addEventListener("DOMContentLoaded", () => {
  // Elementos do Simulador
  const holeSizeSlider = document.getElementById("holeSize");
  const holeSizeValDisplay = document.getElementById("holeSizeVal");
  const distanceSlider = document.getElementById("distanceVal");
  const distanceValDisplay = document.getElementById("distVal");
  const simImageProjection = document.querySelector(".pinhole-visualization");
  const simImageObject = document.querySelector(".sim-content span");
  const effectDesc = document.getElementById("simEffectDesc");

  // Função para atualizar a visualização do Simulador
  function updatePinholeSimulation() {
    const holeSize = parseInt(holeSizeSlider.value); // 1 to 10
    const distance = parseInt(distanceSlider.value); // 5 to 25

    // 1. Atualizar textos dos displays
    holeSizeValDisplay.textContent = holeSize <= 3 ? "Pequeno" : (holeSize <= 7 ? "Médio" : "Grande");
    distanceValDisplay.textContent = distance <= 10 ? "Perto" : (distance <= 18 ? "Média" : "Longe");

    // 2. Calcular efeitos visuais na projeção (Invertida)
    
    // Nitidez vs. Borrado (Blur): Furo maior = Mais borrado
    const blurAmount = (holeSize - 1) / 3; // 0 to 3px blur
    
    // Brilho (Opacity): Furo maior = Mais brilhante
    const brightness = holeSize * 0.08 + 0.1; // 0.18 to 0.98 opacity

    // Tamanho da Imagem: Maior quando objeto está perto, menor quando longe
    // p' (dist. imagem) é fixa. p (dist. objeto) varia. Magnificação M = -p'/p.
    // Usaremos uma escala simulada
    const imageScale = 1.0 - (distance / 40); // 0.87 to 0.37 scale

    // 3. Aplicar estilos dinâmicos à projeção
    simImageProjection.style.filter = `blur(${blurAmount}px)`;
    simImageProjection.style.opacity = brightness;
    simImageProjection.style.transform = `rotate(180deg) scaleX(${-imageScale}) scaleY(${imageScale})`; // Inverte e dimensiona

    // 4. Atualizar descrição do efeito
    let desc = "";
    if (holeSize <= 3) {
      desc = "<strong>Modo Pinhole Puro:</strong> Imagem bastante **nítida**, mas muito **escura** (baixa exposição). É assim que as câmeras pinhole funcionam.";
    } else if (holeSize <= 7) {
      desc = "<strong>Orifício Médio:</strong> A imagem ganha **brilho**, mas começa a perder a definição, ficando levemente **borrada**.";
    } else {
      desc = "<strong>Orifício Grande:</strong> A imagem é muito **brilhante**, mas **totalmente borrada**. Vários raios de luz atingem os mesmos pontos no anteparo.";
    }
    effectDesc.innerHTML = desc;
  }

  // Adicionar Event Listeners para os Sliders
  holeSizeSlider.addEventListener("input", updatePinholeSimulation);
  distanceSlider.addEventListener("input", updatePinholeSimulation);

  // Inicializar a simulação no carregamento
  updatePinholeSimulation();
});
