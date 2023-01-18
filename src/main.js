import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './data/routes'
import VueMeta from "vue-meta";

Vue.use(VueRouter)
Vue.use(VueMeta)


const router = new VueRouter({
    routes,
    mode: 'history'
})


 new Vue({
    render: h => h(App),
    router,
}).$mount('#app')
