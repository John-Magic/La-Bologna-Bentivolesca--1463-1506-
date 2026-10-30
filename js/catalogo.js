// ARRAY DATI COMPLETO DEGLI ITEM
var tuttiGliItem = [
    // ================= PAGINA 1 =================
    {
        titolo: "Pala Bentivoglio",
        autore: "Lorenzo Costa (1488)",
        descrizione: "Grande pala votiva raffigurante la Famiglia di Giovanni II Bentivoglio in preghiera dinanzi alla Vergine in trono, situata nella Cappella Bentivoglio in San Giacomo Maggiore.",
        categoria: "pittura", // Identificatore per il filtro
        badgeClass: "badge-bentivoglio",
        badgeTesto: "Pittura / Pala d'Altare",
        iconaMeta: "fas fa-paint-brush",
        dcMeta: "DC:Painting",
        imgUrl: "images/Pala-Bentivoglio.jpg",
        link: "items/Item_01.html"
    },
    {
        titolo: "Domus Aurea (Palazzo Bentivoglio)",
        autore: "Bologna (via del Guasto / via San Donato)",
        descrizione: "La monumentale residenza principesca dei Bentivoglio edificata a partire dal 1460 e rasa al suolo dal popolo bolognese nel 1507 dopo la cacciata della dinastia.",
        categoria: "architettura",
        badgeClass: "badge-success",
        badgeTesto: "Architettura Civile",
        iconaMeta: "fas fa-map-marker-alt",
        dcMeta: "DC:Architecture",
        imgUrl: "images/Palazzo-Bentivoglio.jpg",
        link: "items/Item_02.html"
    },
    {
        titolo: "Cronica",
        autore: "Giacomo Gigli (1494 - 1513)",
        descrizione: "Cronaca manoscritta di un cittadino bolognese contenente resoconti dettagliati sulla seconda metà del dominio di Giovanni ed i primi anni della restaurazione papale.",
        categoria: "fonti",
        badgeClass: "badge-warning text-dark",
        badgeTesto: "Manoscritto / TEI",
        iconaMeta: "fas fa-book",
        dcMeta: "TEI-XML",
        imgUrl: "images/manoscritto.jpg",
        link: "items/Item_03.html"
    },
    {
        titolo: "Ciclo della Vita di S. Cecilia",
        autore: "F. Francia, L. Costa, A. Aspertini (1505–1506)",
        descrizione: "Capolavoro del Rinascimento bolognese commissionato da Giovanni II Bentivoglio nell'Oratorio di Santa Cecilia prima della caduta del suo regime.",
        categoria: "pittura",
        badgeClass: "badge-bentivoglio",
        badgeTesto: "Pittura / Ciclo di Affreschi",
        iconaMeta: "fas fa-paint-brush",
        dcMeta: "DC:Fresco",
        imgUrl: "images/Sposalizio-Santa-Cecilia.jpg",
        link: "items/Item_04.html"
    },
    {
        titolo: "Medaglia di Giovanni II Bentivoglio",
        autore: "Sperandio Savelli (c. 1462)",
        descrizione: "Medaglia bronzea con il profilo di Giovanni II sul recto e l'impresa araldica sul verso, celebrativa del potere e dell'autorità principesca.",
        categoria: "oggetti",
        badgeClass: "badge-info",
        badgeTesto: "Numismatica / Medaglia",
        iconaMeta: "fas fa-coins",
        dcMeta: "DC:Medal",
        imgUrl: "images/Medaglia.jpg",
        link: "items/Item_05.html"
    },
    {
        titolo: "Relazione delle Nozze del 1487",
        autore: "G. Sabadino degli Arienti (1487)",
        descrizione: "Resoconto manoscritto delle sfarzose nozze tra Annibale II Bentivoglio e Lucrezia d'Este, con il dettaglio dei banchetti e dei cortei curiali.",
        categoria: "fonti",
        badgeClass: "badge-warning text-dark",
        badgeTesto: "Manoscritto / TEI",
        iconaMeta: "fas fa-book",
        dcMeta: "TEI-XML",
        imgUrl: "images/Hymeneus.jpg",
        link: "items/Item_06.html"
    },

    // ================= PAGINA 2 =================
    {
        titolo: "Dittico Bentivoglio (Dipinto)",
        autore: "Ercole Roberti (1475)",
        descrizione: "Quadro che raffigura i due coniugi Giovanni e Ginevra, riprendendo pose e stile del più famoso 'Doppio Ritratto dei Duchi d'Urbino' di Piero della Francesca",
        categoria: "pittura",
        badgeClass: "badge-bentivoglio",
        badgeTesto: "Pittura / Dittico",
        iconaMeta: "fas fa-paint-brush",
        dcMeta: "DC:Painting",
        imgUrl: "images/Dittico.jpg",
        link: "items/Item_07.html"
    },
    {
        titolo: "Compianto sul Cristo Morto",
        autore: "Niccolò dell'Arca (1463-1490)",
        descrizione: "Capolavoro assoluto della scultura terracotta rinascimentale, che testimonia il triofo delle arti nella città durante il dominio dei Bentivoglio.",
        categoria: "scultura",
        badgeClass: "badge-bentivoglio",
        badgeTesto: "Scultura / Terracotta",
        iconaMeta: "fas fa-monument",
        dcMeta: "DC:Sculpture",
        imgUrl: "images/Compianto.jpg",
        link: "items/Item_08.html"
    },
    {
        titolo: "Basilica di San Giacomo Maggiore ",
        autore: "Bologna (piazza Rossini 2)",
        descrizione: "Chiesa Romanica del XIV secolo, divenne punto di riferimento dei Bentivoglio, che vi fecero realizzare la cappella di famiglia e il portico lungo l'attuale via Zamboni.",
        categoria: "architettura",
        badgeClass: "badge-success",
        badgeTesto: "Architettura Civile",
        iconaMeta: "fas fa-map-marker-alt",
        dcMeta: "DC:Architecture",
        imgUrl: "images/San-Giacomo.jpg",
        link: "items/Item_09.html"
    },
    {
        titolo: "Daga Cinquedea con Stemma Bentivolesco",
        autore: "Manifattura Emiliana (Fine XV secolo)",
        descrizione: "Arma di lusso finemente decorata con iscrizioni, scene allegoriche e stemmi. Di uso più celebrativo, è appaartenuta probabilmente ad Annibale II",
        categoria: "oggetti",
        badgeClass: "badge-info",
        badgeTesto: "Arma / Oggetto Cerimoniale",
        iconaMeta: "fa-solid fa-wand-magic",
        dcMeta: "DC:Object",
        imgUrl: "images/Daga.jpg",
        link: "items/Item_10.html"
    },
    {
        titolo: "Particolare di Bartolomeo Colleoni (Affresco La Battaglia della Riccardina)",
        autore: "Girolamo Romanino (1530)",
        descrizione: "Grande affresco murale situato nel salone del castello di Malpaga (appartenuto a Colleoni) che raffigura la Battaglia della Riccardina del 1467",
        categoria: "pittura",
        badgeClass: "badge-bentivoglio",
        badgeTesto: "Pittura / Affresco",
        iconaMeta: "fas fa-paint-brush",
        dcMeta: "DC:Fresco",
        imgUrl: "images/Riccardina.jpg",
        link: "items/Item_11.html"
    },
    {
        titolo: "Ritratto di Giulio II",
        autore: "Raffaello Sanzio (1511)",
        descrizione: "Ritratto ufficiale di Papa Giulio II Della Rovere, commissionato a Raffaello Sanzio dallo stesso pontefice e del quale ne esistono tre copie diverse.",
        categoria: "pittura",
        badgeClass: "badge-bentivoglio",
        badgeTesto: "Pittura / Dipinto",
        iconaMeta: "fas fa-paint-brush",
        dcMeta: "DC:Painting",
        imgUrl: "images/Giulio-II.jpg",
        link: "items/Item_12.html"
    },
];

