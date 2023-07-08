import { Fragment } from 'react'
import classes from './Modal.module.css'
import ReactDOM from 'react-dom'


const BackDrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

const ModalOverlay = props => {
    return <div className={classes.modal}>
        {props.children}
    </div>

}

const portalElement = document.getElementById('overlays')

const Modal = props => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )

};

export default Modal;