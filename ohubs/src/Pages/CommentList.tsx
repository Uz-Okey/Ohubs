"use client";

import React, { useEffect, useState } from "react";

interface Comment {
  _id?: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  postId: string;
}

export default function CommentFormAndList({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ name: "", email: "", comment: "" });

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments?postId=${postId}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    };
    fetchComments();
  }, [postId]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/createComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, postId }),
      });

      if (res.ok) {
        const savedComment = await res.json();
        // Show new comment instantly
        setComments([savedComment, ...comments]);
        // Reset form
        setForm({ name: "", email: "", comment: "" });
      }
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-3">Comments</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email"
          className="border p-2 mb-2 w-full"
          required
        />
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          placeholder="Your comment"
          className="border p-2 mb-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((c, index) => (
          <div
            key={c._id || index} // ✅ React key fixed
            className="border-b border-gray-300 py-2"
          >
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm text-gray-700">{c.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}
