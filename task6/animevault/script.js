/* ANIMEVAULT — script.js — Ponytail: Simple. Clean. Intentional. Functional. */

// ── Data ──────────────────────────────────────────────────────
const animeData = [
  { id:1,  title:"Attack on Titan",               japaneseTitle:"Shingeki no Kyojin",      category:"Action",       genres:["Action","Dark Fantasy","Drama"],         year:2013, status:"Completed", format:"TV Series",   episodes:89,   rating:9.0, studio:"WIT Studio / MAPPA", creator:"Hajime Isayama",     duration:"24 min/ep", image:"./assets/images/1.jpg",  embed:"https://www.youtube.com/embed/MGRm4IzK1SQ", featured:true,  description:"Eren Yeager vows to exterminate the titans after they destroy his hometown and kill his mother. Humanity's survival depends on what lies in his basement." },
  { id:2,  title:"Demon Slayer",                  japaneseTitle:"Kimetsu no Yaiba",         category:"Action",       genres:["Action","Fantasy","Historical"],          year:2019, status:"Ongoing",   format:"TV Series",   episodes:55,   rating:8.6, studio:"ufotable",           creator:"Koyoharu Gotouge",   duration:"24 min/ep", image:"./assets/images/2.jpg",  embed:"https://www.youtube.com/embed/VQGCKyvzIM4",  featured:true,  description:"Tanjirou's family is slaughtered by a demon. His sister Nezuko survives but is turned into one. He joins the Demon Slayer Corps to find a cure and avenge his kin." },
  { id:3,  title:"Jujutsu Kaisen",                japaneseTitle:"Jujutsu Kaisen",           category:"Action",       genres:["Action","Supernatural"],                  year:2020, status:"Ongoing",   format:"TV Series",   episodes:47,   rating:8.7, studio:"MAPPA",              creator:"Gege Akutami",        duration:"24 min/ep", image:"./assets/images/3.jpg",  embed:"https://www.youtube.com/embed/VlX1P_a8O1c",  featured:true,  description:"Yuuji Itadori swallows a cursed object to save his friends and becomes host to a powerful curse — then enters a secret school that trains sorcerers to fight curses." },
  { id:4,  title:"One Piece",                     japaneseTitle:"One Piece",                category:"Adventure",    genres:["Adventure","Fantasy","Action"],           year:1999, status:"Ongoing",   format:"TV Series",   episodes:1100, rating:8.9, studio:"Toei Animation",     creator:"Eiichiro Oda",        duration:"24 min/ep", image:"./assets/images/4.jpg",  embed:"https://www.youtube.com/embed/S8_YwFLCh4U",  featured:true,  description:"Monkey D. Luffy sets out to sea to become the Pirate King after eating a Devil Fruit that gives him rubber powers. He assembles a crew across the vast Grand Line." },
  { id:5,  title:"Hunter x Hunter",               japaneseTitle:"Hunter x Hunter (2011)",   category:"Adventure",    genres:["Adventure","Fantasy","Action"],           year:2011, status:"Hiatus",    format:"TV Series",   episodes:148,  rating:9.0, studio:"Madhouse",           creator:"Yoshihiro Togashi",   duration:"24 min/ep", image:"./assets/images/5.jpg",  embed:"https://www.youtube.com/embed/d6kBeJjTGnY",  featured:false, description:"Gon Freecss discovers his father is actually alive and a legendary Hunter. He sets out to find him by taking the deadly Hunter Examination." },
  { id:6,  title:"Frieren: Beyond Journey's End", japaneseTitle:"Sousou no Frieren",        category:"Fantasy",      genres:["Fantasy","Adventure","Drama"],            year:2023, status:"Completed", format:"TV Series",   episodes:28,   rating:9.1, studio:"Madhouse",           creator:"Kanehito Yamada",     duration:"24 min/ep", image:"./assets/images/6.jpg",  embed:"https://www.youtube.com/embed/qgHQKZsXfbk",  featured:true,  description:"An elven mage who outlives her companions begins a new journey to understand the humans she adventured with — reconciling centuries of memory with fleeting mortal lives." },
  { id:7,  title:"Fullmetal Alchemist: Brotherhood", japaneseTitle:"Hagane no Renkinjutsushi", category:"Fantasy",   genres:["Fantasy","Adventure","Action"],           year:2009, status:"Completed", format:"TV Series",   episodes:64,   rating:9.1, studio:"Bones",              creator:"Hiromu Arakawa",      duration:"24 min/ep", image:"./assets/images/7.jpg",  embed:"https://www.youtube.com/embed/--IcmZkvL0Q",  featured:false, description:"Two brothers pay a terrible price for trying to resurrect their mother with alchemy. They search for the Philosopher's Stone to restore their bodies." },
  { id:8,  title:"Steins;Gate",                   japaneseTitle:"Steins;Gate",              category:"Sci-Fi",       genres:["Sci-Fi","Thriller","Drama"],              year:2011, status:"Completed", format:"TV Series",   episodes:24,   rating:9.1, studio:"White Fox",          creator:"5pb. / Nitroplus",    duration:"24 min/ep", image:"./assets/images/8.jpg",  embed:"https://www.youtube.com/embed/27OZc-ku6is",  featured:false, description:"A self-proclaimed mad scientist discovers a way to send text messages into the past. His invention attracts dangerous attention and unravels the fabric of time." },
  { id:9,  title:"Cyberpunk: Edgerunners",        japaneseTitle:"Cyberpunk: Edgerunners",   category:"Sci-Fi",       genres:["Sci-Fi","Action","Drama"],                year:2022, status:"Completed", format:"Mini-series", episodes:10,   rating:8.6, studio:"Trigger",            creator:"CD Projekt Red",      duration:"24 min/ep", image:"./assets/images/9.jpg",  embed:"https://www.youtube.com/embed/JtqvzSYVQ8Q",  featured:false, description:"In a megacity obsessed with body modification, a street kid survives by becoming an Edgerunner — a mercenary outlaw — pushing the limits of his humanity." },
  { id:10, title:"Haikyuu!!",                     japaneseTitle:"Haikyuu!!",                category:"Sports",       genres:["Sports","Comedy","Drama"],                year:2014, status:"Completed", format:"TV Series",   episodes:85,   rating:8.7, studio:"Production I.G",     creator:"Haruichi Furudate",   duration:"24 min/ep", image:"./assets/images/10.jpg", embed:"https://www.youtube.com/embed/JOGp2c7-cKc",  featured:false, description:"A short but gifted volleyball player teams up with a genius setter — his rival from middle school — to chase the national championship." },
  { id:11, title:"Death Note",                    japaneseTitle:"Death Note",               category:"Psychological", genres:["Psychological","Thriller","Mystery"],    year:2006, status:"Completed", format:"TV Series",   episodes:37,   rating:8.6, studio:"Madhouse",           creator:"Tsugumi Ohba",        duration:"23 min/ep", image:"./assets/images/11.jpg", embed:"https://www.youtube.com/embed/NlJZ-YgSqao",  featured:false, description:"A brilliant student finds a supernatural notebook that kills anyone whose name is written in it. He uses it to rid the world of criminals while a genius detective hunts him down." },
  { id:12, title:"Your Name",                     japaneseTitle:"Kimi no Na wa.",           category:"Romance",      genres:["Romance","Drama","Fantasy"],              year:2016, status:"Completed", format:"Film",        episodes:1,    rating:8.9, studio:"CoMix Wave Films",   creator:"Makoto Shinkai",      duration:"1h 46m",    image:"./assets/images/12.jpg", embed:"https://www.youtube.com/embed/xU47nhruN-Q",  featured:false, description:"A rural girl and a Tokyo boy mysteriously swap bodies. As they live each other's lives they fall in love — but time is running out." }
];

