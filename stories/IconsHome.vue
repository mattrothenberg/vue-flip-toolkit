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
                  <p class="flow">aspdjipasjdpoajspoja</p>
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
export default {
  name: "IconsHome",
  components: {
    Flipped
  },
  data() {
    return {
      iconSets: [
        {
          slug: "sports",
          label: "Sports Icons",
          count: 24
        },
        {
          slug: "science",
          label: "Science Icons",
          count: 30
        }
      ]
    };
  }
};
</script>

<style scoped>
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
</style>
