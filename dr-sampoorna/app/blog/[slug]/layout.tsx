import { BLOG_POSTS } from "@/lib/content";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