// ── Derived constants (computed once) ────────────────────────
const FEATURED   = animeData.filter(a => a.featured);
const CATEGORIES = ["All", ...new Set(animeData.map(a => a.category))];

// ── State ────────────────────────────────────────────────────
let activeCategory = "All";
let activeSearch   = "";
let slideIndex     = 0;
let slideTimer     = null;

// ── DOM refs (cached once) ───────────────────────────────────
const $ = id => document.getElementById(id);
const navbar         = $("navbar");
const searchInput    = $("searchInput");
const filterPills    = $("filterPills");
const clearBtn       = $("clearBtn");
const rowsContainer  = $("rows");
const billboardTrack = $("billboardTrack");
const billboardDots  = $("billboardDots");
const modal          = $("modal");
const modalInner     = $("modalInner");

// ── Billboard ─────────────────────────────────────────────────
function buildBillboard() {
  billboardTrack.innerHTML = FEATURED.map(a => `
    <div class="billboard-slide">
      <img src="${a.image}" alt="${a.title}" loading="eager">
      <div class="slide-info">
        <span class="slide-cat-tag">${a.category}</span>
        <h2 class="slide-title">${a.title}</h2>
        <div class="slide-meta">
          <span class="rating">★ ${a.rating.toFixed(1)}</span>
          <span>${a.year}</span>
          <span>${a.format}</span>
          <span>${a.episodes === 1 ? "Film" : a.episodes + " Episodes"}</span>
        </div>
        <p class="slide-synopsis">${a.description}</p>
        <div class="slide-actions">
          <button class="btn-play" data-id="${a.id}">▶ Play Trailer</button>
          <button class="btn-info" data-id="${a.id}">ⓘ More Info</button>
        </div>
      </div>
    </div>`).join("");

  billboardDots.innerHTML = FEATURED.map((_, i) =>
    `<span class="dot${i === 0 ? " active" : ""}" data-i="${i}"></span>`).join("");

  goToSlide(0);
  startAutoSlide();
}

