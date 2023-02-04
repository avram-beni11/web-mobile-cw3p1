const app = new Vue({
    el: '#app',
    data() {
        return {
            products: [],
            cart: [],
            sortedPrice: true,
            showCart: true,
            sortingOrder: "asc",
            sortBy: "name",
            //url: "http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections",
            url: "http://localhost:3000/collections",
            orders:
            {
                name: '',
                phone: '',
                slots: [],
            },
        }
    },

    //fetching the products in json from the get path
    created: function () {
      fetch("http://localhost:3000/collections/products")
        .then((response) => response.json())
        .then((products) => {
          this.products = products;
          return;
        });
      this.getproducts();
    },
    methods: {
        getproducts() {
            const url = `${this.url}/products/?search=${this.searchText}`;
            fetch(url)
              .then((response) => response.json())
              .then((products) => {
                this.products = products;
              });
        }
    }        
        
});