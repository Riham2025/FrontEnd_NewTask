// ========== API URL ==========
const PRODUCTS_API = "https://ecommerce.routemisr.com/api/v1/products";


document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

// ========== API ==========
async function loadProducts() {
  const grid = document.getElementById("productsGrid");
  const featuredName = document.getElementById("featuredName");
  const featuredPrice = document.getElementById("featuredPrice");
  const catalogLoader = document.getElementById("catalogLoader");

  if (!grid) return;

 
  grid.innerHTML = '<p class="loading">Loading...</p>';
  if (catalogLoader) catalogLoader.textContent = "Loading catalog...";

  try {
    const res = await fetch(PRODUCTS_API);

    if (!res.ok) {
      console.error("API status:", res.status, res.statusText);
      throw new Error("HTTP " + res.status);
    }

    const json = await res.json();
    const products = json.data || [];

    console.log("Products from API:", products);

    //  grid
    renderProductsGrid(products);

    //  API)
    buildCatalogSlider(products);

   
    setupHeroSection(products);

    
    if (featuredName && products[0]) {
      featuredName.textContent = products[0].title;
    }
    if (featuredPrice && products[0]) {
      featuredPrice.textContent = products[0].price + " EGP";
    }
  } catch (err) {
    console.error("Error while loading products:", err);
    grid.innerHTML =
      '<p class="error">Failed to load products from API.</p>';

    if (featuredName) featuredName.textContent = "Failed to load featured product";
    if (featuredPrice) featuredPrice.textContent = "";
  }
}

// ========== GRID PRODUCTS ==========
function renderProductsGrid(products) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${p.imageCover}" alt="${p.title}">
      </div>
      <div class="product-category">${p.category?.name || ""}</div>
      <div class="product-name">${p.title}</div>
      <div class="product-price">${p.price} EGP</div>
      <div class="product-rating">★ ${p.ratingsAverage ?? ""}</div>

      <div class="product-actions">
        <a class="btn btn-sm btn-outline" href="productDetails.html?id=${p._id}">View</a>
        <button class="btn btn-sm">Wish List</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ========== CATALOG SLIDER (PRODUCT IMAGES FROM API + AUTO) ==========
function buildCatalogSlider(products) {
  const slider = document.getElementById("catalogSlider");
  const loader = document.getElementById("catalogLoader");
  const windowBox = document.getElementById("catalogWindow");
  const row = document.getElementById("catalogRow");
  const prevBtn = document.getElementById("catalogPrev");
  const nextBtn = document.getElementById("catalogNext");

  if (!row || !windowBox) return;

  
  if (loader) loader.style.display = "none";
  if (slider) slider.style.display = "flex";

  
  const sliderItems = products
    .filter((p) => p.imageCover)
    .slice(0, 12); 

  if (!sliderItems.length) {
    row.innerHTML = `<p class="error">No products found for catalog.</p>`;
    return;
  }

  
  row.innerHTML = "";
  sliderItems.forEach((p) => {
    const card = document.createElement("div");
    card.className = "catalog-card";

    card.innerHTML = `
      <div class="catalog-img-wrap">
        <img src="${p.imageCover}" alt="${p.title}">
      </div>
      <div class="catalog-name">${p.category?.name || p.title}</div>
    `;

    row.appendChild(card);
  });

  const STEP = 220; 

  
  nextBtn?.addEventListener("click", () => {
    windowBox.scrollBy({ left: STEP, behavior: "smooth" });
  });

  prevBtn?.addEventListener("click", () => {
    windowBox.scrollBy({ left: -STEP, behavior: "smooth" });
  });

  
  setInterval(() => {
    const maxScroll = windowBox.scrollWidth - windowBox.clientWidth;

    if (windowBox.scrollLeft + STEP >= maxScroll) {
      windowBox.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      windowBox.scrollBy({ left: STEP, behavior: "smooth" });
    }
  }, 2000);
}

// ========== HERO SECTION ==========
function setupHeroSection(products) {
  if (!products || products.length === 0) return;

  const main = products[0];

  const featuredName = document.getElementById("featuredName");
  const featuredPrice = document.getElementById("featuredPrice");

  if (featuredName) featuredName.textContent = main.title;
  if (featuredPrice) featuredPrice.textContent = main.price + " EGP";
}
