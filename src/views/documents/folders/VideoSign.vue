<template>
  <div class="container-fluid">
    <div class="row p-0" id="basic-table ">
      <div class="col col-12">
        <div class="card">
          <div class="card-body">
            <h3 class="">Next Scheduled Meeting Today</h3>
            <!-- <p>You have no scheduled meeting for today</p> -->
            <template v-if="filterDocByNextMeeting.length > 0">
              <template v-for="(result, index) in filterDocByNextMeeting" :key="index">
                <div class="border-bottom py-1 d-flex justify-content-between">
                  <div>
                    <div class="h5">Title: {{ result.title }}</div>
                    <div class="text-mute">
                      {{ dateTime(result.date + " " + result.start_time) }}
                    </div>
                  </div>
                  <div>
                    <router-link :to="{
                      name: 'document.waiting-page',
                      params: { session_id: result.id },
                    }" class="btn btn-primary btn-sm">Join now</router-link>
                  </div>
                </div>
              </template>
            </template>
            <template v-else>
              You have no pending scheduled meeting today
            </template>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Video Signed Document</h4>
            <div class="wrap">
              <router-link :to="{ name: 'document.video' }" class="btn btn-primary waves-effect">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-plus">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Video Sign</span>
              </router-link>
            </div>
          </div>
          <div class="card-body py-4">
            <div class="table-responsive">
              <table class="table table-hover" id="allrecord">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Document Title</th>
                    <th>Participants</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Connect</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, index) in filterDocByVideo" :key="index">
                    <!-- <template v-if="result.entry_point === 'Video'"> -->
                    <td>{{ ++index }}</td>

                    <td>
                      <h6 class="user-name text-truncate mb-0" style="width: 300px">
                        {{ result.title }}
                      </h6>
                      <small class="badge rounded-pill me-1" :class="[
                        result.immediate == true
                          ? 'badge-light-danger'
                          : 'badge-light-primary',
                      ]">
                        {{
                            result.immediate == true
                              ? "Immediate Session"
                              : "Scheduled Session"
                        }}
                      </small>
                    </td>

                    <td>
                      <small class="badge badge-light-primary">
                        Participants {{ result.participants_count }}
                      </small>
                    </td>

                    <td>
                      <div class="d-flex flex-column">
                        <h6 class="user-name text-truncate mb-0">
                          {{ dateTime(result.date + " " + result.start_time) }}
                        </h6>
                      </div>
                    </td>
                    <td>
                      <span class="badge rounded-pill me-1" :class="[
                        result.status == 'Pending'
                          ? 'bg-warning'
                          : 'bg-success',
                      ]">
                        {{ result.status }}
                      </span>
                    </td>
                    <td>
                      <template v-if="
                        result.immediate === true &&
                        result.date === today &&
                        result.end_session === false &&
                        result.status === 'Pending'
                      ">
                        <router-link :to="{
                          name: 'document.waiting-page',
                          params: { session_id: result.id },
                        }" class="btn btn-primary btn-sm">Join</router-link>
                      </template>
                      <!-- <template v-else> Missed Session </template> -->
                    </td>
                    <td>
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                          aria-expanded="false">
                          <Icon icon="oi:ellipses" :rotate="1" :verticalFlip="true" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <template v-if="result.status != 'completed'">
                            <div @click="openSessionModal(result.id)" class="dropdown-item">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-edit font-small-4 me-50">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>Reschedule
                            </div>
                            <router-link :to="{ name: 'document.preview' }" class="dropdown-item" @click="
                              getDocument({
                                id: result.document.id,
                              })
                            ">
                              <Icon icon="fontisto:preview" />
                              Preview
                            </router-link>
                          </template>
                          <template v-else>
                            <div class="dropdown-item">
                              <Icon icon="carbon:download" /> Download
                            </div>
                          </template>
                        </div>
                      </div>

                      <div class="d-none">
                        <template v-if="result.status != 'completed'">
                          <div class="text-center w-100">
                            <button @click="openSessionModal(result.id)"
                              class="btn btn-outline-warning btn-sm waves-effect waves-float center-block">
                              <Icon icon="healthicons:i-schedule-school-date-time-outline" />
                              Reschedule
                            </button>

                            <router-link :to="{ name: 'document.preview' }"
                              class="btn-outline-danger btn btn-sm my-1 ms-1" @click="
                                getDocument({
                                  id: result.document.id,
                                })
                              ">
                              <Icon icon="fontisto:preview" />
                              Preview
                            </router-link>
                          </div>
                        </template>
                        <template v-else>
                          <div class="text-center w-100">
                            <button class="btn btn-primary btn-sm">
                              <Icon icon="carbon:download" /> Download
                            </button>
                          </div>
                        </template>
                      </div>
                    </td>
                    <!-- </template> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalComp :show="questionModal" :size="modal - sm" :footer="false" :closeBtn="true" @close="questionModal = false">
      <template #header>
        <h5 class="modal-title">Reschedule Session</h5>
      </template>

      <template #body>
        <p class="text-center">Change your schedule below</p>
        <div class="my-2">
          <form @submit.prevent="submitReschedule">
            <div class="form-group mb-2">
              <label>Date</label>
              <Datepicker @selected="dateSelected" :value="reschedule.date" format="yyyy-MM-dd" :iconHeight="0"
                :iconWidth="0" :disabled-dates="{
                  to: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                  ),
                }" />
            </div>

            <div class="form-group mb-4">
              <label>Time</label>
              <select v-model="reschedule.start_time" class="form-select">
                <option v-for="(time, index) in displayTimeSlot" :key="time + index" :value="time">
                  {{ time }}
                </option>
              </select>
            </div>

            <div class="modal-footer px-0 pb-0">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </template>
    </ModalComp>
  </div>
