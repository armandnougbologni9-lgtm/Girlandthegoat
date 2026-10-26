const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && window.matchMedia("(max-width: 850px)").matches) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());

// Image-rich design-test pass: 18 distinct Unsplash photos plus intentional reuse
// of existing official-site references reaches 24 unique photos across 35 slots.
const stockPhoto = (id, alt, caption) => ({ id, alt, caption });
const photoSets = {
  about: [
    stockPhoto("photo-1517248135467-4c7edcad34c4", "Salle de restaurant chaleureuse, avec des tables dressées pour les convives", "Une salle faite pour se retrouver"),
    stockPhoto("photo-1552566626-52f8b828add9", "Intérieur contemporain de restaurant avec un long comptoir", "Une table de quartier animée")
  ],
  menu: [
    stockPhoto("photo-1546069901-ba9599a7e63c", "Saladier coloré garni de verdure, de céréales et de légumes frais", "Tout droit du potager"),
    stockPhoto("photo-1512621776951-a57141f2eefd", "Salade de saison avec des légumes et des feuilles vertes", "Des ingrédients frais et de saison"),
    stockPhoto("photo-1547592180-85f173990554", "Salade de légumes frais et de feuilles vertes", "Une touche de couleur à table"),
    stockPhoto("photo-1546549032-9571cd6b27df", "Assiette à partager composée pour un repas au restaurant", "À faire passer autour de la table"),
    stockPhoto("photo-1565299624946-b28f40a0ae38", "Pain plat rôti garni de légumes et d’herbes", "Un classique revisité"),
    stockPhoto("photo-1544025162-d76694265947", "Plat grillé servi avec des légumes", "Tout droit de la cuisine"),
    stockPhoto("photo-1414235077428-338989a2e8c0", "Table de restaurant garnie de plats soigneusement dressés", "Au milieu de la table"),
    stockPhoto("photo-1559847844-5315695dadae", "Assiette de saison avec des légumes et une sauce", "Une assiette à partager"),
    stockPhoto("photo-1528605248644-14dd04022da1", "Plusieurs plats réunis autour d’une table", "Plus on est nombreux, mieux c’est"),
    stockPhoto("photo-1514362545857-3bc16c4c7d1b", "Cocktail coloré servi dans un verre à pied", "Un dernier verre pour finir")
  ],
  brunch: [
    stockPhoto("photo-1525351484163-7529414344d8", "Brunch garni d’œufs, de tartines et de café", "Un matin de week-end tout en douceur"),
    stockPhoto("photo-1494859802809-d069c3b71a8a", "Tartine du petit-déjeuner garnie d’ingrédients frais", "Le brunch à partager"),
    stockPhoto("photo-1533089860892-a7c6f0a88666", "Pile de pancakes aux fruits pour le brunch", "Une note sucrée pour commencer"),
    stockPhoto("photo-1504754524776-8f4f37790ca0", "Café et plats du petit-déjeuner sur une table", "Un café, puis une autre assiette")
  ],
  gallery: [
    stockPhoto("photo-1559339352-11d035aa65de", "Assiettes et verres dressés sur une table de restaurant", "Prêts pour la soirée"),
    stockPhoto("photo-1514933651103-005eec06c04b", "Salle de restaurant accueillante, baignée de lumière chaude", "Belle lumière, bonne compagnie")
  ]
};

