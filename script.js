// Dimensioni dell'SVG
const width = 800;
const height = 600;

// Riferimento all'SVG
const svg = d3.select("#zanzara-svg");

// Variabile per tenere traccia della posizione corrente
let currentIndex = 0;
let dataPoints = [];

// Carica i dati dal file JSON
d3.json("data.json").then(data => {
  dataPoints = data;

  // Estrai i range dei valori x e y nel dataset 
  const xExtent = d3.extent(data, d => d.x); // [min, max]
  const yExtent = d3.extent(data, d => d.y);

  // Crea le scale, ovvero per mappare i dati in coordinate SVG
  // Le scale sono lineari, quindi mappano i valori in un range
  // di coordinate SVG. Le scale sono definite in modo che i valori
  // minimi e massimi siano mappati correttamente all'interno
  // dell'area SVG.
  const xScale = d3.scaleLinear()
    .domain(xExtent)
    .range([50, width - 50]); // Padding laterale

  const yScale = d3.scaleLinear()
    .domain(yExtent)
    .range([height - 50, 50]); // Invertito: y cresce verso il basso

  // Crea la zanzara con un immagine SVG
 const mosquito = svg.append("image")
  .attr("href", "mosquito.svg")
  .attr("width", 40)
  .attr("height", 40)
  .attr("x", xScale(data[0].x) - 20)
  .attr("y", yScale(data[0].y) - 20)
  .style("cursor", "pointer");

  // Prossimo passo: aggiungere interazione
 // Funzione per aggiornare la posizione della zanzara con animazione
  function moveTo(index) {
    mosquito.transition()
      .duration(600)
      .attr("x", xScale(dataPoints[index].x) -20)
      .attr("y", yScale(dataPoints[index].y) -20);
  }

  // CLICK SULLO SFONDO → avanti
  svg.on("click", function(event) {
    // Se il click è stato sulla zanzara, ignora
    if (d3.pointer(event, this)) {
      const [mx, my] = d3.pointer(event);
      const zx = parseFloat(mosquito.attr("cx"));
      const zy = parseFloat(mosquito.attr("cy"));
      const distance = Math.hypot(mx - zx, my - zy);
      if (distance < 10) return; // click troppo vicino alla zanzara
    }

    currentIndex = (currentIndex + 1) % dataPoints.length;
    moveTo(currentIndex);
  });

  // CLICK SULLA ZANZARA → indietro
  mosquito.on("click", function(event) {
    event.stopPropagation(); // evita che il click raggiunga lo sfondo
    currentIndex = (currentIndex - 1 + dataPoints.length) % dataPoints.length;
    moveTo(currentIndex);
  });
});

/* { "x": 90, "y": 70 },
    { "x": 15, "y": 95 },
    { "x": 75, "y": 10 },
    { "x": 40, "y": 60 },
    { "x": 8, "y": 25 },
    { "x": 19, "y": 88 },
    { "x": 60, "y": 33 }*/