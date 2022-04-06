import { tokenAlive } from "@/shared/jwtHelper";
import axios from "axios";
const state = () => ({
    authData: {
        token: "",
        refreshToken: "",
        tokenExp: "",
        userId: "",
        userName: "",
        email: "",
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
            .then(async () => {
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
                            access_token: response.data.access,
                            refresh_token: response.data['refresh'],
                            userName: payload.username,
                            email: payload.email
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
    }
};

const mutations = {
    saveTokenData(state, data) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

        //const jwtDecodedValue = jwtDecrypt(data.access_token);
        const newTokenData = {
            token: data.access_token,
            refreshToken: data.refresh_token,
            tokenExp: 6782635241432,
            userName: data.userName,
            email: data.email,
        };

        state.authData = newTokenData;
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