const photoStyle = document.createElement("style");
photoStyle.textContent = `
  .photo-strip { width: min(100% - 3rem, 1240px); margin: 0 auto; padding: 2.5rem 0 6rem; }
  .photo-strip__heading { display:flex; align-items:end; justify-content:space-between; gap:1rem; margin-bottom:1.4rem; }
  .photo-strip__heading h2 { margin:0; color:#243b30; font:500 clamp(1.8rem,4vw,3.1rem)/1.1 Georgia,serif; }
  .photo-strip__note { max-width:36rem; margin:.6rem 0 1.3rem; color:#687168; font: .72rem/1.7 Arial,sans-serif; }
  .photo-strip__grid { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:1rem; }
  .photo-card { min-width:0; margin:0; }
  .photo-card img { display:block; width:100%; aspect-ratio:4/3; object-fit:cover; background:#e5dfd2; }
  .photo-card figcaption { padding:.65rem 0 0; color:#31483b; font:italic 1rem/1.4 Georgia,serif; }
  .photo-strip--compact .photo-strip__grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .photo-strip--brunch .photo-strip__grid { grid-template-columns:repeat(4,minmax(0,1fr)); }
  @media(max-width:850px) { .photo-strip__grid { grid-template-columns:repeat(3,minmax(0,1fr)); } }
  @media(max-width:620px) { .photo-strip { width:calc(100% - 2.5rem); padding-bottom:4rem; } .photo-strip__grid,.photo-strip--brunch .photo-strip__grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem; } }
`;
document.head.append(photoStyle);

const makePhoto = (photo, { official = false, gallery = false } = {}) => {
  const figure = document.createElement("figure");
  figure.className = gallery ? "gallery-tile gallery-tile--extra" : "photo-card";
  const image = document.createElement("img");
  image.src = official || photo.id.startsWith("https://")
    ? photo.id
    : `https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=1000&q=78`;
  if (!official && !photo.id.startsWith("https://")) {
    const base = `https://images.unsplash.com/${photo.id}?auto=format&fit=crop`;
    image.srcset = `${base}&w=480&q=76 480w, ${base}&w=800&q=78 800w, ${base}&w=1200&q=78 1200w`;
    image.sizes = "(max-width: 620px) 48vw, (max-width: 850px) 31vw, 20vw";
  }
  image.alt = photo.alt;
  image.loading = "lazy";
  image.decoding = "async";
  if (gallery) {
    const art = document.createElement("div");
    art.className = "gallery-art";
    art.append(image);
    figure.append(art);
  } else {
    figure.append(image);
  }
  const caption = document.createElement("figcaption");
  caption.textContent = photo.caption;
  figure.append(caption);
  return figure;
};

const addPhotoStrip = (heading, photos, className = "") => {
  const section = document.createElement("section");
  section.className = `photo-strip ${className}`.trim();
  section.setAttribute("aria-label", heading);
  const title = document.createElement("h2");
  title.textContent = heading;
  const head = document.createElement("div");
  head.className = "photo-strip__heading";
  head.append(title);
  const note = document.createElement("p");
  note.className = "photo-strip__note";
  note.textContent = "Illustrative Unsplash photography for this design test; it does not depict Girl & the Goat Los Angeles.";
  const grid = document.createElement("div");
  grid.className = "photo-strip__grid";
  photos.forEach((photo) => grid.append(makePhoto(photo)));
  section.append(head, note, grid);
  document.querySelector("main")?.append(section);
};

const pageName = window.location.pathname.split("/").pop();
const officialRoom = stockPhoto(
  "https://cdn.prod.website-files.com/64542138e0be122910058cd2/6605bd5e7464a2c67655b61e_Girl-Goat-Los-Angeles-01.avif",
  "Salle ensoleillée de Girl & the Goat, avec tables et plantes",
  "Une place à table"
);
const officialKitchen = stockPhoto(
  "https://cdn.prod.website-files.com/64542138e0be122910058cd2/6739334b1229ecc8454d47ed_Girl-Goat-Los-Angeles-04-compressed.avif",
  "Des chefs de Girl & the Goat préparent des plats en cuisine",
  "En cuisine"
);
const officialBrunch = stockPhoto(
  "https://cdn.prod.website-files.com/64542138e0be122910058cd2/6986615110469c9b4451defa_6F3A9591_edited.jpeg",
  "Un plat de brunch salé est relevé d’herbes et de sauce",
  "Brunch du week-end"
);

