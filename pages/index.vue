<script setup lang="ts">
const visibleShops = ref([1, 3, 7, 11, 15, 21, 23, 25, 27]);
</script>

<template>
  <div class="store-wrapper">
    <StoreCard :storeid="shop" v-for="shop in visibleShops" />
  </div>

  <div class="browse-more">
    <NuxtLink class="link" to="/browse">Browse</NuxtLink> for more deals!
  </div>
</template>

<style scoped>
.store-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(361px, 1fr));
  gap: 1rem;
  margin: 2rem auto;
  max-width: 1280px;
}

.browse-more {
  display: block;
  color: var(--text);
  text-align: center;
}

.link {
  text-decoration: underline;
  color: var(--text);
}

.link:hover {
  color: var(--primary);
}
</style>