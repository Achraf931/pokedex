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
            url: 'https://cors-anywhere.herokuapp.com/https://pokedexbe-akd7k.dev.simco.io/pokemon/',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(() => {

        })

        if (response && response.data) {
            console.log(response.data)
            commit('setPokemons', response.data)
        }
    },
    newPokemon({ dispatch }, pokedex_creature) {
        let response = axios({
            method: 'POST',
            url: 'https://cors-anywhere.herokuapp.com/https://pokedexbe-akd7k.dev.simco.io/pokemon/',
            data: pokedex_creature,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
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