// STATO DELLO SCRIPT
var categoriaAttiva = "all";
var paginaCorrente = 1;
var itemPerPagina = 6;
var itemFiltrati = [];

// FUNZIONE DI FILTRAGGIO
function applicaFiltro(categoria) {
    categoriaAttiva = categoria;
    paginaCorrente = 1; // Reset alla prima pagina ad ogni cambio filtro

    if (categoria === "all") {
        itemFiltrati = tuttiGliItem;
    } else {
        itemFiltrati = tuttiGliItem.filter(function(item) {
            return item.categoria === categoria;
        });
    }

    mostraPagina(paginaCorrente);
}

// FUNZIONE DI RENDERIZZAZIONE CARD
function mostraPagina(pagina) {
    paginaCorrente = pagina;
    var $container = $('#catalogo-container');
    $container.empty();

    if (itemFiltrati.length === 0) {
        $container.html(`
            <div class="col-12 text-center my-5">
                <p class="text-muted font-italic">Nessun elemento trovato per la tipologia selezionata.</p>
            </div>
        `);
        $('#pagination-nav').hide();
        return;
    }

    var inizio = (pagina - 1) * itemPerPagina;
    var fine = inizio + itemPerPagina;
    var itemsDaMostrare = itemFiltrati.slice(inizio, fine);

    itemsDaMostrare.forEach(function(item) {
        var cardHtml = `
            <div class="col-md-4 mb-4">
                <div class="card card-rinascimento h-100 shadow-sm">
                    <div class="position-relative">
                        <img src="${item.imgUrl}" class="card-img-top border-bottom" alt="${item.titolo}">
                        <span class="badge ${item.badgeClass} position-absolute p-2" style="top:10px; left:10px;">${item.badgeTesto}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold text-danger mb-1" style="font-family:'Cormorant Garamond'; font-size: 1.3rem;">${item.titolo}</h5>
                        <p class="small text-muted font-italic mb-2"><i class="${item.iconaMeta} mr-1"></i> ${item.autore}</p>
                        <p class="card-text small text-justify capilettera">${item.descrizione}</p>
                    </div>
                    <div class="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center">
                        <small class="text-muted"><i class="fas fa-barcode mr-1"></i> ${item.dcMeta}</small>
                        <a href="${item.link}" class="btn btn-sm btn-rinascimento">Vedi Scheda</a>
                    </div>
                </div>
            </div>
        `;
        $container.append(cardHtml);
    });

    aggiornaPaginazioneUI();
}

