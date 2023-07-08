import { useRef, useState } from 'react';
import classes from './CheckOut.module.css'

const isEmpty = value => value.trim() === '';
const isPhone = value => value.trim().length === 10;

const CheckOut = props => {

    const [formInputsValidate, setFormInputsValidate] = useState({
        name: true,
        street: true,
        phone: true,
        city: true,
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const phoneInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPhoneIsValid = isPhone(enteredPhone)

        setFormInputsValidate({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            phone: enteredPhoneIsValid,
            city: enteredCityIsValid,
        })

        const formIsValid = enteredCityIsValid && enteredNameIsValid && enteredStreetIsValid && enteredPhoneIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            phone: enteredPhone,
            city: enteredCity
        })

    }

    const nameClasses = `${classes.control} ${formInputsValidate.name ? '' : classes.invalid}`
    const streetClasses = `${classes.control} ${formInputsValidate.street ? '' : classes.invalid}`
    const phoneClasses = `${classes.control} ${formInputsValidate.phone ? '' : classes.invalid}`
    const cityClasses = `${classes.control} ${formInputsValidate.city ? '' : classes.invalid}`

    return (
        <form onSubmit={confirmHandler} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidate.name && <p>Please enter a valid name. </p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'>Address</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidate.street && <p>Please enter a valid street. </p>}
            </div>
            <div className={phoneClasses}>
                <label htmlFor='phone'>Phone No</label>
                <input type='text' id='phone' ref={phoneInputRef} />
                {!formInputsValidate.phone && <p>Please enter 10 digit phone number. </p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidate.city && <p>Please enter a valid city. </p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}
export default CheckOut;