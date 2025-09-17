import { NextRequest, NextResponse } from "next/server";
import { client } from "@/app/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, name, email, comment } = body;

    if (!postId || !name || !email || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newComment = await client.create({
      _type: "comment",
      post: { _type: "reference", _ref: postId },
      name,
      email,
      comment,
      approved: true, // set false if you want manual approval
    });

    // ✅ Return the full created comment
    return NextResponse.json(newComment, { status: 201 });
  } catch (err) {
    console.error("Create Comment API error:", err);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
