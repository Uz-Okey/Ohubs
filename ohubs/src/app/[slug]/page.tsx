

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../sanity/client";


import Link from "next/link";
import Image from "next/image";
import type { SanityDocument } from "next-sanity";
import CommentList from "@/Pages/CommentList";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  body,
  mainImage,
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

// Define PortableText components with correct typing
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.width(800).url();
      if (!imageUrl) return null;

      return (
        <Image
          src={imageUrl}
          alt={value.alt || "Blog image"}
          width={800}
          height={450}
          className="rounded-lg my-4"
        />
      );
    },
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(750).height(310).url()
    : null;


  return (
    <main className="container border my-10 rounded-2xl bg-gray-100 shadow-2xl mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>

      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width={750}
          height={310}
        />
      )}

      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>

        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={components} />
        )}
      </div>

  

      <CommentList 
      postId={post._id} 
      />

    </main>
  );
}
