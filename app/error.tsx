"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="page-narrow">
      <section className="card setup-error stack">
        <span className="eyebrow">Something went wrong</span>
        <h1 style={{ fontSize: "2.4rem" }}>The trip could not be loaded.</h1>
        <p className="muted">Your previous valid state has not been intentionally changed. Check the database connection or retry the request.</p>
        <div><button onClick={reset}>Try again</button></div>
      </section>
    </main>
  );
}
