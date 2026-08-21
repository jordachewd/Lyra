import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Link from "next/link";

const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_createdAt desc){ _id, title, slug }`
);

const options = { next: { revalidate: 30 } };

export default async function PostsPage() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Posts</h1>
      {posts.length === 0 && (
        <p className="text-neutral-500">
          No posts yet. Add one in the Sanity Studio and publish it.
        </p>
      )}
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post._id}>
            <Link
              className="text-lg underline underline-offset-4 hover:no-underline"
              href={`/${post.slug?.current}`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
