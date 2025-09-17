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

  // Handle form submission
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
        setComments([savedComment, ...comments]); // Show instantly
        setForm({ name: "", email: "", comment: "" }); // Reset form
      }
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  // Handle delete comment
  const handleDelete = async (commentId: string) => {
    try {
      const res = await fetch("/api/deleteComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId }),
      });

      if (res.ok) {
        setComments(comments.filter((c) => c._id !== commentId)); // Remove from state
      }
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-3">Comments</h3>

      {/* Form */}
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

      {/* Comments List */}
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((c) => (
          <div
            key={c._id}
            className="border-b border-gray-300 py-2 flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-sm text-gray-700">{c.comment}</p>
            </div>
            <button
              onClick={() => handleDelete(c._id!)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
