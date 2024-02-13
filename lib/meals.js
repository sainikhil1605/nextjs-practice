import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
const db = sql("meals.db");

export async function getMeals() {
  //   throw new Error("Not implemented");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug= ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.safeInstructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;
  const path = `public/images/${filename}`;

  const stream = fs.createWriteStream(path);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(
    Buffer.from(bufferedImage, (error) => {
      if (error) {
        throw new Error("Error saving image");
      }
    })
  );
  meal.image = `/images/${filename}`;

  db.prepare(
    "INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (@title, @summary, @instructions, @image, @creator, @creator_email, @slug)"
  ).run(meal);
}
