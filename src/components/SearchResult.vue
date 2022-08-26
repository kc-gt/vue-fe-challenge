<script setup lang="ts">
import { type Address, useSearchStore } from '~/store/search'

const props = defineProps<{
  id: string
  name: string
  starred: boolean
  description: string
  address: Address
  image: string | undefined
}>()

const searchStore = useSearchStore()
const svgData = ref('')
const starredRef = ref(false)

starredRef.value = props.starred

async function toggleStarred(): Promise<void> {
  searchStore.setStarred(JSON.parse(JSON.stringify(props)), !starredRef.value)
  starredRef.value = !starredRef.value
}

onMounted(async () => {
  if (props.image) {
    const svgResponse = await fetch(props.image)
    svgResponse.text().then((htmlsvg) => {
      svgData.value = htmlsvg
    })
  }
})
</script>

<template>
  <div class="flex p-5 shadow-md  border-1 rounded-2 m-5 flex-col justify-start items-center max-w-400px bg-white relative hover:(cursor-pointer border-red-400 transition-colors)" @click="toggleStarred()">
    <div v-if="starredRef">
      <carbon:star-filled class="star text-yellow-300" />
    </div>
    <div v-else>
      <carbon:star class="star" />
    </div>

    <div class="text-xl text-black">
      {{ name }}
    </div>

    <div class="text-gray-500">
      {{ description }}
    </div>

    <div class="flex w-full items-center justify-start">
      <svg class="w-1/3" v-html="svgData" />
      <div v-if="address" class="address-container">
        <span class="addressline">
          {{ address.address1 }}
        </span>
        <span class="addressline">
          {{ address.address2 }}
        </span>
        <span class="addressline">
          {{ address.city }}, {{ address.state }} {{ address.postalCode }}
        </span>
      </div>
      <div v-else class="address-container">
        <span class="text-gray-400 italic">No Address</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.star {
  @apply text-xl absolute top-2 left-2
}

.address-container {
  @apply w-2/3 ml-3 text-blue-900 flex flex-col items-center justify-center
}
.addressline {
  @apply text-lg
}
</style>
