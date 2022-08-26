<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'
import { useSearchStore } from '~/store/search'

const { t } = useI18n()
const searchStore = useSearchStore()
const searchVal = ref('')

const runSearch = useThrottleFn(() => {
  console.log('runSEarch :>> ', searchVal.value)

  searchStore.getSearchResults(searchVal.value)
}, 100)

onMounted(() => {
  runSearch()
})
</script>

<template>
  <input v-model="searchVal" class="border-1 border-gray-400 rounded-2 p-3 shadow-md" type="text" :placeholder="t('enter-search')" inputmode="text" enterkeyhint="search" @input="runSearch()" @submit="runSearch()">

  <button class="border-1 border-gray-400 rounded-2 p-3 shadow-md bg-[#ff5b60] text-white uppercase font-bold" @click="runSearch()">
    Search
  </button>
</template>
