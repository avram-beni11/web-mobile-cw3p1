const app = Vue.createApp({
    el: '#app',
    data() {
        return {
            cart: [],
            sortedPrice: true,
            showProducts: 0,
            sortingOrder: "asc",
            sortBy: "name",
            // products: "http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products",
            products: "http://localhost:3000/collections/products",
            orders:
            {
                name: '',
                phone: '',
                slots: [],
            },
            lessonsData: [],
            cartData: []
        }
    },

    created() {
        fetch("http://localhost:3000/collections/products").then(
            //fetch("http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products").then(
                function (response) {
                    response.json().then(
                        function (json) {
                            Webstore.products = json;
                        }
                    )
                }
            );
    //     fetch("http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products")
    //         .then(response => response.json())
    //         .then(data => {
    //             // Loop through the JSON data and insert it into the HTML
    //             data.forEach(product => {
    //                 let container = document.getElementById("productCards");
    //                 let productHTML = `
    //     <div class="product">
    //       <h2>${product.name}</h2>
    //       <p>${product.description}</p>
    //       <p>Price: ${product.price}</p>
    //       <p>Location: ${product.location}</p>
    //       <p>Spaces: ${product.spaces}</p>
    //       <img src="${product.image}" alt="${product.name}">
    //     </div>
    //   `;
    //                 container.innerHTML += productHTML;
    //             });
    //         });
    // }
    // fetch("http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products")
    // .then(response => response.json())
    // .then(data => {
    //   let products = data.products;
    //   let result = "";
    //   products.forEach(function(product) {
    //     result += `
    //       <h2>${product.name}</h2>
    //       <p>${product.description}</p>
    //       <p>Price: ${product.price}</p>
    //       <p>Location: ${product.location}</p>
    //       <p>Spaces: ${product.spaces}</p>
    //     `;
    //   });
    //   document.getElementById("productCards").innerHTML = result;
    // });
}

});