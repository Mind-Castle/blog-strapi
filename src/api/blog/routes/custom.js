module.exports = {
  routes: [
    {
      method: "GET",
      path: "/custom",
      handler: "blog.customAction",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/getBlogBySlug/:slug",
      handler: "blog.blogbyslug",
      config: { auth: false },
    },
  ],
};