if (pageName === "about.html") addPhotoStrip("Quelques vues de la salle", photoSets.about, "photo-strip--compact");
if (pageName === "menu.html") addPhotoStrip("Un aperçu de la table", photoSets.menu);
if (pageName === "brunch.html") addPhotoStrip("La table du week-end", photoSets.brunch, "photo-strip--brunch");
if (pageName === "reservations.html") addPhotoStrip("Trouvez votre place", [officialRoom, officialKitchen], "photo-strip--compact");
if (pageName === "contact.html") addPhotoStrip("Autour du restaurant", [officialRoom, officialKitchen], "photo-strip--compact");
if (pageName === "gallery.html") {
  const gallery = document.querySelector(".gallery-grid");
  const galleryNote = document.createElement("p");
  galleryNote.className = "photo-strip__note section-wrap";
  galleryNote.textContent = "Additional Unsplash photos are illustrative stock images for this design test and do not depict Girl & the Goat Los Angeles.";
  gallery?.before(galleryNote);
  const repeatedRoom = { ...officialRoom, caption: "A familiar seat at the table" };
  const repeatedBrunch = { ...officialBrunch, caption: "A weekend worth sharing" };
  [
    makePhoto(photoSets.gallery[0], { gallery: true }),
    makePhoto(photoSets.gallery[1], { gallery: true }),
    makePhoto(repeatedRoom, { gallery: true, official: true }),
    makePhoto(repeatedBrunch, { gallery: true, official: true })
  ].forEach((figure) => gallery?.append(figure));
}

/* ==========================================================================
   Bilingual Editorial Voice (French by Default, English One-Click Toggle)
   ========================================================================== */
