<template>
  <div class="videocall__box">
    <div class="mb-2" v-if="localVideo">
      <LocalPlayer
        @leave-room="leaveAndRemoveLocalStream"
        :localAudio="localAudio"
        :localVideo="localVideo"
        :domId="UID"
      >
      </LocalPlayer>
      <div
        class="video__icon d-flex justify-content-between align-items-center"
      >
        <div><VoiceDot :level="audio__level" :mute="!microphone" /></div>
        <div class="d-flex justify-content-start align-items-center gap-1">
          <button @click="toggleCamera">
            <Icon
              :icon="
                !camera ? 'carbon:video-off-filled' : 'carbon:video-filled'
              "
              height="15"
              width="15"
            />
          </button>
          <button @click="toggleMic">
            <Icon
              :icon="
                !microphone ? 'fa:microphone-slash' : 'fa-solid:microphone'
              "
              height="15"
              width="15"
            />
          </button>
        </div>
        <span v-if="localVideo" class="text-primary fw-bold small"
          >{{ UID.split("-")[0] }} ({{ UID.split("-")[1] }})</span
        >
      </div>
    </div>
    <!-- <button @click="endSession">end</button> -->
    <div v-if="loading">
      <PreLoader />
    </div>

    <!-- remote players  -->
    <!--  -->
    <div
      :style="handleEnlarge && 'z-index:100000000;'"
      :class="handleEnlarge ? 'enlarge shadow rounded mb-3' : 'mb-3'"
    >
      <div v-for="remoteStream in remoteStreams" :key="remoteStream.uid">
        <div
          :id="`user-container-${remoteStream.uid}`"
          :style="filteredUser && 'height:420px;width:800px;'"
          :class="
            filteredUser && filteredUser !== remoteStream.uid
              ? 'd-none'
              : 'agora-video-player shadow rounded'
          "
        >
          <div
            :key="remoteStream.uid"
            class="video-player"
            :id="`user-${remoteStream.uid}`"
          ></div>
          <div
            class="place__holder"
            v-if="remoteStream._video_muted_ ? 'd-none' : ''"
          >
            <h3>
              {{ remoteStream.uid.split("-")[2] }}
            </h3>
          </div>
          <div class="remote__content">
            <div class="pin">
              <button @click="handleEnlargeVideo(remoteStream.uid)" class="btn">
                <Icon
                  :icon="
                    !handleEnlarge
                      ? 'gg:arrows-expand-right'
                      : 'mdi:arrow-collapse'
                  "
                  height="20"
                  width="20"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          style="margin-top: 5px; padding: 3px"
          class="d-flex justify-content-between align-items-center bg-white"
        >
          <span>
            <Icon
              :icon="
                !remoteStream._audio_muted_
                  ? 'fa-solid:microphone'
                  : 'fa:microphone-slash'
              "
              height="15"
              width="15"
              :class="
                !remoteStream._audio_muted_ ? 'text-primary' : 'text-danger'
              "
            />
          </span>
          <span class="text-primary fw-bold small"
            >{{ remoteStream.uid.split("-")[0] }} ({{
              remoteStream.uid.split("-")[1]
            }})</span
          >
        </div>
        <!-- <RemotePlayer
        @user-leave="handleUserLeft"
        @user-join="handleUserJoined"
        :remoteStream="remoteStream"
        :remote_mic="remote_mic"
        :remote_video="remote_video"
      ></RemotePlayer> -->
      </div>
    </div>

    <!-- :domId="remoteStream.uid" -->
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { onMounted, ref, watch, onUnmounted } from "vue";
import AgoraRTC from "agora-rtc-sdk-ng";
import LocalPlayer from "@/components/Video/LocalPlayer.vue";
// import RemotePlayer from "@/components/Video/RemotePlayer.vue";
import VoiceDot from "@/components/Video/VoiceDot.vue";
import { useToast } from "vue-toast-notification";
import PreLoader from "@/components/Loader/PreLoader.vue";
// import { useStore } from "vuex";

