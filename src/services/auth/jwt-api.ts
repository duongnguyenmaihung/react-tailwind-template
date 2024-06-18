import axios from "axios";

export const BaseAPI = import.meta.env.VITE_BASE_URL;

const jwtAxios = axios.create({
  baseURL: BaseAPI, //YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      err?.response &&
      (err?.response?.status === 401 || err?.response?.status === 403)
    ) {
      console.log("Need to logout user");
      delete jwtAxios.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.reload();
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  }
);
export const setAuthToken = (token?: string, refreshToken?: string) => {
  if (token && refreshToken) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
};

export default jwtAxios;
