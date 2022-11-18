<template>
  <div class="agora-video-player shadow" ref="player" :id="domId"></div>
</template>

<script>
export default {
  props: ["remoteStream", "domId"],
  mounted() {
    console.log(this.remoteStream);
    this.$nextTick(function () {
      if (this.remoteStream) {
        this.remoteStream.videoTrack.play(
          `${this.domId}`,
          { fit: "cover" },
          (err) => {
            if (err && err.status !== "aborted") {
              console.warn("trigger autoplay policy");
            }
          }
        );
        this.remoteStream.audioTrack.play();
      }
    });
  },
  beforeUnmount() {
    if (this.remoteStream.videoTrack) {
      if (this.remoteStream.videoTrack.isPlaying()) {
        this.remoteStream.videoTrack.stop();
      }
      this.remoteStream.videoTrack.close();
    }
  },
};
</script>

<style>
.agora-video-player {
  height: 100%;
  width: 100%;
}
.agora-video-player > div {
  border-radius: 5px !important;
}
</style>
