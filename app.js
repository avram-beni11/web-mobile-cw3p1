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
            url: "http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections",
            //url: "http://localhost:3000/collections",
            orders:
            {
                name: '',
                phone: '',
            },
            id: [],
            orderLessonSpaces: null,
        }
    },

    //fetching the products in json from the get path
    created: function () {
        fetch("http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products")
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
        canAddToCart(lesson) {
            return lesson.spaces > this.cartCount(lesson.id);
        },
        // cartCount(id) {
        //     let count = 0;
        //     for (let i = 0; i < this.cart.length; i++) {
        //         if (this.cart[i] === id) {
        //             count++;
        //         }
        //     }
        //     return count;
        // },
        cartCount(products) {   
            let count = 0;       //Gets the item in cart By id
            for (i = 0; i < this.cart.length; i++) {
                if (this.cart[i].products === products) {
                    return this.cart[i]
                }
            }
            return count;
        },
        // sortTable(key, direction) {
        //     this.sort = `${key} > ${direction}`
        //     if (direction === 'asc') {
        //         this.lessons.sort((a, b) => a[key] > b[key] ? 1 : -1)
        //     } else {
        //         this.lessons.sort((a, b) => a[key] < b[key] ? 1 : -1)
        //     }
        //     //DO THE CURL GET STUFF TO SORT
        // },
        showCheckout() {
            this.showCart = this.showCart ? false : true;
        },
        submitCheck() {
            this.computeLessonsForOrder();
            const newOrder = {
                "name": this.order.name,
                "phoneNumber": this.order.phone_number,
                "lessonId": this.id,
                "numberOfSpaces": this.spaces
            }

            fetch("http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder)
            }).then(
                function (response) {
                    response.json().then(
                        function (json) {
                            console.log("Success: " + json.ackowledged);


                        }
                    )
                }
            )

            //PUT route for updating the lessons
            this.cart.forEach(j => {
                this.lessons.forEach(i => {

                    let count = null;
                    if (j == i.id) {
                        count = count + 1;

                        const updateLesson = {
                            "spaces": i.spaces - count
                        }

                        fetch(`http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/lessons/${i._id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updateLesson)
                        }).then(
                            function (response) {
                                response.json().then(
                                    function (json) {
                                        console.log("Success: " + json.ackowledged);
                                    }
                                )
                            }
                        )
                    }
                })
            })
            alert("Thank you for submitting your order!");
        },
        removeLesson(index) {
            this.cart.splice(index, 1);
        },
    },//end method
    computed: {
        cartItemCount() {
            return this.cart.length || '';
        },
    }

});