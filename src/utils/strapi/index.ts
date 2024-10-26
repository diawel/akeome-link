export type StrapiRecord<T> = {
  id: number
  attributes: T
}

export type StrapiApiResponse<T> = {
  data: StrapiRecord<T>
}

export type StrapiApiListResponse<T> = {
  data: StrapiRecord<T>[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type StrapiError = {
  data: null
  error: {
    status: number
    name: string
    message: string
  }
}
