import { defineType, defineField } from "sanity";

export const paginationViewType = defineType({
  name: "paginationView",
  title: "Pagination View",
  type: "document",
  fields: [
    defineField({
      name: "postViewNumberPerPage",
      type: "number",
      title: "Number of posts per page",
      description:
        "Set how many posts to display per page in the pagination view.",
      validation: (rule) => rule.required().integer().min(1).max(100),
    }),
  ],
});
