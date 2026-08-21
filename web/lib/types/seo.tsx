export type JsonLd = Record<string, unknown>

export interface PageSeoInput {
  url: string
  title: string
  description: string
  imageUrl?: string
}

export type PageJsonLdData = {
  url: string | undefined
  title: string | undefined
  description: string | undefined
  imageUrl: string | undefined

  ignore?: boolean
}

export interface BlogPostSeoInput extends PageSeoInput {
  datePublished: string
  dateModified?: string
  authorNames: string[]
  tags?: string[]
}

export type PostJsonLdData = {
  url: string | undefined
  title: string | undefined
  description: string | undefined
  imageUrl: string | undefined
  datePublished: string
  dateModified?: string
  authorNames: string[]
  tags?: string[]

  ignore?: boolean
}

export interface BreadcrumbItemInput {
  name: string
  url: string
}
