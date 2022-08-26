<script setup lang="ts">
import { useSearchStore } from '~/store/search'

const searchStore = useSearchStore()

onMounted(() => {
  searchStore.getAllResults()
})
</script>

<template>
  <section class="bg-[#6476ff] py-10 flex justify-center">
    <SearchInput />
  </section>

  <section class="relative">
    <SearchResultList />
  </section>
</template>
