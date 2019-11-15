<template>
  <div class="h-screen flex items-center justify-center">
    <Flipper :flip-key="focused" spring="stiff">
      <div class="phone shadow relative z-0" :class="phoneClass">
        <div class="wallpaper absolute pin w-full h-full"></div>
        <div class="h-full">
          <div class="folder-grid p-3" v-if="focused === null">
            <div v-for="(folder, fIndex) in folders" :key="folder.id">
              <div class="folder" @click="setFocused(fIndex)" role="button" tabindex="0">
                <Flipped
                  v-for="icon in folder.icons.slice(0, 4)"
                  :key="`${folder.id}-${icon}`"
                  :flip-id="`${folder.id}-${icon}`"
                >
                  <div>
                    <Flipped :inverse-flip-id="`${folder.id}-${icon}`">
                      <div class="icon"></div>
                    </Flipped>
                  </div>
                </Flipped>
              </div>
            </div>
          </div>
          <div class="h-full flex flex-col items-center justify-center" v-else>
            <div
              class="mx-auto w-3/4 text-center"
              @click="setFocused(null)"
              role="button"
              tabindex="0"
            >
              <transition @appear="handleAppear" appear>
                <h1
                  ref="folderLabel"
                  class="text-white folder-label font-normal text-lg mb-3"
                >{{ folders[focused].label }}</h1>
              </transition>
              <div>
                <div class="expanded-icon-grid">
                  <Flipped
                    v-for="icon in folders[focused].icons"
                    :key="`${folders[focused].id}-${icon}`"
                    :flip-id="`${folders[focused].id}-${icon}`"
                  >
                    <div>
                      <div class="h-10 w-10 mx-auto bg-white rounded-sm flex items-end pb-2 pl-2">
                        <p class="text-xs font-medium">{{ icon }}</p>
                      </div>
                    </div>
                  </Flipped>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Flipper>
  </div>
</template>

<script>
import Flipper from "../src/Flipper.vue";
import Flipped from "../src/Flipped.vue";
import anime from "animejs";

export default {
  name: "android",
  components: {
    Flipper,
    Flipped
  },
  data() {
    return {
      focused: null,
      folders: [
        {
          label: "Social Media",
          id: "social-media",
          icons: ["a", "b", "c", "d"]
        },
        {
          label: "News",
          id: "news",
          icons: ["a", "b", "c"]
        },
        {
          label: "Games",
          id: "games",
          icons: ["a", "b", "c", "d"]
        }
      ]
    };
  },
  methods: {
    setFocused(id) {
      this.focused = id;
    },
    handleAppear(el) {
      anime({
        targets: el,
        opacity: [0, 1],
        delay: 200,
        duration: 1500
      });
    }
  },
  computed: {
    phoneClass() {
      if (this.focused !== null) {
        return "active";
      }
    }
  }
};
</script>

<style scoped>
.phone {
  background-color: #222;
  width: 300px;
  height: 500px;
  overflow: hidden;
}

.wallpaper {
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center center;
  z-index: -1;
  transition: transform 0.4s ease-out, opacity 0.4s ease-out;
  will-change: opacity transform;
}

.screen {
  height: 200px;
  z-index: 0;
  pointer-events: none;
}

.phone.active .wallpaper {
  transform: scale3d(1.4, 1.4, 1.4);
  opacity: 0.45;
}

.folder-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
}

.folder {
  height: 57px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  grid-auto-flow: row dense;
}

.icon {
  background: white;
  width: 13px;
  height: 13px;
  backface-visibility: hidden;
}

.expanded-icon-grid {
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
  grid-gap: 16px;
  grid-auto-flow: row dense;
}

.folder-label {
  opacity: 0;
}
</style>
