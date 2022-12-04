<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h3 class="fw-bolder">Test Audio and Video Quality</h3>
        <p>
          Before your session is set up, please confirm that your camera and
          microphone are switched on.
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-7 col-md-6 mb-1">
        <div class="video-container">
          <div class="notification">
            <div data-aos="zoom-in" class="my-1" v-if="!camera && display_notification_2">
              <span class="d-flex justify-content-center align-items-center">
                <Icon icon="carbon:video-off-filled" class="mx-1" height="15" width="15" />
                Camera Off
              </span>
            </div>
            <div data-aos="zoom-in" class="my-1" v-if="camera && display_notification_2">
              <span class="d-flex justify-content-center align-items-center">
                <!-- <span class="iconify" data-icon="fa:microphone-slash"></span> -->
                <Icon icon="carbon:video-filled" class="mx-1" height="15" width="15" />
                Camera On
              </span>
            </div>
            <div data-aos="zoom-in" class="my-1" v-if="!microphone && display_notification">
              <span class="d-flex justify-content-center align-items-center">
                <Icon icon="fa:microphone-slash" class="mx-1" height="15" width="15" />
                Microphone Off
              </span>
            </div>
            <div data-aos="zoom-in" class="my-1" v-if="microphone & display_notification">
              <span class="d-flex justify-content-center align-items-center">
                <Icon icon="fa:microphone" class="mx-1" height="15" width="15" />
                Microphone On
              </span>
            </div>
          </div>

          <video class="shadow video" id="video" playsinline autoplay></video>
          <div class="icon__container d-flex justify-content-between align-items-end">
            <canvas class="shadow-sm hidden__two" id="canvas_two" width="36" height="36"></canvas>

            <div class="d-flex justify-content-start align-items-center">
              <button v-if="!camera" class="icon__off" @click="camera__on">
                <Icon icon="carbon:video-off-filled" height="15" width="15" />
              </button>
              <button v-if="camera" class="icon__on" @click="camera__off">
                <Icon icon="carbon:video-filled" height="15" width="15" />
              </button>

              <button v-if="!microphone" class="icon__off" @click="microphone__on">
                <Icon icon="fa:microphone-slash" height="15" width="15" />
              </button>
              <button v-if="microphone" class="icon__on" @click="microphone__off">
                <Icon icon="fa-solid:microphone" height="15" width="15" />
              </button>
            </div>
            <canvas class="shadow-sm hidden__two" id="canvas" width="36" height="36"></canvas>
          </div>
        </div>
      </div>

      <div class="col-lg-5 col-md-6 mb-1">
        <div class="display-container">
          <!-- <div v-if="userDetails.role[0] === 'User'" class="display-container"> -->
          <div style="height: 30px" class="mb-3">
            <h4 class="element fw-bold text-center"></h4>
          </div>

          <div class="text-center">
            <button class="btn btn-primary" @click="nav_to_videoSession" :disabled="!camera || !microphone">
              Join Call</button><br />
          </div>
        </div>
        <!-- <div v-else>
          <h4 class="element hidden"></h4>
          <div class="display-container">
            <h4 class="fw-bold mb-3 ps-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Asperiores, dicta
            </h4>
            <div class="text-center">
              <a
                target="_blank"
                href="/video"
                class="btn btn-primary d-inline-block"
                >Proceed</a
              >
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import AOS from "aos";
import Typed from "typed.js";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// console.log();

const store = useStore();

// const schedule_details = computed(
//   () => store.getters["schedule/schedule_details"]
// );
const userProfile = computed(() => store.getters["auth/profile"]);

const virtual_session_details = computed(
  () => store.getters["schedule/virtual_session_details"],
);

const nav_to_videoSession = () => {
  router.push({
    name: "document.edit",
    params: { document_id: virtual_session_details.value.schedule_id },
  });
};
const camera = ref(false);
const microphone = ref(false);
const display_notification = ref(true);
const display_notification_2 = ref(true);
const user_from_doc = ref({});

const camera__on = async (event) => {
  on_2();
  camera.value = true;
  const video__player = document.querySelector("video#video");
  let videoStream;
  const video_constraints = {
    echoCancellation: true,
    audio: false,
    video: {
      aspectRatio: 1.777777778,
      // frameRate: { max: 30 },
      facingMode: "user",
    },
  };
  try {
    // navigator.mediaDevices.getUserMedia
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    const stream = await navigator.mediaDevices.getUserMedia(video_constraints);
    videoStream = stream;
    video__player.srcObject = videoStream;
  } catch (e) {
    console.error("navigator.getUserMedia error:", e);
  }
  // `event` is the native DOM event
  if (event) {
    // alert(event.target.tagName)
  }
  off_2();
};

