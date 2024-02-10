import Link from "next/link";
import LogoImg from "@/assets/logo.png";
import classes from "./meain-header.module.css";
import Image from "next/image";
import NavLink from "./nav-link";
const MainHeader = () => {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <Image
          src={LogoImg.src}
          alt="NextLevel Food"
          width={300}
          height={300}
          priority
        />
        <h4>NextLevel Food</h4>
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>
          <li>
            <NavLink href="/community">Foodies Community</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
