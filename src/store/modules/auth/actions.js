import User from "@/api/Auth";
import router from "@/router/router";
import { useToast } from "vue-toast-notification";
const toast = useToast();

export const logoutUser = ({ commit }, formData) => {
  User.logout(formData)
    .then(() => {
      window.localStorage.removeItem("vuex");
      commit("SET_USER_PROFILE", null);
      window.localStorage.clear();
      window.sessionStorage.clear();
      router.push({ name: "Login" });
    })
    .catch((error) => {
      if (error.response.status === 401 || error.response.status == 422) {
        commit("SET_TOKEN", null);
        router.push({ name: "Login" });
      }
    });
};

export const userVerifyOTP = ({ commit }, formData) => {
  if (formData.flag == 0) {
    commit("SET_FLAG", { guest: true, data: formData });
  }

  User.verifyOTP(formData)
    .then((response) => {
      commit("SET_TOKEN", response.data.token);
      commit("SET_TOKEN_TYPE", "Bearer");
      User.show().then((response) => {
        commit("SET_USER_PROFILE", response.data.data);
        router.push({
          name: "waiting-page",
        });
      });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        toast.error(error.response.data.message, {
          timeout: 5000,
          position: "top-right",
        });
      } else if (error.response.status == 401) {
        let hasError = "";
        if (error.response.data?.data?.error != "") {
          hasError = error.response.data?.data?.error;
        }
        if (error.response.data?.errors?.root) {
          hasError = error.response.data?.errors?.root;
        }

        toast.error(hasError, {
          timeout: 5000,
          position: "top-right",
        });
      }
    });
};

export const resetPassword = ({ commit }, formData) => {
  User.changePassword(formData)
    .then(() => {
      commit("SET_FLAG", {});
      toast.success("Password created successfully", {
        timeout: 5000,
        position: "top-right",
      });
    })
    .catch((error) => {
      if (error.response.status == 422) {
        commit("SET_FLAG", { guest: false });
      }
    });
};

export const userResendVerifyOTP = ({ commit }, formData) => {
  User.resendVerifyOTP(formData).then(() => {
    commit("SET_RESEND_OTP", true);
    toast.success("OTP has been sent to your email", {
      timeout: 5000,
      position: "top-right",
    });
  });
};

export const setAuthentication = ({ commit }, data) => {
  commit("SET_TOKEN", data.token);
  commit("SET_TOKEN_TYPE", "Bearer");

  User.show()
    .then((response) => {
      commit("SET_USER_PROFILE", response.data.data);
      if (data.documentId != undefined) {
        return router.push({
          name: "document.audit",
          params: { document_id: data.documentId },
        });
      }
      if (data.status != "") {
        return router.push({
          name: "Document",
          query: { status: data.status },
        });
      }
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        window.location.href = process.env.VUE_APP_URL_AUTH_LIVE;
      }
    });
};

export const setAuthForDocumentUpload = ({ commit }, token) => {
  commit("SET_LOADER", true);
  commit("SET_TOKEN", token);
  commit("SET_TOKEN_TYPE", "Bearer");
  User.show().then((response) => {
    commit("SET_USER_PROFILE", response.data.data);
    commit("SET_LOADER", false);
    router.push({ name: "document.video" });
  });
};

export const loginUser = ({ commit }, formData) => {
  User.login(formData)
    .then((response) => {
      commit("SET_TOKEN", response.data.token);
      commit("SET_TOKEN_TYPE", response.data.token_type);

      return User.show().then((response) => {
        commit("SET_USER_PROFILE", response.data.data);
        router.push({ name: "Document" });

        toast.success("Welcome to ToNote ", {
          timeout: 5000,
          position: "top-right",
        });
      });
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_AUTH_ERROR", error.response.data.message);
        toast.error(`${error.response.data.errors.root}`, {
          timeout: 5000,
          position: "top-right",
        });
      }
      if (error.response.status == 422) {
        commit("SET_AUTH_ERROR", error.response.data.message);
        toast.error(`${error.response.data.message}`, {
          timeout: 5000,
          position: "top-right",
        });
      }
    });
};

export const verifyUserByPassword = ({ commit }, formData) => {
  User.ScheduleSessionVerifyApi(formData)
    .then((response) => {
      commit("SET_TOKEN", response.data.token);
      commit("SET_TOKEN_TYPE", response.data.token_type);

      return User.show().then((response) => {
        commit("SET_USER_PROFILE", response.data.data);
        router.push({
          name: "document.waiting-page",
          params: { session_id: formData.session_id },
        });
        toast.success("Welcome to ToNote ", {
          timeout: 5000,
          position: "top-right",
        });
      });
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_AUTH_ERROR", error.response.data.message);
        toast.error(`${error.response.data.errors.root}`, {
          timeout: 5000,
          position: "top-right",
        });
      }
      if (error.response.status == 422) {
        commit("SET_AUTH_ERROR", error.response.data.message);
        toast.error(`${error.response.data.message}`, {
          timeout: 5000,
          position: "top-right",
        });
      }
    });
};

// export const SetUserProfile = ({ commit }) => {
//   User.show().then((response) => {
//     commit("SET_USER_PROFILE", response.data.data);
//     router.push({ name: "Document" });

//     toast.success("Welcome to ToNote ", {
//       timeout: 5000,
//       position: "top-right",
//     });
//   });
// };

export const createUserAccount = ({ commit }, formData) => {
  User.register(formData)
    .then((response) => {
      commit("SET_TOKEN", response.data.token);
      commit("SET_TOKEN_TYPE", response.data.token_type);

      User.show().then((response) => {
        commit("SET_USER_PROFILE", response.data.data);
        router.push({ name: "Document" });

        toast.success("Welcome to ToNote ", {
          timeout: 5000,
          position: "top-right",
        });
      });
    })
    .catch((error) => {
      if (error.response.status == 401 || error.response.status == 404) {
        commit("SET_AUTH_ERROR", error.response.data.message);
        toast.error(`${error.response.data.errors.root}`, {
          timeout: 5000,
          position: "top-right",
        });
      }
      if (error.response.status == 422) {
        commit("SET_AUTH_ERROR", error.response.data.message);
        toast.error(`${error.response.data.message}`, {
          timeout: 5000,
          position: "top-right",
        });
      }
    });
};
