import Notary from "@/api/Notary";
// import router from "@/router/router";
// import { useToast } from "vue-toast-notification";
// const toast = useToast();

export const GetNotariesAction = ({ commit }) => {
  commit("SET_RESET_LOADING", true);
  Notary.GetNotariesApi()
    .then((response) => {
      commit("SET_NOTARY_LIST", response.data.data);
      commit("SET_RESET_LOADING", false);
    })
    .catch((error) => {
      if (error) {
        commit("SET_NOTARY_LIST", []);
        commit("SET_RESET_LOADING", false);
      }
    });
};
export const FilterNotariesAction = ({ commit }, data) => {
  commit("SET_FILTER_LOADING", true);
  Notary.FilterNotariesApi(data)
    .then((response) => {
      commit("SET_NOTARY_LIST", response.data.data);
      commit("SET_FILTER_LOADING", false);
    })
    .catch((error) => {
      if (error) {
        commit("SET_NOTARY_LIST", []);
        commit("SET_FILTER_LOADING", false);
      }
    });
};
