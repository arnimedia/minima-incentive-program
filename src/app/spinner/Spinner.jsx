import React from 'react'
import { useSelector } from 'react-redux'
import { selectSpinning } from './spinner.slice'

function Spinner() {
    const visible = useSelector(selectSpinning)

    const spinnerStyle = {
        position: 'absolute',
        left: '50%',
        top: '30%',
    }

    const parentDisable = {
        position: 'fixed',
        top: '0',
        left: '0',
        background: '#666',
        opacity: '0.3',
        zIndex: '998',
        height: '100%',
        width: '100%',
    }

    const mySpinner = () => (
        <div style={parentDisable}>
            <div style={spinnerStyle} className="d-flex justify-content-center">
                <div className="spinner-border" role="status"></div>
            </div>
        </div>
    )

    if (visible) {
        return mySpinner()
    } else {
        return <></>
    }
}

export default Spinner
