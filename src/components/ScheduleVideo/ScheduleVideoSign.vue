<template>
  <section class="container">
    <section class="row">
      <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
        <div class="content-body">
          <h4 class="fw-bolder">Video Sign</h4>
          <div class="mb-2">
            <li>
              Please select a date and time for your video signing session.
            </li>
            <li>
              Your signers will receive a confirmation email with the video sign
              link.
            </li>
            <li>
              You can track the status of your video sign session in your
              documents.
            </li>
          </div>

          <div class="col-xl-12 col-md-10 col-12 my-2">
            <div>
              <div
                class="mx-2 progress__box d-flex justify-content-between align-items-center m-auto"
              >
                <div
                  class="progress__bar"
                  :style="{ width: progressWidth }"
                ></div>
                <div class="progress__bar2"></div>
                <div
                  class="d-flex flex-column align-items-center"
                  v-for="(step, index) in steps"
                  :key="index"
                >
                  <button
                    class="btn progress__btn"
                    :class="
                      step.step <= currentstep
                        ? 'progress__success'
                        : 'progress__default'
                    "
                  >
                    <Icon
                      :icon="
                        step.step < currentstep || completed
                          ? 'fa6-solid:check'
                          : step.icon
                      "
                      :height="40"
                      :width="40"
                    />
                  </button>
                </div>
              </div>
              <div
                class="progress__description d-flex justify-content-between align-items-center m-auto mt-1"
              >
                <h6
                  :class="step.step <= currentstep ? 'text-primary' : ''"
                  v-for="(step, index) in steps"
                  :key="index"
                >
                  {{ step.title }}
                </h6>
              </div>

              <div class="card my-2">
                <div class="card-body px-1">
                  <!-- Component changes when currentTab changes -->
                  <component
                    @current="proceed"
                    :is="steps[currentstep].component"
                  ></component>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import AddParticipants from "@/components/ScheduleVideo/VideoSignDetails/AddParticipants.vue";
import UploadDocument from "@/components/ScheduleVideo/VideoSignDetails/UploadDocument.vue";
import TimeSlot from "@/components/ScheduleVideo/VideoSignDetails/TimeSlot.vue";
import { Icon } from "@iconify/vue";

export default {
  data() {
    return {
      openParticipantsModal: false,
      submitScheduleLoader: false,
      currentstep: 0,
      completed: false,
      steps: [
        {
          step: 0,
          title: "Upload Document",
          component: "UploadDocument",
          icon: "carbon:document",
        },
        {
          step: 1,
          title: "Add Participants",
          component: "AddParticipants",
          icon: "ant-design:user-add-outlined",
        },
        {
          step: 2,
          title: "Pick a time slot",
          component: "TimeSlot",
          icon: "uiw:date",
        },
      ],
    };
  },
  components: {
    Icon,
    UploadDocument,
    AddParticipants,
    TimeSlot,
  },
  computed: {
    progressWidth() {
      return this.currentstep * 50 + "%";
    },
  },
  methods: {
    proceed(data) {
      if (typeof data == "boolean") {
        this.completed = data;
      } else {
        this.currentstep = data;
        this.completed = false;
      }
    },
  },
};
</script>

<style>
/* border-color: #75cc65;
  background-color: #c8ebc1; */

.progress__box {
  position: relative;
}

.progress__success {
  background-color: #003bb3;
}

.progress__default {
  background-color: #cbcbcb;
}

.progress__bar {
  /* width: 100%; */
  /* background-color: #cbcbcb; */
  position: absolute;
  height: 6px;
  background-color: #003bb3;
  z-index: 1;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  transition: 0.4s ease;
}

.progress__bar2 {
  content: "";
  position: absolute;
  height: 6px;
  width: 100%;
  background-color: #cbcbcb;
  z-index: 0;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  transition: 0.4s ease;
}

.progress__btn {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  z-index: 1;
  color: #ffffff;
  padding: 10px;
}

/* .progress__description {
  margin: 10px;
} */
</style>
