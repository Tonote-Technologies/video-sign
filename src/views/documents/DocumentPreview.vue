<template>
  <div class="conatiner-fluid">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-7">
            <div class="d-flex justify-content-between mb-2">
              <h4>Title: {{ userDocument.title }}</h4>
              <div class="">
                <button class="btn btn-sm btn-warning" @click="replaceModal">
                  <Icon icon="akar-icons:edit" /> Replace Document
                </button>
              </div>
            </div>
            <div
              v-for="(doc, index) in userDocument.documentUploads"
              :key="index"
              class="position-relative border"
            >
              <RenderPage
                :file="doc.file_url"
                @click="$emit('docId', doc.id)"
                @documentHeight="getHeight"
              />
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between mb-2">
                  <h3>Participants</h3>
                  <div>
                    <button
                      class="btn btn-sm btn-primary"
                      @click="addParticipantModal"
                    >
                      <Icon icon="akar-icons:plus" /> Add
                    </button>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(
                          participant, index
                        ) in userDocument.participants"
                        :key="index"
                      >
                        <td>
                          {{
                            participant.user.first_name +
                            " " +
                            participant.user.last_name
                          }}
                        </td>
                        <td>{{ participant.user.email }}</td>
                        <td>
                          <button
                            class="btn btn-sm btn-outline-danger"
                            @click="remove(participant.id)"
                          >
                            <Icon icon="codicon:trash" /> Remove
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <ModalComp
            :show="openModal"
            :size="'modal-lg'"
            :footer="true"
            @close="openModal = false"
          >
            <template #header>
              <h5 class="modal-title">Replace Document</h5>
            </template>

            <template #body>
              <!-- <h1>Replace componet</h1> -->
              <DropZone />
            </template>

            <template #footer>
              <button
                type="button"
                class="btn btn-primary"
                @click="questionModal = false"
              >
                Repalce
              </button>
            </template>
          </ModalComp>

          <ModalComp
            :show="openAddParticipantModal"
            :size="'modal-lg'"
            :footer="false"
            @close="openAddParticipantModal = false"
          >
            <template #header>
              <h5 class="modal-title">Add Participants</h5>
            </template>

            <template #body>
              <!-- <h1>Replace componet</h1> -->
              <AddSigner />
            </template>
          </ModalComp>

          <ModalComp
            :show="removeParticipantModal"
            :size="'modal-sm'"
            @close="removeParticipantModal = false"
          >
            <template #header>
              <h4 class="text-danger mb-0">
                <Icon
                  icon="eva:alert-triangle-outline"
                  style="margin-bottom: 3px"
                />
                Alert
              </h4>
            </template>
            <template #body>
              <h5 class="modal-title text-center">
                Are you sure you want to remove this Participant?
              </h5>
            </template>
            <template #footer>
              <div class="d-flex justify-content-end align-items-center">
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteParticipant"
                >
                  Yes Remove
                </button>
              </div>
            </template>
          </ModalComp>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useGetters, useActions } from "vuex-composition-helpers/dist";
import RenderPage from "@/components/Document/Edit/Main/RenderPage";
import DropZone from "@/components/DropZone";
import AddSigner from "@/components/Document/Edit/Left/AddSigner";

import { Icon } from "@iconify/vue";
import ModalComp from "@/components/ModalComp.vue";

const { userDocument } = useGetters({
  userDocument: "document/userDocument",
});

const { removeParticipant } = useActions({
  removeParticipant: "document/removeParticipant",
  //   editParticipant: "document/editParticipant",
});

const openModal = ref(false);
const openAddParticipantModal = ref(false);
const removeParticipantModal = ref(false);
const participantId = ref("");

const replaceModal = () => {
  openModal.value = true;
};

const addParticipantModal = () => {
  openAddParticipantModal.value = true;
};

const remove = (params) => {
  removeParticipantModal.value = true;
  participantId.value = params;
};

const deleteParticipant = () => {
  removeParticipant(participantId.value);
  removeParticipantModal.value = false;
};

onMounted(() => {
  console.log(userDocument.value.participants);
});
</script>
