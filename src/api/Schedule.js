import Api from "./Api";
const REQUEST_VIRTUAL_SESSION = "request-virtual-session";
const REQUEST_VIRTUAL_SESSION_TODAY = "request-virtual-session-today";

export default {
  showSessionRecord(token) {
    return Api.get(`${REQUEST_VIRTUAL_SESSION}?entry_point=Video`, token);
  },

  showSessionRecordToday(token) {
    return Api.get(`${REQUEST_VIRTUAL_SESSION_TODAY}?entry_point=Video`, token);
  },

  // get all the time slots
  TimeSlotsApi() {
    return Api.get(`time-slots`);
  },

  // api for country
  CountriesApi() {
    return Api.get(`countries`);
  },

  StatesApi(country_id) {
    return Api.get(`countries/${country_id}`);
  },

  //request virtual notary session
  ScheduleVirtualSessionApi(data) {
    return Api.post(`request-virtual-session`, data);
  },

  //request virtual notary session
  ScheduleVirtualSessionUpdateStatus(data) {
    return Api.put(`request-virtual-session/${data.id}`, data.payload);
  },

  RescheduleVirtualSession(data) {
    return Api.put(`request-virtual-session/${data.id}`, data.payload);
  },

  //get virtual session details
  VirtualSessionDetailsApi(id) {
    return Api.get(`request-virtual-session/${id}`);
  },

  // payment for request virtual notary session
  ScheduleTransactionApi(data) {
    return Api.put(`transactions/${data.id}`, {
      payment_gateway: data.payment_gateway,
    });
  },

  // agora
  GenerateAgoraToken(data) {
    return Api.post("agora/token", data);
  },

  // 

  AffidavitRequest(data) {
    return Api.get("scheduled-requests", data);
  },

  NotaryRequest(data) {
    return Api.get("document", data);
  },

  VideoSignRequest(data) {
    return Api.get("document", data);
  },
};
