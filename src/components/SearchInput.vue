<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'
import { useSearchStore } from '~/store/search'

const { t } = useI18n()
const searchStore = useSearchStore()
const searchVal = ref('')
const reset = ref(false)
const timerid = ref(0)

const runSearch = useThrottleFn(() => {
  reset.value = false
  if (timerid.value)
    clearTimeout(timerid.value)

  if (!reset.value) {
    reset.value = true
    timerid.value = setTimeout(() => {
      searchStore.getSearchResults(searchVal.value)
    }, 500)
  }
}, 100)
</script>

<template>
  <div class="flex">
    <div class="relative flex items-center">
      <div v-if="searchStore.loading" class="spinner-container">
        <eos-icons:loading class="spinner" />
      </div>

      <input v-model="searchVal" class="border-1 border-gray-400 rounded-2 p-3 pr-8 shadow-md text-black" type="text" :placeholder="t('enter-search')" inputmode="text" enterkeyhint="search" @input="runSearch()">
    </div>

    <button class="border-1 border-gray-400 rounded-2 p-2 ml-3 shadow-md bg-[#ff5b60] text-white uppercase font-bold text-xl" @click="runSearch()">
      {{ t('search') }}
    </button>
  </div>
</template>

<style scoped lang="css">
.spinner-container {
  @apply absolute right-1;
}

.spinner {
  @apply text-2xl text-[#ff5b60];
}
</style>
