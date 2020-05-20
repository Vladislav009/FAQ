import Vue from 'vue';
import Vuex from 'vuex';
import router from "../router";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        auth_user: '',
        is_login: false,
        loading: true,
    },
    getters: {
        getUserInfo: state => {
            return state.auth_user
        },
        getLoading: state => {
            return state.loading
        },

        getStatus: state => {
            return state.is_login;
        }
    },
    mutations: {
        setUser(state, user) {
            state.auth_user = user;
            state.is_login = true;
        },

        loadingOff(state) {
            state.loading = false
        },

        logout(state) {
            $cookies.remove('token');
            state.auth_user = '';
            state.is_login = false
        }
    },
    actions: {
        getUser(context, token) {
            axios.get(`${process.env.MIX_APP_URL}/api/user`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            ).then((res) => {
                context.commit('setUser', res.data)
            }).catch((e) => {
                console.error(e)
            }).finally(() =>{
                context.commit('loadingOff');
            })
        },
    }
});

export default store;
