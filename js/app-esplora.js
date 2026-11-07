/* ==========================================================================
   APP-ESPLORA.JS — Gestione Mappa (Leaflet) e Grafo (Cytoscape)
   Bologna Bentivolesca (1463–1506)
   Integrazione Ontologica: CIDOC CRM (ISO 21127) & CRMgeo
   ========================================================================== */

// ==========================================================================
// MAPPATURA ONTOLOGICA CIDOC CRM & CRMgeo
// ==========================================================================
const cidocMapping = {
    types: {
        'persona': { class: 'E21 Person', label: 'Persona', icon: 'fas fa-user' },
        'item': { class: 'E22 Human-Made Object', label: 'Oggetto / Opera', icon: 'fas fa-paint-brush' },
        'luogo': { class: 'E53 Place (CRMgeo)', label: 'Luogo / Spazio', icon: 'fas fa-building' },
        'evento': { class: 'E5 Event', label: 'Evento Storico', icon: 'fas fa-calendar-alt' },
        'fonte': { class: 'E31 Document', label: 'Documento / Fonte', icon: 'fas fa-scroll' },
        'concetto': { class: 'E55 Type', label: 'Concetto / Categoria', icon: 'fas fa-tags' }
    },
    edges: {
        'commissiona': 'P14 carried out (E7 Activity)',
        'dipinge': 'P108 produced (E12 Production)',
        'lavora a': 'P14 carried out (E7 Activity)',
        'si trova in': 'P55 has current or former location',
        'risiede in': 'P74 has current or former residence',
        'promuove': 'P14 carried out (E7 Activity)',
        'si svolgono in': 'P7 took place at (E53 Place)',
        'distrutta durante': 'P93 took out of existence (E6 Destruction)',
        'per volere di': 'P14 carried out (E7 Activity)',
        'è avversario di': 'P11 lived in / Relazione Interpersonale',
        'è fedele a': 'P11 lived in / Relazione Interpersonale',
        'scrive': 'P94 creates (E28 Conceptual Object)',
        'ci testimonia': 'P70 documents (E31 Document)',
        'scrive una cronaca durante': 'P70 documents (E31 Document)'
    }
};

/**
 * Genera il blocco HTML con i metadati CIDOC CRM e LOD (VIAF, Wikidata, Zeri)
 */
function renderCidocMetadata(tipoNodo, info) {
    var tipoKey = (tipoNodo || '').toLowerCase();
    var crmInfo = cidocMapping.types[tipoKey] || { class: 'E1 Entity', label: 'Entità Concettuale', icon: 'fas fa-cube' };

    var lodHtml = '';
    if (info) {
        var viafLink = (info.viaf && info.viaf !== 'n/a') ? '<a href="https://' + info.viaf + '" target="_blank" rel="noopener noreferrer" class="text-danger mr-2"><i class="fas fa-external-link-alt"></i> VIAF</a>' : '';
        var wikiLink = (info.wikidata && info.wikidata !== 'n/a') ? '<a href="https://www.wikidata.org/wiki/' + info.wikidata + '" target="_blank" rel="noopener noreferrer" class="text-danger mr-2"><i class="fas fa-external-link-alt"></i> Wikidata</a>' : '';
        
        // --- GESTIONE E RENDERING CAMPO "ALTRI" (SOLO ZERI) ---
        var altriLink = '';
        if (info.altri && info.altri !== 'n/a') {
            var altriLower = info.altri.toLowerCase();
            
            // Gestione Scheda Zeri
            if (altriLower.includes('zeri')) {
                var zeriMatch = info.altri.match(/zeri\s*(\d+)/i) || info.altri.match(/\d+/);
                var zeriId = zeriMatch ? (zeriMatch[1] || zeriMatch[0]) : '';
                if (zeriId) {
                    altriLink += '<a href="http://catalogo.fondazionezeri.unibo.it/scheda/opera/' + zeriId + '/" target="_blank" rel="noopener noreferrer" class="text-danger mr-2"><i class="fas fa-external-link-alt"></i> Zeri (' + zeriId + ')</a>';
                }
            }

            // Fallback nel caso in cui sia un testo generico non riconducibile a Zeri
            if (!altriLink) {
                altriLink = '<span class="text-muted mr-2">' + info.altri + '</span>';
            }
        }

        if (viafLink || wikiLink || altriLink) {
            lodHtml = '<div class="mt-2 pt-2 border-top text-muted small">' +
                        '<strong>LOD / Authority:</strong> ' + viafLink + wikiLink + altriLink +
                      '</div>';
        }
    }

    return '<div class="cidoc-sidebar-block mt-3 pt-3 border-top">' +
                '<h6 class="font-weight-bold text-dark mb-2" style="font-size: 0.85rem; letter-spacing: 0.5px;">' +
                    '<i class="' + crmInfo.icon + ' text-danger mr-1"></i> Ontologia CIDOC CRM' +
                '</h6>' +
                '<div class="card bg-light border-0 p-2 text-dark small" style="background-color: var(--sfondo-pergamentato, #FAF6ED) !important;">' +
                    '<div class="d-flex justify-content-between align-items-center mb-1">' +
                        '<span class="text-muted">Classe CRM:</span>' +
                        '<code class="badge badge-dark p-1">' + crmInfo.class + '</code>' +
                    '</div>' +
                    '<div class="d-flex justify-content-between align-items-center">' +
                        '<span class="text-muted">Tipologia:</span>' +
                        '<span class="font-weight-bold">' + crmInfo.label + '</span>' +
                    '</div>' +
                '</div>' +
                lodHtml +
           '</div>';
}

