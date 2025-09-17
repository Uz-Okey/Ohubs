import { NextRequest, NextResponse } from "next/server";
import { client } from "@/app/sanity/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) return NextResponse.json([], { status: 400 });

    const query = `*[_type == "comment" && post._ref == $postId && approved == true] 
      | order(_createdAt desc){
        _id,
        name,
        comment,
        email
      }`;

    const comments = await client.fetch(query, { postId });
    return NextResponse.json(comments);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
