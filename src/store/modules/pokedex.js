import axios from "axios";

const state = () => ({
    pokedex: []
});

const getters = {
    getPokedex(state) {
        return state.pokedex
    }
};

const actions = {
    async pokedex({ commit }) {
        let response = await axios({
            method: 'GET',
            url: `${process.env.VUE_APP_API}/pokedex/?limit=50&offset=50`
        })

        if (response && response.data) {
            commit('setPokedex', response.data)
        }
    }
};

const mutations = {
    setPokedex(state, value) {
        state.pokedex = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
