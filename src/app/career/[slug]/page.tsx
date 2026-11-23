import type { Metadata } from "next"
import { MediumArticleView } from "@/components/medium-article"
import { articlesFor, findArticle } from "@/lib/medium-articles"
import { siteUrl } from "@/lib/site"

export function generateStaticParams() { return articlesFor("career").map(article => ({ slug: article.slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = findArticle("career", (await params).slug)
  return article ? { title: article.title, description: article.dek, alternates: { canonical: `${siteUrl}career/${article.slug}/` } } : {}
}
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <MediumArticleView kind="career" params={params} />
}
