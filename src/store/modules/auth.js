import {tokenAlive} from "@/shared/jwtHelper";
import axios from "axios";

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        username: "",
        email: ""
    },
    loginStatus: "",
});

const getters = {
    getLoginStatus(state) {
        return state.loginStatus;
    },
    getAuthData(state) {
        return state.authData;
    },
    isTokenActive(state) {
        if (!state.authData.tokenExp) {
            return false;
        }
        return tokenAlive(state.authData.tokenExp);
    },
};

const actions = {
    async register({ commit }, payload) {
        await axios({
            method: 'POST',
            url: `https://cors-anywhere.herokuapp.com/https://pokedexbe-akd7k.dev.simco.io/api/users/register/`,
            data: {
                'username': payload.username, 'email': payload.email, 'password': payload.password
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
            }
        })
            .then(async res => {
                await axios({
                    method: 'POST',
                    url: `https://cors-anywhere.herokuapp.com/https://pokedexbe-akd7k.dev.simco.io/api/token/`,
                    data: {
                        'username': payload.username, 'password': payload.password
                    },
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-type': 'application/json',
                    }
                })
                    .then(response => {
                        let object = {
                            access: response.data.access,
                            refresh: response.data['refresh'],
                            username: payload.username,
                            email: payload.email,
                            exp: 6720273453
                        }

                        if (response && response.data) {
                            commit("saveTokenData", object);
                            commit("setLoginStatus", "success");
                        } else {
                            commit("setLoginStatus", "failed");
                        }
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    },
};

const mutations = {
    saveTokenData(state, data) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data['refresh']);

        state.authData = {
            token: data.access,
            refreshToken: data['refresh'],
            tokenExp: data.exp,
            username: data.username,
            email: data.email
        };
    },
    setLoginStatus(state, value) {
        state.loginStatus = value;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