const toast = useToast();
// const store = useStore();
AgoraRTC.setLogLevel(4);
const agora = JSON.parse(sessionStorage.getItem("agora"));

const APP_ID = agora.appid; 
const TOKEN = agora.token;
const CHANNEL = agora.channelName;
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
client.enableAudioVolumeIndicator();
setTimeout(() => {
  // console.log(client.getRemoteVideoStats());
}, 10000);
// client.on("volume-indicator", (volumes) => {
//   volumes.forEach((volume, index) => {
//     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
//   });
// });

let remoteStreams = ref([]);
let filteredUser = ref(null);
// let remoteUsers = ref({});
let handleEnlarge = ref(false);
let camera = ref(true);
let microphone = ref(true);
let remote_mic = ref(true);
let remote_video = ref(true);
let audio__level = ref(0);
let UID = ref("");
let localAudio = ref(null);
let localVideo = ref(null);
let loading = ref(true);

// const virtual_session_details = computed(
//   () => store.getters["schedule/virtual_session_details"]
// );

// const local_video = computed(() => store.getters["agora/local_video"]);

watch(
  () => localAudio.value,
  () => {
    setInterval(() => {
      audio__level.value = localAudio.value.getVolumeLevel();
    }, 0);
  },
);

onMounted(() => {
  joinStream();
});

onUnmounted(async () => {
  await leaveAndRemoveLocalStream();
});

const handleEnlargeVideo = (uid) => {
  if (!handleEnlarge.value) {
    handleEnlarge.value = true;
    filteredUser.value = uid;
  } else {
    handleEnlarge.value = false;
    filteredUser.value = null;
  }
};

const joinAndDisplayLocalStream = async () => {
  client.on("user-published", handleUserJoined);
  // client.on("user-unpublished", handleEndSession);
  client.on("user-info-updated", handleRemoteUnpublish);
  client.on("user-left", handleUserLeft);
  client.on("network-quality", (value) => {
    if (value.uplinkNetworkQuality >= 2 || value.downlinkNetworkQuality >= 2) {
      // toast.error(`Poor Network`, {
      //   position: "top-right",
      //   duration: 1000,
      // });
    }
  });

  UID.value = await client.join(APP_ID, CHANNEL, TOKEN, agora.uid);

  localAudio.value = await AgoraRTC.createMicrophoneAudioTrack();
  localVideo.value = await AgoraRTC.createCameraVideoTrack();
  loading.value = false;

  await client.publish([localAudio.value, localVideo.value]);
  toast.success(
    `${UID.value.split("-")[0]} have successfully joined the notary session.`,
    {
      position: "top-right",
    },
  );
  // store.commit("agora/SET_LOCAL_USER", {
  //   localAudio: localAudio.value,
  //   localVideo: localVideo.value,
  // });
};

const handleUserJoined = async (user, mediaType) => {
  await client.subscribe(user, mediaType);
  if (!remoteStreams.value.find((it) => it.uid == user.uid)) {
    remoteStreams.value.push(user);
    toast.success(`${user.uid.split("-")[0]} has joined the notary session.`, {
      position: "top-right",
    });
  }
  // let player = document.getElementById(`user-container-${user.uid}`);
  // if (player == null) {
  //   remoteStreams.value.push(user);
  //   toast.success(`${user.uid.split("-")[0]} has joined the notary session.`, {
  //     position: "top-right",
  //   });
  // }
  // remoteStreams.value = remoteStreams.value.filter((rem) => {
  //   return rem.uid != user.uid;
  // });

  if (mediaType === "audio") {
    user.audioTrack.play();
  }
  if (mediaType === "video") {
    setTimeout(() => {
      user.videoTrack.play(`user-${user.uid}`);
    }, 5);
  }
};