</template>

<script setup>
import { request } from "../data.js";
import { ref, onMounted, onUpdated, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useActions, useGetters } from "vuex-composition-helpers/dist";
import ModalComp from "@/components/ModalComp.vue";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-bs5";
import $ from "jquery";

const today = moment().format("YYYY-MM-DD");

const dateTime = (date) => {
  return moment(date).format("Do MMM YYYY · h:mm a");
};


const { token, allSessionRecord, allSessionRecordToday, time_slots } = useGetters({
  token: "auth/token",
  allSessionRecord: "schedule/allSessionRecord",
  allSessionRecordToday: "schedule/allSessionRecordToday",
  getRescheduled: "schedule/getRescheduled",
  time_slots: "schedule/time_slots",
});

const { getSessionRecords, getSessionRecordToday, rescheduleSession, getUserDocument, TimeSlotsAction } = useActions({
  getSessionRecords: "schedule/getSessionRecords",
  getSessionRecordToday: "schedule/getSessionRecordToday",
  rescheduleSession: "schedule/rescheduleSession",
  TimeSlotsAction: "schedule/TimeSlotsAction",
  getUserDocument: "document/getUserDocument",
});

const data = ref("");
data.value = request;

const questionModal = ref(false);

const sessionId = ref('')
const openSessionModal = (id) => {
  sessionId.value = id
  questionModal.value = true;
};

const reschedule = ref({})
const submitReschedule = () => {
  let formData = { id: sessionId.value, payload: reschedule.value }
  rescheduleSession(formData)
  questionModal.value = false
  reschedule.value = {}
}


const getDocument = (params) => {
  getUserDocument(params.id);
};

const dateSelected = (data) => {
  reschedule.value.date = moment(data).format("YYYY-MM-DD");
}

const displayTimeSlot = computed(() => {
  const convertTimeToSeconds = (params) => {
    const slittedTimeSlots = params.split(':');
    return (+slittedTimeSlots[0]) * 3600 + (+slittedTimeSlots[1]) * 60 + (+slittedTimeSlots[2]);
  }

  const convertSecondsToTime = (seconds) => {
    if (seconds < 0) return "-" + convertSecondsToTime(-seconds);
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  const timeSlots = time_slots.value
  const isToday = moment(reschedule.value.date).isSame(moment(), 'day');

  const currentDate = new Date();
  let hr = currentDate.getHours()
  let min = currentDate.getMinutes()
  let sec = currentDate.getSeconds()

  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  const time = hr + ":" + min + ":" + sec;
  const currentTimeInSeconds = convertTimeToSeconds(time);

  const availableTime = timeSlots.filter(slot => {
    const slotInSeconds = convertTimeToSeconds(slot);

    if (currentTimeInSeconds <= slotInSeconds) {
      return convertSecondsToTime(slotInSeconds)
    }
  })

  return isToday ? availableTime : timeSlots;
});

const filterDocByVideo = computed(() => {
  return allSessionRecord.value.filter((respond) => respond.entry_point === "Video");
});

const filterDocByNextMeeting = computed(() => {
  return allSessionRecordToday.value.filter((res) => res.entry_point === "Video" && res.immediate == false && res.status != 'Completed');
});

onMounted(() => {
  getSessionRecords(token.value);
  getSessionRecordToday(token.value);
  TimeSlotsAction()
});

onUpdated(() => {
  setTimeout(() => {
    if ($.fn.dataTable.isDataTable("#allrecord")) {
      $("#allrecord").DataTable();
    } else {
      if (allSessionRecord.value.length > 0) {
        $("#allrecord").DataTable({
          columnDefs: [{ orderable: false, targets: [0, 6] }],
          order: [[3, "desc"]],
          aaSorting: [],
          lengthMenu: [
            [5, 10, 25, 50, -1],
            [5, 10, 25, 50, "All"],
          ],
          pageLength: 5,
        });
      }
    }
  }, 1000);
});
</script>

<style>
.vuejs3-datepicker {
  display: block;
}

.vuejs3-datepicker__value {
  width: 100% !important;
  min-width: 200px;
  padding: 0.571rem 1rem !important;
  border: 1px solid #d8d6de !important;
}
</style>
