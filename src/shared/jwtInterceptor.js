import axios from "axios";
import store from '@/store/index';

const jwtInterceptor = axios.create({});


jwtInterceptor.interceptors.request.use((config) => {
    const authData = store.getters["auth/getAuthData"];

    if (authData == null) {
      return config;
    }
    console.log(authData.token);
    config.headers.common["Authorization"] = `bearer ${authData.token}`;
    return config;
  });

  jwtInterceptor.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 401) {
        const authData = store.getters["auth/getAuthData"];

          let response = await axios({
              method: 'POST',
              url: `https://cors-anywhere.herokuapp.com/https://pokedexbe-akd7k.dev.simco.io/api/token/refresh/`,
              data: {refresh: authData.refreshToken},
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-type': 'application/json',
              }
          });
        await store.dispatch("auth/saveTokensToStorage", response.data);
        error.config.headers[
          "Authorization"
        ] = `bearer ${response.data.access_token}`;
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }
    }
  );

  export default jwtInterceptor;
