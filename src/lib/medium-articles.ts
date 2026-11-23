import records from "@/content/medium-articles.json"

export type ArticleKind = "career" | "library" | "interview"
export type MediumArticle = {
  id: string
  slug: string
  kind: ArticleKind
  title: string
  dek: string
  date: string
  source: string
  hero: string | null
  heroWidth: number
  heroHeight: number
  heroCaption: string
  body: string
  historical: boolean
}

export const mediumArticles = records as MediumArticle[]
export const articlesFor = (kind: ArticleKind) => mediumArticles.filter(article => article.kind === kind)
export const findArticle = (kind: ArticleKind, slug: string) => mediumArticles.find(article => article.kind === kind && article.slug === slug)
