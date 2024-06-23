/**
 * Because Angular utilises an environment.ts file, we must somehow retrieve this during our CI pipeline.
 * Suggested way is to retrieve this at runtime via a network request or inject it at build-time via modified WebPack configurations.
 *
 * However, this would mean we would have to make each item in the Firebase secret its own variable and reconstruct the firebase context object again at build-time.
 * The alternative solution is to make the entire file a single environment variable and inject it during builds.
 * This better preserves the atomicity of the Firebase secret and was a cleaner solution for this specific project.
 *
 * Code adapted from https://nidri.medium.com/angular-environment-ts-with-github-actions-4d86b7963a6c
 */

const fs = require("fs");
const path = require("path");

const dir = "src/environments";
const ENV_FILE_NAME = "environment.ts";

const content = `${process.env.FIREBASE_DETAILS}`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    // Directory doesn't exist
    console.log("src doesn't exist, creating now", process.cwd());
    // Create /src
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (error) {
      console.log(`Error while creating ${dir}. Error is ${error}`);
      process.exit(1);
    }
  }
  // Now write to file
  try {
    fs.writeFileSync(dir + "/" + ENV_FILE_NAME, content);
    console.log("Created successfully in", process.cwd());
    if (fs.existsSync(dir + "/" + ENV_FILE_NAME)) {
      console.log("File is created", path.resolve(dir + "/" + ENV_FILE_NAME));
      const str = fs.readFileSync(dir + "/" + ENV_FILE_NAME).toString();
      console.log(str);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
