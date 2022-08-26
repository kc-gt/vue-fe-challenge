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
const loading = ref(false)
const starCount = ref(0)
const resultCount = ref(0)
const searchQuery = ref('')

export const useSearchStore = defineStore('search', () => {
  const baseurl = ref('search')
  const searchUrl = ref('')
  const starredUrl = ref('')
  // const { execute, data, isFetching } = useLocalFetch(url).get().json()
  // let executePromise: Promise<any>

  async function getAllResults(): Promise<Company[] | null> {
    loading.value = true
    const { data } = await useLocalFetch(baseurl).get().json()

    if (data.value) {
      companies.value = data.value as Company[]
      resultCount.value = companies.value.length
      for (const curComp of data.value) {
        if (curComp.starred)
          starCount.value++
      }
    }
    else {
      alert('Failed getting data from database')
    }
    loading.value = false
    return companies.value
  }

  async function getSearchResults(searchFor: string): Promise<Company[] | null> {
    loading.value = true
    searchQuery.value = searchFor

    searchUrl.value = baseurl.value
    if (searchFor)
      searchUrl.value = `search?name_like=${searchFor}`

    const { data } = await useLocalFetch(searchUrl).get().json()

    resultCount.value = 0
    if (data.value) {
      companies.value = data.value as Company[]
      resultCount.value = companies.value.length
    }
    else {
      alert('Failed getting data from database')
    }
    loading.value = false
    return companies.value
  }

  async function setStarred(company: Company, starred: boolean): Promise<boolean | null> {
    if (!company.id)
      return false

    starredUrl.value = `${baseurl.value}/${company.id}`
    company.starred = starred

    const { data } = await useLocalFetch(starredUrl).put(company).json()

    if (data.value) {
      if (starred)
        starCount.value++
      else
        starCount.value--
    }
    else {
      alert('Failed setting data')
    }

    return true
  }

  async function getStarred(): Promise<Company[] | null> {
    loading.value = true
    const { data } = await useLocalFetch(`${baseurl.value}?starred=true`).get().json()
    if (data.value) {
      companies.value = data.value as Company[]
      resultCount.value = companies.value.length
    }
    loading.value = false
    return companies.value
  }

  return {
    getAllResults,
    getStarred,
    getSearchResults,
    setStarred,
    companies,
    resultCount,
    starCount,
    loading,
  }
})
