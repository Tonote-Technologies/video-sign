<template>
  <div class="container">
    <!-- <div
      v-if="authloading || loading"
      class="d-flex justify-content-center align-items-center"
      style="height: 100vh"
    >
      <PreLoader />
    </div> -->

    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-lg-10">
        <div class="auth-wrapper auth-basic px-2">
          <div class="auth-inner my-2">
            <div class="card mb-0">
              <div class="card-body">
                <div class="brand-logo">
                  <img src="@/assets/images/logo-dark.png" alt="" height="26" />
                </div>

                <template v-if="$route.query.f == 0">
                  <h2 class="card-title fw-bolder mb-1">
                    Two Step Verification 💬
                  </h2>
                  <p class="card-text mb-75">
                    Enter the code from the email in the field below.
                  </p>
                  <form class="mt-2" @submit.prevent="verifyAccessWithOtp">
                    <label for="security" class="form-label"
                      >Type your security code</label
                    >

                    <div
                      class="
                        auth-input-wrapper
                        d-flex
                        align-items-center
                        justify-content-between
                      "
                    >
                      <v-otp-input
                        ref="otpInput"
                        input-classes="form-control auth-input height-50 text-center numeral-mask mx-25 mb-1"
                        separator=" "
                        :num-inputs="6"
                        :should-auto-focus="true"
                        :is-input-num="true"
                        @on-change="handleOnChange"
                        @on-complete="handleOnComplete"
                      />
                    </div>

                    <a
                      role="button"
                      class="d-block text-decoration-underline mb-1"
                      @click="clearInput()"
                      >Clear</a
                    >
                    <button
                      type="submit"
                      class="btn btn-primary w-100"
                      tabindex="4"
                      :disabled="disabled"
                    >
                      Verify
                    </button>
                  </form>

                  <p class="text-center mt-2">
                    <span>Didn't get the code?</span>
                    <a href="Javascript:void(0)" @click="resendToken"
                      ><span>&nbsp;Resend</span></a
                    >
                    <span> or</span>
                    <a href="Javascript:void(0)"
                      ><span>&nbsp;Contact Us</span></a
                    >
                  </p>
                </template>
                <template v-if="$route.query.f == 1">
                  <h2 class="card-title fw-bolder mb-1">
                    Enter your password 💬
                  </h2>
                  <p class="card-text mb-75">
                    Please, enter your password to view this document.
                  </p>

                  <form class="mt-2" @submit.prevent="verifyAccessWithPassword">
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label for="security" class="form-label">Password</label>
                      <label class="form-label">
                        <a :href="forgotPassword">Forgot Password?</a>
                      </label>
                    </div>

                    <div class="form-group">
                      <input
                        type="password"
                        v-model="otpPassword"
                        class="form-control numeral-mask mb-1"
                        id="security"
                        placeholder="Enter password"
                      />
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary w-100"
                      tabindex="4"
                      :disabled="!otpPassword"
                    >
                      Sign in
                    </button>
                  </form>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PreLoader from "@/components/Loader/PreLoader.vue";
import store from "@/store";
import VOtpInput from "vue3-otp-input";
// import router from "@/router/router";

export default {
  data() {
    return {
      disabled: true,
      forgotPassword: "",
      otpPassword: "",
    };
  },
  conponents: {
    PreLoader,
    VOtpInput,
  },
  computed: {
    isAuth() {
      return store.state.auth.profile;
    },
  },
  methods: {
    verifyAccessWithPassword() {
      let formData = {
        email: this.$route.query.e,
        password: this.otpPassword,
        session_id: this.$route.query.di,
      };
      store.dispatch("auth/verifyUserByPassword", formData);
    },
    //  verifyAccessWithOtp() {
    //    let formData = {
    //      email: this.$route.query.e,
    //      password: this.otpPassword,
    //      session_id: this.$route.query.di,
    //    };
    //    store.dispatch("authStore/ScheduleSessionVerifyAction", formData).then(
    //      () => {
    //        router.push({
    //          path: `/await-notary-session/${this.$route.query.di}`,
    //        });
    //      },
    //      // error
    //      () => {}
    //    );
    //  },
    //  resendToken() {
    //    let formData = {
    //      email: this.$route.query.e,
    //      session_id: this.$route.query.di,
    //    };
    //    store.dispatch("authStore/ResendVerifySessionOtpAction", formData).then(
    //      () => {
    //        this.$toast.success("Token has been sent to your email");
    //      },
    //      // error
    //      () => {}
    //    );
    //  },
    //  handleOnChange() {
    //    console.log("onchanged");
    //  },
    //  handleOnComplete(value) {
    //    this.disabled = false;
    //    this.otpPassword = value;
    //  },
    //  clearInput() {
    //    this.$refs.otpInput.clearInput();
    //  },
  },
  created() {
    //  if (store.state.authStore.isAuthenticated) {
    //    router.push({
    //      path: `/await-notary-session/${this.$route.query.di}`,
    //    });
    //  }
    //  if (!this.$route.query.e && !this.$route.query.di && !this.$route.query.f) {
    //    this.$toast.error("Unauthorized");
    //  }
  },
};
// forgotPassword.value =
//     process.env.NODE_ENV != "development"
//       ? process.env.VUE_APP_URL_AUTH_FORGOT_PASSWORD_LIVE
//       : process.env.VUE_APP_URL_AUTH_FORGOT_PASSWORD_LOCAL;
</script>

<style lang="css" scoped>
@import "@/assets/css/home.css";
</style>
