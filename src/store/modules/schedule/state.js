export default {
  sessionRecord: [],
  sessionRecordToday: [],
  rescheduleSession: null,
  time_slots: [],
  errors: null,
  // schedule details form data
  schedule_formdata: {
    title: null,
    documentTitle: null,
    temDocData: [],
    documentFile: [],
    participants: [],
    schedule_type: null, //immediate or schedule
    notary: null, // yes or no
    date: null,
    time: null,
  },

  // schedule country
  country: [],
  states: [],
  filter_loading: false,

  // schedule details
  schedule_details: {
    id: null,
    comment: null,
    customer: {
      id: null,
      first_name: null,
      email: null,
      last_name: null,
    },
    customer_id: null,
    document_id: null,
    participants: [],
    participants_count: null,
    tools_count: null,
    uploads_count: null,
    end_session: null,
    date: null,
    description: null,
    end_time: null,
    immediate: null,
    meeting_link: null,
    notary: null,
    request_type: null,
    session: null,
    start_session: null,
    start_time: null,
    status: null,
    title: null,
    token: null,
  },

  transaction_id: null,
  transaction_status: false,
  schedule_details_loading: false,
  //   virtual_session_details: null,
  virtual_session_details: {

  },

  // agora
  agora: null,
  affidavits: null,
  notary_request: null,
  video_sign: null,
};
