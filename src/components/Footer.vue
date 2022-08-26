<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <footer class="fixed bottom-0 w-full py-2 text-center text-white bg-[#1e2549]">
    <nav text-xl mt-6>
      <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div i-carbon-language />
      </a>

      <a class="icon-btn text-white mx-2" rel="noreferrer" href="https://github.com/kcampbell-lb/vue-fe-challenge" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
    </nav>
  </footer>
</template>
