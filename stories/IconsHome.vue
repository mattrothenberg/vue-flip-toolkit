<template>
  <div class="grid-wrap">
    <div class="grid">
      <div v-for="set in iconSets" :key="set.slug">
        <Flipped :flipId="set.slug">
          <div class="card shadow p-4">
            <Flipped :invertedFlipId="set.slug">
              <router-link class="block no-underline text-black" :to="`/icons/${set.slug}`">
                <h1 class="text-xl mb-3">{{set.label}}</h1>
                <div class="text-grey">
                  <p class="flow">aspdjipasjdpoajspojasidjiaosjd</p>
                  <p class="flow">aspdjipasjdpoajspojashdiaa</p>
                </div>
                <div class="icon-grid mt-4">
                  <Flipped v-for="icon in set.icons" :key="icon" :flipId="icon">
                    <div class="icon bg-grey"></div>
                  </Flipped>
                </div>
              </router-link>
            </Flipped>
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

.grid-wrap {
  padding: 16px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}
.card {
  background: white;
  height: 200px;
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
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
}
</style>
