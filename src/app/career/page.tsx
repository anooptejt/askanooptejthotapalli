import type { Metadata } from "next"
import Link from "next/link"
import { careerGuides } from "@/content/career"
import { MediumArticleList } from "@/components/medium-article-list"

export const metadata: Metadata = {
  title: "Career",
  description: "Career articles from Anoop Tej Thotapalli.",
}

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Career</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">Career</h1>
      <div className="mt-10">
        <Link href="/career/your-resume-got-you-to-the-interview" className="block rounded-2xl bg-card p-5 ring-1 ring-foreground/10 hover:bg-accent">
          <h2 className="font-serif text-2xl">Your Resume Got You to the Interview. Can You Explain It?</h2>
          <p className="mt-2 text-muted-foreground">Why understanding engineering fundamentals and your own projects matters in an internship interview.</p>
        </Link>
      </div>
      <MediumArticleList kind="career" />
      <ul className="mt-10 space-y-4">
        {careerGuides.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/career/${guide.slug}`} className="block rounded-2xl bg-card p-5 ring-1 ring-foreground/10 hover:bg-accent">
              <h2 className="font-serif text-2xl">{guide.title}</h2>
              <p className="mt-2 text-muted-foreground">{guide.dek}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
