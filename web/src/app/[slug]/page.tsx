import { PortableText, defineQuery } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/client";

const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{ _id, title, body }`
);

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug }, options);

  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <Link className="text-sm text-neutral-500 hover:underline" href="/">
        ← Back to posts
      </Link>
      <article className="prose mt-6">
        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
        {post.body && <PortableText value={post.body} />}
      </article>
    </main>
  );
}
