<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="bg-[#6476ff] py-10">
    <SearchInput />
  </section>

  <section class="p-10">
    <span class="font-bold text-xl uppercase">
      {{ t('results') }}:
    </span>

    <SearchResultList />
  </section>
</template>
