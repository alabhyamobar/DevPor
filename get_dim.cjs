const fs = require('fs');
try {
  const sizeOf = require('image-size');
  const dimensions = sizeOf('public/frames/webp50/frame_0485.webp');
  console.log(dimensions.width, dimensions.height);
} catch (e) {
  console.log("image-size not installed");
}
