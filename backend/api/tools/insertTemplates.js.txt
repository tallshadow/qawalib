// Instead of using import, use require
import { TemplateRepository } from "../repositories/TemplateRepository";

const fs = require("fs");
const path = require("path");

const templatePath =
  "/Users/adilhaouas/Desktop/dev/projects/katibok/عقود والتزامات"; // Update this path

fs.readdir(templatePath, (err, files) => {
  if (err) throw err;

  const repository = new TemplateRepository();

  files.forEach((file) => {
    const fullPath = path.join(templatePath, file);
    repository
      .createTemplate({
        name: file,
        category: "General", // Adjust as necessary
        templatePath: fullPath,
      })
      .then(() => {
        console.log(`Inserted ${file} into database.`);
      })
      .catch(console.error);
  });
});
