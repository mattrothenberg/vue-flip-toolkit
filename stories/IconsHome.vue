<template>
  <div>
    <div class="grid p-4">
      <Flipped :flip-id="set.slug" v-for="set in iconSets" :key="set.slug">
        <div>
          <Flipped :inverse-flip-id="set.slug">
            <div class="card shadow p-4" role="button" @click="handleNavigate(set.slug)">
              <div class="icon-grid">
                <template v-for="icon in set.icons">
                  <Flipped
                    v-if="icon.flipped"
                    :flip-id="`${set.slug}-${icon.key}`"
                    :key="`${set.slug}-${icon.key}`"
                    translate
                    scale
                  >
                    <div class="icon flipped bg-green"></div>
                  </Flipped>
                  <div v-else class="icon bg-grey" :key="`${set.slug}-${icon.key}`"></div>
                </template>
              </div>
            </div>
          </Flipped>
        </div>
      </Flipped>
    </div>
  </div>
</template>

<script>
import Flipped from "../src/Flipped";
import iconData from "./icon-data";
export default {
  name: "IconsHome",
  components: {
    Flipped
  },
  data() {
    return {
      iconSets: iconData
    };
  },
  methods: {
    handleNavigate(slug) {
      this.$router.push(`/icons/${slug}`);
    }
  }
};
</script>

<style scoped>
.flow {
  font-family: "flow";
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}
.card {
  background: white;
}

.icon {
  display: inline-block;
  margin: 0 auto;
  width: 48px;
  height: 48px;
  border-radius: 4px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: 48px;
  grid-gap: 16px;
  grid-auto-flow: dense;
}
</style>
