<template>
  <div class="">
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          id="affidavit-tab"
          data-bs-toggle="tab"
          href="#affidavit"
          role="tab"
          aria-selected="true"
          class="nav-link"
          :class="{ active: isAffidavitActive }"
        >
          <div class="card">
            <div class="card-body d-flex justify-content-between">
              <div>
                <div class="text-dark h5">Affidavit Requests</div>
                <h5 class="fw-bold">{{ affidavits?.length }}</h5>
              </div>

              <div class="">
                <span class="btn rounded-pill btn-light text-center"
                  ><Icon icon="carbon:document-preliminary"
                /></span>
              </div>
            </div>
          </div>
        </a>
      </li>

      <li class="nav-item">
        <a
          id="notary-tab"
          data-bs-toggle="tab"
          href="#notary"
          role="tab"
          aria-selected="true"
          class="nav-link"
          :class="{ active: isNotaryActive }"
        >
          <div class="card">
            <div class="card-body d-flex justify-content-between">
              <div>
                <div class="text-dark h5">Notary Requests</div>
                <h5 class="fw-bold">2</h5>
              </div>

              <div class="">
                <span class="btn rounded-pill btn-light text-center"
                  ><Icon icon="fa6-solid:stamp"
                /></span>
              </div>
            </div>
          </div>
        </a>
      </li>

      <li class="nav-item">
        <a
          id="videoSign-tab"
          data-bs-toggle="tab"
          href="#videoSign"
          role="tab"
          aria-selected="true"
          class="nav-link"
          :class="{ active: isActive }"
        >
          <div class="card">
            <div class="card-body d-flex justify-content-between">
              <div>
                <div class="text-dark h5">Video Sign</div>
                <h5 class="fw-bold">2</h5>
              </div>

              <div class="">
                <span class="btn rounded-pill btn-light text-center"
                  ><Icon icon="carbon:document-preliminary"
                /></span>
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
            <div class="text-dark fw-bold">Status</div>
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
            <div class="text-dark fw-bold">Status</div>
            <div>
              <small class="badge rounded-pill badge-light-primary"
                >Scheduled</small
              >
            </div>
          </div>
          <div class="col-lg-4">
            <button class="btn btn-sm btn-light text-center" disabled>
              Join Now
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import AffidavitRequest from "@/views/documents/folders/AffidavitRequest";
import NotaryRequest from "@/views/documents/folders/NotaryRequest";
import VideoSign from "@/views/documents/folders/VideoSign";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useGetters } from "vuex-composition-helpers/dist";

const uri = ref("");
const route = useRouter();
const isAffidavitActive = ref(false);
const isActive = ref(false);
const isNotaryActive = ref(false);
const { affidavits } = useGetters({
  affidavits: "schedule/affidavits",
});

onMounted(() => {
  uri.value = route.currentRoute.value.query;

  isAffidavitActive.value = uri.value.page === undefined ? true : false;

  isNotaryActive.value = uri.value.page === "notary-request" ? true : false;
  isActive.value = uri.value.page === "video-sign" ? true : false;

  console.log(uri.value.page);

  // if (uri.value.page === "video-sign") {
  //   isActive.value = true;
  // } else if (uri.value.page === "notary-request") {
  //   isNotaryActive.value = true;
  // } else {
  //   isActive.value = isNotaryActive.value = false;
  // }
});
</script>

<style scoped>
.nav-item .card {
  min-width: 270px !important;
}
.show li {
  list-style: none;
}
</style>
