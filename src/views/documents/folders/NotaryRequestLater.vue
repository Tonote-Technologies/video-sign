<template>
  <div class="container-fluid">
    <div class="row p-0" id="basic-table ">
      <div class="col col-12">
        <div class="card">
          <div class="card-body">
            <h3 class="">Next Meeting</h3>
            <!-- <p>You have no scheduled meeting for today</p> -->
            <div class="d-flex justify-content-between">
              <div>
                <div class="h5">Title: Contract agreement</div>
                <div class="text-mute">
                  Friday, 28 October · 11:30am – 12:30pm
                </div>
              </div>
              <div>
                <button class="btn btn-sm btn-success">Join now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h4 class="card-title">Notary Requests</h4>
            <div class="wrap">
              <router-link
                :to="{ name: 'document.video' }"
                class="btn btn-primary waves-effect"
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
                <span>Request a Notary</span>
              </router-link>
            </div>
          </div>
          <div class="card-body py-4">
            <div class="table-">
              <table class="table table-hover table-sm">
                <thead>
                  <tr>
                    <th>S/N</th>

                    <th>Document Title</th>
                    <th>Notary</th>
                    <th>Participants</th>
                    <th>Trasaction cost</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(result, index) in data" :key="index">
                    <!-- <tr> -->
                    <td>{{ index + 1 }}</td>

                    <td>
                      <h6 class="user-name text-truncate mb-0">
                        {{ result.title }}
                      </h6>
                      <small
                        class="badge rounded-pill me-1"
                        :class="[
                          result.type == 'Immediate Session'
                            ? 'badge-light-danger'
                            : 'badge-light-primary',
                        ]"
                        >{{ result.type }}
                      </small>
                    </td>
                    <td>
                      <span class="text-truncate text-primary"
                        ><span>Notary:</span> {{ result.notary }}</span
                      >
                    </td>
                    <td>
                      <div class="avatar-group">
                        <div
                          v-for="(participant, pindex) in result.participants"
                          :key="pindex"
                        >
                          <!-- {{ pindex }} -->
                          <div class="avatar bg-secondary">
                            <div
                              class="avatar-content"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title=""
                              :data-bs-original-title="participant.fullname"
                              :aria-label="participant.fullname"
                            >
                              {{ participant.initial }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ result.trans_cost }}</td>

                    <td>
                      <div class="d-flex flex-column">
                        <h6 class="user-name text-truncate mb-0">
                          {{ result.schedule }}
                        </h6>
                      </div>
                    </td>
                    <td>
                      <span
                        class="badge rounded-pill me-1"
                        :class="[
                          result.status == 'pending'
                            ? 'bg-warning'
                            : 'bg-success',
                        ]"
                      >
                        {{ result.status }}
                      </span>
                    </td>

                    <td style="">
                      <div class="dropdown">
                        <a
                          class="btn btn-sm btn-icon dropdown-toggle hide-arrow"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          ><Icon
                            icon="oi:ellipses"
                            :rotate="1"
                            :verticalFlip="true"
                          />
                        </a>
                        <div class="dropdown-menu dropdown-menu-end" style="">
                          <template v-if="result.status != 'completed'">
                            <div @click="openModal()" class="dropdown-item">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="feather feather-edit font-small-4 me-50"
                              >
                                <path
                                  d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                ></path>
                                <path
                                  d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                ></path></svg
                              >Reschedule
                            </div>
                            <router-link
                              :to="{ name: 'document.preview' }"
                              class="dropdown-item"
                              @click="
                                getDocument({
                                  id: '24aee73e-0581-407f-b429-d64d048295a3',
                                })
                              "
                            >
                              <Icon icon="fontisto:preview" />
                              Preview</router-link
                            >
                          </template>
                          <template v-else>
                            <div class="dropdown-item">
                              <Icon icon="carbon:download" /> Download
                            </div>
                          </template>
                        </div>
                      </div>

                      <div class="d-none">
                        <template v-if="result.status != 'completed'">
                          <div class="text-center w-100">
                            <button
                              @click="openModal()"
                              class="btn btn-outline-warning btn-sm waves-effect waves-float center-block"
                            >
                              <Icon
                                icon="healthicons:i-schedule-school-date-time-outline"
                              />
                              Reschedule
                            </button>

                            <router-link
                              :to="{ name: 'document.preview' }"
                              class="btn-outline-danger btn btn-sm my-1 ms-1"
                              @click="
                                getDocument({
                                  id: '24aee73e-0581-407f-b429-d64d048295a3',
                                })
                              "
                            >
                              <Icon icon="fontisto:preview" />
                              Preview</router-link
                            >
                          </div>
                        </template>
                        <template v-else>
                          <div class="text-center w-100">
                            <button class="btn btn-primary btn-sm">
                              <Icon icon="carbon:download" /> Download
                            </button>
                          </div>
                        </template>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ModalComp
      :show="questionModal"
      :size="modal - sm"
      :footer="true"
      :closeBtn="true"
      @close="questionModal = false"
    >
      <template #header>
        <h5 class="modal-title">Reschedule Session</h5>
      </template>

      <template #body>
        <p class="text-center">Change your schedule below</p>
        <div class="my-2">
          <form>
            <div class="form-group">
              <label>Date</label>
              <input type="date" class="form-control" />
            </div>

            <div class="form-group">
              <label>Time</label>
              <input type="time" class="form-control" />
            </div>
          </form>
        </div>
      </template>

      <template #footer>
        <button
          type="button"
          class="btn btn-primary"
          @click="questionModal = false"
        >
          Submit
        </button>
      </template>
    </ModalComp>
  </div>
</template>

<script setup>
import { request } from "../data.js";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import ModalComp from "@/components/ModalComp.vue";

import { useActions } from "vuex-composition-helpers/dist";

const { getUserDocument } = useActions({
  getUserDocument: "document/getUserDocument",
});

const data = ref("");
data.value = request;

const questionModal = ref(false);

const openModal = () => {
  questionModal.value = true;
};

const getDocument = (params) => {
  getUserDocument(params.id);
};
</script>

<style lang="scss" scoped></style>
