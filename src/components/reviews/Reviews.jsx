import {NavLink} from "react-router-dom";
import classes from './Reviews.module.css';

const Reviews = ({totalPrice, listGuest}) => {

    if (totalPrice)
        return (
            <>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>How to render guest</th>
                            <th>Why?</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listGuest.map((item, index) => {

                        return (
                            <tr key={index}>
                                {item.isVegan === true && <td className={classes.table__item_vegan} style={{color: 'green'}}><NavLink to={'/feedback'} >{item.name}</NavLink></td>}
                                {item.eatsPizza === false && <td className={classes.table__item_noEats} style={{color: 'gray'}}>{item.name}(not clickable)</td>}
                                {item.eatsPizza === true && item.isVegan === false && <td><NavLink to={'/feedback'}>{item.name}</NavLink></td>}
                                {item.eatsPizza === false && <td>Guest who did not eat pizza</td>}
                                {item.isVegan === true && <td>Vegan guest who ate pizza (haven't filled the feedback yet)</td>}
                                {item.eatsPizza === true && item.isVegan === false && <td>Guest who ate pizza (haven't filled the feedback yet)</td>}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </>
        )
    return <></>;
}

export default Reviews;