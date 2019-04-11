<template>
  <div class="grid-wrap p-4">
    <div class="grid">
      <div v-for="set in iconSets" :key="set.slug">
        <Flipped :flipId="set.slug">
          <div class="card shadow">
            <router-link class="block no-underline text-black" :to="`/icons/${set.slug}`">
              <div class="p-4">
                <h1 class="text-xl mb-2">{{set.label}}</h1>
                <div class="text-grey">
                  <p class="flow">aspdjipasjdpoajspojasidjiaosjd</p>
                  <p class="flow">aspdjipasjdpoajspojashdiaa</p>
                </div>
              </div>
              <div class="icon-grid border-t p-4">
                <template v-for="icon in set.icons">
                  <Flipped
                    v-if="icon.flipped"
                    :flipId="`${set.slug}-${icon.key}`"
                    :key="`${set.slug}-${icon.key}`"
                  >
                    <div class="icon flipped bg-green"></div>
                  </Flipped>
                  <div v-else class="icon bg-grey" :key="`${set.slug}-${icon.key}`"></div>
                </template>
              </div>
            </router-link>
          </div>
        </Flipped>
      </div>
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
  }
};
</script>

<style>
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
  grid-template-columns: repeat(auto-fill, 64px);
  grid-auto-rows: 64px;
  grid-auto-flow: dense;
}
</style>