/**
 * Genera il blocco delle relazioni uscenti del nodo con mappatura delle proprietà CRM
 */
function renderCidocRelations(node) {
    var connectedEdges = node.outgoers('edge');
    if (connectedEdges.length === 0) return '';

    var listHTML = '<div class="cidoc-relations-block mt-3 pt-2">' +
                        '<h6 class="font-weight-bold text-dark mb-2" style="font-size: 0.85rem;">' +
                            '<i class="fas fa-project-diagram text-primary mr-1"></i> Relazioni Semantiche (CRM)' +
                        '</h6>' +
                        '<ul class="list-group list-group-flush small border rounded">';

    connectedEdges.forEach(function(edge) {
        var edgeData = edge.data();
        var targetData = edge.target().data();
        var relLabel = edgeData.label || 'relato a';
        var crmProp = cidocMapping.edges[relLabel.toLowerCase()] || 'P67 refers to';

        listHTML += '<li class="list-group-item bg-light py-2 px-2">' +
                        '<div>' +
                            '<strong class="text-danger">' + relLabel + '</strong> ' +
                            '<i class="fas fa-long-arrow-alt-right text-muted mx-1"></i> ' +
                            '<span class="font-weight-bold">' + (targetData.label || targetData.id) + '</span>' +
                        '</div>' +
                        '<div class="text-muted extra-small mt-1" style="font-size: 0.75rem;">' +
                            'Proprietà: <code>' + crmProp + '</code>' +
                        '</div>' +
                    '</li>';
    });

    listHTML += '</ul></div>';
    return listHTML;
}


