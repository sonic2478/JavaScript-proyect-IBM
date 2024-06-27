const weatherApiKey = 'b93d2a5a07b3be1c4982ed64dfdc21c8';
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

const images = [
    {
        src: './assets/gallery/image1.jpg',
        alt: 'Thumbnail Image 1'
    },
    {
        src: './assets/gallery/image2.jpg',
        alt: 'Thumbnail Image 2'
    },
    {
        src: './assets/gallery/image3.jpg',
        alt: 'Thumbnail Image 3'
    }
];

const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
];

// Menú desplegable
function menuHandler() {
    document.querySelector('button#open-nav-menu').addEventListener('click', function () {
        document.querySelector('header nav .wrapper').classList.add('nav-open');
    })
    document.querySelector('button#close-nav-menu').addEventListener('click', function () {
        document.querySelector('header nav .wrapper').classList.remove('nav-open');
    })
    var programador = 'Santi';
    console.log("Hola programador " + programador);
}

//Consola
document.querySelector('h1#greeting').addEventListener('click', function () {
    const persona = 'Santi';
    let tareas = 2;
    console.log('Hola ' + persona + '. Tus tareas son ' + tareas);
    tareas = tareas + 8;
    console.log('Hola ' + persona + '. Tus tareas son ' + tareas);
    //Consola end
});

//Temperature Conversion
function celsiusToFahr(temperature) {
    tempInFahr = (temperature * 9 / 5) + 32;
    return tempInFahr;
}

//Saludo section
function greetingHandler() {
    let greeting = 'Good morNing';
    let currentHour = new Date().getHours();
    greeting = 'Good Morning';
    if (currentHour < 12) {
    } else if (currentHour < 20) {
        greeting = 'Good Afternoon';
    } else if (currentHour < 24) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Welcome';
    }

    document.querySelector('h1#greeting').innerHTML = greeting;

}

//Local Time Section
function clockHandler() {
    setInterval(function () {
        let localTime = new Date();
        document.querySelector('span[data-time=hours]').innerHTML = localTime.getHours().toString().padStart(2, '0');
        document.querySelector('span[data-time=minutes]').innerHTML = localTime.getMinutes().toString().padStart(2, '0');
        document.querySelector('span[data-time=seconds]').innerHTML = localTime.getSeconds().toString().padStart(2, '0');
    }, 1000);
}

//Gallery section
function galleryHandler() {
    let mainImage = document.querySelector('#gallery > img');
    let thumbnails = document.querySelector('#gallery .thumbnails');
    mainImage.src = images[0].src;
    mainImage.alt = images[0].alt;

    images.forEach(function (image, index) {
        let thumb = document.createElement('img');
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;

        thumb.addEventListener('click', function (e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = images[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;

            thumbnails.querySelectorAll('img').forEach(function (img) {
                img.dataset.selected = false;
            })
            e.target.dataset.selected = true;
        })
        thumbnails.appendChild(thumb);
    })
}

//Products Section

function populateProducts(productList) {
    let productsSection = document.querySelector('.products-area');
    productsSection.textContent = '';

    // Run a loop through the products and create an HTML element (product-item) for each of them
    productList.forEach(function (product, index) {

        // Create the HTML element for the individual product
        let productElm = document.createElement('div');
        productElm.classList.add('product-item');

        // Create the product image
        let productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = 'Image for ' + product.title;

        // Create the product details section
        let productDtls = document.createElement('div');
        productDtls.classList.add('product-details');

        // Creating the childs
        let productTitle = document.createElement('h3');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;

        let productAuthor = document.createElement('p');
        productAuthor.classList.add('product-author');
        productAuthor.innerHTML = product.author;

        let priceTitle = document.createElement('p');
        priceTitle.classList.add('price-title');
        priceTitle.innerHTML = 'Price';

        let productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = product.price > 0 ? '$' + product.price.toFixed(2) : 'Free';

        //Append the product details
        productDtls.append(productTitle);
        productDtls.append(productAuthor);
        productDtls.append(priceTitle);
        productDtls.append(productPrice);

        // Add all child HTML elements of the product
        productElm.append(productImg);
        productElm.append(productDtls);

        // Add complete individual product to the products section
        productsSection.append(productElm);
    });
}

function productsHandler() {
    let freeProducts = products.filter(pro => !pro.price || pro.price <= 0);
    let paidProducts = products.filter(pro => pro.price > 0);

    populateProducts(products);

    document.querySelector('.products-filter label[for=all] span.product-amount').textContent = products.length;
    document.querySelector('.products-filter label[for=free] span.product-amount').textContent = freeProducts.length;
    document.querySelector('.products-filter label[for=paid] span.product-amount').textContent = paidProducts.length;

    let productsFilter = document.querySelector('.products-filter');
    productsFilter.addEventListener('click', function (e) {
        if (e.target.id === 'free') {
            populateProducts(freeProducts);
        } else if (e.target.id === 'paid') {
            populateProducts(paidProducts);
        }
        else if (e.target.id === 'all') {
            populateProducts(products);
        }
    });
}

function footerHandler() {
    let currentYear = new Date().getFullYear();
    document.querySelector('footer').textContent = `©${currentYear} - All rights reserved`;
}

function locationHandler() {

    navigator.geolocation.getCurrentPosition(position => {
        console.log(position)
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = weatherAPIURL
            .replace('{lat}', lat)
            .replace('{lon}', lon)
            .replace('{API key}', weatherApiKey);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const condition = data.weather[0].description;
                const location = data.name;
                const temperature = data.main.temp;

                let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}°C outside.`;
                let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;

                //Weather Switch

                document.querySelector('.weather-group').addEventListener('click', function (e) {
                    if (e.target.id == 'celsius') {
                        document.querySelector('p#weather').innerHTML = celsiusText;
                    } else if (e.target.id == 'fahr') {
                        document.querySelector('p#weather').innerHTML = fahrText;
                    }
                });

            }).catch(err => {
                console.log(err);
                document.querySelector('p#weather').innerHTML = 'Error getting the weather. Try again later';
            });
    });
}
//Page Load

menuHandler();
greetingHandler();
locationHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();
