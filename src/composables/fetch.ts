import { createFetch } from '@vueuse/core'

export const endpoint = 'http://localhost:3001'

export const useLocalFetch = createFetch({
  baseUrl: `${endpoint}/`,
  options: {
    fetch,
    async onFetchError(ctx) {
      console.error('fetch error ', ctx.error, ctx.data)

      return ctx
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})
