# Progetto Zanzara D3.js

Questo progetto utilizza **D3.js** per visualizzare una zanzara che si muove su uno spazio bidimensionale in base a un dataset multivariato.

## Specifiche

- Il dataset è un file JSON contenente **10 data-case**.
- Ogni data-case ha due variabili quantitative positive (coordinate `x` e `y`).
- Viene disegnata una piccola zanzara (una silhouette semplice) nella posizione corrispondente alle coordinate `x` e `y` del **primo data-case**.
- Facendo **click sullo sfondo**, la zanzara si sposta animatamente alla posizione del **data-case successivo**.  
  Dopo l’ultimo data-case, ricomincia dal primo.
- Facendo **click con il tasto sinistro del mouse sulla zanzara**, questa si sposta indietro al data-case precedente, sempre con animazione fluida.
- Le posizioni sono calcolate usando le **scale di D3.js**, che mappano l’intervallo arbitrario delle variabili sui valori delle coordinate dell’interfaccia grafica.

## Come usare

1. Apri `index.html` in un browser moderno.
2. Clicca sullo sfondo per far muovere la zanzara in avanti nel dataset.
3. Clicca sulla zanzara per farla tornare indietro.

## Tecnologie utilizzate

- [D3.js](https://d3js.org) per la visualizzazione e l’animazione.
- HTML e SVG per la grafica.
