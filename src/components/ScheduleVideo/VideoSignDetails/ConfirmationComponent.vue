<template>
  <div data-aos="zoom-in" class="row d-flex justify-content-center">
    <div class="col-lg-12 col-md-10">
      <div class="text-center my-2">
        <img
          src="@/assets/images/logo2.png"
          alt="ToNote Logo"
          class="my-1 confimation__logo"
        />
        <h4 class="fw-bolder text-primary">Session created successfully</h4>
      </div>
      <div class="text-center">
        <p><b>Title:</b> {{ schedule_details.title }}</p>

        <p>{{ formatted_date }} <b>|</b> {{ schedule_details.start_time }}</p>
        <div class="copy__input">
          <input
            ref="url"
            type="text"
            :value="`${home}/document/waiting-page/${schedule_details?.id}`"
            placeholder="Enter your email"
            class="form-control"
            :style="copy_state && 'border-color: #14A44D'"
          />
          <button
            @click="copy"
            class="copy-button"
            :class="copy_state ? `btn btn-success` : 'btn btn-primary'"
            type="button"
          >
            <span>{{ copy_state ? "Copied" : "Copy" }}</span>
          </button>
        </div>
      </div>
      <div class="mt-2 text-center">
        <button
          class="btn btn-primary"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click="proceed"
          style="background: #e5e7e9"
        >
          {{ schedule_details.immediate ? "Proceed" : "Back to home" }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router/router";
import store from "@/store";
import moment from "moment";
import { computed, ref } from "vue";
// import { Icon } from "@iconify/vue";
const url = ref();
const copy_state = ref(false);
const home = process.env.VUE_APP_URL_AUTH_LOCAL;
const schedule_details = computed(() => {
  return store.getters["schedule/schedule_details"];
});
const formatted_date = computed(() => {
  return moment(schedule_details.value.date).format("dddd, MMMM DD YYYY");
});
const copy = () => {
  var copyText = url.value;
  copyText.select();
  // for mobile devices
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  copy_state.value = true;
  setTimeout(() => {
    copy_state.value = false;
  }, 2000);
};
const proceed = () => {
  if (schedule_details.value.immediate) {
    // redirect to waiting room for immediate session
    router.push({
      name: "waiting-page",
      params: { session_id: schedule_details.value.id },
    });
  } else {
    // redirect to request page for schedule session
    router.push({ name: "document-index" });
  }
};
</script>
<style lang="css">
.confimation__logo {
  height: 100px;
  width: 100px;
}
.copy-button {
  padding-left: 6px;
  padding-right: 6px;
}
.copy__input {
  display: flex;
  position: relative;
  align-items: stretch;
}
.copy__input input {
  height: 3.2rem;
}
/* .copy__input button { */
/* position: absolute; */
/* right: 3px; */
/* } */
</style>
