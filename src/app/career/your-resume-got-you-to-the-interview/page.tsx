import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { basePath } from "@/lib/site"

export const metadata: Metadata = {
  title: "Your Resume Got You to the Interview. Can You Explain It?",
  description: "An internship interviewer shares why engineering fundamentals and understanding your own projects matter.",
  alternates: { canonical: `${basePath}/career/your-resume-got-you-to-the-interview/` },
}

export default function ResumeInterviewArticle() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/career" className="text-sm text-muted-foreground hover:underline">← Career Guidance</Link>
      <h1 className="mt-5 font-serif text-4xl tracking-tight text-balance sm:text-5xl">Your Resume Got You to the Interview. Can You Explain It?</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">Polished projects and prepared answers may get you into the room, but understanding the basics helps you make the most of the conversation.</p>
      <p className="mt-4 text-sm text-muted-foreground">By Anoop Tej Thotapalli</p>
      <figure className="mt-8">
        <Image src={`${basePath}/images/resume-interview-hero.jpg`} alt="A hand-drawn resume and an open notebook with engineering diagrams on a desk" width={1672} height={941} priority className="w-full rounded-2xl" />
        <figcaption className="mt-2 text-xs text-muted-foreground">Illustration created with AI.</figcaption>
      </figure>
      <div className="mt-10 space-y-5 text-[1.05rem] leading-8">
        <p>I have interviewed hundreds of engineering students from multiple institutions while selecting candidates for internship programs. Most came prepared. They had projects to discuss, technical terms on their resumes, and answers ready for questions they expected.</p>
        <p>But across those conversations, a pattern stood out.</p>
        <p>When we moved beyond the prepared answers and started talking about the basics students had studied during their undergraduate education, many discussions went off track. Students could speak about higher-level tools and frameworks, but sometimes struggled to explain the foundations those tools were built on.</p>
        <p>That gap often became visible when I asked a follow-up question about something they had already mentioned:</p>
        <ul className="list-disc space-y-2 pl-6"><li>If you built an application, why did you choose that particular database?</li><li>If your project uses an API, how does it handle an error?</li><li>If you worked with a network call, what happens when a request is sent?</li></ul>
        <p>Imagine a student presenting a full-stack application. They can explain the frontend framework they used and describe the user interface. Then the interviewer asks what happens between a user clicking “Submit” and the application displaying the result.</p>
        <p>The discussion could begin with an HTTP request, a response, and what happens if the request fails. The purpose is not to test every detail of networking. It is to understand whether the student can connect the project they built to the concepts that make it work.</p>
        <p>These questions are not meant to catch anyone out. They help an interviewer understand how well you know the work you have presented.</p>
        <h2 className="pt-5 font-serif text-3xl">Your basics matter more than a complicated answer</h2>
        <p>As an interviewer, I am not expecting an intern to know everything. You are at the beginning of your career, and an internship is a place to learn.</p>
        <p>What I do want to understand is how you think:</p>
        <ul className="list-disc space-y-2 pl-6"><li>Can you explain a concept you have listed on your resume?</li><li>Can you connect it to your project?</li><li>If you do not know an answer, can you be honest and work through what you do know?</li></ul>
        <p>Your undergraduate education introduces you to foundations such as operating systems, networking, databases, and data structures. Some of these subjects may feel distant from the tools you want to work with, but they help you understand what is happening underneath those tools.</p>
        <p>Choose a field that interests you and start with its fundamentals. Give yourself time to understand them, apply what you learn, and then keep going deeper. That understanding will help you pick up new tools and technologies throughout your career.</p>
        <h2 className="pt-5 font-serif text-3xl">A few students went further</h2>
        <p>Among the hundreds of conversations, a few students stood out to me.</p>
        <p>They had gone beyond simply finishing a project. They identified concepts that could make their work better and took the extra effort to learn them. When we discussed what they built, they could explain both <em>what</em> they learned and <em>why</em> it mattered to the project.</p>
        <p>Some of those students went on to receive internship offers. What made the conversations memorable was their willingness to learn with a purpose and their ability to explain their decisions.</p>
        <h2 className="pt-5 font-serif text-3xl">Know what is on your resume</h2>
        <p>In the internship interviews I conducted, the resume was the starting point for the discussion. If you listed a language, a framework, a tool, or a project, it could become part of our conversation.</p>
        <p>Before adding a project to your resume, check your own understanding with five questions:</p>
        <ol className="list-decimal space-y-2 pl-6 font-semibold"><li>What problem was I trying to solve?</li><li>What did I personally build or contribute?</li><li>Why did I choose this approach or tool?</li><li>What underlying concepts did I need to learn to make it work?</li><li>What challenges did I face, and what did I learn from them?</li></ol>
        <p>You do not need a perfect answer to every possible question. But you should be able to speak honestly about what you wrote.</p>
        <p>A modest project that you understand can lead to a more meaningful conversation than a resume filled with terms you cannot explain.</p>
        <h2 className="pt-5 font-serif text-3xl">Use AI to learn, not to skip understanding</h2>
        <p>AI has made it easier to start learning a technology. You can ask a tool to explain a concept, walk through an example, or help you get unstuck.</p>
        <p>But a polished answer alone does not show what you have understood. In an interview, the discussion may move beyond the answer you prepared. That is when your understanding helps you explain, connect ideas, and work through a question.</p>
        <p>Use AI as a learning tool, and give yourself a way to check what you have learned:</p>
        <ul className="list-disc space-y-2 pl-6"><li><strong>Ask:</strong> Use AI to explain a concept or walk through an example.</li><li><strong>Build:</strong> Apply the idea in a small project of your own.</li><li><strong>Close the tab:</strong> Put the generated answer aside and see if you can explain how it works in your own words.</li></ul>
        <p>If you cannot explain it yet, that is not a failure. It is a sign that you have found something worth spending more time on.</p>
        <p>As you prepare for an internship, choose a direction that interests you. Start with the basics, apply them, and keep building. Deeper concepts will make more sense when you have a foundation to connect them to.</p>
        <p>And when you walk into an interview, be ready to talk about your resume. It is the story you have chosen to share about your learning so far. Make sure you are the one who can tell it.</p>
        <hr className="border-border" />
        <p>If you interview engineering interns, what is one foundational question you often ask? If you are preparing for interviews, which topic on your resume is hardest to explain from scratch?</p>
      </div>
    </article>
  )
}
