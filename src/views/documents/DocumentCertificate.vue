<template>
  <div class="container-fluid">
    <div class="row d-flex justify-content-center">
      <div class="card col-lg-9">
        <div class="card-body">
          <h4>Session ended successfully</h4>
          <P>Click the button below to download the document or recording</P>
          <div>
            <span class="h5"> Download: </span>
            <a @click="download" href="#" id="download" class=""
              ><Icon icon="material-symbols:slow-motion-video" />
              {{ videofilename }}</a
            >
          </div>
        </div>
      </div>

      <div class="col-lg-9 col-sm-12">
        <div class="mb-1 d-flex justify-content-between">
          <!-- <button class="btn btn-outline-secondary float-end">Share</button> -->
          <div class="btn-group">
            <button
              class="btn btn-primary dropdown-toggle waves-effect waves-float waves-light"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Share & Export
            </button>
            <div
              class="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
              style=""
            >
              <a class="dropdown-item" href="#">Download</a>
              <a class="dropdown-item" href="#">Share via email</a>
            </div>
          </div>
        </div>
        <div>Title: {{ documentTitle }}</div>
        <!-- <section class="card">
          <img
            src="@/assets/images/affidavit.png"
            alt="document"
            class="img-fluid"
          />
        </section> -->
        <div
          v-for="(doc, index) in userDocument.documentUploads"
          :key="index"
          class="position-relative border card"
        >
          <RenderPage
            :file="doc.file_url"
            @click="$emit('docId', doc.id)"
            @documentHeight="getHeight"
          />
        </div>
        <section class="card digi_cert">
          <div class="sec-1">
            <div class="p-2">
              <div class="text-center">
                <h1 class="fw-bolder p-2">Digital Transaction Certificate</h1>
                <p>Document Ref: 97326d3f-2ac8-478b-8a23-5f5c70e12306</p>
              </div>

              <div>
                <h5 class="fw-bolder">
                  Notarised Document Name: Affidavit of Bachelorhood
                </h5>
                <p class="fw-bolder">Document Notarised On: 07 Jul, 2022.</p>
              </div>

              <table class="table table-bordered border-dark">
                <!-- <tr v-for="data "> -->
                <tr v-for="(result, index) in data" :key="index">
                  <td>
                    <div class="row">
                      <div class="col-6 pb-1">{{ result.fullname }}</div>
                      <div class="col-6 pb-1">Document Owner</div>
                    </div>
                    <div class="row">
                      <div class="col-6 pb-1">Email</div>
                      <div class="col-6 pb-1">olu@gmail.com</div>
                    </div>
                    <div class="row">
                      <div class="col-6 pb-1">ID Number.</div>
                      <div class="col-6 pb-1">1234567889</div>
                    </div>
                    <div class="row">
                      <div class="col-6 pb-1">Device IP.</div>
                      <div class="col-6 pb-1">127.0.0.1</div>
                    </div>
                  </td>
                  <td>Signature</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="sec-2">
            <div class="card-header">
              <h4 class="card-title">Audit Trail</h4>
            </div>
            <div class="card-body">
              <ul class="timeline">
                <li class="timeline-item">
                  <span
                    class="timeline-point timeline-point-secondary timeline-point-indicator"
                  ></span>
                  <div class="timeline-event">
                    <div
                      class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1"
                    >
                      <h6>Oluyemi Abiodun (Document Owner)</h6>
                      <span class="timeline-event-time"
                        >07 Jul, 2022 10:05</span
                      >
                    </div>
                    <p>Created Affidavit.</p>
                  </div>
                </li>
                <li class="timeline-item">
                  <span
                    class="timeline-point timeline-point-secondary timeline-point-indicator"
                  ></span>
                  <div class="timeline-event">
                    <div
                      class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1"
                    >
                      <h6>Oluyemi Abiodun (Document Owner)</h6>
                      <span class="timeline-event-time"
                        >07 Jul, 2022 10:05</span
                      >
                    </div>
                    <p>Added Date Tools to document.</p>
                  </div>
                </li>
                <li class="timeline-item">
                  <span
                    class="timeline-point timeline-point-secondary timeline-point-indicator"
                  ></span>
                  <div class="timeline-event">
                    <div
                      class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1"
                    >
                      <h6>Oluyemi Abiodun (Document Owner)</h6>
                      <span class="timeline-event-time"
                        >07 Jul, 2022 10:05</span
                      >
                    </div>
                    <p>Added Text tool to document .</p>
                  </div>
                </li>
                <li class="timeline-item">
                  <span
                    class="timeline-point timeline-point-secondary timeline-point-indicator"
                  ></span>
                  <div class="timeline-event">
                    <div
                      class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1"
                    >
                      <h6>Oluyemi Abiodun (Document Owner)</h6>
                      <span class="timeline-event-time"
                        >07 Jul, 2022 10:05</span
                      >
                    </div>
                    <p>Fill Text tool with text -- Oluyemi Abiodun --.</p>
                  </div>
                </li>
                <li class="timeline-item">
                  <span
                    class="timeline-point timeline-point-secondary timeline-point-indicator"
                  ></span>
                  <div class="timeline-event">
                    <div
                      class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1"
                    >
                      <h6>Adekunle Enabule (Notary)</h6>
                      <span class="timeline-event-time"
                        >07 Jul, 2022 10:05</span
                      >
                    </div>
                    <p>Add Signature .</p>
                  </div>
                </li>
                <li class="timeline-item">
                  <span
                    class="timeline-point timeline-point-secondary timeline-point-indicator"
                  ></span>
                  <div class="timeline-event">
                    <div
                      class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1"
                    >
                      <h6>Adekunle Enabule (Notary)</h6>
                      <span class="timeline-event-time"
                        >07 Jul, 2022 10:05</span
                      >
                    </div>
                    <p>Add Stamp .</p>
                  </div>
                </li>
              </ul>

              <div class="d-flex justify-content-end">
                <img src="@/assets/logo-dark.png" alt="ToNote" height="26" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useGetters } from "vuex-composition-helpers/dist";
import RenderPage from "@/components/Document/Edit/Main/RenderPage";
import moment from "moment";
import { Icon } from "@iconify/vue";
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
const documentTitle = userDocument.value.title;
const videofilename = userDocument.value.title + "_" + date;
const download = () => {
  let downloadLink = document.getElementById("download");
  //   downloadLink.href = ;
  downloadLink.download = `${videofilename || "recording"}.webm`;
  console.log(uri.value.record_file);
};

// let isActive = ref(false);
onMounted(() => {
  let downloadLink = document.getElementById("download");
  uri.value = route.currentRoute.value.query;
  downloadLink.href = uri.value.record_file;

  // let video_url = route.currentRoute.value.query.record_file;
  // console.log(video_url);

  // video_url === undefined ? (isActive = false) : (isActive = true);

  // console.log(route.currentRoute.value);
});

const data = [
  {
    id: 1,
    fullname: "Shafi Akinropo",
    initial: "SA",
    email: "sakinropo@gmail.com",
  },
  {
    id: 2,
    fullname: "Fikayo Durosinmi-Etti",
    initial: "FD",
    email: "kyo@gmail.com",
  },
];
</script>

<style scoped>
.digi_cert {
  background-image: url("../../assets/images/cert-bg.png");
  background-repeat: no-repeat;
  background-size: 100%;
  /* background-color: #f7f8f9; */
}
#download:hover {
  text-decoration: underline;
}
</style>