const i18n = {
  fr: {
    skip_to_content: "Passer au contenu",
    nav_toggle: "Menu",
    nav_story: "Notre histoire",
    nav_menu: "Menu",
    nav_brunch: "Brunch",
    nav_gallery: "Galerie",
    nav_visit: "Venir",
    nav_reserve: "Réserver une table ↗",
    hero_eyebrow: "LOS ANGELES · CALIFORNIE",
    hero_title: "Venez le ventre vide.<br><em>Repartez inspirés.</em>",
    hero_intro: "Une table vivante pour les esprits curieux. Découvrez des assiettes de saison audacieuses, créées pour être partagées.",
    hero_reserve_btn: "Réserver votre table ↗",
    hero_menu_btn: "Découvrir le menu ↓",
    hero_note: "La bonne cuisine se savoure encore mieux<br>lorsqu’elle est partagée.",
    hero_lang_btn: "Switch to English",
    stage_desc: "Une table de restaurant servie avec des verres de vin rouge et un apéritif vous attend.",
    stage_poster_alt: "Une table de restaurant servie avec des verres de vin rouge et un apéritif vous attend",
    hero_scroll: "DÉFILER POUR EXPLORER",
    story_eyebrow: "EN QUELQUES MOTS",
    story_title: "Un brin d’inattendu.<br><em>Beaucoup à aimer.</em>",
    story_text: "Nous croyons qu’un grand repas dépasse ce qui se trouve dans l’assiette. C’est le passage des plats, le partage, cet instant « tu dois absolument goûter ça » à travers la table.",
    story_link: "En savoir plus sur nous ↗",
    menu_eyebrow: "PENSÉ POUR LE MILIEU DE LA TABLE",
    menu_title: "Une carte qui invite<br><em>à la découverte.</em>",
    menu_desc: "Des ingrédients de saison, des associations inattendues et tant de raisons de faire passer une assiette.",
    dish1_type: "DU POTAGER",
    dish1_title: "Fraîcheur & caractère",
    dish1_desc: "Des légumes pleins de personnalité.",
    dish2_type: "DES CUISINES",
    dish2_title: "Le réconfort réinventé",
    dish2_desc: "De grandes assiettes généreuses pensées pour la table.",
    dish3_type: "À TABLE",
    dish3_title: "Un plaisir à partager",
    dish3_desc: "Les assiettes de saison sont toujours meilleures partagées.",
    menu_btn: "Voir les incontournables du menu ↗",
    menu_note: "Carte provisoire. Références photographiques officielles sous réserve de validation des droits.",
    brunch_scribble: "esprit de<br>week-end",
    brunch_eyebrow: "MATINÉES PAISIBLES, BONNE COMPAGNIE",
    brunch_title: "Les week-ends sont<br><em>meilleurs ensemble.</em>",
    brunch_desc: "Faites un peu de place dans votre week-end pour une table remplie de vos plats favoris et un bon verre à la main.",
    brunch_days: "LE WEEK-END",
    brunch_hours: "HORAIRES À CONFIRMER",
    brunch_btn: "Rejoignez-nous pour le brunch ↗",
    res_eyebrow: "VOTRE TABLE VOUS ATTEND",
    res_title: "Offrez-vous une belle<br><em>soirée.</em>",
    res_desc: "Les plus beaux moments naissent lorsque tout le monde se réunit autour de la table.",
    res_btn: "Réserver une table ↗",
    res_note: "Lien officiel de réservation ajouté après confirmation du restaurant.",
    visit_eyebrow: "NOUS TROUVER",
    visit_title: "Au plaisir de vous voir<br><em>autour de la table.</em>",
    visit_loc_label: "ADRESSE",
    visit_loc_val: "Los Angeles, Californie",
    visit_loc_sub: "Adresse officielle à confirmer",
    visit_hours_label: "HORAIRES",
    visit_hours_val: "À très bientôt",
    visit_hours_sub: "Horaires actuels à confirmer",
    visit_sayhello_label: "NOUS ÉCRIRE",
    visit_contact_link: "Contacter le restaurant",
    visit_contact_sub: "Coordonnées officielles à venir",
    visit_plan_link: "Préparer votre venue ↗",
    contact_heading: "Une question ou un événement à célébrer ?",
    contact_sub: "Coordonnées officielles à venir.",
    footer_tagline: "Une cuisine de saison. Un accueil généreux. Toujours de la place pour partager.",
    footer_gathering: "Fait pour se rassembler.",
    footer_back_top: "Haut de page ↑"
  },
  en: {
    skip_to_content: "Skip to content",
    nav_toggle: "Menu",
    nav_story: "Our Story",
    nav_menu: "Menu",
    nav_brunch: "Brunch",
    nav_gallery: "Gallery",
    nav_visit: "Visit",
    nav_reserve: "Book a table ↗",
    hero_eyebrow: "LOS ANGELES · CALIFORNIA",
    hero_title: "Come hungry.<br><em>Leave inspired.</em>",
    hero_intro: "A vibrant table for curious appetites. Discover bold seasonal dishes created to be shared.",
    hero_reserve_btn: "Book your table ↗",
    hero_menu_btn: "Explore the menu ↓",
    hero_note: "Great food is best enjoyed<br>when shared around the table.",
    hero_lang_btn: "Passer en français",
    stage_desc: "A restaurant table set with glasses of red wine and an appetizer awaits you.",
    stage_poster_alt: "A restaurant table set with glasses of red wine and an appetizer awaits you",
    hero_scroll: "SCROLL TO EXPLORE",
    story_eyebrow: "AT A GLANCE",
    story_title: "A little unexpected.<br><em>A lot to love.</em>",
    story_text: "We believe a great meal is about more than what's on the plate. It's the passing of dishes, the sharing, that 'you have to try this' moment across the table.",
    story_link: "Learn more about us ↗",
    menu_eyebrow: "MADE FOR THE MIDDLE OF THE TABLE",
    menu_title: "A menu built for<br><em>discovery.</em>",
    menu_desc: "Seasonal ingredients, unexpected combinations, and endless reasons to pass a plate.",
    dish1_type: "FROM THE GARDEN",
    dish1_title: "Freshness & character",
    dish1_desc: "Vegetables with plenty of personality.",
    dish2_type: "FROM THE KITCHEN",
    dish2_title: "Comfort reimagined",
    dish2_desc: "Big, generous plates meant for passing around.",
    dish3_type: "AT THE TABLE",
    dish3_title: "A joy to share",
    dish3_desc: "Seasonal dishes are always better enjoyed together.",
    menu_btn: "View menu highlights ↗",
    menu_note: "Sample menu. Official photography references subject to final licensing.",
    brunch_scribble: "weekend<br>state of mind",
    brunch_eyebrow: "SLOW MORNINGS, GOOD COMPANY",
    brunch_title: "Weekends are<br><em>better together.</em>",
    brunch_desc: "Make a little time in your weekend for a table filled with your favorites and something good in hand.",
    brunch_days: "WEEKENDS",
    brunch_hours: "HOURS TO BE CONFIRMED",
    brunch_btn: "Join us for brunch ↗",
    res_eyebrow: "YOUR TABLE IS WAITING",
    res_title: "Make an evening<br><em>of it.</em>",
    res_desc: "The best moments happen when everyone gathers around the table.",
    res_btn: "Reserve a table ↗",
    res_note: "Official reservation link will be enabled once confirmed with the restaurant.",
    visit_eyebrow: "FIND US",
    visit_title: "Looking forward to seeing you<br><em>at the table.</em>",
    visit_loc_label: "LOCATION",
    visit_loc_val: "Los Angeles, California",
    visit_loc_sub: "Official address to be confirmed",
    visit_hours_label: "HOURS",
    visit_hours_val: "See you soon",
    visit_hours_sub: "Current hours to be confirmed",
    visit_sayhello_label: "SAY HELLO",
    visit_contact_link: "Contact the restaurant",
    visit_contact_sub: "Official contact details coming soon",
    visit_plan_link: "Plan your visit ↗",
    contact_heading: "Questions or planning a gathering?",
    contact_sub: "Official contact details coming soon.",
    footer_tagline: "Seasonal food. Warm hospitality. Always room for more around the table.",
    footer_gathering: "Made for gathering.",
    footer_back_top: "Back to top ↑"
  }
};

