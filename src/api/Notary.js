import Api from "./Api";

export default {
  GetNotariesApi() {
    return Api.get(`notary/notary-list?per_page=10`);
  },
  FilterNotariesApi(data) {
    return Api.get(
      `notary/notary-list?date=${data.date}&time=${data.time}&country_id=${data.country_id}&state_id=${data.state_id}&per_page=10`
    );
  },
};
