import { defineField, defineType } from "sanity";

export default defineType({
  name: "comment",   // used in queries
  title: "Comment",  // shows in Studio
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text", // text is better than string (supports longer content)
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }], // connects comment to a blog post
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Only show approved comments on the site",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      name: "name",
      comment: "comment",
      post: "post.title",
    },
    prepare({ name, comment, post }) {
      return {
        title: `${name} on ${post}`,
        subtitle: comment,
      };
    },
  },
});
