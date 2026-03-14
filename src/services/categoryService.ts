import type { Category } from '@/types/categories'
import { FetchApi } from '@/utils/fetchApi'
import type { CategoryAPI } from '@/types/apiClient'

const fetchCategory = new FetchApi<CategoryAPI>()

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await fetchCategory.fetch('categories/', 'get')
  return data
}