// FUNZIONE AGGIORNAMENTO PAGINAZIONE (Mantiene nota stilistica)
function aggiornaPaginazioneUI() {
    var totalePagine = Math.ceil(itemFiltrati.length / itemPerPagina);
    var $paginationNav = $('#pagination-nav');

    if (totalePagine <= 1) {
        $paginationNav.hide();
        return;
    }

    $paginationNav.show();

    // Gestione pulsante Precedente
    if (paginaCorrente === 1) {
        $('#btn-prev-li').addClass('disabled');
        $('#btn-prev').addClass('text-muted').removeClass('text-danger');
    } else {
        $('#btn-prev-li').removeClass('disabled');
        $('#btn-prev').removeClass('text-muted').addClass('text-danger');
    }

    // Gestione pulsante Successivo
    if (paginaCorrente === totalePagine) {
        $('#btn-next-li').addClass('disabled');
        $('#btn-next').addClass('text-muted').removeClass('text-danger');
    } else {
        $('#btn-next-li').removeClass('disabled');
        $('#btn-next').removeClass('text-muted').addClass('text-danger');
    }

    // Reset stilistico di tutti i numeri di pagina
    $('.page-num-li').removeClass('active');
    $('.page-num-li a').removeClass('bg-bentivoglio border-danger text-white').addClass('text-danger');

    // Applica lo stile bentivolesco SOLO alla pagina attiva corrente
    $('#page-' + paginaCorrente + '-li').addClass('active');
    $('#page-' + paginaCorrente + '-li a')
        .addClass('bg-bentivoglio border-danger text-white')
        .removeClass('text-danger');
}

// INITIALIZATION & EVENT LISTENERS
$(document).ready(function() {
    // Carica tutti gli item all'avvio
    applicaFiltro('all');

   // Listener sui Pulsanti Filtro con conservazione dello stile
$('.btn-filter').on('click', function(e) {
    e.preventDefault();

    // Rimuovi lo stato attivo da tutti i filtri
    $('.btn-filter').removeClass('active btn-bentivoglio text-white').addClass('btn-outline-danger');
    
    // Applica lo stato attivo mantenendo la nota stilistica bentivolesca
    $(this).addClass('active btn-bentivoglio text-white').removeClass('btn-outline-danger');

    // Estrazione valore filtro e applicazione
    var filtro = $(this).attr('data-filter');
    applicaFiltro(filtro);
});

    // Listener Paginazione: Numeri di pagina
    $(document).on('click', '.page-num', function(e) {
        e.preventDefault();
        var numPagina = parseInt($(this).attr('data-page'));
        mostraPagina(numPagina);
        $('html, body').animate({ scrollTop: $('#catalogo-container').offset().top - 100 }, 'fast');
    });

    // Listener Paginazione: Precedente
    $('#btn-prev').on('click', function(e) {
        e.preventDefault();
        if (paginaCorrente > 1) {
            mostraPagina(paginaCorrente - 1);
            $('html, body').animate({ scrollTop: $('#catalogo-container').offset().top - 100 }, 'fast');
        }
    });

    // Listener Paginazione: Successivo
    $('#btn-next').on('click', function(e) {
        e.preventDefault();
        var totalePagine = Math.ceil(itemFiltrati.length / itemPerPagina);
        if (paginaCorrente < totalePagine) {
            mostraPagina(paginaCorrente + 1);
            $('html, body').animate({ scrollTop: $('#catalogo-container').offset().top - 100 }, 'fast');
        }
    });
});