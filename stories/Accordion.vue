<template>
  <div class="staggered-list-content">
    <Flipper :flipKey="key" :staggerConfig="staggerConfig" spring="gentle">
      <ul class="list">
        <li @click="toggleItem(index)" v-for="(num,index) in list" :key="index">
          <Flipped
            v-if="index !== focused"
            :flipId="`listItem-${index}`"
            stagger="card"
            :shouldInvert="shouldFlip(index)"
          >
            <div class="listItem">
              <Flipped :inverseFlipId="`listItem-${index}`">
                <div class="listItemContent">
                  <Flipped
                    :flipId="`avatar-${index}`"
                    :shouldFlip="shouldFlip(index)"
                    stagger="card-content"
                  >
                    <div class="avatar"></div>
                  </Flipped>
                  <div class="description">
                    <Flipped
                      v-for="thing in num.description"
                      :key="thing"
                      :shouldFlip="shouldFlip(index)"
                      stagger="card-content"
                      :flipId="`description-${index}-${thing}`"
                    >
                      <div></div>
                    </Flipped>
                  </div>
                </div>
              </Flipped>
            </div>
          </Flipped>
          <Flipped
            @on-start="handleStart"
            @on-complete="handleComplete"
            v-else
            :flipId="`listItem-${index}`"
            stagger="card"
          >
            <div class="expandedListItem">
              <Flipped :inverseFlipId="`listItem-${index}`">
                <div class="expandedListItemContent">
                  <Flipped :flipId="`avatar-${index}`" stagger="card-content">
                    <div class="avatar avatarExpanded"></div>
                  </Flipped>
                  <div class="description">
                    <Flipped
                      v-for="thing in num.description"
                      stagger="card-content"
                      :key="thing"
                      :flipId="`description-${index}-${thing}`"
                    >
                      <div></div>
                    </Flipped>
                  </div>
                  <div class="additional-content">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </Flipped>
            </div>
          </Flipped>
        </li>
      </ul>
    </Flipper>
  </div>
</template>

<script>
import Flipper from "../src/Flipper";
import Flipped from "../src/Flipped";

export default {
  name: "Accordion",
  components: {
    Flipper,
    Flipped
  },
  data() {
    return {
      previouslyFocused: null,
      focused: null,
      list: [
        {
          open: false,
          description: ["a", "b", "c"]
        },
        {
          open: false,
          description: ["a", "b", "c"]
        },
        {
          open: false,
          description: ["a", "b", "c"]
        }
      ]
    };
  },
  methods: {
    handleStart({ el, id }) {
      setTimeout(() => {
        el.classList.add("animated-in");
      }, 600);
    },
    handleComplete({ el, id }) {
      console.log("Finished", el, id);
    },
    shouldFlip(index) {
      return () => {
        return index === this.previouslyFocused || index === this.focused;
      };
    },
    toggleItem(index) {
      if (this.focused === index) {
        this.focused = null;
      } else {
        this.focused = index;
      }
      this.list[index].open = !this.list[index].open;
    }
  },
  computed: {
    staggerConfig() {
      return {
        card: {
          reverse: this.focused !== null ? true : false,
          speed: 0.5
        }
      };
    },
    key() {
      return this.list.map(item => item.open.toString()).join("");
    }
  },
  watch: {
    focused(nv, ov) {
      this.previouslyFocused = ov;
    }
  }
};
</script>

<style scoped>
.staggered-list-content {
  width: 400px;
  margin: 2rem auto;
}
.list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
}
.list li {
  width: 100%;
}
.list li + li {
  margin-top: 1rem;
}
.listItem {
  width: 100%;
  cursor: pointer;
  background-color: #ffd379;
  overflow: hidden;
}
.listItemContent {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
}
.avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 100px;
  background-color: #282c34;
  margin-right: 2rem;
}
.avatarExpanded {
  width: 8rem;
  height: 8rem;
  margin-right: 0;
  margin-bottom: 1rem;
}
.description > div {
  background-color: #282c34;
  width: 14rem;
  border-radius: 6px;
  height: 0.5rem;
}
.description > div:nth-of-type(2) {
  width: 11rem;
}
.description > div:nth-of-type(3) {
  width: 8rem;
}
.description > div + div {
  margin-top: 1rem;
}
.expandedListItem .description {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.expandedListItem {
  cursor: pointer;
  background-color: #ffd379;
}
.expandedListItemContent {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.additional-content {
  width: 100%;
  margin-top: 2rem;
}

.additional-content > div {
  opacity: 0;
  border-radius: 3px;
  background-color: #282c34;
  height: 5rem;
}

/* content fade in animations */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
  }
}

.animated-in .additional-content > div {
  animation: fadeIn 0.4s forwards;
}

.additional-content > div:nth-of-type(2) {
  animation-delay: 0.15s;
}
.additional-content > div:nth-of-type(3) {
  animation-delay: 0.3s;
}
.additional-content > div + div {
  margin-top: 1rem;
}
</style>
