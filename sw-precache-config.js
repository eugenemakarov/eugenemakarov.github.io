module.exports = {
  staticFileGlobs: [
    "./*.html",
    "./assets/*.{jpg, svg, gif, png}"
  ],
  runtimeCaching: [{
    urlPattern: /jsonplaceholder\.typicode\.com\/users/,
    handler: "cacheFirst"
  },{
    urlPattern: /jsonplaceholder\.typicode\.com\/posts/,
    handler: "networkOnly"
  }]
}