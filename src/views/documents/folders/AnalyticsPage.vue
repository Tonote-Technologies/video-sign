<template>
  <div class="container-fluid">
   
    <div class="row">
      <a href="#" class="col-lg-3 col-md-4 col-sm-6 analytic">
        <div class="card">
          <div class="card-body active d-flex justify-content-between">
            <div>
              <div class="text-dark h5">Affidavit Requests</div>
              <h5 class="fw-bold">0</h5>
            </div>

            <div>
              <span class="btn rounded-pill btn-light"
                ><Icon icon="carbon:document-preliminary"
              /></span>
            </div>
          </div>
        </div>
      </a>
      <a href="#" class="col-lg-3 col-md-4 col-sm-6 analytic">
        <div class="card">
          <div class="card-body d-flex justify-content-between">
            <div>
              <div class="text-dark h5">Notary Requests</div>
              <h5 class="fw-bold">0</h5>
            </div>

            <div>
              <span class="btn rounded-pill btn-light"
                ><Icon icon="fa6-solid:stamp"
              /></span>
            </div>
          </div>
        </div>
      </a>
      <a
        href="/app/public/requests/index.php?status=2"
        class="col-lg-3 col-md-4 col-sm-6 analytic"
      >
        <div class="card">
          <div class="card-body d-flex justify-content-between">
            <div>
              <div class="text-dark h5">Video Requests</div>
              <h5 class="fw-bold">0</h5>
            </div>

            <div>
              <span class="btn rounded-pill btn-light"
                ><Icon icon="clarity:video-gallery-line"
              /></span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.analytic .active {
  background-color: #063bb3;
}
.fw-bold {
  font-weight: bold;
}
.analytic .active .h5,
.active h5 {
  color: #fff !important;
}

.analytic .card:hover {
  background-color: #b2c4d7;
  color: red;
}
</style>
