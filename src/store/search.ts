import { defineStore } from 'pinia'
import { useLocalFetch } from '~/composables/fetch'

export interface Address {
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
}

export interface Company {
  id: string
  starred: boolean
  name: string
  description: string
  address: Address
  image?: string
}

const companies = ref<Company[] | null>(null)

export const useSearchStore = defineStore('search', () => {
  const url = ref('search')
  const { execute, data, isFetching } = useLocalFetch(url).get().json()
  let executePromise: Promise<any>

  async function getSearchResults(searchFor: string): Promise<Company[] | null> {
    console.log('getSearchResults: searchFor :>> ', searchFor)
    if (searchFor)
      url.value = `search?name_like=${searchFor}`

    // if (!isFetching.value)
    executePromise = execute()
    // wait for the request to finish, whether we executed or not
    await executePromise

    console.log('data.value :>> ', data.value)
    // if we got data back store it
    if (data.value)
      companies.value = data.value as Company[]

    return companies.value
  }

  return {
    getSearchResults,
    companies,
  }
})
