export const SET_SCHEDULE_TIME_SLOTS = (state, payload) => {
  state.time_slots = payload;
};

export const SET_SCHEDULE_COUNTRY = (state, payload) => {
  state.country = payload;
};

export const SET_SCHEDULE_STATES = (state, payload) => {
  state.states = payload;
};

export const SET_SCHEDULE_DETAILS = (state, payload) => {
  state.schedule_details.id = payload.id;
  state.schedule_details.comment = payload.comment;
  state.schedule_details.customer.id = payload.customer.id;
  state.schedule_details.customer.first_name = payload.customer.first_name;
  state.schedule_details.customer.email = payload.customer.email;
  state.schedule_details.customer.last_name = payload.customer.last_name;
  state.schedule_details.customer_id = payload.customer_id;
  state.schedule_details.document_id = payload.document.id;
  state.schedule_details.participants = payload.document.participants;
  state.schedule_details.participants_count =
    payload.document.participants_count;
  state.schedule_details.tools_count = payload.document.tools_count;
  state.schedule_details.uploads_count = payload.document.uploads_count;
  state.schedule_details.end_session = payload.end_session;
  state.schedule_details.date = payload.date;
  state.schedule_details.description = payload.description;
  state.schedule_details.end_time = payload.end_time;
  state.schedule_details.immediate = payload.immediate;
  state.schedule_details.meeting_link = payload.meeting_link;
  state.schedule_details.notary = payload.notary;
  state.schedule_details.request_type = payload.request_type;
  state.schedule_details.session = payload.session;
  state.schedule_details.start_session = payload.start_session;
  state.schedule_details.start_time = payload.start_time;
  state.schedule_details.status = payload.status;
  state.schedule_details.title = payload.title;
  state.schedule_details.token = payload.token;
};

// schedule transaction
export const SET_SCHEDULE_TRANSACTION_ID = (state, payload) => {
  state.transaction_id = payload;
};

export const SET_SCHEDULE_TRANSACTION_STATUS = (state, payload) => {
  state.transaction_status = payload;
};

export const SET_VIRTUAL_SESSION_DETAILS = (state, payload) => {
  state.virtual_session_details = payload;

};

export const SET_SCHEDULE_LOADER = (state) => {
  state.schedule_details_loading = true;
};

export const UNSET_SCHEDULE_LOADER = (state) => {
  state.schedule_details_loading = false;
};

// schedule video signing form data
//stage one (document title and upload file)
export const SET_SCHEDULE_FORMDATA_1 = (state, payload) => {
  console.log(payload);
  state.schedule_formdata.documentFile.push(payload.documentFile);
  state.schedule_formdata.title = payload.title;
  state.schedule_formdata.documentTitle = payload.documentTitle;
};
export const UNSET_SCHEDULE_FORMDATA_1 = (state) => {
  state.schedule_formdata.documentTitle = null;
  state.schedule_formdata.documentFile = [];
};
//stage two (add and edit participants)
export const SET_SCHEDULE_FORMDATA_2 = (state, payload) => {
  const Exists = state.schedule_formdata.participants.filter((participant) => {
    return payload.email == participant.email;
  });
  if (Exists.length == 0) {
    state.schedule_formdata.participants.push(payload);
  }
};
export const UNSET_SCHEDULE_FORMDATA_2 = (state, id) => {
  state.schedule_formdata.participants =
    state.schedule_formdata.participants.filter((participant) => {
      return id != participant.id;
    });
};
//stage two (invite notary, select schedule type, time and date)
export const SET_SCHEDULE_FORMDATA_3 = (state, payload) => {
  state.schedule_formdata.schedule_type = payload.schedule_type;
  state.schedule_formdata.notary = payload.notary;
  state.schedule_formdata.date = payload.date;
  state.schedule_formdata.time = payload.time;
};

// clear form data
export const CLEAR_SCHEDULE_FORMDATA = (state) => {
  state.schedule_formdata.schedule_type = null;
  state.schedule_formdata.notary = null;
  state.schedule_formdata.date = null;
  state.schedule_formdata.time = null;
  state.schedule_formdata.participants = [];
  state.schedule_formdata.title = null;
  state.schedule_formdata.documentTitle = null;
  state.schedule_formdata.documentFile = [];
};

export const SET_AGORA_DETAILS = (state, payload) => {
  state.agora = payload;
};

export const FETCH_AFFIDAVIT_REQUEST = (state, payload) => {
  state.affidavits = payload;
}; 

export const FETCH_NOTARY_REQUEST = (state, payload) => {
  state.notary_request = payload;
}; 

export const FETCH_VIDEO_SIGN_REQUEST = (state, payload) => {
  state.video_sign = payload;
}; 