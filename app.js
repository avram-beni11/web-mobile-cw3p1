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
            searchText: " ",
            searchResults: [],
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
        },//end get products
        addItem: function (lesson) {
            this.cart.push(lesson.id);
            lesson.spaces -= 1;

        },
        canAddToCart: function (lesson) {
            return lesson.spaces > this.cartCount(lesson.id);
        },
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        sortTable(key, direction) {
            this.sort = `${key} > ${direction}`
            if (direction === 'asc') {
                this.lessons.sort((a, b) => a[key] > b[key] ? 1 : -1)
            } else {
                this.lessons.sort((a, b) => a[key] < b[key] ? 1 : -1)
            }
            //DO THE CURL GET STUFF TO SORT
        },
        showCheckout() {
            this.showCart = this.showCart ? false : true;
        },
        submitCheck() {
            alert('Thank You For Shopping!')
            location.reload();
        },
        search() {
            fetch(`http://localhost:3000/collections/lessons/search?q=${this.searchText}`)
                .then(response => response.json())
                .then(data => {
                    this.searchResults = data;
                })
                .catch(error => console.error(error))
        }
    }        
        
});