<template>
  <div data-aos="zoom-in">
    <div
      data-aos="zoom-in"
      class="d-flex flex-column align-items-center text-center"
    >
      <img
        src="../../../assets/images/logo2.png"
        alt="ToNote Logo"
        class="my-1 confimation__logo"
      />
      <h4 class="fw-bolder my-1">Successful!</h4>
      <p class="mb-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
        repudiandae non consectetur odio tempore aliquam iure laudantium illo,
        officia quasi?.
      </p>
      <button
        class="btn my-1"
        data-bs-dismiss="modal"
        aria-label="Close"
        @click="proceed"
        style="background: #e5e7e9"
      >
        proceed
      </button>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import store from "@/store";

export default {
  computed: {
    schedule_details() {
      return store.getters["schedule/schedule_details"];
    },
  },
  methods: {
    proceed() {
      if (this.schedule_details.immediate) {
        // redirect to waiting room
        // router.push({
        //   name: "waiting-page",
        //   // params: { sessionId: this.schedule_details.id },
        // });
      } else {
        // redirect to request page
        router.push({ name: "" });
      }
    },
  },
};
</script>

<style lang="css">
.confimation__logo {
  height: 120px;
  width: 120px;
}
</style>