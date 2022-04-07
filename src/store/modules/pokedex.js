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
            url: 'https://cors-anywhere.herokuapp.com/https://pokedexbe-akd7k.dev.simco.io/pokedex/?limit=50&offset=50',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json'
            }
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