const handleRemoteUnpublish = async (user, msg) => {
  client.remoteUsers.map((u) => {
    if (u.uid == user) {
      if (msg == "mute-audio") {
        remote_mic.value = false;
      } else if (msg == "unmute-audio") {
        remote_mic.value = true;
      }
      if (msg == "mute-video") {
        remote_video.value = false;
      } else if (msg == "unmute-video") {
        remote_video.value = true;
      }
    }
  });
};

const handleUserLeft = async (user) => {
  delete remoteStreams.value[user.uid];
  document.getElementById(`user-container-${user.uid}`).remove();
  // remoteStreams.value = remoteStreams.value.filter((rem) => {
  //   return rem.uid != user.uid;
  // });
  // await client.leave();
  toast.success(`${user.uid.split("-")[0]} has left the notary session.`, {
    position: "top-right",
  });
};

const toggleMic = async () => {
  if (localAudio.value.muted) {
    microphone.value = true;
    await localAudio.value.setMuted(false);
    toast.success("Microphone is On", { position: "top-right" });
  } else {
    microphone.value = false;
    await localAudio.value.setMuted(true);
    toast.warning("Microphone is Off", { position: "top-right" });
  }
};

const toggleCamera = async () => {
  if (localVideo.value.muted) {
    camera.value = true;
    await localVideo.value.setMuted(false);
    toast.success("Camera is On", { position: "top-right" });
  } else {
    camera.value = false;
    await localVideo.value.setMuted(true);
    toast.warning("Camera is Off", { position: "top-right" });
  }
};

const joinStream = async () => {
  await joinAndDisplayLocalStream();
};

const leaveAndRemoveLocalStream = async () => {
  localAudio.value.stop();
  localVideo.value.stop();
  localVideo.value.close();
  // localAudio.value.close();
  localVideo.value = null;
  toast.success(`You have left the notary session.`, {
    position: "top-right",
  });
  // await client.leave();
  window.location.reload();
  // store.commit("agora/UNSET_LOCAL_USER");
  // store.commit("agora/UNSET_REMOTE_USERS");
};

// const handleEndSession = async () => {
//   toast.success(`notary session ends.`, {
//     position: "top-right",
//   });
// };

// const endSession = async () => {
//   // await client.unpublish([localAudio.value, localVideo.value]);
//   await client.leave();
//   toast.success(`notary session ends.`, {
//     position: "top-right",
//   });
//   //remove video box dom
//   // localVideo.value = null;
//   // remoteUsers.value = [];
//   console.log("local session has ended");
// };
</script>

<style>
.videocall__box {
  display: flex;
  flex-direction: column;
}
.agora-video-player {
  width: 210px;
  height: 160px;
  border-radius: 5px !important;
  position: relative;
  background-color: #2f2f2f;
}
.video-player {
  height: 100%;
  width: 100%;
}
.enlarge {
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 13.5rem;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  transition: 500ms;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100000000;
}

.agora-video-player > div {
  border-radius: 5px !important;
  height: 100%;
  width: 100%;
}
.remote__content {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0;
  height: 100%;
  width: 100%;
}
.pin {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pin button {
  height: 35px;
  width: 35px;
  background: rgba(0, 0, 0, 0.5);
  padding: 3.5px;
  border-radius: 50%;
  color: #cfcfcf;
}
.pin button:hover {
  color: #ffffff;
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

.video__icon {
  margin-top: 5px;
}

.videocall__box {
  background-color: #ffffff;
  border-radius: 5px !important;
}

button:active {
  background-color: #dde8ff;
  color: #003bb3;
}

button {
  border: none;
  display: flex;
  padding: 3px 5px;
  font-size: 1rem;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
}

button:hover {
  background-color: #003bb3;
  color: #dde8ff;
}

button[disabled] {
  background-color: #e2e5ed;
  color: #878787;
}

button[disabled]:hover {
  background-color: #d3dffc;
}

.video-player > div {
  border-radius: 5px !important;
  box-shadow: var(--bs-box-shadow);
}

/* #remote__users {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  height: 100%;
} */

/* @media screen and (max-width:1400px) {
  #video-streams {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    width: 95%;
  }
} */
</style>
