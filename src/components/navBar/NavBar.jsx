import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";

const NavBar = () => {

    let classActive = (data) => (data.isActive ? classes.active : classes.item)

    return (
        <nav className={classes.nav__section}>
            <ul className={classes.nav__list}>
                <li>
                    <NavLink to="/reviews" className={classActive}>
                        Guest Reviews
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/order" className={classActive}>
                        Pizza Order
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/slice" className={classActive}>
                        Pizza Slice
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar