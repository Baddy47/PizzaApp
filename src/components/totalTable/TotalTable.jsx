import {useEffect, useRef, useState} from 'react';
import classes from './TotalTable.module.css';

const TotalTable = ({totalPrice, guests}) => {

    let payGuest = totalPrice / guests.length

    const tableBody = useRef();
    const [pay, setPay] =useState(0)
    const [payTo, setPayTo] =useState(0)

    const payButton = (e) => {
        let btn = e.target
        btn.innerText = "Paid"
        btn.setAttribute("disabled", true)
        btn.style.cssText = `
            cursor: auto;
            border: 2px solid #95F900;
            box-shadow: 2px 2px 10px transparent;
        `
        setPay(pay + payGuest)
        setPayTo(payTo - payGuest)
        let itemBtn = btn.closest("td")
        let itemPay = itemBtn.previousSibling
        itemPay.innerText = "0 BYN"
    }

    useEffect(() => {
        if (totalPrice) setPayTo(totalPrice)
    }, [totalPrice, guests])

    if (payGuest)
        return (
            <>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Share to pay</th>
                        <th>Pay</th>
                    </tr>
                    </thead>
                    <tbody>
                    {guests.map((item, index) => {
                        return (
                            <tr ref={tableBody} key={index}>
                                <td>{item.name}</td>
                                <td>{payGuest.toFixed(1) + " BYN"}</td>
                                <td className={classes.table__button}>
                                    <button
                                        onClick={(e) => {
                                            payButton(e)
                                        }}
                                    >
                                        Pay
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>Total order</td>
                        <td>{totalPrice ? totalPrice + " BYN" : 0 + " BYN"}</td>
                        <td/>
                    </tr>
                    <tr>
                        <td>Money to collect</td>
                        <td>{payTo.toFixed(1) + " BYN"}</td>
                        <td/>
                    </tr>
                    <tr>
                        <td>Money collected</td>
                        <td>{pay.toFixed(1) + " BYN"}</td>
                        <td/>
                    </tr>
                    </tfoot>
                </table>
            </>
        )
    else return <></>
}

export default TotalTable