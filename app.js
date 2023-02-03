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
                            webstore.products = json;
                        }
                    )
                }
            );
    }

});