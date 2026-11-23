import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArticleLike } from "@/components/article-like"
import { findArticle, type ArticleKind } from "@/lib/medium-articles"
import { basePath } from "@/lib/site"

export async function MediumArticleView({ kind, params }: { kind: ArticleKind; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = findArticle(kind, slug)
  if (!article) notFound()
  const section = kind === "career" ? "Career Guidance" : kind === "interview" ? "Interview Practice" : "Library"
  return <article className="mx-auto max-w-3xl px-4 py-12">
    <Link href={`/${kind}`} className="text-sm text-muted-foreground hover:underline">← {section}</Link>
    <h1 className="mt-5 font-serif text-4xl tracking-tight text-balance sm:text-5xl">{article.title}</h1>
    {article.dek && <p className="mt-5 text-lg leading-8 text-muted-foreground">{article.dek}</p>}
    <p className="mt-4 text-sm text-muted-foreground">By Anoop Tej Thotapalli · Published {article.date}</p>
    {article.hero && <figure className="mt-8"><Image src={`${basePath}${article.hero}`} alt={`Illustration for ${article.title}`} width={article.heroWidth} height={article.heroHeight} className="h-auto w-full rounded-2xl" />{article.heroCaption && <figcaption className="mt-2 text-xs text-muted-foreground">{article.heroCaption}</figcaption>}</figure>}
    {article.historical && <p className="mt-8 rounded-xl border border-border bg-accent p-4 text-sm leading-6">Historical article from 2021. The related setup guidance includes broad IAM permissions and access-key approaches; do not use it unchanged. Verify the steps and least-privilege controls against current documentation.</p>}
    <div className="medium-article-body mt-10" dangerouslySetInnerHTML={{ __html: article.body.replaceAll('src="/images/medium/', `src="${basePath}/images/medium/`) }} />
    <ArticleLike article={`${kind}/${slug}`} />
    <p className="mt-8 text-sm text-muted-foreground">Originally published on <a href={article.source} className="underline underline-offset-4">Medium</a>.</p>
  </article>
}
