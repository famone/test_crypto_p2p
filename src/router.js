import { createRouter, createWebHistory } from 'vue-router'
import Dealings from './views/Dealings.vue'
import Login from './views/Login.vue'
// import SignUp from './views/SignUp.vue'
import Account from './views/Account.vue'
import Balance from './views/Balance.vue'
import Calls from './views/Calls.vue'
import PaymentPage from './views/PaymentPage.vue'
import { useAuthStore } from './stores/auth.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Dealings,
            meta: {
                guardAuth: true
            }
        },
        {
            path: '/enter',
            component: Login,
            name: 'login'
        },
        // {
        //     path: '/signup',
        //     component: SignUp,
        //     name: 'signup'
        // },
        {
            path: '/account',
            component: Account,
            name: 'account',
            meta: {
                guardAuth: true
            }
        },
        {
            path: '/calls',
            component: Calls,
            name: 'calls',
            meta: {
                guardAuth: true
            }
        },
        {
            path: '/balance',
            component: Balance,
            name: 'balance',
            meta: {
                guardAuth: true
            }
        },
        {
            path: '/payment',
            component: PaymentPage,
            name: 'payment',
        }
    ]
})

router.beforeEach((to, from, next) => {
    const store = useAuthStore()
    if(to.meta.guardAuth){
        if(!store.getUser){
            next('/enter');
        }else{
            next();
        }
    }else{
        next();
    }
})

export default router