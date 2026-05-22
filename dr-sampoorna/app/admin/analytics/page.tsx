"use client";

export default function AdminAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-4xl">Analytics</h1>
        <p className="font-accent italic opacity-80 mt-2">Google Analytics 4 · embedded dashboard</p>
      </header>

      <section className="bg-forest text-creme-warm p-8 grain relative overflow-hidden">
        <p className="font-accent italic text-gold uppercase tracking-widest text-xs">Connection</p>
        <p className="font-serif text-2xl mt-2">
          {measurementId ? `Connected · ${measurementId}` : "Not yet configured"}
        </p>
        <p className="text-sm opacity-90 mt-3 max-w-2xl">
          The Firebase Analytics SDK auto-initialises with your project. To see a fully embedded
          live dashboard here, build a Looker Studio report from your GA4 property and embed its
          public iframe URL below.
        </p>
      </section>

      {/* Looker Studio embed slot */}
      <section className="bg-creme dark:bg-forest border border-[var(--line)] p-6">
        <p className="font-accent italic text-gold uppercase tracking-widest text-xs mb-3">Looker Studio</p>
        <div className="aspect-video w-full bg-[var(--line)] grain flex items-center justify-center text-sm font-accent italic opacity-70">
          Paste your Looker Studio embed iframe in <code>app/admin/analytics/page.tsx</code>
        </div>
      </section>

      {/* Quick links to GA4 reports */}
      <section className="grid md:grid-cols-2 gap-4">
        <a className="bg-creme dark:bg-forest p-5 border border-[var(--line)] hover:-translate-y-1 transition-transform" target="_blank" rel="noopener noreferrer" href="https://analytics.google.com/">
          <p className="font-serif text-xl">Open GA4</p>
          <p className="text-xs opacity-70 mt-1">Realtime, audiences, funnels</p>
        </a>
        <a className="bg-creme dark:bg-forest p-5 border border-[var(--line)] hover:-translate-y-1 transition-transform" target="_blank" rel="noopener noreferrer" href="https://search.google.com/search-console">
          <p className="font-serif text-xl">Search Console</p>
          <p className="text-xs opacity-70 mt-1">SEO performance and indexing</p>
        </a>
      </section>
    </div>
  );
}
