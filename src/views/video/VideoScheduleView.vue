<template>
  <div class="grid" v-if="isLoading">
    <PreLoader />
  </div>
  <ScheduleVideoSign v-else />
</template>

<script setup>
import PreLoader from "@/components/PreLoader.vue";
import ScheduleVideoSign from "@/components/ScheduleVideo/ScheduleVideoSign.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useActions, useGetters } from "vuex-composition-helpers/dist";

const { token, isLoading } = useGetters({
  token: "auth/token",
  isLoading: "auth/isLoading",
});

const { setAuthForDocumentUpload } = useActions({
  setAuthForDocumentUpload: "auth/setAuthForDocumentUpload",
});

const route = useRouter();
const uri = ref("");
const hasToken = ref("");

onMounted(() => {
  uri.value = route.currentRoute.value.query;
  hasToken.value =
    uri.value.qt != undefined || uri.value.qt != null ? uri.value.qt : token.value;

  if (hasToken.value == undefined || hasToken.value == "" || hasToken.value == null) {
    return process.env.NODE_ENV == 'development'
      ? route.push({ name: "Login" })
      : window.location.href = process.env.VUE_APP_URL_AUTH_LIVE;
  }

  setAuthForDocumentUpload(hasToken.value);
});
</script>

<style scoped>
.grid {
  display: grid;
  place-items: center;
  height: 85vh;
}
</style>