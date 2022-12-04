<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between">
      <h4 class="card-title">Affidavit Requests</h4>
      <div class="wrap"></div>
    </div>
    <div class="card-body py-4">
      <table class="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Title</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(data, index) in affidavits" :key="index">
            <template v-if="data.type === 'Request A Notary'">
              <td>{{ index + 1 }}</td>
              <td>{{ data.title }}</td>
              <td>
                <span class="badge rounded-pill me-1" :class="[
                  data.status == 'Awaiting' ? 'bg-warning' : 'bg-success',
                ]">
                  {{ data.status }}
                </span>
              </td>
              <td>{{ dateTime(data.created_at) }}</td>

              <td>
                <template v-if="data.status == 'Completed'">
                  <div class="dropdown">
                    <a class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <Icon icon="oi:ellipses" :rotate="1" :verticalFlip="true" />
                    </a>
                    <div class="dropdown-menu dropdown-menu-end" style="">
                      <div class="dropdown-item">
                        <Icon icon="carbon:download" /> Download
                      </div>
                    </div>
                  </div>
                </template>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import moment from "moment";
import { useGetters } from "vuex-composition-helpers/dist";

const dateTime = (value) => {
  return moment(value).format("Do MMM YYYY, hh:mm A");
};

const { affidavits } = useGetters({
  affidavits: "schedule/affidavits",
});
</script>

<style scoped>

</style>