const camera__off = async (event) => {
  on_2();
  camera.value = false;
  const video__player = document.querySelector("video#video");
  let videoStream;
  const video_constraints = {
    echoCancellation: true,
    audio: false,
    video: {
      aspectRatio: 1.777777778,
      // frameRate: { max: 30 },
      facingMode: "user",
    },
  };
  try {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    const stream = await navigator.mediaDevices.getUserMedia(video_constraints);
    videoStream = stream;

    const tracks = videoStream.getTracks();
    tracks.forEach(function (track) {
      track.stop();
      track.enabled = false;
    });
    video__player.srcObject = null;
    // this.show_cam_off();
  } catch (e) {
    console.error("navigator.getUserMedia error:", e);
  }
  // `event` is the native DOM event
  if (event) {
    // alert(event.target.tagName)
  }
  off_2();
};

const microphone__on = async () => {
  on();
  // const audio_constraints = {
  //   audio: true,
  //   video: false,
  // };
  // const video__player = document.querySelector("video#video");
  // let videoStream;

  microphone.value = true;
  console.log("on");
  try {
    // const stream = await navigator.mediaDevices.getUserMedia(audio_constraints);
    // videoStream = stream;
    // video__player.srcObject = videoStream;
  } catch (e) {
    console.error("navigator.getUserMedia error:", e);
  }
  off();
};
const microphone__off = async () => {
  on();
  // const audio_constraints = {
  //   audio: true,
  //   video: false,
  // };
  microphone.value = false;
  console.log("off");

  // const video__player = document.querySelector("video#video");
  // let videoStream;
  try {
    // const stream = await navigator.mediaDevices.getUserMedia(audio_constraints);
    // videoStream = stream;
    // video__player.srcObject = videoStream;
  } catch (e) {
    console.log("navigator.getUserMedia error:", e);
  }
  off();
};
const off = () => {
  setTimeout(() => {
    display_notification.value = false;
  }, 1000);
};
const off_2 = () => {
  setTimeout(() => {
    display_notification_2.value = false;
  }, 1000);
};
const on = () => {
  display_notification.value = true;
};
const on_2 = () => {
  display_notification_2.value = true;
};

onMounted(() => {
  store
    .dispatch("schedule/VirtualSessionDetailsAction", route.params.session_id)
    .then(() => {
      console.log("Check");
      const user = virtual_session_details.value?.schedule.participants.filter(
        (user) => {
          return user.user_id == userProfile.value?.id;
        },
      );
      user_from_doc.value = user[0];
      store.dispatch("schedule/GenAgoraTokenAction", {
        channel_name: route.params.session_id,
        user_id: `${userProfile.value.first_name}-${user_from_doc.value?.role}-${userProfile.value.initials}`,
        role: "Publisher",
      });
    });

  AOS.init({ duration: 500 });
  new Typed(".element", {
    strings: ["Connecting ..."],
    typeSpeed: 40,
    showCursor: false,
    loop: true,
    backSpeed: 0,
  });
});
</script>

<style scoped>
.video-container {
  height: 380px;
  position: relative;
}

.icon__container {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
}

.display-container {
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video {
  width: 100%;
  height: 100%;
  background-color: #000000;
  border-radius: 5px;
  object-fit: cover;
}

.hidden {
  display: none;
}

.hidden__two {
  visibility: hidden;
}

.waiting {
  animation: blink 1s linear infinite;
  font-weight: 500;
  letter-spacing: 0.5px;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

#canvas {
  background-color: #dde7fc;
  border-radius: 50%;
}

#canvas_two {
  background-color: #dde7fc;
  border-radius: 50%;
}

#background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(transparent, #00035f, transparent);
  background-size: 100% 7px;
  animation: bg 1s infinite linear;
  z-index: 2;
  opacity: 0.3;
}

@keyframes bg {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 8px 8px;
  }
}

.btn-primary {
  background-color: #003bb3 !important;
  /* color: #FFF !important; */
  border-color: #003bb3 !important;
}

.btn {
  /* box-shadow: none; */
  font-weight: 400;
  font-size: 1rem;
}

.hidden__two {
  visibility: hidden;
}

.icon__off {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  border: 1.5px solid var(--bs-danger);
  background: transparent;
  padding: 3px;
  margin: 5px;
  font-size: 1rem;
  color: var(--bs-danger);
}

.icon__on {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  border: 1.5px solid var(--bs-gray-600);
  background: transparent;
  padding: 3px;
  font-size: 1rem;
  margin: 5px;
  color: var(--bs-gray-600);
}

.notification {
  position: absolute;
  top: 5px;
  right: 30%;
  left: 30%;
}

.notification span {
  background: var(--bs-gray-900);
  border-radius: 1rem;
  color: var(--bs-gray-600);
  padding: 0.5rem;
}

button:disabled,
button[disabled] {
  background: #f2f2f2 !important;
  color: #7b7b7b !important;
  border-color: #f2f2f2 !important;
  border: none;
  cursor: not-allowed !important;
  box-shadow: none;
}
</style>
