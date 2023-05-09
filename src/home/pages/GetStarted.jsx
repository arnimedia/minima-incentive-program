import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function GetStarted() {
    const navigate = useNavigate()

    function onHandleClickAndroid() {
        navigate('../home/pages/get-started-android')
    }
    function onHandleClickWindows() {
        navigate('../home/pages/get-started-windows')
    }
    function onHandleClickMac() {
        navigate('../home/pages/get-started-mac')
    }
    function onHandleClickLinux() {
        navigate('../home/pages/get-started-linux')
    }
    function onHandleClickVPS() {
        navigate('../home/pages/get-started-linuxvps')
    }

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <h3 className="card-header">Get Started</h3>
            <div className="card-body">
                <p>
                Choose your device from the list below<br /> and follow the instructions for set-up.
                </p>
                <div className="form-row">
                    <div className='form-group'>
                        <button onClick={onHandleClickAndroid} className="btn btn-outline-dark mt-4 mb-4">
                        Android 
                        </button>
                        <button onClick={onHandleClickWindows} className="btn btn-outline-dark mb-4">
                        Windows
                        </button>
                        <button onClick={onHandleClickMac} className="btn btn-outline-dark mb-4">
                        Mac
                        </button>
                        <button onClick={onHandleClickLinux} className="btn btn-outline-dark mb-4">
                        Linux Desktop 
                        </button>
                        <button onClick={onHandleClickVPS} className="btn btn-outline-dark mb-4">
                        Linux VPS/Raspberry Pi
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export { GetStarted }
