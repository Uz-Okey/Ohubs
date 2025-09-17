import { NextRequest, NextResponse } from "next/server";
import { client } from "@/app/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const doc = {
      _type: "comment",
      name: data.name,
      email: data.email,
      comment: data.comment,
      post: { _type: "reference", _ref: data.postId },
      approved: true, // auto-approved for demo
    };

    const created = await client.create(doc);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
