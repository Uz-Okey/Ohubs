import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import Image from "next/image";
import { client } from "./sanity/client";
import { urlFor } from "./sanity/image"; // make sure this file exists
import HeroSection from "@/Pages/HeroSection";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  mainImage,
  title,
  slug,
  author->{name, image, bio},
  publishedAt
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main>
      <HeroSection />

      <h1 className="text-4xl  font-serif my-6 font-bold text-center ">Posts</h1>

      <ul className="grid sm:grid-cols-3 max-w-4xl space-x-5 p-8 mx-auto gap-y-8">
        {posts.map((post) => {
          const authorImageUrl = post.author?.image
            ? urlFor(post.author.image)?.width(50).height(50).url()
            : null;

          const postImageUrl = post.mainImage
            ? urlFor(post.mainImage)?.width(850).height(900).url()
            : null;

          return (
            <li key={post._id} className=" shadow-2xl border p-4 rounded-2xl border-blue-950 border-b pb-4">

              <div className="flex flex-col gap-3">

                <div className="overflow-hidden rounded-lg">
                  {postImageUrl && (
                    <Image
                      src={postImageUrl}
                      alt={post.title}
                      width={750}
                      height={510}
                      className="rounded-lg hover:scale-105 hover:grayscale duration-700 transition-all ease-in-out cursor-pointer mt-2"
                    />
                  )}
                </div>


                <h2 className="text-xl text-blue-900 font-semibold">{post.title}</h2>

                <div className="flex items-center gap-2">
                  {authorImageUrl && (
                    <Image
                      src={authorImageUrl}
                      alt={post.author?.name || "Author"}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                  <p className="font-medium text-gray-800">{post.author?.name}</p>
                </div>

                <p className="text-gray-500 text-sm">
                  Published: {new Date(post.publishedAt).toLocaleDateString()}
                </p>


              </div>
              <Link href={`/${post.slug.current}`} >
                <p className="w-[100px] text-center my-2 px-2 text-white bg-blue-800 rounded-2xl py-1 shadow-2xl hover:scale-105 transition-all duration-500 ease-in-out text-[14px]">Read more...</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