function goToSlide(i) {
  slideIndex = (i + FEATURED.length) % FEATURED.length;
  billboardTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
  billboardDots.querySelectorAll(".dot").forEach((d, idx) =>
    d.classList.toggle("active", idx === slideIndex));
}

function startAutoSlide() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(slideIndex + 1), 6000);
}

// ── Filter Pills ──────────────────────────────────────────────
function buildFilterPills() {
  filterPills.innerHTML = CATEGORIES.map(c =>
    `<button class="pill${c === "All" ? " active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
}

// ── Filter + Render ───────────────────────────────────────────
// Single source of truth: filter once, render once.
function applyAndRender() {
  const q = activeSearch.toLowerCase().trim();

  // Filter
  const list = animeData.filter(a => {
    if (activeCategory !== "All" && a.category !== activeCategory) return false;
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      a.japaneseTitle.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.genres.some(g => g.toLowerCase().includes(q))
    );
  });

  // Empty state — no DOM row building needed
  if (!list.length) {
    rowsContainer.innerHTML = `
      <div class="empty-state">
        <h2>No Results Found</h2>
        <p>Try different search terms or clear the filter.</p>
      </div>`;
    return;
  }

  // Group by category (preserves insertion order)
  const groups = {};
  for (const a of list) (groups[a.category] ??= []).push(a);

  // Build all rows in one DocumentFragment — single reflow
  const frag = document.createDocumentFragment();
  for (const [cat, items] of Object.entries(groups)) {
    const row = document.createElement("div");
    row.className = "content-row";
    row.innerHTML = `
      <div class="row-header">
        <span class="row-label">${cat}</span>
        <span class="row-count">${items.length} title${items.length !== 1 ? "s" : ""}</span>
      </div>
      <div class="row-scroll-wrapper">
        <button class="row-arrow row-prev" aria-label="Scroll left">&#10094;</button>
        <div class="row-track">
          ${items.map(cardHTML).join("")}
        </div>
        <button class="row-arrow row-next" aria-label="Scroll right">&#10095;</button>
      </div>`;

    // Scoped row-scroll — no global querySelector needed
    const track = row.querySelector(".row-track");
    row.querySelector(".row-prev").onclick = () => { track.scrollLeft -= 700; };
    row.querySelector(".row-next").onclick = () => { track.scrollLeft += 700; };

    frag.appendChild(row);
  }

  rowsContainer.innerHTML = "";      // clear once
  rowsContainer.appendChild(frag);  // single paint
}

function cardHTML(a) {
  return `
    <div class="anime-card" data-id="${a.id}" tabindex="0" role="button" aria-label="${a.title}">
      <div class="card-thumb"><img src="${a.image}" alt="${a.title}" loading="lazy"></div>
      <div class="card-overlay">
        <div class="card-overlay-title">${a.title}</div>
        <div class="card-overlay-meta">${a.year} · ★ ${a.rating}</div>
      </div>
    </div>`;
}

// ── Modal ─────────────────────────────────────────────────────
function openModal(id) {
  const a = animeData.find(x => x.id === id);
  if (!a) return;

  modalInner.innerHTML = `
    <div class="modal-hero"><img src="${a.image}" alt="${a.title}"></div>
    <div class="modal-body-grid">
      <div class="modal-main-col">
        <h2 class="modal-title">${a.title}</h2>
        <p class="modal-jp">${a.japaneseTitle}</p>
        <div class="modal-stats">
          <span class="stat-badge match">98% Match</span>
          <span class="stat-badge rating">★ ${a.rating.toFixed(1)}</span>
          <span class="stat-badge">${a.year}</span>
          <span class="stat-badge">${a.status}</span>
          <span class="stat-badge">${a.format}</span>
          <span class="stat-badge">${a.episodes === 1 ? "Film" : a.episodes + " eps"}</span>
        </div>
        <p class="modal-desc">${a.description}</p>
        ${a.embed ? `
          <p class="trailer-label">▶ Official Trailer</p>
          <div class="trailer-wrap">
            <iframe src="${a.embed}" allowfullscreen></iframe>
          </div>` : ""}
      </div>
      <div class="modal-side-col">
        ${sideItem("Studio",              a.studio)}
        ${sideItem("Creator",             a.creator)}
        ${sideItem("Episodes / Duration", `${a.episodes} · ${a.duration}`)}
        <div class="side-info-item">
          <div class="label">Genres</div>
          <div class="genre-tags">${a.genres.map(g => `<span class="gtag">${g}</span>`).join("")}</div>
        </div>
      </div>
    </div>`;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// tiny helper — avoids repeating the same div structure 3×
const sideItem = (label, value) => `
  <div class="side-info-item">
    <div class="label">${label}</div>
    <div class="value">${value}</div>
  </div>`;

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
  // Modal is pointer-events:none immediately; safe to clear now
  modalInner.innerHTML = "";
}

// ── Event Listeners ───────────────────────────────────────────
function setupListeners() {
  // Navbar scroll solidify
  window.addEventListener("scroll", () =>
    navbar.classList.toggle("solid", window.scrollY > 60), { passive: true });

  // Billboard prev/next
  $("billboardPrev").onclick = () => { goToSlide(slideIndex - 1); startAutoSlide(); };
  $("billboardNext").onclick = () => { goToSlide(slideIndex + 1); startAutoSlide(); };

  // Billboard dots
  billboardDots.addEventListener("click", e => {
    const i = e.target.dataset.i;
    if (i !== undefined) { goToSlide(+i); startAutoSlide(); }
  });

  // Billboard action buttons — scoped to billboard section, not document
  $("billboard").addEventListener("click", e => {
    const btn = e.target.closest("[data-id]");
    if (btn) openModal(+btn.dataset.id);
  });

  // Search
  searchInput.addEventListener("input", e => {
    activeSearch = e.target.value;
    applyAndRender();
  });

  // Category pills (event delegation — one listener, not one per pill)
  filterPills.addEventListener("click", e => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    filterPills.querySelector(".active").classList.remove("active");
    pill.classList.add("active");
    activeCategory = pill.dataset.cat;
    applyAndRender();
  });

  // Clear
  clearBtn.onclick = () => {
    activeSearch = ""; activeCategory = "All";
    searchInput.value = "";
    filterPills.querySelector(".active").classList.remove("active");
    filterPills.querySelector('[data-cat="All"]').classList.add("active");
    applyAndRender();
  };

  // Modal: close button + backdrop click
  $("modalClose").onclick = closeModal;
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  // Keyboard: Escape closes modal; Enter/Space activates card
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  // Card keyboard access — single delegated listener on container
  rowsContainer.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("anime-card")) {
      e.preventDefault();
      openModal(+e.target.dataset.id);
    }
  });

  // Card click — single delegated listener on container (not per-card)
  rowsContainer.addEventListener("click", e => {
    const card = e.target.closest(".anime-card");
    if (card) openModal(+card.dataset.id);
  });
}

// ── Boot ──────────────────────────────────────────────────────
function init() {
  buildBillboard();
  buildFilterPills();
  applyAndRender();
  setupListeners();
}

// Works whether script loads sync or deferred
document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", init)
  : init();