let currentLang = "fr";

function setLanguage(lang, animate = true) {
  if (!i18n[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;

  // Persist preference
  try {
    localStorage.setItem("gg_site_lang", lang);
  } catch (_) {}

  // Update header switcher pills
  document.querySelectorAll(".lang-pill").forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  // Update hero quick chip text
  const heroLangText = document.querySelector("#hero-lang-text");
  if (heroLangText) {
    heroLangText.textContent = i18n[lang].hero_lang_btn;
  }
  const heroLangToggle = document.querySelector("#hero-lang-toggle");
  if (heroLangToggle) {
    heroLangToggle.setAttribute(
      "aria-label",
      lang === "fr" ? "Switch site to English" : "Afficher le site en français"
    );
  }

  // Update poster alt text
  const poster = document.querySelector("#hero-poster-img");
  if (poster) poster.alt = i18n[lang].stage_poster_alt;

  const elements = document.querySelectorAll("[data-i18n]");

  if (animate && window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.gsap.to(elements, {
      opacity: 0,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        applyDict(lang);
        window.gsap.to(elements, {
          opacity: 1,
          duration: 0.28,
          ease: "power2.out"
        });
      }
    });
  } else {
    applyDict(lang);
  }

  // Live status update for accessibility
  const statusAnnouncer = document.querySelector("#hero-3d-status");
  if (statusAnnouncer) {
    statusAnnouncer.textContent =
      lang === "fr"
        ? "Langue changée en français."
        : "Language switched to English.";
  }
}

function applyDict(lang) {
  const dict = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = dict[key];
    if (!val) return;
    if (val.includes("<")) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });
}

function initLanguageSwitcher() {
  // Listen to header pills
  document.querySelectorAll(".lang-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetLang = btn.dataset.lang;
      if (targetLang && targetLang !== currentLang) {
        setLanguage(targetLang, true);
      }
    });
  });

  // Listen to hero quick chip
  const heroLangToggle = document.querySelector("#hero-lang-toggle");
  if (heroLangToggle) {
    heroLangToggle.addEventListener("click", () => {
      const nextLang = currentLang === "fr" ? "en" : "fr";
      setLanguage(nextLang, true);
    });
  }

  // Initialize with French default (or restore user selection)
  let savedLang = "fr";
  try {
    savedLang = localStorage.getItem("gg_site_lang") || "fr";
  } catch (_) {}
  setLanguage(savedLang, false);
}

/* ==========================================================================
   GSAP Fluidity & Animations Suite
   ========================================================================== */
