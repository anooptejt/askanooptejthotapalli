"use client"

import { useEffect, useRef, useState } from "react"
import { Heart } from "lucide-react"
import { basePath } from "@/lib/site"

type LikeState = { count: number; liked: boolean }
const visitorKey = "ask-anoop-article-like-visitor-v1"

export function ArticleLike({ article }: { article: string }) {
  const [value, setValue] = useState<LikeState | null>(null)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const endpoint = useRef("")
  const visitor = useRef("")
  const inFlight = useRef(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        let id = localStorage.getItem(visitorKey)
        if (!id) { id = crypto.randomUUID(); localStorage.setItem(visitorKey, id) }
        visitor.current = id
        const configResponse = await fetch(`${basePath}/relay-config.json`, { cache: "no-store", signal: AbortSignal.timeout(10000) })
        if (!configResponse.ok) throw Error()
        const config = await configResponse.json()
        const url = new URL(config.gateway)
        if (url.protocol !== "https:" || url.pathname !== "/" || url.username || url.password || url.search || url.hash) throw Error()
        endpoint.current = url.origin
        const params = new URLSearchParams({ article, visitor: id })
        const response = await fetch(`${url.origin}/v1/likes?${params}`, { cache: "no-store", signal: AbortSignal.timeout(10000) })
        if (!response.ok) throw Error()
        const result: LikeState = await response.json()
        if (!Number.isSafeInteger(result.count) || result.count < 0 || typeof result.liked !== "boolean") throw Error()
        if (!cancelled) { setValue(result); setError("") }
      } catch {
        if (!cancelled) setError("Likes are temporarily unavailable.")
      }
    }
    void load()
    return () => { cancelled = true }
  }, [article])

  async function toggle() {
    if (!value || inFlight.current) return
    inFlight.current = true; setBusy(true); setError("")
    try {
      const response = await fetch(`${endpoint.current}/v1/likes`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article, visitor: visitor.current, liked: !value.liked }),
        signal: AbortSignal.timeout(10000),
      })
      if (!response.ok) throw Error()
      const result: LikeState = await response.json()
      if (!Number.isSafeInteger(result.count) || result.count < 0 || typeof result.liked !== "boolean") throw Error()
      setValue(result)
    } catch { setError("Could not update your like. Please try again.") }
    finally { inFlight.current = false; setBusy(false) }
  }

  return <div className="mt-10 border-t border-border pt-6">
    <button type="button" onClick={() => void toggle()} disabled={!value || busy} aria-pressed={value?.liked ?? false}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60">
      <Heart aria-hidden="true" className="size-5" fill={value?.liked ? "currentColor" : "none"} />
      <span>{value?.liked ? "Liked" : "Like this article"}</span>
      {value && <span aria-label={`${value.count} ${value.count === 1 ? "like" : "likes"}`}>· {value.count}</span>}
    </button>
    <p className="mt-2 text-sm text-muted-foreground" role="status">{error}</p>
  </div>
}