document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // 1. GESTIONE MAPPA INTERATTIVA (LEAFLET.JS)
    // ==========================================================================
    
    var latBologna = 44.4949;
    var lngBologna = 11.3465;

    // Inizializzazione Mappa
    var map = L.map('map-leaflet-container').setView([latBologna, lngBologna], 15);

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
}).addTo(map);
      
    // Marker personalizzato con i colori del progetto (#CE0101 e #FEE56E)
    var iconaRossoRinascimento = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="background-color: #CE0101; width: 18px; height: 18px; border-radius: 50%; border: 2px solid #FEE56E; box-shadow: 0 0 5px rgba(0,0,0,0.4);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });

    // Dataset Luoghi Mappa
    var luoghiBentivoleschi = [
    {
        titolo: "Domus Aurea (Palazzo Bentivoglio)",
        categoria: "Palazzo Signorile",
        lat: 44.4965,
        lng: 11.3490,
        ref: "Domus Aurea",
        descrizione: "Residenza principesca commissionata da Sante Bentivoglio e portata a termine durante la signoria di Giovanni II edificata in via San Donato. Cuore della dinastia e del potere bentivolesco, ospita alcuni dei momenti più importanti delle nozze del 1487 tra Annibale e Lucrezia. Dopo la cacciata dei Bentivoglio, viene distrutta nel 1507 da una sommossa popolare.",
        link: "./items/Item_02.html"
    },
    {
        titolo: "San Giacomo Maggiore - Cappella Bentivoglio",
        categoria: "Luogo Religioso",
        lat: 44.4952,
        lng: 11.3482,
        ref: "Pala Bentivoglio | Lorenzo Costa",
        descrizione: "Chiesa riferimento dei Bentivoglio, al cui interno si trova il mausoleo di famiglia. La cappella ospita importanti opere d'arte commissionate dai signori, come la Pala Bentivoglio, una delle poche tracce visive dell'esperienza bentivolesca rimasta dopo la cacciata.",
        link: "./items/Item_01.html"
    },
    {
        titolo: "Porta Galliera",
        categoria: "Architettura/Postazione Militare",
        lat: 44.5028,
        lng: 11.3444,
        ref: "Affresco Battaglia della Riccardina (Particolare di B.Colleoni) | Girolamo Romanino",
        descrizione: "Snodo militare nella zona nord dela città e punto di raggruppamento delle truppe bolognesi. Da qui mosse la spedizione per partecipare alla Battaglia della Riccardina (1467). Durante l'assedio del 1506, è stato luogo simbolo della resistenza alle truppe papali.",
        link: "./items/Item_11.html"
    },
    {
        titolo: "Basilica di San Petronio",
        categoria: "Architettura Religiosa",
        lat: 44.4929,
        lng: 11.3431,
        ref: "Hymenaeus Bentivolus | Giovanni Sabadino degli Arienti",
        descrizione: "Cuore civico-religioso di Bologna. Sotto Giovanni II vi lavorarono grandi maestri e fu teatro di matrimoni, solenni cerimonie pubbliche e di Stato.",
        link: "./items/Item_06.html"
    },
    {
        titolo: "Santuario di Santa Maria della Vita",
        categoria: "Architettura Religiosa",
        lat: 44.4928,
        lng: 11.3447,
        ref: "Compianto sul Cristo Morto | Niccolò dell'Arca",
        descrizione: "La chiesa custodisce il celebre 'Compianto sul Cristo Morto' di Niccolò dell'Arca (1463 ca.), capolavoro drammatico della scultura bentivolesca. Santuario e ospedale gestito dalla confraternita dei Battuti, fu un punto di riferimento per l'assistenza cittadina e la devozione mariana sostenuta dalla famiglia Bentivoglio.",
        link: "./items/Item_08.html"
    },
    {
        titolo: "Porta San Mamolo",
        categoria: "Porta/Architettura Militare",
        lat: 44.4862,
        lng: 11.3402,
        ref: "Cronica | Giacomo Gigli",
        descrizione: "Varco meridionale delle mura di circonvallazione (Terza Cerchia), fondamentale snodo difensivo verso il contado e le colline. Da qui fuggono precipitosamente Giovanni II e i figli (assieme a parte della corte) nella notte del 2 novembre 1506",
        link: "./items/Item_03.html"
    },
    {
        titolo: "Oratorio di Santa Cecilia",
        categoria: "Architettura Religiosa",
        lat: 44.4954,
        lng: 11.3486,
        ref: "Ciclio della Vita di Santa Cecilia | F. Francia, A. Aspertini, L. Costa",
        descrizione: "La 'Sistina di Bologna': cappella unifamiliare affrescata nel 1505–1506 per volere di Giovanni II Bentivoglio. Luogo di prestigio e traccia del mecenatismo della famiglia, custodisce un eccezionale ciclo di 10 riquadri sulla vita di Santa Cecilia e San Valeriano, capolavoro collettivo di F. Francia, L. Costa, A. Aspertini e altri artisti molto attivi sul suolo bolognese.",
        link: "./items/Item_04.html"
    },
    {
        titolo: "Palazzo d'Accursio (Palazzo Comunale)",
        categoria: "Centro di Potere e Sede delle Istituzioni",
        lat: 44.4938,
        lng: 11.3424,
        ref: "Medaglia di Giovanni II Bentivoglio | Sperandio Savelli",
        descrizione: "Sede del governo cittadino e degli Anziani, contesa tra l'oligarchia bentivolesca e la legazione pontificia. Sebbene Bologna fosse una signoria, per tutta la durata della dinastia Bentivoglio le antiche istituzioni comunali non vennero mai soprresse. Sotto Giovanni II ospitò cerimonie pubbliche, eventi di Stato ed interventi architettonici curati dai maestri di corte.",
        link: "./items/Item_05.html"
    }
];

    // Rendering Marker Mappa
    luoghiBentivoleschi.forEach(function (luogo) {
        var marker = L.marker([luogo.lat, luogo.lng], { icon: iconaRossoRinascimento }).addTo(map);

        var popupContent = `
            <div style="font-family: 'EB Garamond', serif; min-width: 170px;">
                <span class="badge badge-bentivoglio p-1 mb-1">${luogo.categoria}</span>
                <h6 style="font-family: 'Cormorant Garamond', serif; font-weight: bold; color: #CE0101;">${luogo.titolo}</h6>
                <h6 style="font-size: 0.85rem; margin-bottom: 6px;">${luogo.ref}<h6>

                <a href="${luogo.link}" class="btn btn-sm btn-rinascimento text-white btn-block text-center">Scheda Item</a>
            </div>
        `;
        marker.bindPopup(popupContent);

        marker.on('click', function() {
            aggiornaSidebarDettaglio(luogo.titolo, luogo.categoria, luogo.descrizione, luogo.link);
        });
    });


    // ==========================================================================
    // 2. GESTIONE GRAFO SEMANTICO (CYTOSCAPE.JS)
    // ==========================================================================

    var cy = cytoscape({
    container: document.getElementById('cy-network-container'),

    elements: [
        // NODI
        { data: { id: 'giovanni2', label: 'Giovanni II Bentivoglio', tipo: 'Persona', desc: 'Signore de facto di Bologna (1463–1506).' } },
        { data: { id: 'pala_bentivoglio', label: 'Pala Bentivoglio', tipo: 'Item', desc: 'Pala votiva commissionata a Lorenzo Costa nel 1488.' } },
        { data: { id: 'lorenzo_costa', label: 'Lorenzo Costa', tipo: 'Persona', desc: 'Pittore di corte dei Bentivoglio.' } },
        { data: { id: 'domus_aurea', label: 'Domus Aurea', tipo: 'Luogo', desc: 'Palazzo principesco della dinastia Bentivoglio.' } },
        { data: { id: 'nozze_1487', label: 'Nozze Annibale II e Lucrezia d\'Este', tipo: 'Evento', desc: 'Sfarzoso matrimonio politico del 1487.' } },
        { data: { id: 'sabadino_arienti', label: 'Giovanni Sabadino Degli Arienti', tipo:'Persona', desc: 'Scrittore, politico e cronista della fazione dei Bentivoglio.' } },
        { data: { id: 'hymenaeus', label: 'Hymenaeus Bentivolus', tipo: 'Item', desc: 'Sfarziosa testimonianza di Sabadino degli Arienti delle nozze di Annibale e Lucrezia.' } },
        { data: { id: 'santa_cecilia', label: 'Ciclo della vita di Santa Cecilia', tipo: 'Item', desc: 'Ciclo affrescato del 1506 ritraente la vita di Santa Cecilia.' } },
        { data: { id: 'san_giacomo', label: 'Basilica di San Giacomo Maggiore', tipo: 'Luogo', desc: 'Chiesa romanica luogo di riferimento per la famiglia Bentivoglio.' } },
        { data: { id: 'giulio2', label: 'Papa Giulio II', tipo: 'Persona', desc: 'Pontefice avversario di Giovanni.' } },
        { data: { id: 'cacciata_bentivoglio', label: 'Cacciata dei Bentivoglio', tipo: 'Evento', desc: 'Cacciata dei Bentivoglio e fine della dinastia.' } },
        { data: { id: 'giacomo_gigli', label: 'Giacomo Gigli', tipo: 'Persona', desc: 'Storico, redige una cronaca degli ultimi anni della signoria e la restaurazione del potere papale.' } },

        // ARCHI (RELAZIONI)
        { data: { source: 'giovanni2', target: 'pala_bentivoglio', label: 'commissiona' } },
        { data: { source: 'pala_bentivoglio', target: 'san_giacomo', label: 'si trova in' } },
        { data: { source: 'lorenzo_costa', target: 'pala_bentivoglio', label: 'dipinge' } },
        { data: { source: 'lorenzo_costa', target: 'santa_cecilia', label: 'lavora a' } },
        { data: { source: 'giovanni2', target: 'domus_aurea', label: 'risiede in' } },
        { data: { source: 'giovanni2', target: 'nozze_1487', label: 'promuove' } },
        { data: { source: 'giovanni2', target: 'santa_cecilia', label: 'commissiona' } },
        { data: { source: 'santa_cecilia', target: 'san_giacomo', label: 'si trova in' } },
        { data: { source: 'nozze_1487', target: 'domus_aurea', label: 'si svolgono in' } },
        { data: { source: 'domus_aurea', target: 'cacciata_bentivoglio', label: 'distrutta durante' } },
        { data: { source: 'cacciata_bentivoglio', target: 'giulio2', label: 'per volere di' } },
        { data: { source: 'giulio2', target: 'giovanni2', label: 'è avversario di' } },
        { data: { source: 'sabadino_arienti', target: 'giovanni2', label: 'è fedele a' } },
        { data: { source: 'sabadino_arienti', target: 'hymenaeus', label: 'scrive' } },
        { data: { source: 'hymenaeus', target: 'nozze_1487', label: 'ci testimonia' } },
        { data: { source: 'giacomo_gigli', target: 'cacciata_bentivoglio', label: 'scrive una cronaca durante' } }
    ],

    style: [
        /* ==================== 1. STILE GENERALE NODI ==================== */
        {
            selector: 'node',
            style: {
                'label': 'data(label)',
                'font-family': '"Cormorant Garamond", Georgia, serif',
                'font-size': '13px',
                'font-weight': '600',
                'color': '#2C2A29',
                'text-valign': 'bottom',
                'text-margin-y': 6,
                'text-background-color': '#FAF6ED',
                'text-background-opacity': 0.85,
                'text-background-padding': '3px',
                'text-background-shape': 'roundrectangle',
                'width': '38px',
                'height': '38px',
                'border-width': 2.5,
                'border-color': '#FEE56E', // Oro Bentivolesco
                'overlay-padding': '6px',
                'transition-property': 'background-color, border-color, width, height',
                'transition-duration': '0.2s'
            }
        },

        /* ==================== 2. PALETTE TIPOLOGICA ==================== */
        {
            selector: 'node[tipo = "Item"]',
            style: {
                'background-color': '#CE0101', // Rosso Bentivoglio
                'shape': 'ellipse'
            }
        },
        {
            selector: 'node[tipo = "Persona"]',
            style: {
                'background-color': '#1D4ED8', // Blu Stemma
                'shape': 'ellipse'
            }
        },
        {
            selector: 'node[tipo = "Luogo"]',
            style: {
                'background-color': '#15803D', // Verde Rinascimentale
                'shape': 'diamond',
                'width': '42px',
                'height': '42px'
            }
        },
        {
            selector: 'node[tipo = "Evento"]',
            style: {
                'background-color': '#C2410C', // Terracotta / Arancio Stuccato
                'shape': 'round-rectangle'
            }
        },

        /* ==================== 3. STILE ARCHI (EDGES) ==================== */
        {
            selector: 'edge',
            style: {
                'width': 2,
                'line-color': '#C8C2B4',
                'line-style': 'solid',
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'target-arrow-color': '#9E9484',
                'arrow-scale': 0.9,
                'label': 'data(label)',
                'font-family': '"EB Garamond", serif',
                'font-size': '11px',
                'font-style': 'italic',
                'color': '#66615B',
                'text-background-color': '#FAF6ED',
                'text-background-opacity': 0.9,
                'text-background-padding': '2px',
                'text-rotation': 'autorotate'
            }
        },

        /* ==================== 4. EFFETTI INTERATTIVI (HOVER / SELECTION) ==================== */
        {
            selector: 'node:selected',
            style: {
                'border-color': '#1C1917',
                'border-width': 4,
                'shadow-blur': 12,
                'shadow-color': '#000000',
                'shadow-opacity': 0.3
            }
        },
        {
            selector: 'edge:selected',
            style: {
                'width': 3,
                'line-color': '#CE0101',
                'target-arrow-color': '#CE0101',
                'color': '#CE0101'
            }
        }
    ],

    /* ==================== 5. ALGORITMO DI LAYOUT (COSE ENHANCED) ==================== */
    layout: {
        name: 'cose',
        animate: true,
        animationDuration: 500,
        refresh: 20,
        fit: true,
        padding: 40,
        nodeRepulsion: function( node ){ return 400000; },
        idealEdgeLength: function( edge ){ return 100; },
        edgeElasticity: function( edge ){ return 100; },
        gravity: 80,
        numIter: 1000,
        initialTemp: 1000,
        coolingFactor: 0.99,
        minTemp: 1.0
    }
});

