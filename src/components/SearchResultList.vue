<script setup lang="ts">
import { useSearchStore } from '~/store/search'

const searchStore = useSearchStore()
</script>

<template>
  <div v-for="company in searchStore.companies?.slice(0, 10)" :key="company.id" role="listitem">
    <SearchResult :name="company.name" :description="company.description" :starred="company.starred" />
  </div>
</template>
