module.exports = {
  customUrlMode: false,
  devMode:
    process.env.ELEVENTY_RUN_MODE === "watch" ||
    process.env.ELEVENTY_RUN_MODE === "serve",
};
