<template>
  <div class="mt-2 px-2">
    <div class="my-2">
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
        accept=".pdf, .docx, .doc"
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
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import store from "@/store";

export default {
  components: { Icon },
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
</style>
