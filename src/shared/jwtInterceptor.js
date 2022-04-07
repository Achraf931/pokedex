import axios from "axios";
import store from '@/store/index';

axios.interceptors.request.use((config) => {
    const authData = store.getters["auth/getAuthData"];
    if (authData == null) {
        return config;
    }

    config.headers.common["Authorization"] = `Bearer ${authData.token}`;
    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            const authData = store.getters["auth/getAuthData"];

            let response = await axios.post(
                `${process.env.VUE_APP_API}/api/token/refresh/`,
                {refresh: authData.refreshToken}
            );
            await store.commit("auth/setNewToken", response.data.access);
            error.config.headers[
                "Authorization"
                ] = `Bearer ${response.data.access}`;
            return axios(error.config);
        } else {
            return Promise.reject(error);
        }
    }
);
