document.addEventListener("DOMContentLoaded", () => {
  const btnNoLens = document.getElementById("btnNoLens");
  const btnWithLens = document.getElementById("btnWithLens");
  const simBox = document.getElementById("simulationBox");
  const simDesc = document.getElementById("simDescription");

  // Ação ao clicar no botão "Sem Lente"
  btnNoLens.addEventListener("click", () => {
    btnNoLens.classList.add("active");
    btnWithLens.classList.remove("active");

    simBox.className = "sim-box mode-pinhole";
    simDesc.innerHTML = "<strong>Modo Pinhole:</strong> A imagem projetada é invertida e possui <em>baixo brilho</em>, pois poucos raios de luz conseguem passar pelo pequeno orifício.";
  });

  // Ação ao clicar no botão "Com Lente"
  btnWithLens.addEventListener("click", () => {
    btnWithLens.classList.add("active");
    btnNoLens.classList.remove("active");

    simBox.className = "sim-box mode-lens";
    simDesc.innerHTML = "<strong>Modo com Lente:</strong> A lente refrata e focaliza mais luz. A imagem permanece invertida, porém fica <em>muito mais nitida e brilhante</em>.";
  });
});
