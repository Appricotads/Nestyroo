module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/js");

  // Blog collection, newest first
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Filter: format a date nicely
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
  // Filter: posts that carry a given tag
  eleventyConfig.addFilter("byTag", (posts, tag) =>
    posts.filter((p) => (p.data.tags || []).includes(tag))
  );
  // Filter: limit an array to N items
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // Global: current year for footer copyright
  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
