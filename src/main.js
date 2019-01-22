import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Store from "@/plugins/store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "@/plugins/cloud";

// this creates an object to store variables in
// it loads the store into the Vue object
// which every component is a child of
Vue.$store = new Store();
Vue.prototype.$store = Vue.$store;

Vue.config.productionTip = false;

// calls database to get the data
db.ref("visningar").on("value", getData, errData);

// callback when getting data
function getData(data) {
  let gotJSON = data.val();

  Vue.$store.shows = gotJSON;
  console.log(Vue.$store.shows);
}

function errData(err) {
  console.log(err);
}

let movielist = [
  {
    Title: "Fantastic+Beasts-+The+Crimes+of+Grindelwald",
    Trailer: "8bYBOVWLNIs"
  },
  {
    Title: "Glass",
    Trailer: "95ghQs5AmNk"
  },
  {
    Title: "Hunter+Killer",
    Trailer: "QAhcDHRZOak"
  },
  {
    Title: "The+Grinch",
    Trailer: "Bf6D-i8YpHg"
  },
  {
    Title: "A+Star+Is+Born",
    Trailer: "nSbzyEJ8X9E"
  },
  {
    Title: "Bohemian+Rhapsody",
    Trailer: "mP0VHJYFOAU"
  },
  {
    Title: "Lego+movie+2",
    Trailer: "11K013qpRR4"
  },
  {
    Title: "Ralph+Breaks+the+Internet",
    Trailer: "_BcYBFC6zfY"
  },
  {
    Title: "Aquaman",
    Trailer: "WDkg3h8PCVU"
  },
  {
    Title: "A+Dog's+Way+Home",
    Trailer: "1pKdCHvH310"
  },
  {
    Title: "Bumblebee",
    Trailer: "lcwmDAYt22k"
  },
  {
    Title: "On+the+Basis+of+Sex",
    Trailer: "28dHbIR_NB4"
  },
  {
    Title: "Mary+Poppins+Returns",
    Trailer: "-3jsfXDZLIY"
  },
  {
    Title: "Escape+room&y=2018",
    Trailer: "6dSKUoV0SNI"
  },
  {
    Title: "Vice&y=2018",
    Trailer: "jO3GsRQO0dM"
  },
  {
    Title: "Spider-Man%3A+Into+the+Spider-Verse",
    Trailer: "g4Hbz2jLxvQ"
  }
];

let movieCounter = 0;

for (let query of movielist) {
  fetch("https://www.omdbapi.com/?t=" + query.Title + Vue.$store.apikey)
    .then(res => {
      return res.json();
    })
    .then(res => {
      movieCounter++;

      res.Link = query.Title;
      res.Trailer = query.Trailer;
      Vue.$store.movies.push(res);

      // starts Vue after collecting all data from api
      if (movieCounter === Vue.$store.movies.length) {
        new Vue({
          router,
          render: h => h(App)
        }).$mount("#app");

        console.log(Vue.$store.movies);
      }
    });
}
console.log(Vue.$store.movies);
