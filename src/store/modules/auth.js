import axios from "axios";

const state = () => ({
    authData: {
        token: localStorage.getItem('access_token')?? "",
        refreshToken: localStorage.getItem('refresh_token')?? "",
        userName: localStorage.getItem('refresh_token')?.userName?? "",
        email: localStorage.getItem('refresh_token')?.email?? "",
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
        if (!state.authData.token) {
            return false;
        }

        const exp = state.authData.token.split('.')[1];
        const json = JSON.parse(atob(exp));
        return json.exp * 1000 > + new Date();
    },
};

const actions = {
    async register({ commit, dispatch }, payload) {
        await axios({
            method: 'POST',
            url: `${process.env.VUE_APP_API}/api/users/register/`,
            data: payload
        })
            .then(async () => {
                await axios({
                    method: 'POST',
                    url: `${process.env.VUE_APP_API}/api/token/`,
                    data: {
                        username: payload.username, password: payload.password
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
                            commit("setTokens", object);
                            commit("setUser", object);
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
    setTokens(state, data) {
        state.authData.token = data.access_token
        state.authData.refreshToken = data.refresh_token
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem('exp', `${new Date() / 1}`);
    },
    setUser(state, data) {
        state.authData.userName = data.userName;
        state.authData.email = data.email;
        localStorage.setItem('user', JSON.stringify({userName: data.userName, email: data.email}))
    },
    setLoginStatus(state, value) {
        state.loginStatus = value;
    },
    setNewToken(state, value) {
        state.authData.token = value;
        localStorage.setItem("access_token", value);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
