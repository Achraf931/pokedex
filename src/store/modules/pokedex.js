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
        })

        if (response && response.data) {
            commit('setPokemons', response.data)
        }
    },
    newPokemon({ dispatch }, data) {
        axios({
            method: 'POST',
            url: `${process.env.VUE_APP_API}/pokemon/`,
            data: data
        }).then(() => {
            dispatch('pokemons');
        })
    },
    async paginate({ commit, dispatch }, direction) {
        let response = await axios({
            method: 'GET',
            url: direction
        });

        if (response && response.data) {
            commit('setPokemons', response.data)
        }
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