var dettagliEntita = {
    'giovanni2': {
        titolo: 'Giovanni II Bentivoglio',
        tipoBadge: 'badge-primary',
        tipoTesto: 'Persona (Attore Storico)',
        sottotitolo: '1443 – 1508 | Signore de facto di Bologna (1463–1506)',
        descrizione: 'Capo della famiglia Bentivoglio e governatore di fatto di Bologna. Sotto il suo patriziato la città conobbe un profondo rinnovamento artistico, urbano e curiale.',
        viaf: 'viaf.org/viaf/59942541',
        wikidata: 'Q194996',
        altri: 'Zeri 31730',
        correlati: [
            { link: './items/Item_01.html', icona: 'fas fa-paint-brush text-danger', testo: 'Pala Bentivoglio (Lorenzo Costa, 1488)' },
            { link: './items/Item_02.html', icona: 'fas fa-building text-success', testo: 'Domus Aurea (Palazzo Bentivoglio)' }
        ]
    },
    'pala_bentivoglio': {
        titolo: 'Pala Bentivoglio',
        tipoBadge: 'badge-bentivoglio',
        tipoTesto: 'Item Culturale',
        sottotitolo: 'Lorenzo Costa | 1488 | Olio su tavola (Cappella Bentivoglio)',
        descrizione: 'Pala d\'altare commissionata da Giovanni II Bentivoglio come ex-voto per lo scampato pericolo della congiura dei Malvezzi.',
        viaf: 'n/a',
        wikidata: 'Q3736352',
        altri: 'Zeri 31197',
        correlati: [
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Giovanni II Bentivoglio (Committente)' },
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Lorenzo Costa (Pittore)' },
        ]
    },
    'lorenzo_costa': {
        titolo: 'Lorenzo Costa',
        tipoBadge: 'badge-primary',
        tipoTesto: 'Persona (Pittore)',
        sottotitolo: '1460 – 1535 | Pittore di corte bentivolesco',
        descrizione: 'Pittore italiano del Rinascimento, attivo a Bologna alla corte dei Bentivoglio dove realizzò affreschi e pale d\'altare per la famiglia.',
        viaf: 'viaf.org/viaf/47035057',
        wikidata: 'Q357807',
        altri: 'n/a',
        correlati: [
            { link: './items/Item_01.html', icona: 'fas fa-paint-brush text-danger', testo: 'Pala Bentivoglio (1488)' },
            { link: './items/Item_04.html', icona: 'fas fa-paint-brush text-danger', testo: 'Ciclo della vita di Santa Cecilia (1505)' },
        ]
    },
    'domus_aurea': {
        titolo: 'Domus Aurea (Palazzo Bentivoglio)',
        tipoBadge: 'badge-success',
        tipoTesto: 'Luogo Urbano',
        sottotitolo: 'Strada San Donato (oggi Via Zamboni) | Distrutto nel 1507',
        descrizione: 'Sontuosa residenza principesca fatta erigere da Sante e Giovanni II Bentivoglio, considerata uno dei palazzi più imponenti del Rinascimento italiano.',
        viaf: 'viaf.org/viaf/242772009',
        wikidata: 'Q3093956',
        altri: 'n/a',
        correlati: [
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Giovanni II Bentivoglio (Residente)' },
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Papa Giulio II (La fa distruggere)' },
        ]
    },
    'nozze_1487': {
        titolo: 'Nozze Annibale II e Lucrezia d\'Este',
        tipoBadge: 'badge-warning text-dark',
        tipoTesto: 'Evento Storico',
        sottotitolo: '28 Gennaio 1487 | Bologna',
        descrizione: 'Celebri nozze politiche tra l\'erede di Giovanni II e la figlia illegittima di Ercole I d\'Este, accompagnate da giostre, conviti e apparati effimeri.',
        viaf: 'n/a',
        wikidata: 'n/a',
        altri: 'n/a',
        correlati: [
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Giovanni II Bentivoglio (Promotore)' },
            { link: './items/Item_02.html', icona: 'fas fa-building text-success', testo: 'Domus Aurea (Luogo dell\'evento)' },
        ]
    },
    'santa_cecilia': {
        titolo: 'Ciclo della Vita di Santa Cecilia',
        tipoBadge: 'badge-bentivoglio',
        tipoTesto: 'Item Culturale',
        sottotitolo: 'F. Francia, L. Costa, A. Aspertini | 1505 - 1506 | Affreschi', 
        descrizione: 'Ciclo di affreschi che ripercorrono i principali eventi della vita di Santa Cecilia martire.',
        viaf: 'n/a',
        wikidata: 'Q17013094',
        altri: 'Zeri 30154',
        correlati: [
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Giovanni II Bentivoglio (Promotore)' },
            { link: './items/Item_09.html', icona: 'fas fa-building text-success', testo: 'Basilica di San Giacomo Maggiore (Sede)' },
        ]
    },
    'san_giacomo': {
        titolo: 'Basilica di San Giacomo Maggiore',
        tipoBadge: 'badge-success',
        tipoTesto: 'Luogo Urbano',
        sottotitolo: '(odierna) Piazza Rossini | XIV Secolo',
        descrizione: 'Chiesa tempio della signoria bentivolesca. Custodisce la Cappella di famiglia e cicli pittorici rinascimentali commissionati dai Bentivoglio.',
        viaf:'viaf.org/viaf/129447214',
        wikidata: 'Q2446870',
        altri: 'n/a',
        correlati: [
            { link: './items/Item_04.html', icona: 'fas fa-paint-brush text-danger', testo: 'Ciclo della vita di Santa Cecilia (1505)'},
            { link: './items/Item_01.html', icona: 'fas fa-paint-brush text-danger', testo: 'Pala Bentivoglio (1488)'}
        ]
    },
    'giulio2': {
        titolo: 'Papa Giulio II',
        tipoBadge: 'badge-primary',
        tipoTesto: 'Persona (Pontefice)',
        sottotitolo: '1443 - 1513 | Pontefice dal 1503 al 1513',
        descrizione: 'Capo della Chiesa di Roma nel periodo finale della signoria bolognese. Sotto il suo pontificato, lo Stato Pontificio riprende diretto controllo di numerosi territori, tra cui proprio Bologna.',
        viaf:'viaf.org/viaf/51697938',
        wikidata: 'Q80516',
        altri: 'n/a',
        correlati: [
            { link: '#', icona: 'fas fa-solid fa-hourglass text-warning', testo: 'Cacciata dei Bentivoglio'},
            { link: './items/Item_02.html', icona: 'fas fa-building text-success', testo: 'Domus Aurea (Demolito)' }
        ]
    },
    'giacomo_gigli': {
        titolo: 'Giacomo Gigli',
        tipoBadge: 'badge-primary',
        tipoTesto: 'Persona (Cronista)',
        sottotitolo: '1448 - 1513 | Cronista e testimone oculare bolognese',
        descrizione: 'Cittadino bolognese, redige una cronaca degli anni dal 1494 al 1513. Testimonia gli avvenimenti riguardanti Bologna sopratutto negli ultimi anni del dominio bentivolesco.',
        viaf:'viaf.org/viaf/307376339',
        wikidata: 'n/a',
        altri: 'n/a',
        correlati: [
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Giovanni II Bentivoglio'},
            { link: '#', icona: 'fas fa-solid fa-hourglass text-warning', testo: 'Cacciata dei Bentivoglio'},
        ]
    },
    'cacciata_bentivoglio': {
        titolo: 'Cacciata dei Bentivoglio',
        tipoBadge: 'badge-warning text-dark',
        tipoTesto: 'Evento Storico',
        sottotitolo: 'Fine della signoria e restaurazione papale',
        descrizione: 'Papa Giulio II, con l\'aiuto delle truppe francesi, entra a Bologna e ne riprende il controllo. Giovanni, Ginevra e i figli fuggono nei territori milanesi.',
        viaf: 'n/a',
        wikidata: 'n/a',
        altri: 'n/a',
        correlati: [
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Papa Giulio II (Vincitore)' },
            { link: './items/Item_02.html', icona: 'fas fa-building text-success', testo: 'Domus Aurea (Distrutta)' },
        ]
    },
    'sabadino_arienti': {
        titolo: 'Giovanni Sabadino Degli Arienti',
        tipoBadge: 'badge-primary',
        tipoTesto: 'Persona (Cronista)',
        sottotitolo: 'Cronista e politico bolognese',
        descrizione: 'Cittadino bolognese nonchè uomo di fiducia di Giovanni II, redige una cronaca delle grandiose nozze di Annibale e Lucrezia del Gennaio 1487.',
        viaf:'viaf.org/viaf/44293577',
        wikidata: 'Q3768078',
        altri: 'n/a',
        correlati: [
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Giovanni II Bentivoglio (signore)'},
            { link: '#', icona: 'fas fa-solid fa-hourglass text-warning', testo: 'Nozze Annibale II e Lucrezia d\'Este'},
        ]
    },
    'hymenaeus': {
        titolo: 'Hymenaeus Bentivolus',
        tipoBadge: 'badge-bentivoglio',
        tipoTesto: 'Item Culturale',
        sottotitolo: 'Giovanni Sabadino Degli Arienti | 1487',
        descrizione: 'Resoconto dettagliato delle grandiose e sfarzose nozze tra il figlio di Giovanni, Annibale II Bentivoglio, e Lucrezia d\'Este, figlia del duca di Ferrara.',
        viaf: 'n/a',
        wikidata: 'n/a',
        altri: 'n/a',
        correlati: [
            { link: '#', icona: 'fas fa-user text-primary', testo: 'Giovanni Sabadino Degli Arienti (Autore)' },
            { link: '#', icona: 'fas fa-solid fa-hourglass text-warning', testo: 'Nozze Annibale II e Lucrezia d\'Este (Evento)'},
        ]
    },
};

