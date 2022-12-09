import Vue from "vue";
import Schedule from "@/api/Schedule";
import store from "@/store";
import router from "@/router/router";
import { useToast } from "vue-toast-notification";

const toast = useToast();


export const getSessionRecords = ({ commit }, token) => {
  Schedule.showSessionRecord(token)
    .then((response) => {
      commit("SET_SESSION_RECORD", response.data.data);
    })
    .catch((error) => {
      if (error.response.status === 401 || error.response.status == 422) {
        commit("SET_TOKEN", null);
        router.push({ name: "Login" });
      }
    });
};

export const getSessionRecordToday = ({ commit }, token) => {
  Schedule.showSessionRecordToday(token)
    .then((response) => {
      commit("SET_SESSION_RECORD_TODAY", response.data);
    })
    .catch((error) => {
      if (error.response.status === 401 || error.response.status == 422) {
        commit("SET_TOKEN", null);
        router.push({ name: "Login" });
      }
    });
};

export const rescheduleSession = ({ commit }, sessionData) => {
  Schedule.RescheduleVirtualSession(sessionData)
    .then((response) => {
      const token = store.getters["auth/token"];

      Schedule.showSessionRecord(token)
        .then((res) => commit("SET_SESSION_RECORD", res.data.data))

      Schedule.showSessionRecordToday(token)
        .then((response) => commit("SET_SESSION_RECORD_TODAY", response.data))

      commit("SET_RESCHEDULE_SESSION", response.data.data);

      toast.success("Session has been rescheduled successfully", {
        timeout: 5000,
        position: "top-right",
      });
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_RESCHEDULE_SESSION", null);
        Vue.$toast.error(`${error.response.data.errors.root}`);
      }
    });
};

export const TimeSlotsAction = ({ commit, state }) => {
  if (state?.time_slots?.length === 0) {
    Schedule.TimeSlotsApi()
      .then((response) => {
        commit("SET_SCHEDULE_TIME_SLOTS", response.data);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 404) {
          commit("SET_SCHEDULE_TIME_SLOTS", null);
          Vue.$toast.error(`${error.response.data.errors.root}`);
        }
      });
  }
};

export const CountriesAction = ({ commit }) => {
  // if (state?.time_slots?.length === 0) {
  return Schedule.CountriesApi()
    .then((response) => {
      commit("SET_SCHEDULE_COUNTRY", response.data.data);
      return response.data.data[0].id;
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_SCHEDULE_COUNTRY", []);
        Vue.$toast.error(`${error.response.data.errors.root}`);
      }
      return false;
    });
  // }
};

export const StatesAction = ({ commit }, country_id) => {
  // if (state?.time_slots?.length === 0) {
  Schedule.StatesApi(country_id)
    .then((response) => {
      commit("SET_SCHEDULE_STATES", response.data.data);
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_SCHEDULE_STATES", []);
        Vue.$toast.error(`${error.response.data.errors.root}`);
      }
    });
  // }
};

export const ScheduleVirtualSessionUpdate = ({ commit }, sessionData) => {
  // if (state?.time_slots?.length === 0) {
  Schedule.ScheduleVirtualSessionUpdateStatus(sessionData)
    .then((response) => {
      commit("SET_SCHEDULE_STATUS", response.data.data);
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_SCHEDULE_STATUS", []);
        Vue.$toast.error(`${error.response.data.errors.root}`);
      }
    });
  // }
};

export const ScheduleVirtualSessionAction = ({ commit }, formData) => {
  return new Promise((resolve, reject) => {
    Schedule.ScheduleVirtualSessionApi(formData)
      .then((response) => {
        commit("SET_SCHEDULE_DETAILS", response.data.data);
        // save document id
        // commit(
        //   "documentStore/SET_DOCUMENT_ID",
        //   response.data.data.document.id,
        //   {
        //     root: true,
        //   }
        // );
        commit(
          "SET_SCHEDULE_TRANSACTION_ID",
          response.data.data.transactions[0].id
        );

        resolve();
      })
      .catch((error) => {
        // if (error) {
        commit("SET_SCHEDULE_DETAILS", null);
        Vue.$toast.error(`${error.response.data.message}`);
        commit("SET_SCHEDULE_DETAILS", null);
        reject();
        // }
        // if (error.response.status == 422) {
        // }
      });
  });
};

// for notary request payment
export const ScheduleTransactionAction = (
  { commit, state },
  payment_gateway
) => {
  Schedule.ScheduleTransactionApi({ id: state.transaction_id, payment_gateway })
    .then(() => {
      commit("SET_SCHEDULE_TRANSACTION_STATUS", true);
      Vue.$toast.success("Congratulations, your request was success");
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_SCHEDULE_TRANSACTION_STATUS", false);
        Vue.$toast.error(`${error.response.data.errors.root}`);
      }
    });
};

// agora
export const GenAgoraTokenAction = ({ commit }, payload) => {
  Schedule.GenerateAgoraToken(payload)
    .then((response) => {
      commit("SET_AGORA_DETAILS", true);
      window.sessionStorage.setItem(
        "agora",
        JSON.stringify(response.data.data)
      );
    })
    .catch((error) => {
      if (error) sessionStorage.setItem("agora", null);
    });
};

// get VIRTUAL SESSION details validate shchedule
export const VirtualSessionDetailsAction = ({ commit }, id) => {
  // commit("SET_SCHEDULE_LOADER");
  return Schedule.VirtualSessionDetailsApi(id)
    .then((response) => {
      // if (response.data.status !== "New") {
      //   Vue.$toast.error("Your session has ended");
      //   router.push({ name: "home" });
      // }
      commit("SET_VIRTUAL_SESSION_DETAILS", response.data);
      commit("UNSET_SCHEDULE_LOADER");
      // resolve(true);
    })
    .catch(() => {
      commit("SET_VIRTUAL_SESSION_DETAILS", null);
      commit("UNSET_SCHEDULE_LOADER");
      // Vue.$toast.error(`Invalid Notary Session`);
      // reject(false);
    });
};

// get AFFIDAVITE REQUEST

export const getAffidavitRequest = ({ commit }) => {
  const token = store.getters["auth/token"];
  return Schedule.AffidavitRequest(token)
    .then((response) => {

      commit("FETCH_AFFIDAVIT_REQUEST", response.data.data);

    })
    .catch(() => {
      commit("FETCH_AFFIDAVIT_REQUEST", null);
    });
};

export const getNotaryRequest = ({ commit }) => {
  const token = store.getters["auth/token"];
  return Schedule.NotaryRequest(token)
    .then((response) => {

      commit("FETCH_NOTARY_REQUEST", response.data.data);

    })
    .catch(() => {
      commit("FETCH_NOTARY_REQUEST", null);
    });
};

export const getVideoSignRequest = ({ commit }) => {
  const token = store.getters["auth/token"];
  return Schedule.VideoSignRequest(token)
    .then((response) => {

      commit("FETCH_VIDEO_SIGN_REQUEST", response.data.data);
    })
    .catch(() => {
      commit("FETCH_VIDEO_SIGN_REQUEST", null);
    });
};


