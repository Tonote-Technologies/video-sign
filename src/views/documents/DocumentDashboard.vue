<template>
  <div class="">
    <ul class="nav nav-tabs row mb-2" role="tablist">
      <li class="nav-item col-lg-3 col-12 mb-2">
        <a
          id="affidavit-tab"
          data-bs-toggle="tab"
          href="#affidavit"
          role="tab"
          aria-selected="true"
          class="nav-link card"
          :class="{ active: isAffidavitActive }"
        >
          <div class="row py-2">
            <div class="col-9 d-flex align-items-center">
              <div>
                <div class="h5">Affidavit Requests</div>
              </div>
            </div>

            <div class="col-3 d-flex align-items-center justify-content-end">
              <div
                class="btn btn-sm btn-light text-center rounded-pill"
                style="font-size: 16px"
              >
                {{ affidavits?.length > 0 ? affidavits?.length : 0 }}
              </div>
            </div>
          </div>
        </a>
      </li>

      <li class="nav-item col-lg-3 col-12 mb-2">
        <a
          id="notary-tab"
          data-bs-toggle="tab"
          href="#notary"
          role="tab"
          aria-selected="true"
          class="nav-link card"
          :class="{ active: isNotaryActive }"
        >
          <div class="row py-2">
            <div class="col-9 d-flex align-items-center">
              <div>
                <div class="h5">Notary Requests</div>
              </div>
            </div>

            <div class="col-3 d-flex align-items-center justify-content-end">
              <div
                class="btn btn-sm btn-light text-center rounded-pill"
                style="font-size: 16px"
              >
                0
              </div>
            </div>
          </div>
        </a>
      </li>

      <li class="nav-item col-lg-3 col-12 mb-2">
        <a
          id="videoSign-tab"
          data-bs-toggle="tab"
          href="#videoSign"
          role="tab"
          aria-selected="true"
          class="nav-link card"
          :class="{ active: isActive }"
        >
          <div class="row py-2">
            <div class="col-9 d-flex align-items-center">
              <div>
                <div class="h5">Video Sign</div>
              </div>
            </div>

            <div class="col-3 d-flex align-items-center justify-content-end">
              <div
                class="btn btn-sm btn-light text-center rounded-pill"
                style="font-size: 16px"
              >
                {{ tableRecord.length }}
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>

    <!-- <AnalyticsPage /> -->
    <div class="tab-content">
      <div
        class="tab-pane"
        :class="{ active: isAffidavitActive }"
        id="affidavit"
        aria-labelledby="affidavit-tab"
        role="tabpanel"
      >
        <AffidavitRequest />
      </div>

      <div
        class="tab-pane"
        :class="{ active: isNotaryActive }"
        id="notary"
        aria-labelledby="notary-tab"
        role="tabpanel"
      >
        <NotaryRequest />
      </div>

      <div
        class="tab-pane"
        :class="{ active: isActive }"
        id="videoSign"
        aria-labelledby="videoSign-tab"
        role="tabpanel"
      >
        <VideoSign />
      </div>
    </div>
  </div>

  <div class="card d-none">
    <div class="card-body">
      <ul class="show" data-bs-popper="none">
        <li class="dropdown-menu-header">
          <div class="dropdown-header d-flex">
            <h4 class="notification-title mb-0 me-auto">Action Required</h4>
            <!-- <div class="badge rounded-pill badge-light-primary">6 New</div> -->
            <router-link
              :to="{ name: 'document.video' }"
              class="btn btn-sm btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Video sign</span>
            </router-link>
          </div>
        </li>

        <li
          class="my-1 pb-1 row border-bottom scrollable-container media-list ps ps--active-y"
        >
          <div class="col-lg-4">
            <a class="" href="#">
              <div class="list-item d-flex align-items-start">
                <div class="me-1">
                  <div class="avatar bg-light-dark">
                    <div class="avatar-content">NR</div>
                  </div>
                </div>
                <div class="list-item-body flex-grow-1">
                  <div class="media-heading">
                    <span class="fw-bolder text-dark">Notary Request</span>
                  </div>
                  <small class="notification-text"> Lease Agreement</small>
                </div>
              </div>
            </a>
          </div>
          <div class="col-lg-4">
            <div class="fw-bold">Status</div>
            <div>
              <small class="badge rounded-pill badge-light-danger"
                >Immediate</small
              >
            </div>
          </div>
          <div class="col-lg-4">
            <button class="btn btn-sm btn-success">Join Now</button>
          </div>
        </li>
        <li
          class="my-1 pb-1 row border-bottom scrollable-container media-list ps ps--active-y"
        >
          <div class="col-lg-4">
            <a class="" href="#">
              <div class="list-item d-flex align-items-start">
                <div class="me-1">
                  <div class="avatar bg-light-dark">
                    <div class="avatar-content">VS</div>
                  </div>
                </div>
                <div class="list-item-body flex-grow-1">
                  <div class="media-heading">
                    <span class="fw-bolder text-dark">Video Sign</span>
                  </div>
                  <small class="notification-text">
                    Service Level Agreement</small
                  >
                </div>
              </div>
            </a>
          </div>
          <div class="col-lg-4">
            <div class="fw-bold">Status</div>
            <div>
              <small class="badge rounded-pill badge-light-primary"
                >Scheduled</small
              >
            </div>
          </div>
          <div class="col-lg-4">
            <button
              class="btn btn-sm btn-light text-center"
              disabled
              rounded-pill
            >
              Join Now
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// import { Icon } from "@iconify/vue";
import AffidavitRequest from "@/views/documents/folders/AffidavitRequest";
import NotaryRequest from "@/views/documents/folders/NotaryRequest";
import VideoSign from "@/views/documents/folders/VideoSign";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useActions, useGetters } from "vuex-composition-helpers/dist";

const uri = ref("");
const route = useRouter();
const isAffidavitActive = ref(false);
const isActive = ref(false);
const isNotaryActive = ref(false);
const { affidavits } = useGetters({
  affidavits: "schedule/affidavits",
});
const { token, allSessionRecord } = useGetters({
  token: "auth/token",
  allSessionRecord: "document/allSessionRecord",
});

const { getSessionRecords } = useActions({
  getSessionRecords: "document/getSessionRecords",
});

const tableRecord = ref([]);
onMounted(() => {
  allSessionRecord.value.filter((respond) => {
    if (respond.entry_point === "Video") {
      tableRecord.value.push(respond);
    }
  });
  getSessionRecords(token.value);

  uri.value = route.currentRoute.value.query;

  isAffidavitActive.value = uri.value.page === undefined ? true : false;

  isNotaryActive.value = uri.value.page === "notary-request" ? true : false;
  isActive.value = uri.value.page === "video-sign" ? true : false;
});
</script>

<style scoped>
.nav-item .card {
  min-width: 270px !important;
}
.show li {
  list-style: none;
}

.nav-tabs .nav-link.active {
  background-color: #003bb3 !important;
  border-radius: 2px;
  border-bottom: 2px solid #ff9f43 !important;
}
.nav-tabs .nav-link:hover {
  background-color: #003bb3 !important;
  border-bottom: 2px solid #ff9f43 !important;
}
.nav-tabs .nav-link:hover .h5 {
  color: #fff !important;
}
.nav-tabs .nav-link.active .h5 {
  color: #fff !important;
}
</style>