/* ==================== EVENT LISTENER SELEZIONE NODO ==================== */
cy.on('tap', 'node', function(evt) {
    var node = evt.target;
    var nodeData = node.data();
    var id = nodeData.id;
    var info = dettagliEntita[id];

    // Nascondi l'empty state e mostra il contenitore dettagli
    $('#nodo-empty-state').hide();
    var $content = $('#nodo-dettaglio-content');
    $content.empty().show();

    // Generazione blocchi ontologici CIDOC CRM e relazioni
    var cidocBlockHtml = renderCidocMetadata(nodeData.tipo, info);
    var cidocRelationsHtml = renderCidocRelations(node);

    // Se abbiamo dati dettagliati nel dizionario
    if (info) {
        var correlatiHtml = '';
        if (info.correlati && info.correlati.length > 0) {
            correlatiHtml += '<h6 class="font-weight-bold text-dark mt-3">Elementi Correlati:</h6><div class="list-group list-group-flush small border rounded">';
            info.correlati.forEach(function(item) {
                correlatiHtml += '<a href="' + item.link + '" class="list-group-item list-group-item-action bg-light">' +
                                 '<i class="' + item.icona + ' mr-2"></i> ' + item.testo + '</a>';
            });
            correlatiHtml += '</div>';
        }

        var html = '<span class="badge ' + info.tipoBadge + ' mb-2">' + info.tipoTesto + '</span>' +
                   '<h3 class="text-danger font-weight-bold mb-1" style="font-family:\'Cormorant Garamond\';">' + info.titolo + '</h3>' +
                   '<p class="small text-muted font-italic mb-3">' + info.sottotitolo + '</p>' +
                   '<hr style="border-color: var(--bordo-pergamenato);">' +
                   '<h6 class="font-weight-bold text-dark">Descrizione / Ruolo:</h6>' +
                   '<p class="small text-justify">' + info.descrizione + '</p>' +
                   cidocBlockHtml +
                   cidocRelationsHtml +
                   correlatiHtml;

        $content.html(html);
    } else {
        // Fallback generico usando i soli dati base del nodo
        $content.html(
            '<span class="badge badge-secondary mb-2">' + (nodeData.tipo || 'Entità') + '</span>' +
            '<h3 class="text-danger font-weight-bold mb-1" style="font-family:\'Cormorant Garamond\';">' + nodeData.label + '</h3>' +
            '<p class="small text-muted mb-3">' + (nodeData.desc || 'Nessuna descrizione disponibile.') + '</p>' +
            cidocBlockHtml +
            cidocRelationsHtml
        );
    }
});


    // ==========================================================================
    // 3. FUNZIONE CONDIVISA: AGGIORNAMENTO SIDEBAR DI DESTRA
    // ==========================================================================

    function aggiornaSidebarDettaglio(titolo, categoria, descrizione, link) {
        var emptyState = document.getElementById('nodo-empty-state');
        var contentState = document.getElementById('nodo-dettaglio-content');

        if(emptyState) emptyState.style.display = 'none';
        if(contentState) {
            contentState.style.display = 'block';
            contentState.innerHTML = `
                <span class="badge badge-bentivoglio mb-2">${categoria}</span>
                <h3 class="text-danger font-weight-bold mb-1" style="font-family:'Cormorant Garamond';">${titolo}</h3>
                <hr style="border-color: var(--bordo-pergamenato);">
                <h6 class="font-weight-bold text-dark">Informazioni & Relazioni:</h6>
                <p class="small text-justify capilettera">${descrizione}</p>
                <a href="${link}" class="btn btn-sm btn-rinascimento btn-block mt-4">Consulta Scheda Dettaglio</a>
            `;
        }
    }


    // ==========================================================================
    // 4. FIX LAYOUT PER TABS BOOTSTRAP 4.6
    // ==========================================================================

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if (e.target.id === 'mappa-tab') {
            setTimeout(function() { map.invalidateSize(); }, 150);
        } else if (e.target.id === 'grafo-tab') {
            setTimeout(function() { cy.resize(); cy.fit(); }, 150);
        }
    });

});
