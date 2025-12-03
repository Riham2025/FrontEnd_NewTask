// productDetails.js
const PRODUCT_API_BASE = "https://ecommerce.routemisr.com/api/v1/products/";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    showError("No product id in URL.");
    return;
  }

  loadProductDetails(id);
});

async function loadProductDetails(id) {
  const loaderBox = document.getElementById("detailsLoader");
  const card = document.getElementById("detailsCard");

  try {
    // loaderBox
    loaderBox.style.display = "flex";
    card.style.display = "none";

    const res = await fetch(PRODUCT_API_BASE + id);
    if (!res.ok) throw new Error("Failed to load product");

    const data = await res.json();
    const p = data.data;

    //document
    const imgEl = document.getElementById("detailsImg");
    imgEl.src = p.imageCover;
    imgEl.alt = p.title;

    document.getElementById("detailsTitle").textContent = p.title;
    document.getElementById("detailsBrand").textContent =
      p.brand?.name ? p.brand.name : "";
    document.getElementById("detailsCategory").textContent =
      p.category?.name ? p.category.name : "";
    document.getElementById("detailsPrice").textContent = p.price + " EGP";
    document.getElementById("detailsRating").textContent =
      "★ " + (p.ratingsAverage ?? "");
    document.getElementById("detailsDesc").textContent = p.description ?? "";

    // 
    imgEl.addEventListener("load", () => {
      loaderBox.style.display = "none";  //
      card.style.display = "block";      //
    });

      //
    if (imgEl.complete) {
      loaderBox.style.display = "none";
      card.style.display = "block";
    }
  } catch (err) {
    console.error(err);
    showError("Failed to load product details.");
  }
}

function showError(message) {
  const loaderBox = document.getElementById("detailsLoader");
  if (loaderBox) {
    loaderBox.innerHTML = `<p class="error">${message}</p>`;
  }
}

