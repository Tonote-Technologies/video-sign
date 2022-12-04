import axios from "axios";
import NProgress from "nprogress";
import store from "@/store";
import router from "@/router/router";

let theBaseUrl = ''
if (process.env.NODE_ENV == 'development') {
  theBaseUrl = process.env.VUE_APP_API_LOCAL
} else {
  theBaseUrl = process.env.VUE_APP_API_LIVE
}

const Api = axios.create({
  baseURL: theBaseUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "true"
  },
});

const progressFns = () => {
  let progressTimeout,
    count = 0;

  const start = () => {
    count++;

    progressTimeout = setTimeout(() => {
      NProgress.start();
    }, 200);
  };

  const stop = () => {
    count = Math.max(0, count - 1);
    if (count > 0) return;

    NProgress.done();
    clearTimeout(progressTimeout);
  };

  return { start, stop };
};

const { start: progressStart, stop: progressStop } = progressFns();

const parseJwt = (token) => {
  const decode = JSON.parse(atob(token.split('.')[1]));

  if (decode.exp * 1000 < new Date().getTime()) {
    if (process.env.NODE_ENV == 'development') {
      console.log('Time Expired');
    }
    router.push({ name: "Login" });
    window.localStorage.removeItem('vuex');
  }
};

Api.interceptors.request.use(
  async (config) => {
    let hasToken = await store.getters["auth/token"];

    if (hasToken) {
      parseJwt(hasToken);
      config.headers["Authorization"] = `Bearer ${hasToken}`;
    }

    if (!config.__noProgress) progressStart();

    return config;
  },
  (error) => {
    progressStop();

    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    if (!response.config.__noProgress) progressStop();

    return response;
  },
  (error) => {
    progressStop();

    // const FORBIDDEN = 403;
    // const { status } = error.response;
    // if (status === FORBIDDEN) {
    //   router.push({ name: "Login" });
    // }
    // const UNAUTHORIZED = 401;
    // const { status } = error.response;
    // if (status === UNAUTHORIZED) {
    //   router.push({ name: "Login" });
    // }

    if (process.env.NODE_ENV == 'development') {
      console.log(error.response);
    }
    if (error.response == undefined) {
      window.localStorage.removeItem('vuex');
      router.push({ name: "Login" });
    }

    return Promise.reject(error);
  }
);

export default Api;