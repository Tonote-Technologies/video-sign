<template>
  <div class="mt-2 px-2">
    <!-- <div class="my-2">
      <label>Document Title</label>
      <input
        type="text"
        v-model="schedule_formdata.title"
        placeholder="Enter document title"
        class="form-control request-title"
      />
    </div>

    <div class="file-input shadow my-2">
      <input
        type="file"
        name="file-input"
        id="file-input"
        class="file-input__input"
        accept=".pdf"
        multiple
        @change="handleImageUpload"
      />
      <div class="d-flex justify-content-center align-items-center">
        <label class="file-input__label px-5" for="file-input">
          <h5 class="fw-bold">Drag and drop to upload</h5>
          <p>OR</p>
          <p class="btn btn-primary p-1">Select File</p>
          <p class="fw-light small">PDF only</p>
        </label>
      </div>
    </div>

    <div
      class="my-1 d-flex justify-content-between"
      v-if="schedule_formdata.documentFile?.length > 0"
    >
      <p class="d-flex align-items-center">
        <Icon icon="et:document" />
        {{ schedule_formdata.documentTitle }}
      </p>
      <button
        @click="deleteImage"
        class="btn btn-sm btn-outline-danger py-0 px-1"
      >
        <Icon :icon="'icon-park-solid:delete-five'" />
      </button>
    </div>

    <hr />

    <div class="text-end mt-2">
      <button
        :disabled="!schedule_formdata.documentFile?.length"
        class="btn btn-primary"
        @click="proceed"
      >
        Next
      </button>
    </div> -->

    <section class="container-fluid">
      <div
        class="email-header-left d-flex align-items-center mb-2 fw-bold"
        style="font-size: 1rem"
      >
        <!-- <router-link
          :to="{ name: 'Dashboard' }"
          role="button"
          @click="$router.go(-1)"
          class="back"
        >
          <span class="go-back me-1 float-start">
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
              class="feather feather-chevron-left font-medium-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </span>
          <span class="email-subject mb-0 float-start">Back</span>
        </router-link> -->
        <!-- <span>Sign a Document</span> -->
      </div>
      <div class="grid" v-show="isSubmitted">
        <PreLoader />
      </div>
      <div v-show="!isSubmitted">
        <Form
          @submit="onProceed"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <div class="card">
            <div class="card-body">
              <div class="form-group mb-2">
                <div class="form-group">
                  <label>Document title</label>
                  <Field
                    name="title"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.title }"
                    placeholder="Enter document title"
                    v-model="title"
                    required
                  />
                  <div class="invalid-feedback">{{ errors.title }}</div>
                </div>
              </div>
              <template v-if="!initialUpload">
                <DropZone
                  @drop.prevent="drop"
                  @change="selectedFile($event, true)"
                >
                  <template #format>Upload PDF</template>
                  <template #input>
                    <input
                      type="file"
                      id="dropzoneFile"
                      multiple
                      class="dropzoneFile"
                      accept=".pdf"
                    />
                  </template>
                </DropZone>
              </template>
              <template v-else>
                <label for="choose" class="btn btn-primary">
                  <input
                    type="file"
                    id="choose"
                    @change="selectedFile($event, true)"
                    multiple
                    accept=".pdf"
                  />
                  Upload more
                </label>
              </template>
              <p class="my-2 fw-bolder text-dark">
                Up to 20 files, Max 2 MB each.
              </p>
            </div>
          </div>
          <div
            class="card mb-1 mb-0 shadow-none border"
            v-for="(prev, index) in previewFile"
            :key="index"
          >
            <div class="p-2">
              <div class="row align-items-center">
                <div class="col-auto">
                  <img
                    data-dz-thumbnail
                    src="@/assets/default.png"
                    class="avatar-sm rounded bg-light"
                    :alt="prev.file.name"
                  />
                </div>
                <div class="col ps-0">
                  <a
                    href="javascript:void(0)"
                    class="text-muted fw-bold"
                    data-dz-name
                  ></a>
                  <p class="mb-0" data-dz-size>
                    {{ prev.file.name }} | Size:
                    <span
                      :class="[
                        prev.file.size > 2097152
                          ? 'text-danger'
                          : 'text-success',
                      ]"
                    >
                      {{ prev.size }}
                    </span>
                  </p>
                </div>
                <div class="col-auto">
                  <a
                    role="button"
                    class="btn btn-sm btn-outline-danger ds-remove filed"
                    data-id="#document_id"
                    data-name="fileName"
                    @click="removeItem(index)"
                  >
                    X
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-2 p-2">
            <button
              type="submit"
              class="btn btn-sm btn-primary d-block ms-auto"
              :class="{ disabled: !isSelected }"
            >
              Next
            </button>
          </div>
        </Form>
      </div>
    </section>
  </div>
</template>

