<script setup lang="ts">
import { useSearchStore } from '~/store/search'

const searchStore = useSearchStore()

async function showStarred() {
  searchStore.getStarred()
}
</script>

<template>
  <div class=" flex w-full justify-center items-center border-b-1 border-gray-400 py-4 text-lg">
    <div class="mx-6 flex justify-center items-center font-bold hover:(cursor-pointer text-red-500)" @click="showStarred">
      Total <carbon:star-filled class="text-yellow" />:
      {{ searchStore.starCount }}
    </div>
    <div class="mx-6">
      Showing: {{ searchStore.companies?.slice(0, 10).length }} / {{ searchStore.resultCount }}
    </div>
  </div>

  <div class="flex flex-row justify-center flex-wrap px-5 pb-8 bg-light-300 min-h-200px">
    <div v-if="searchStore.loading" class="absolute flex w-full h-1/2 justify-center items-center">
      <eos-icons:loading class="text-4xl text-[#ff5b60]" />
    </div>
    <div v-for="company in searchStore.companies?.slice(0, 10)" :key="company.id" role="listitem" class="">
      <SearchResult :id="company.id" :name="company.name" :description="company.description" :starred="company.starred" :image="company.image" :address="company.address" />
    </div>
  </div>
</template>
