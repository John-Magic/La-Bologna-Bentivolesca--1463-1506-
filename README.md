LA BOLOGNA BENTIVOLESCA (1463–1506)
Una rete digitale di persone, luoghi e patrimonio culturale

Progetto sviluppato per l'esame di Digital Humanities e Patrimonio Culturale (Laurea Magistrale in Scienze Storiche) presso l'Alma Mater Studiorum - Università di Bologna, tenuto dalla Prof.ssa Francesca Tomasi.

Autore: Enrico Spadoni


1. Presentazione del Progetto
----------------------------------------------------------------------
Il portale web "La Bologna Bentivolesca" costituisce un sistema informativo di Digital Humanities volto a ricostruire la trama storico-artistica, socio-politica e urbanistica che caratterizzò la signoria de facto di Giovanni II Bentivoglio a Bologna tra il 1463 e il 1506.

Il progetto supera la tradizionale impostazione enciclopedica adottando un approccio basato sulla modellazione semantica degli eventi e sull'interoperabilità dei dati storici.


2. Architettura del Sistema e Gestione dei Dati (Archivio Personale)
----------------------------------------------------------------------
La risorsa adotta un'architettura disaccoppiata e rigorosa:

- Archivio Interno Normalizzato (CSV & Dublin Core): È stato creato un archivio tabulare indipendente (item_catalogo.csv) in cui ciascun bene culturale della collezione è identificato univocamente da una chiave locale personalizzata (dc:identifier IT01, IT02, ecc.). Tale scelta consente di gestire in modo stabile le rotte e le relazioni del catalogo web, preservando al contempo il legame con gli istituti di conservazione originari (dcterms:source, es. British Library, Fondazione Zeri).

- Edizione Digitale e Filologica (XML-TEI P5): Le fonti manoscritte e narrative complesse (come la Cronica di Giacomo Gigli e l'Hymenaeus Bentivolus di Sabadino degli Arienti) sono trascritte e marcate in XML-TEI, integrando una marcatura strutturale con la Named Entity Recognition (NER) per l'estrazione automatica di attori storici e luoghi.

- Modellazione Ontologica (RDF/Turtle & CIDOC CRM): Per superare i limiti relazionali tradizionali, il dominio storico è formalizzato in un grafo di conoscenza RDF basato sullo standard internazionale CIDOC CRM (ISO 21127) e sull'estensione geospaziale CRMgeo.


3. Stack Tecnologico
----------------------------------------------------------------------
- Frontend & Interfaccia: HTML5 semantico, CSS3 personalizzato (Estetica Umanistica/Rinascimentale, Style v3.css), Bootstrap 4.6.2.
- Tipografia Digitale: Google Fonts (Cormorant Garamond ed EB Garamond).
- Cartografia Storica: Leaflet.js (per la georeferenziazione dei luoghi urbani della Bologna del Quattrocento).
- Network Analysis & Visualizzazione: Cytoscape.js (per l'esplorazione interattiva del grafo basato su CIDOC CRM).
- Standard di Interscambio Formale: XML (Dublin Core & TEI P5), RDF/Turtle (grafo.ttl).


4. Struttura del Repository
----------------------------------------------------------------------
/
├── index.html                   # Homepage del progetto (con metadati DC nel head)
├── contesto.html                # Quadro storiografico e timeline interattiva
├── catalogo.html                # Catalogo interattivo dei 12 item culturali
├── esplora.html                 # Visualizzatore unificato (Mappa Leaflet + Grafo Cytoscape)
├── metodologia.html             # Documentazione scientifica, ontologia e standard
├── Style v3.css                 # Foglio di stile personalizzato (estetica umanistica)
├── js/
│   ├── catalogo.js              # Logica di filtraggio, ricerca e paginazione del catalogo
│   └── app-esplora.js           # Configurazione Leaflet, Cytoscape e mapping CIDOC CRM
├── items/
│   ├── Item_01.html             # Scheda analitica item (Pala Bentivoglio - DC)
│   └── Item_03.html             # Scheda analitica item (Cronica di Gigli - TEI)
├── xml/
│   ├── IT01_PalaBentivoglio.xml # File sorgente metadati Dublin Core
│   ├── IT03_Cronica_TEI.xml     # Edizione digitale XML-TEI (Gigli)
│   ├── IT06_Hymenaeus_TEI.xml   # Edizione digitale XML-TEI (Sabadino)
│   ├── item_catalogo.csv        # Dataset tabulare Dublin Core (Archivio interno)
│   └── grafo.ttl                # Grafo RDF / Turtle (Modello CIDOC CRM)
└── images/                      # Risorse visive, fotografie storiche e iconografia

5. Licenza
----------------------------------------------------------------------
Rilasciato sotto licenza Creative Commons Attribution 4.0 International (CC BY 4.0).
