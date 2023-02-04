const app = Vue.createApp({
    el: '#app',
    data() {
        return {
            cart: [],
            sortedPrice: true,
            showProducts: 0,
            sortingOrder: "asc",
            sortBy: "name",
            products: "http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products",
            //products: "http://localhost:3000/collections/products",
            orders:
            {
                name: '',
                phone: '',
                slots: [],
            },
            lessons: [],
            cartData: []
        }
    },

    created: function () {
        fetch("http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products")
        .then((response) => response.json())
        .then((lessons) => {
          this.lessons = lessons;
        });
  
      // this.getLessons();
    },
});

// let Webstore = new Vue ({
//     el: "#app",
//     data: {
//         sitename: "Lesson Store",
//         showProduct: true,
//         products: [],
//         cart: [],
//         order: {
//             name: "",
//             surname: "",
//             address: "",
//             city: "",
//             state: "",
//             zip: "",
//             gift:"Do not send as gift",
//             method: "Home",
//             sendGift: "Send as gift",
//             dontSendGift: "Do not send as gift"
//         },
//         states: {
//             AL: "Alabama",
//             AR: "Arizona",
//             CA: "California",
//             NV: "Nevada"
//         }
//     },
//     created: function(){
//         fetch("http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products").then(
//             function(response) {
//                 response.json.then(
//                     function(json){
//                         alert(json);
//                         Webstore.products = json;
//                     }
//                 )
//             }
//         );
//     },
// })

console.log(fetch('http://lessonapp-env.eba-uiw2prds.us-east-1.elasticbeanstalk.com/collections/products')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error)));