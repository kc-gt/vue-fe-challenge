<script setup lang="ts">
import { useSearchStore } from '~/store/search'

defineProps<{
  name: string
  starred: boolean
  description: string
}>()

const searchStore = useSearchStore()

async function toggleStarred(): Promise<void> {
  searchStore.setStarred(!props.company.starred)
}
</script>

<template>
  <div class="flex justify-around">
    <div>{{ name }}</div>

    <div>{{ description }}</div>

    <div>{{ starred }}</div>

    <a role="button" tabindex="0" @click="company.starred = !company.starred" @keydown.enter.exact="company.starred = !company.starred">
      star
    </a>
  </div>
</template>
