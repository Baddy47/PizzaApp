import classes from './PizzaSlice.module.css';

const PizzaSlice = ({guests, totalPrice}) => {

    let counterGuests = guests.length
    let deg = 360 / counterGuests

    let slice = guests.map((item, index) => {
        let countSlice = index + 1
        return (
            <div
                key={index}
                className={classes.pizza__slice}
                style={{transform: `rotate(${deg * countSlice}deg)`}}
            />
        )
    })

    if (counterGuests > 0 && totalPrice) {
        return (
            <>
                <div className={classes.container}>
                    <div className={classes.container__wrapper}>
                        <h3>Pizza for {counterGuests} friends</h3>
                        <div className={classes.pizza}>{slice}</div>
                    </div>
                </div>
            </>
        )
    }
    return <></>
}

export default PizzaSlice