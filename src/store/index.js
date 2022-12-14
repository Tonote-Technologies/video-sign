import { createLogger, createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const debug = process.env.NODE_ENV !== "production";
const plugins = debug
  ? [createLogger(), createPersistedState()]
  : [createPersistedState()];

import state from "@/store/state";
import * as getters from "@/store/getters";
import * as mutations from "@/store/mutations";
import * as actions from "@/store/actions";

import auth from "@/store/modules/auth";
import company from "@/store/modules/company";
import team from "@/store/modules/team";
import document from "@/store/modules/document";
import print from "@/store/modules/print";
import tool from "@/store/modules/tool";
import schedule from "@/store/modules/schedule";
import notary from "@/store/modules/notary";

const modules = {
  auth,
  company,
  team,
  document,
  print,
  notary,
  tool,
  schedule,
};

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: plugins,
});