function initGSAPAnimations() {
  const gsap = window.gsap;
  if (!gsap) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) return;

  // 1. Hero Entrance Timeline
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTl
    .from(".site-header", {
      y: -25,
      opacity: 0,
      duration: 0.85
    })
    .from(".hero__top-bar", {
      y: 16,
      opacity: 0,
      duration: 0.65
    }, "-=0.45")
    .from("#hero-title", {
      y: 40,
      opacity: 0,
      duration: 1.05,
      ease: "power4.out"
    }, "-=0.4")
    .from(".hero__intro", {
      y: 20,
      opacity: 0,
      duration: 0.75
    }, "-=0.6")
    .from(".hero__actions > *", {
      y: 18,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12
    }, "-=0.45")
    .from(".hero__note", {
      x: -15,
      opacity: 0,
      duration: 0.7
    }, "-=0.4")
    .from(".hero-stage", {
      scale: 0.95,
      y: 22,
      opacity: 0,
      duration: 1.15,
      ease: "power3.out"
    }, "-=0.8")
    .from(".hero__scroll", {
      opacity: 0,
      duration: 0.75
    }, "-=0.35");

  // 2. Desktop Mouse Parallax on Hero 3D Stage
  const heroSection = document.querySelector(".hero");
  const heroStage = document.querySelector(".hero-stage");
  if (heroSection && heroStage && window.matchMedia("(min-width: 851px)").matches) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(heroStage, {
        rotationY: relX * 6,
        rotationX: -relY * 6,
        transformPerspective: 900,
        duration: 0.7,
        ease: "power1.out"
      });
    });

    heroSection.addEventListener("mouseleave", () => {
      gsap.to(heroStage, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }

  // 3. ScrollTrigger Section Animations
  if (window.ScrollTrigger) {
    gsap.from(".intro__body > *", {
      scrollTrigger: { trigger: ".intro", start: "top 80%" },
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out"
    });

    gsap.from(".menu-feature__heading > div, .menu-feature__description", {
      scrollTrigger: { trigger: ".menu-feature", start: "top 80%" },
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out"
    });

    gsap.from(".dish-card", {
      scrollTrigger: { trigger: ".dish-grid", start: "top 80%" },
      y: 45,
      opacity: 0,
      stagger: 0.16,
      duration: 0.95,
      ease: "power3.out"
    });

    gsap.from(".brunch__visual", {
      scrollTrigger: { trigger: ".brunch", start: "top 78%" },
      scale: 0.95,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out"
    });

    gsap.from(".brunch__scribble", {
      scrollTrigger: { trigger: ".brunch", start: "top 75%" },
      rotation: -22,
      scale: 0.75,
      opacity: 0,
      duration: 0.85,
      ease: "back.out(1.7)"
    });

    gsap.from(".brunch__copy > *", {
      scrollTrigger: { trigger: ".brunch", start: "top 78%" },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.85,
      ease: "power3.out"
    });

    gsap.from(".reservation-band__inner > *", {
      scrollTrigger: { trigger: ".reservation-band", start: "top 80%" },
      y: 35,
      opacity: 0,
      stagger: 0.1,
      duration: 0.85,
      ease: "power3.out"
    });

    gsap.to(".reservation-band__decoration", {
      scrollTrigger: {
        trigger: ".reservation-band",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      x: -60,
      ease: "none"
    });

    gsap.from(".visit__heading", {
      scrollTrigger: { trigger: ".visit", start: "top 80%" },
      y: 35,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out"
    });

    gsap.from(".visit__info > div, .visit__info > a", {
      scrollTrigger: { trigger: ".visit__info", start: "top 82%" },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out"
    });
  }

  // Smooth scroll for top links
  document.querySelectorAll('a[href="#top"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

/* ==========================================================================
   Homepage 3D Hero Feature (Enhanced Table with Red Wine Glasses)
   - Immediate WebP/JPG poster display (zero CLS, non-blocking)
   - Seamless background WebGL renderer initialization
   - Real-time 3D crystal wine glass with Burgundy wine mesh & table backdrop
   - Strictly respects prefers-reduced-motion (no auto-rotation)
   ========================================================================== */
function initHero3D() {
  const stage = document.querySelector("#hero-stage");
  if (!stage) return;

  const canvas = document.querySelector("#hero-3d-canvas");
  const viewport = document.querySelector("#hero-3d-viewport");

  function checkWebGLSupport() {
    try {
      const testCanvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl2") || testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  }

  if (!checkWebGLSupport()) {
    return; // High-resolution poster stays active cleanly
  }

  const THREE = window.THREE;
  if (!THREE || !THREE.GLTFLoader) {
    return; // High-resolution poster stays active cleanly
  }

  try {
    const width = viewport.clientWidth || stage.clientWidth || 590;
    const height = viewport.clientHeight || stage.clientHeight || 556;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.0, 5.2);
    camera.lookAt(0, 0.15, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeed6, 2.4);
    keyLight.position.set(2.5, 5.0, 4.0);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffd7a8, 2.0, 10);
    rimLight.position.set(-3.0, 3.5, 2.0);
    scene.add(rimLight);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 1. High-resolution photographic dining table backdrop from user image
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("assets/3d/hero-table-poster.jpg", (tex) => {
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      const planeGeo = new THREE.PlaneGeometry(6.4, 4.25);
      const planeMat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.82,
        metalness: 0.05
      });
      const tablePlane = new THREE.Mesh(planeGeo, planeMat);
      tablePlane.position.set(0, 0.15, -0.6);
      modelGroup.add(tablePlane);
    });

    // 2. 3D Crystal Wine Glasses with Red Wine
    function createWineGlass(scale = 1.0) {
      const glassGroup = new THREE.Group();
      const glassPoints = [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.72, 0.03),
        new THREE.Vector2(0.7, 0.07),
        new THREE.Vector2(0.1, 0.11),
        new THREE.Vector2(0.065, 0.18),
        new THREE.Vector2(0.06, 1.15),
        new THREE.Vector2(0.08, 1.35),
        new THREE.Vector2(0.18, 1.45),
        new THREE.Vector2(0.8, 1.95),
        new THREE.Vector2(0.92, 2.35),
        new THREE.Vector2(0.72, 3.15),
        new THREE.Vector2(0.66, 3.35)
      ];
      const glassGeo = new THREE.LatheGeometry(glassPoints, 32);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.94,
        opacity: 1,
        transparent: true,
        roughness: 0.04,
        ior: 1.52,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08
      });
      const glassMesh = new THREE.Mesh(glassGeo, glassMat);
      glassGroup.add(glassMesh);

      // Burgundy red wine inside goblet
      const winePoints = [
        new THREE.Vector2(0, 1.48),
        new THREE.Vector2(0.72, 1.95),
        new THREE.Vector2(0.84, 2.3),
        new THREE.Vector2(0.83, 2.32),
        new THREE.Vector2(0, 2.32)
      ];
      const wineGeo = new THREE.LatheGeometry(winePoints, 32);
      const wineMat = new THREE.MeshStandardMaterial({
        color: 0x4a0a14,
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.92
      });
      const wineMesh = new THREE.Mesh(wineGeo, wineMat);
      glassGroup.add(wineMesh);

      glassGroup.scale.setScalar(scale);
      return glassGroup;
    }

    // Foreground prominent wine glass (left)
    const frontGlass = createWineGlass(0.75);
    frontGlass.position.set(-1.45, -1.25, 0.9);
    modelGroup.add(frontGlass);

    // Background secondary wine glass (right)
    const backGlass = createWineGlass(0.5);
    backGlass.position.set(1.15, -0.45, -0.2);
    modelGroup.add(backGlass);

    stage.classList.add("is-active");

    window.addEventListener("resize", () => {
      const newW = viewport.clientWidth;
      const newH = viewport.clientHeight;
      if (newW && newH && camera && renderer) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    });

    function renderLoop() {
      renderer.render(scene, camera);
      requestAnimationFrame(renderLoop);
    }
    renderLoop();
  } catch (err) {
    console.error("[Girl & the Goat 3D] Scene initialization:", err);
  }
}

function startApp() {
  initLanguageSwitcher();
  initGSAPAnimations();
  initHero3D();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}
