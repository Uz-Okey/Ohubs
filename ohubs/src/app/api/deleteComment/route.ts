import { NextRequest, NextResponse } from "next/server";
import { client } from "@/app/sanity/client";

export async function POST(req: NextRequest) {
  try {
    const { commentId } = await req.json();

    if (!commentId) {
      return NextResponse.json({ error: "No commentId provided" }, { status: 400 });
    }

    await client.delete(commentId); // Delete comment by ID

    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
  } catch (err) {
    console.error("Delete Comment API error:", err);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