<script setup>
import PreLoader from "@/components/PreLoader.vue";
import DropZone from "@/components/DropZone.vue";
import { Form, Field } from "vee-validate";
// import { dashboard } from "@/store/dashboard";
import { ref, toRaw, onMounted } from "vue";
// import { useRouter } from "vue-router";
import { useActions } from "vuex-composition-helpers/dist";
import { useToast } from "vue-toast-notification";
const toast = useToast();
// const { token } = useGetters({ token: "auth/token" });
const { setAuthForDocumentUpload, fileUploads, getUserPrints } = useActions({
  setAuthForDocumentUpload: "auth/setAuthForDocumentUpload",
  fileUploads: "document/fileUploads",
  getUserPrints: "print/getUserPrints",
});
const initialUpload = ref(false);
const isSubmitted = ref(false);
const isSelected = ref(false);
const dropzoneFile = ref("");
const previewFile = ref([]);
const dataFile = ref([]);
const title = ref("");
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
dataFile.value = [];
previewFile.value = [];
const preparedFile = (files) => {
  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    const params = files[i];
    const fileSize = formatBytes(params.size);
    reader.onloadend = () => {
      dataFile.value.push(reader.result);
      previewFile.value.push({ file: params, size: fileSize });
    };
    reader.readAsDataURL(params);
  }
  isSelected.value = true;
};
const drop = (e) => {
  initialUpload.value = true;
  let dropFiles = (dropzoneFile.value = e.dataTransfer.files);
  title.value = dropzoneFile.value[0].name.split(".").slice(0, -1).join(".");
  preparedFile(dropFiles);
  isSelected.value = true;
};
const selectedFile = (e, init) => {
  initialUpload.value = init;
  let dropFiles = (dropzoneFile.value = e.target.files);
  title.value = dropFiles[0].name.split(".").slice(0, -1).join(".");
  preparedFile(dropFiles);
  isSelected.value = true;
};
const removeItem = (index) => {
  previewFile.value.splice(index, 1);
  dataFile.value.splice(index, 1);
  if (previewFile.value.length == 0) {
    title.value = "";
    initialUpload.value = isSelected.value = false;
  }
};
const onProceed = (params) => {
  const uploadFile = {
    files: toRaw(dataFile.value),
    title: params.title,
  };
  for (let i = 0; i < previewFile.value.length; i++) {
    const element = previewFile.value[i];
    if (element.file.size > 2097152) {
      return toast.error(
        "Uploaded file size (" + element.size + ") is more than 2 MB",
        {
          timeout: 5000,
          position: "top-right",
        },
      );
    }
  }
  isSubmitted.value = true;
  fileUploads(uploadFile);
  dataFile.value = [];
  previewFile.value = [];
  setTimeout(() => {
    isSubmitted.value = false;
  }, 30000);
};
// const route = useRouter();
// const uri = ref("");
const isLoading = ref(true);
const hasToken = ref("");
onMounted(() => {
  // uri.value = route.currentRoute.value.query;
  // hasToken.value =
  //   uri.value.qt != undefined || uri.value.qt != null
  //     ? uri.value.qt
  //     : token.value;
  // if (
  //   hasToken.value == undefined ||
  //   hasToken.value == "" ||
  //   hasToken.value == null
  // ) {
  //   return (window.location.href = process.env.VUE_APP_URL_AUTH_LIVE);
  // }
  // dashboard.value.setToken(hasToken.value);
  getUserPrints(hasToken.value);
  setAuthForDocumentUpload(hasToken.value);
  isLoading.value = false;
});
</script>

<script>
// import { Icon } from "@iconify/vue";
import store from "@/store";

export default {
  // components: { Icon },
  data() {
    return {
      documentFile: false,
      documentTitle: null,
      title: null,
      step: 0,
    };
  },
  computed: {
    schedule_formdata() {
      return store.getters["schedule/schedule_formdata"];
    },
  },
  methods: {
    deleteImage() {
      let file = document.querySelector("input[type=file]");
      file.value = null;
      store.commit("schedule/UNSET_SCHEDULE_FORMDATA_1");
    },

    handleImageUpload() {
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();
      reader.onloadend = async () => {
        store.commit("schedule/SET_SCHEDULE_FORMDATA_1", {
          title: !this.schedule_formdata.title?.length
            ? file.name
            : this.schedule_formdata.title,
          documentTitle: file.name,
          documentFile: reader.result,
        });
        // console.log({
        //   title: !this.schedule_formdata.title?.length
        //     ? file.name
        //     : this.schedule_formdata.title,
        //   documentTitle: file.name,
        //   documentFile: reader.result,
        // });
      };
      reader.readAsDataURL(file);
    },
    proceed() {
      this.$emit("current", this.step + 1);
    },
  },
};
</script>

<style lang="css">
.file-input {
  width: 100%;
  height: 200px;
  border: 1.25px dashed #d2d2d2;
  border-radius: 4px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: var(--bs-gray-100);
}
.file-input__label p {
  margin: 5px;
  padding: 0;
}

.file-input__label .iconify {
  height: 45px;
  width: 45px;
}

#display__snapshot {
  position: relative;
  width: 200px;
  height: auto;
  margin: 0 auto;
}
.delete__btn {
  position: absolute;
  top: -5px;
  right: -5px;
  padding: 2px;
  box-shadow: var(--bs-box-shadow);
  z-index: 10;
}
.iconify {
  height: 25px;
  width: 25px;
}
#vs1__combobox.vs__dropdown-toggle {
  padding: 0.4rem 1rem !important;
}

.avatar-sm {
  height: 3rem;
  width: 3rem;
}
</style>
