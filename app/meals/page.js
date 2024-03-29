import MealsGrid from "@/components/meals/meals-grid";
import classes from "./page.module.css";
import Link from "next/link";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export const metadata = {
  title: "All Meals",
  description: "Browse the Delicious Meals Shared by Our Community.",
};

const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
};
// We can use async functions to fetch data from an API or database and then render the page with the fetched data.
// We cannot do this in react
const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>

        <p>
          Choose your favorite meal and enjoy a delicious lunch or dinner at
          home.
        </p>

        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching Meals</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};
export default MealsPage;
