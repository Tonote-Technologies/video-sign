<template>
  <div class="container">
    <div
      style="height: 50vh"
      class="text-center d-flex align-items-center justify-content-center"
    >
      <div class="card w-50">
        <div class="card-body">
          <h2>Success</h2>
          <P
            >Your session has ended. <br />Click the button below to download
            your recording</P
          >
          <div>
            <a
              @click="download"
              href="#"
              id="download"
              class="btn btn-sm btn-primary"
              >Download</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useGetters } from "vuex-composition-helpers/dist";
import moment from "moment";
// const { userDocument } = useGetters(["userDocument"]);

const dateTime = () => {
  return moment().format("Do MMM YYYY");
};

const { userDocument } = useGetters({
  userDocument: "document/userDocument",
});

const route = useRouter();
const uri = ref("");
const date = dateTime();
const download = () => {
  const filename = userDocument.value.title + "_" + date;
  let downloadLink = document.getElementById("download");
  //   downloadLink.href = ;
  downloadLink.download = `${filename || "recording"}.webm`;
  console.log(uri.value.record_file);
};

onMounted(() => {
  let downloadLink = document.getElementById("download");
  uri.value = route.currentRoute.value.query;
  downloadLink.href = uri.value.record_file;
});
</script>

<style scoped></style>
