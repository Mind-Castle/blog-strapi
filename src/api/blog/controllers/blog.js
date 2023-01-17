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
    let data = {
      blogtitle: "",
      blogcontent: ``,
      authorname: "",
      authorabout: "",
      authordp: "",
      publishdate: "",
      categories: [],
      coverpic: "",
      authordesignation: "",
    };

    // Calling the default core action
    const entries = await strapi.entityService.findMany("api::blog.blog", {
      fields: ["title", "blogcontent", "createdAt"],
      filters: { slug },
      populate: {
        categories: true,
        coverpic: true,
        author: {
          populate: {
            authordp: true,
          },
        },
      },
    });
    if (entries && entries.length > 0) {
      data.categories = entries[0].categories.map((item) => item.category);
      data.authorabout = entries[0].author.authorabout;
      data.authorname = entries[0].author.authorname;
      data.blogtitle = entries[0].title;
      data.blogcontent = entries[0].blogcontent;
      data.authordesignation = entries[0].author.authordesignation;
      data.authordp = entries[0].author.authordp.url;
      data.publishdate = entries[0].createdAt;
      if (entries[0].coverpic) {
        data.coverpic = entries[0].coverpic;
      }
      return { ...data };
    } else {
      return null;
    }
  },
  async allblogs() {
    let data = []
    const entries = await strapi.entityService.findMany("api::blog.blog", {
      fields: ["title", "blogcontent", "createdAt","slug"],
      populate: {
        categories: true,
        coverpic: true,
        author: {
          populate: {
            authordp: true,
          },
        },
      },
    });

    if (entries && entries.length > 0) {
      for (let i = 0; i< entries.length; i++)
      {
        let k = {}
        k["categories"] = []
        k.categories = entries[i].categories.map((item) => item.category);
        k.authorabout = entries[i].author.authorabout;
        k.authorname = entries[i].author.authorname;
        k.title = entries[i].title;
        k.blogid = entries[i].slug;
        k.blogcontent = entries[i].blogcontent;
        k.authordesignation = entries[i].author.authordesignation;
        k.authordp = entries[i].author.authordp.url;
        k.publishdate = entries[i].createdAt;
        if (entries[i].coverpic) {
          k.coverimage = entries[i].coverpic.url;
        }
        data.push(k)
      }

      return { data };
    } else {
      return null;
    }
  },
}));
