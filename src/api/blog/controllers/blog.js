"use strict";

/**
 * blog controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::blog.blog", ({ strapi }) => ({
  async customAction(ctx) {
    try {
      ctx.body = "ok";
    } catch (error) {
      ctx.body = error;
    }
  },
  async blogbyslug(ctx) {
    const { slug } = ctx.request.params;

    // Calling the default core action
    const entries = await strapi.entityService.findMany("api::blog.blog", {
      fields: ["title"],
      filters: { slug: "yajat-blog" },
      populate: { categories: true },
    });
    return { entries };
  },
}));
