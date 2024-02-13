import { notFound, useParams } from "next/navigation";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}
const MealDetailsPage = async ({ params }) => {
  const { mealSlug } = params;

  const meal = getMeal(mealSlug);
  if (!meal) {
    // Calling the notfound function from next
    notFound();
  }
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={meal.image} alt={meal.title} />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions.replace(/\n/g, "<br>"),
          }}
        ></p>
      </main>
    </>
  );
};
export default MealDetailsPage;
