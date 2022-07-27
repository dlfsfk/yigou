import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Graphs from "../views/Graphs.vue";
import Map from "../views/Map.vue";
import Buildings from "../views/Buildings.vue";
import Loading from "../views/Loading.vue";
import Province from "../views/Province.vue";
import City from "../views/City.vue";

export default [
  {
    path: "/",
    component: Home,
  },
  { path: "/loading", component: Loading },
  {
    path: "/graphs",
    component: Graphs,
    meta: {
      auth: true,
    },
  },
  {
    path: "/buildings",
    component: Buildings,
    meta: {
      auth: true,
    },
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/map",
    component: Map,
    meta: {
      auth: true,
    },
  },
  {
    path: "/province",
    component: Province,
    meta: {
      auth: true,
    },
  },
  {
    path: "/city",
    component: City,
    meta: {
      auth: true,
    },
  },
];
