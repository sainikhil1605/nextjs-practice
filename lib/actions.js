"use server";

import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
const isInvalidText = (text) => {
  return !text || text.trim() === "";
};
// Add async to convert the fucntion to server side
const shareMeal = async (prevState, formData) => {
  // This function will be executed on the server

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    !meal.image ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@")
  ) {
    return {
      message: "Invalid input",
    };
  }
  //   console.log(meal);
  await saveMeal(meal);
  // This will revalidate or refresh the page to show the new meal
  revalidatePath("/meals", "layout");
  redirect("/meals");
};

export { shareMeal };
