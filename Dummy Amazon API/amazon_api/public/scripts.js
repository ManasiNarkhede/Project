console.log("scripts.js is loaded");


document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById('product-list');
    const productDetail = document.getElementById('product-detail');
    const productInfo = document.getElementById('product-info');
    const backButton = document.getElementById('back-button');

    // Function to display product list
    function displayProductList(products) {
        productList.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="/public/images/${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">Rs${product.price}</p>
            `;
            productDiv.addEventListener('click', () => {
                if ('startViewTransition' in document) {
                    document.startViewTransition(() => {
                        displayProductDetail(product); // Display product detail on click
                    });
                } else {
                    displayProductDetail(product); // Fallback if view transition is not supported
                }
            });
            productList.appendChild(productDiv);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.product').forEach(product => {
            observer.observe(product);
        });
    }

    // Function to display product detail
    function displayProductDetail(product) {
        productList.style.display = 'none';
        productInfo.innerHTML = `
            <img src="/public/images/${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="price">Rs${product.price}</p>
        `;
        productDetail.classList.add('visible');

        // Back to Products button functionality
        backButton.addEventListener('click', () => {
            if ('startViewTransition' in document) {
                document.startViewTransition(() => {
                    productDetail.classList.remove('visible');
                    productList.style.display = 'flex';
                    productInfo.innerHTML = ''; // Clear product detail info
                });
            } else {
                productDetail.classList.remove('visible');
                productList.style.display = 'flex';
                productInfo.innerHTML = ''; // Clear product detail info
            }
        }, { once: true }); // Ensure event listener is added only once
    }

    // Fetch products from API
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            displayProductList(products); // Display initial product list
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
