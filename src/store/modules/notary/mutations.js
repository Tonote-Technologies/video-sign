export const SET_NOTARY_LIST = (state, payload) => {
  state.notary_list = payload;
};
export const SET_FILTER_LOADING = (state, payload) => {
  state.filter_loading = payload;
};
export const SET_RESET_LOADING = (state, payload) => {
  state.reset_loading = payload;
};
export const NOTARY_READY = (state) => {
  state.notaryReady = true;
};
export const NOTARY_NOT_READY = (state) => {
  state.notaryReady = false;
};
