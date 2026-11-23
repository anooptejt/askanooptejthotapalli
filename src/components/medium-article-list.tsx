import Link from "next/link"
import Image from "next/image"
import { articlesFor, type ArticleKind } from "@/lib/medium-articles"
import { basePath } from "@/lib/site"

export function MediumArticleList({ kind }: { kind: ArticleKind }) {
  return <ul className="mt-6 space-y-4">{articlesFor(kind).map(article => <li key={article.id}>
    <Link href={`/${kind}/${article.slug}`} className="flex flex-col gap-4 rounded-2xl bg-card p-5 ring-1 ring-foreground/10 hover:bg-accent sm:flex-row">
      {article.hero && <Image src={`${basePath}${article.hero}`} alt="" width={article.heroWidth} height={article.heroHeight} className="h-36 w-full rounded-xl object-cover sm:h-24 sm:w-40" />}
      <div><h2 className="font-serif text-2xl">{article.title}</h2><p className="mt-2 text-sm text-muted-foreground">{article.dek}</p><p className="mt-2 text-xs text-muted-foreground">{article.date}</p></div>
    </Link>
  </li>)}</ul>
}
