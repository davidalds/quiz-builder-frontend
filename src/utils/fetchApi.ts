import { api } from '@/services'
import type { methodsAPI } from '@/types/apiClient'
import type { AxiosResponse } from 'axios'

export class FetchApi<API> {
  async fetch<Path extends keyof API>(
    path: Path,
    methods: methodsAPI,
    params?: Record<string, unknown>,
  ): Promise<AxiosResponse<API[Path]>> {
    return await api[methods](path as string, { params })
  }
}
