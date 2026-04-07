/* one-off: npm install from this directory (avoids shell cd to Unicode path) */
const { execSync } = require("child_process");
const path = require("path");
execSync("npm install", {
  cwd: __dirname,
  stdio: "inherit",
  shell: true,
});
