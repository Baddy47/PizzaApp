import {useContext, useState} from 'react';
import classes from './LoadParty.module.css';
import {AppContext} from "../../App";
import axios from "axios";

const LoadParty = ({totalPrice}) => {

    const [load, setLoad] = useState('')
    const {setGuests, setAllGuests, setCurrency} = useContext(AppContext)

    const getGuests = (e) => {

        let btn = e.target
        btn.innerText = 'Party Go'
        btn.style.cursor = 'auto'
        btn.style.backgroundColor = '#3198f8'
        btn.setAttribute("disabled", true)

        axios.get("https://gp-js-test.herokuapp.com/pizza/guests")
            .then(result => {
                let eatsGuests = result.data.party.filter((item) => {
                    return item.eatsPizza === true
                })
                if (!localStorage.getItem('allGuest')) localStorage.setItem('allGuest', JSON.stringify(result.data.party))
                if (localStorage.getItem('allGuest')) {
                    setAllGuests(JSON.parse(localStorage.getItem('allGuest')))
                }
                if (!localStorage.getItem('eatsGuest')) localStorage.setItem('eatsGuest', JSON.stringify(eatsGuests))
                if (localStorage.getItem('eatsGuest')) setGuests(JSON.parse(localStorage.getItem('eatsGuest')))
            })
        setLoad('...waiting')
    }

    const onClear = (e) => {
        let btnClear = e.target
        let btnStart = btnClear.previousSibling
        btnStart.innerText = 'Load Party'
        btnStart.style.cursor = 'pointer'
        btnStart.style.backgroundColor = 'red'
        btnStart.removeAttribute('disabled')
        setCurrency('')
        setLoad('')
        localStorage.clear()
    }

    return (
        <>
            <div className={classes.btnContainer}>
                <button className={classes.btnStart} onClick={(e) => {
                    getGuests(e)
                }}>
                    Load Party
                </button>
                {!totalPrice && load && <span>{load}</span>}
                {!load && <span>👈 Start the Party</span>}
                {totalPrice > 0 && <button onClick={(e) => {
                    onClear(e)
                }} className={classes.btnCancel}>Party Stop</button>}
            </div>
        </>
    )
}

export default LoadParty