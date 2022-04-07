import axios from "axios";

const state = () => ({
    pokemons: {}
});

const getters = {
    getPokemons(state) {
        return state.pokemons
    }
};

const actions = {
    async pokemons({ commit }) {
        let response = await axios({
            method: 'GET',
            url: `${process.env.VUE_APP_API}/pokemon/`
        }).then(() => {

        })

        if (response && response.data) {
            commit('setPokemons', response.data)
        }
    },
    newPokemon({ dispatch }, pokedex_creature) {
        axios({
            method: 'POST',
            url: `${process.env.VUE_APP_API}/pokemon/`,
            data: pokedex_creature
        }).then(() => {
            dispatch('pokemons');
        })
    }
};

const mutations = {
    setPokemons(state, value) {
        state.pokemons = value;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
