// Dimensioni schermo intero
const width = window.innerWidth;
const height = window.innerHeight;

// Seleziona e adatta l'SVG all'intera finestra
const svg = d3.select("#zanzara-svg")
  .attr("width", width)
  .attr("height", height);

// Variabile per tracciare l'indice della zanzara
let currentIndex = 0;
let dataPoints = [];

// Carica i dati dal file JSON
d3.json("data.json").then(data => {
  dataPoints = data;

  // Calcola estensione valori, valore min e max per le due coordinate
  const xExtent = d3.extent(data, d => d.x);
  const yExtent = d3.extent(data, d => d.y);

  // Scala i dati alle dimensioni dello schermo
  const xScale = d3.scaleLinear()
    .domain(xExtent)
    .range([50, width - 50]);

  const yScale = d3.scaleLinear()
    .domain(yExtent)
    .range([height - 50, 50]);

  // Gruppo trasformabile per la zanzara, per ruotare l'immagine e scalare
  const mosquitoGroup = svg.append("g")
    .attr("transform", `translate(${xScale(data[0].x)}, ${yScale(data[0].y)})`);

  // Aggiunge l'immagine zanzara centrata nel gruppo
  const mosquito = mosquitoGroup.append("image")
    .attr("href", "mosquito.svg")
    .attr("width", 40)
    .attr("height", 40)
    .attr("x", -20)
    .attr("y", -20)
    .style("cursor", "pointer"); //cambia il cursore così si capisce che la zanzara è cliccabile

  // Funzione di movimento con specchiamento
  function moveTo(index) {
    const prevX = xScale(dataPoints[currentIndex].x);
    const newX = xScale(dataPoints[index].x);
    const newY = yScale(dataPoints[index].y);

    const goingRight = newX > prevX; //controlla se la zanzara va verso destra
    const scaleX = goingRight ? -1 : 1; //se sì l'immagine è specchiata, altrimenti no

    mosquitoGroup.transition()
      .duration(1500)
      .attr("transform", `translate(${newX}, ${newY}) scale(${scaleX}, 1)`);

    currentIndex = index;
  }

  // Click sullo sfondo → avanti
  svg.on("click", function () {
    const nextIndex = (currentIndex + 1) % dataPoints.length;
    moveTo(nextIndex);
  });

  // Click sulla zanzara → indietro
  mosquito.on("click", function (event) {
    event.stopPropagation();
    const prevIndex = (currentIndex - 1 + dataPoints.length) % dataPoints.length;
    moveTo(prevIndex);
  });
});
