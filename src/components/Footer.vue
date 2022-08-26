<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <footer class="fixed bottom-0 w-full text-center text-white bg-[#1e2549]">
    <nav class="w-full text-center flex items-center justify-center h-75px">
      <a class=" text-white text-2xl mx-2" rel="noreferrer" href="https://github.com/kcampbell-lb/vue-fe-challenge" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
    </nav>
  </footer>
</template>
