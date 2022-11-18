<template>
  <div class="mt-2 px-2">
    <div class="my-2">
      <!-- <h5 class="fw-bolder">Do you need a notary?</h5>
      <div class="d-flex gap-3 my-2">
        <div class="form-check">
          <input
            type="radio"
            class="form-check-input"
            id="no"
            v-model="notary"
            name="notary"
            value="No"
            checked
          />
          <label for="no" class="form-check-label">No</label>
        </div>
        <div class="form-check">
          <input
            id="yes"
            type="radio"
            name="notary"
            v-model="notary"
            class="form-check-input"
            value="Yes"
          />
          <label for="yes" class="form-check-label">Yes</label>
        </div>
      </div> -->

      <transition enter-active-class="slideInDown">
        <div v-if="notary === 'Yes'" class="my-2 bg-white rounded shadow p-1">
          <div>
            <h5 class="fw-bolder text-primary">Select a notary</h5>
          </div>
          <hr />

          <div class="shadow p-1 rounded">
            <!-- filter div -->
            <div class="row d-flex align-items-end">
              <!-- mydate  -->
              <div class="col-lg-2 col-md-3 col-4 mt-1">
                <label class="form-label">Date</label>
                <Datepicker
                  v-model="date"
                  @selected="dateSelected"
                  calendar-button-icon=""
                  :calendar-button="false"
                  format="yyyy-MM-dd"
                  :iconHeight="0"
                  :iconWidth="0"
                  :disabled-dates="{
                    to: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate(),
                    ),
                  }"
                />
              </div>

              <!-- time  -->
              <div class="col-lg-2 col-md-3 col-4 mt-1">
                <label class="form-label">Time</label>
                <select v-model="time" class="form-control">
                  <option
                    v-for="(time, index) in time_slots"
                    :key="time + index"
                    :value="time"
                  >
                    {{ time }}
                  </option>
                </select>
              </div>

              <!-- country   -->
              <div class="col-lg-2 col-md-3 col-4 mt-1">
                <label class="form-label">Country</label>
                <select
                  class="form-select"
                  v-model="country_id"
                  aria-label="select country"
                >
                  <option
                    v-for="country in countries"
                    :key="country.id"
                    :value="country.id"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
              <!-- state  -->
              <div class="col-lg-2 col-md-3 col-4 mt-1">
                <label class="form-label">State</label>
                <select
                  class="form-select"
                  v-model="state_id"
                  aria-label="select state"
                >
                  <option
                    v-for="state in states"
                    :key="state.id"
                    :value="state.id"
                  >
                    {{ state.name }}
                  </option>
                </select>
              </div>

              <!-- filter button  -->
              <div class="col-lg-2 col-md-3 col-4 mt-1">
                <button
                  :disabled="!state_id && !country_id"
                  @click="FilterNotary"
                  class="btn btn-primary d-flex"
                  type="button"
                >
                  <span
                    v-if="loading_filter"
                    class="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Filter
                </button>
              </div>
            </div>
            <!-- reset filter  -->
            <button @click="ResetFilter" class="btn reset__btn text-danger">
              Reset
            </button>
          </div>

          <hr />

          <div
            v-if="loading_filter || reset_loading"
            class="d-flex justify-content-center align-items-center my-2"
          >
            <PreLoader />
          </div>
          <div v-else class="table-responsive my-2 shadow">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Country</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="notary in notary_list"
                  :key="notary.id"
                  :class="
                    notary.id === selectedNotary &&
                    'text-primary fw-bolder bg-light border-1'
                  "
                >
                  <td class="d-flex">
                    <input
                      class="form-check-input mx-1"
                      type="radio"
                      name="selectNotary"
                      :id="notary.id"
                      v-model="selectedNotary"
                      :value="notary.id"
                    />
                    <label :for="notary.id">{{ notary.first_name }}</label>
                  </td>
                  <td>
                    <label :for="notary.id">{{ notary.last_name }}</label>
                  </td>
                  <td>
                    <label :for="notary.id">{{ notary.country }}</label>
                  </td>
                  <td>
                    <label class="small" :for="notary.id">{{
                      notary.state
                    }}</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>
    </div>
    <hr />
    <div class="my-2">
      <h5 class="fw-bolder">Pick a time slot</h5>

      <div class="d-flex align-items-center gap-1 my-2">
        <button
          v-if="notary === 'No' || notary === null"
          @click="switchScheduleType('Immediate')"
          :class="
            schedule_type === 'Immediate'
              ? 'btn btn-outline-primary'
              : 'btn not__active'
          "
          type="button"
          aria-selected="true"
        >
          <Icon
            v-if="schedule_type === 'Immediate'"
            icon="eva:checkmark-circle-2-fill"
            :width="19"
            :height="19"
          />
          Immediate
        </button>
        <button
          @click="switchScheduleType('Schedule')"
          :class="
            schedule_type === 'Schedule'
              ? 'btn btn-outline-primary'
              : 'btn not__active'
          "
          type="button"
          aria-selected="true"
        >
          <Icon
            v-if="schedule_type === 'Schedule'"
            icon="eva:checkmark-circle-2-fill"
            :width="19"
            :height="19"
          />
          Schedule
        </button>
      </div>

      <transition enter-active-class="slideInDown">
        <div v-if="schedule_type === 'Schedule'">
          <div class="row col-lg-12 col-12 my-2">
            <div class="col-6">
              <!-- placeholder="Select Date" -->
              <label for="">Date</label>
              <div class="form-group mb-1">
                <Datepicker
                  @selected="dateSelected"
                  :value="date"
                  format="yyyy-MM-dd"
                  :iconHeight="0"
                  :iconWidth="0"
                  :disabled-dates="{
                    to: new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate(),
                    ),
                  }"
                />
              </div>
            </div>
            <div class="col-3">
              <label for="">Time</label>
              <div class="form-group mb-1">
                <select v-model="time" class="form-control">
                  <option
                    v-for="(time, index) in time_slots"
                    :key="time + index"
                    :value="time"
                  >
                    {{ time }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <hr />
    <div class="d-flex justify-content-end align-items-center mt-2">
      <button class="mx-1 previous__btn" @click="back">
        <Icon icon="eva:arrow-back-outline" />
      </button>
      <button
        :disabled="!schedule_type"
        class="btn btn-primary"
        @click="proceed"
      >
        Proceed
      </button>
    </div>

    <ModalComp
      :show="openConfirmationModal"
      :size="'modal-md'"
      @close="openConfirmationModal = false"
    >
      <template #header>
        <h4 class="modal-title"></h4>
      </template>

      <template #body>
        <ConfirmationComponent @close="openConfirmationModal = false" />
      </template>
    </ModalComp>
  </div>
</template>

<script>
import AOS from "aos";
import ModalComp from "@/components/ModalComp.vue";
import Datepicker from "vuejs3-datepicker";
import { Icon } from "@iconify/vue";
import store from "@/store";
import { platformInitiated } from "@/utils/helper";
import moment from "moment";
import { type } from "@/utils/constants";
import PreLoader from "@/components/Loader/PreLoader.vue";
import ConfirmationComponent from "@/components/ScheduleVideo/VideoSignDetails/ConfirmationComponent.vue";
import router from "@/router/router";

AOS.init();
export default {
  data() {
    return {
      openConfirmationModal: false,
      step: 2,
      notary: null,
      schedule_type: null,
      date: "",
      time: null,
      selectedNotary: null,
      country_id: null,
      state_id: null,
    };
  },
  computed: {
    schedule_details() {
      return store.getters["schedule/schedule_details"];
    },
    notary_list() {
      return store.getters["notary/notary_list"];
    },
    countries() {
      return store.getters["schedule/country"];
    },
    states() {
      return store.getters["schedule/states"];
    },
    time_slots() {
      return store.getters["schedule/time_slots"];
    },
    schedule_formdata() {
      return store.getters["schedule/schedule_formdata"];
    },
    userProfile() {
      return store.getters["auth/profile"];
    },
    loading_filter() {
      return store.getters["notary/filter_loading"];
    },
    reset_loading() {
      return store.getters["notary/reset_loading"];
    },
  },
  components: { ModalComp, Datepicker, Icon, PreLoader, ConfirmationComponent },
  methods: {
    dateSelected(data) {
      this.date = moment(data).format("YYYY-MM-DD");
    },
    FilterNotary() {
      store.dispatch("notary/FilterNotariesAction", {
        country_id: this.country_id,
        state_id: this.state_id,
        date: this.date,
        time: this.time,
      });
    },
    ResetFilter() {
      this.date = null;
      this.time = null;
      this.country_id = null;
      this.state_id = null;
      store.dispatch("notary/GetNotariesAction");
    },
    calcEndTime(startTime) {
      if (startTime) {
        let [hours, minutes, seconds] = startTime.split(":");
        minutes = Number(minutes) + 15;
        if (minutes >= 60) {
          hours = Number(hours) + 1;
          minutes = "00";
        }
        let result = `${hours}:${minutes}:${seconds}`;
        return result;
      } else {
        const TimeNow = Math.round(Date.now() / 1000) + 900;
        const result = new Date(TimeNow * 1000).toLocaleTimeString("en-NG");
        return result;
      }
    },
    switchScheduleType(data) {
      this.schedule_type = data;
    },
    proceed() {
      this.$emit("current", true);
      store.commit("schedule/SET_SCHEDULE_FORMDATA_3", {
        schedule_type: this.schedule_type,
        notary: this.notary,
        date: this.date,
        time: this.time,
      });
      //
      // store
      // if (this.type == "type.Upload") {
      let UploadFormData = {
        notary_id: this.selectedNotary,
        title: this.schedule_formdata.title,
        description: !this.description ? "description" : this.description,
        type: type.Upload,
        entry_point: "Video",
        files: this.schedule_formdata.documentFile,
        immediate:
          this.schedule_formdata.schedule_type == type.Immediate ? true : false,
        request_type: type.Upload,
        delivery_channel: "Email",
        delivery_address: !this.userProfile.address
          ? "Address"
          : this.userProfile.address,
        platform_initiated: platformInitiated(),
        actor_type: !this.userProfile.is_business ? "User" : "Team",
        date:
          this.schedule_formdata.schedule_type === type.Immediate
            ? moment().format("YYYY-MM-DD")
            : "2022-10-20",
        // this.schedule_formdata.date,
        set_reminder_in_minutes: "15",
        start_time:
          this.schedule_formdata.schedule_type === type.Immediate
            ? moment().format("HH:mm:ss")
            : this.schedule_formdata.time,
        end_time: this.calcEndTime(this.schedule_formdata.time),
        participants: this.schedule_formdata.participants,
      };
      store
        .dispatch("schedule/ScheduleVirtualSessionAction", UploadFormData)
        .then(
          () => {
            store.commit("schedule/CLEAR_SCHEDULE_FORMDATA");
            // this.openConfirmationModal = true;
            if (this.schedule_details.immediate) {
              // redirect to waiting room
              router.push({
                name: "waiting-page",
                params: { session_id: this.schedule_details.id },
              });
            } else {
              // redirect to request page
              router.push({ name: "" });
            }
          },
          (error) => {
            console.log(error);
          },
        );
    },
    back() {
      this.$emit("current", this.step - 1);
    },
  },
  created() {
    store.dispatch("schedule/TimeSlotsAction");
    store.dispatch("schedule/CountriesAction").then((id) => {
      if (id) {
        store.dispatch("schedule/StatesAction", id);
      }
    });
    store.dispatch("notary/GetNotariesAction");
  },
};
</script>

<style lang="css">
.not__active {
  background: #f5f5f5;
  border-color: #dddddd;
}
.previous__btn {
  border-radius: 50%;
  border: 1.5px solid grey;
  height: 36px;
  width: 36px;
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reset__btn {
  padding: 0;
  margin: 5px 0;
}
.mx-input {
  display: block !important;
  padding: 0.571rem 1rem !important;
  font-size: 1rem !important;
  background-clip: padding-box !important;
  border: 1px solid #d8d6de !important;
  appearance: none !important;
  border-radius: 0.357rem !important;
  -webkit-transition: border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
}
.vuejs3-datepicker__value {
  min-width: 100px !important;
  border-radius: 5px;
  padding: 7px 0px !important;
  cursor: pointer;
  /* width: 50px !important; */
}
</style>
