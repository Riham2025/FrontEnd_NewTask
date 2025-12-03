// product.js
const BASE_URL = "https://ecommerce.routemisr.com/api/v1/products";
const productsGrid = document.getElementById("productsGrid");

//  API
async function getProducts() {
    try {
        //  limit 
        const response = await fetch(`${BASE_URL}?limit=100`);
        const result = await response.json();

        //  API  data
        const products = result.data || [];
        renderProducts(products);
    } catch (error) {
        console.error("Error while fetching products:", error);
        productsGrid.innerHTML = "<p>Failed to load products.</p>";
    }
}

// function renderProducts
function renderProducts(products) {
    if (!products.length) {
        productsGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    const cardsHTML = products
        .map((product) => {
            const id = product._id || product.id;
            const image = product.imageCover;
            const title = product.title;
            const price = product.price;
            const categoryName = product.category?.name || "Category";
            const rating = product.ratingsAverage || 0;

            return `
            <article class="product-card">
                <a href="productDetails.html?id=${id}">
                    <img src="${image}" alt="${title}">
                    <div class="product-category">${categoryName}</div>
                    <div class="product-name">${title}</div>
                    <div class="product-price">${price} EGP</div>
                    <div class="product-rating">★ ${rating}</div>
                </a>
            </article>
        `;
        })
        .join("");

    productsGrid.innerHTML = cardsHTML;
}

//
getProducts();
