<template>
  <div
    v-if="domId"
    class="agora-video-player shadow rounded"
    :id="`user-container-${domId}`"
  >
    <div class="video-player" :id="`user-${domId}`"></div>
    <div class="place__holder" v-if="!localVideo.muted ? '' : 'd-none'">
      <h3>
        {{ domId.split("-")[2] }}
      </h3>
    </div>
    <!-- <div class="remote__content">
      <div>
        <VoiceDot :level="level" :mute="!remote_mic" />
      </div>
      <div>
        <span class="text-primary fw-bold small">{{ domId }} ({{ role }})</span>
      </div>
    </div> -->
  </div>

  <!-- <div class="agora-video-player shadow" ref="player" :id="domId"></div> -->
</template>

<script>
import store from "@/store";

export default {
  props: ["localAudio", "localVideo", "domId"],
  computed: {
    userProfile() {
      return store.getters["auth/profile"];
    },
  },
  mounted() {
    this.$nextTick(function () {
      if (this.localVideo) {
        this.localVideo.play(`user-${this.domId}`, { fit: "cover" }, (err) => {
          if (err && err.status !== "aborted") {
            console.warn("trigger autoplay policy");
          }
        });
      }
      // if (this.localAudio) {
      //   this.localAudio.play((err) => {
      //     if (err && err.status !== "aborted") {
      //       console.warn("trigger autoplay policy");
      //     }
      //   });
      // }
    });
  },
  beforeUnmount() {
    // if (this.localVideo && this.localVideo.isPlaying) {
    //   this.localVideo.stop();
    //   this.localAudio.close();
    // }
    // if (this.localAudio && this.localAudio.isPlaying) {
    //   this.localAudio.stop();
    //   this.localVideo.close();
    // }
    // this.$emit("leave-room", this.localVideo);
  },
};
</script>

<style>
.agora-video-player {
  width: 210px;
  height: 160px;
  border-radius: 5px !important;
  position: relative;
  background-color: #2f2f2f;
  /* height: 100%;
  width: 100%;
  border-radius: 5px !important;
  background-color: #2f2f2f; */
}
/* .video-container {
  border-radius: 5px !important;
  background-color: #203a49;
  height: 100%;
  width: 100%;
} */

.video-player {
  height: 100%;
  width: 100%;
}

.agora-video-player > div {
  border-radius: 5px !important;
  height: 100%;
  width: 100%;
}
.place__holder {
  position: absolute;
  width: 100%;
  height: 100%;

  border-radius: 50%;
  border: 3px solid white;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.place__holder h3 {
  font-weight: bolder;
  font-size: 3rem;
  margin: 0;
  padding: 5px;
  min-width: 100px;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 3px solid rgb(201, 200, 200);
  color: rgb(201, 200, 200);
}
</style>
