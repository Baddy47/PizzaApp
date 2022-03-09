import "./App.css";
import PizzaSlice from "./components/pizzaSlice/PizzaSlice.jsx";
import LoadParty from "./components/loadParty/LoadParty.jsx";
import TotalTable from "./components/totalTable/TotalTable.jsx";
import Reviews from "./components/reviews/Reviews.jsx";
import NavBar from './components/navBar/NavBar.jsx';
import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";
import axios from "axios";
import FeedbackCard from "./components/feedbackCard/FeedbackCard";


export const AppContext = React.createContext();

const App = () => {

    const [allGuests, setAllGuests] = useState([])
    const [guests, setGuests] = useState([])
    const [counterVegan, setCounterVegan] = useState([])
    const [exchange, setExchange] = useState({})
    const [currency, setCurrency] = useState('')
    const [pizzaCost, setPizzaCost] = useState()

    let vegans = counterVegan.map((item, index) => {
        return {
            name: item.name,
            eatsPizza: true,
            isVegan: item.isVegan
        }
    })
    let arr = {...allGuests, ...vegans}
    let arr2 = Object.entries(arr)
    let listGuest = arr2.map((index) => {
        return {
            id: index[0],
            name: index[1].name,
            eatsPizza: index[1].eatsPizza,
            isVegan: index[1].isVegan || false
        }
    })
    //----------------------------------------------
    const selectTypePizza = () => {
        if (counterVegan.length > (guests.length - counterVegan.length)) return 'vegan'
        if (counterVegan.length < (guests.length - counterVegan.length)) return 'meat'
    }
    let typePizza = selectTypePizza()
    //----------------------------------------------
    const conversion = () => {
        if (currency === "BYN") return pizzaCost
        if (currency === "USD") return pizzaCost * exchange.USD
        if (currency === "EUR") return pizzaCost * exchange.EUR
    }
    let price = conversion()
    const gaussRound = (num, decimalPlaces) => {
        let d = decimalPlaces || 0,
            m = Math.pow(10, d),
            n = +(d ? num * m : num).toFixed(8),
            i = Math.floor(n),
            f = n - i,
            e = 1e-8,
            r =
                f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n)
        return d ? r / m : r;
    }
    let totalPrice = gaussRound(price, 1)
    //----------------------------------------------
    useEffect(() => {

        if (guests.length > 0) {
            let name = guests.map((item) => item.name)
            axios.get(`https://gp-js-test.herokuapp.com/pizza/world-diets-book/${name}`)
                .then(result => {
                    let vegan = result.data.diet.filter((item) => {
                        return item.isVegan === true
                    })
                    if (!localStorage.getItem('veganGuest')) localStorage.setItem('veganGuest', JSON.stringify(vegan))
                    if (localStorage.getItem('veganGuest')) {
                        setCounterVegan(JSON.parse(localStorage.getItem('veganGuest')))
                    }
                })
        }

        if (typePizza) {
            axios.get(`https://gp-js-test.herokuapp.com/pizza/order/${typePizza}/${guests.length}`)
                .then(result => {
                    setCurrency(result.data.price.replace(/[^a-zа-яё]/gi, ""))
                    setPizzaCost(+parseFloat(result.data.price).toFixed(1))
                });
            axios.get(`https://gp-js-test.herokuapp.com/pizza/currency`)
                .then(result => setExchange(result.data))
        }
        conversion()
    }, [guests, setGuests, setCounterVegan, typePizza])

    return (
        <div className="App">
            <div className="title">Pizza App</div>
            <div>
                <AppContext.Provider value={{ guests, setGuests, setCounterVegan, allGuests, setAllGuests, setCurrency }}>
                    <LoadParty totalPrice={totalPrice} guests={guests} />
                    <NavBar />
                    <div className="content">
                        <Routes>
                            <Route path='/reviews' element={<Reviews totalPrice={totalPrice} listGuest={listGuest} />} />
                            <Route path='/feedback' element={<FeedbackCard />} />
                            <Route path='/order' element={<TotalTable totalPrice={totalPrice} guests={guests} />} />
                            <Route path='/slice' element={<PizzaSlice guests={guests} totalPrice={totalPrice} />} />
                        </Routes>
                    </div>
                </AppContext.Provider>
            </div>
        </div>
    )
}

export default App