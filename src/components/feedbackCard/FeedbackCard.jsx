import classes from './FeedbackCard.module.css';
import {useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const FeedbackCard = () => {
    const redirect = useNavigate()
    let feedback = JSON.parse(localStorage.getItem('feedback'))
    const [dataReviews, setDataReviews] = useState(feedback)
    localStorage.setItem('feedback', JSON.stringify(dataReviews))
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm({mode: "onBlur"})

    const onSubmit = (data) => {
        data.name = ''
        setDataReviews([...dataReviews, data])
        reset()
        redirect('/reviews')
    }

    return (
        <div className={classes.cardContainer}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.cardForm}>
                <label>
                    Name
                    <div className={classes.cardForm__itemName}>Andrei</div>
                    <input {...register('rating', {
                        required: 'Fill in the field',
                        maxLength: {
                            value: 5,
                            message: 'Max 5 Stars'
                        },
                        minLength: {
                            value: 1,
                            message: 'Min 1 Stars'
                        }
                        }
                    )}/>
                </label>
                <div style={{height: 10, color: 'red'}}>{errors.rating && <div>{errors.rating.message}</div>}</div>
                <label>
                    Phone <br/>
                    <input {...register('phone', {
                        required: 'Fill in the field',
                        pattern: {
                            value: /\s*\+?375((33\d{7})|(29\d{7})|(44\d{7}|)|(25\d{7}))\s*$/,
                            message: 'Enter a valid phone number'
                        }
                    })}/>
                </label>
                <div style={{height: 10, color: 'red'}}>{errors.phone && <div>{errors.phone.message}</div>}</div>
                <label>
                    Comment <br/>
                    <textarea {...register('text', {
                        required: true
                    })} rows={5}/>
                </label>
                <div style={{height: 10, color: 'red'}}>{errors.text && <div>Error!</div>}</div>
                {!isValid && <button><NavLink to={'/reviews'}>Cancel</NavLink> </button>}
                {isValid && <input type="submit" value={'Save'}/>}
            </form>
        </div>
    )
}

export default FeedbackCard;