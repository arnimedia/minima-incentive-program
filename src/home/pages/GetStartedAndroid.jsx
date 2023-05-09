import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNodeId, selectNodeId } from './../home.slice'


function GetStartedAndroid() {
    const dispatch = useDispatch()

    const nodeId = useSelector(selectNodeId)
    const [nodeIdCopied, setNodeIdCopied] = useState(false)
    const [showContentOne, setShowContentOne] = useState(true)
    const [showContentTwo, setShowContentTwo] = useState(false)

    useEffect(() => {
        dispatch(getNodeId())
        window.scrollTo(0, 0);
    }, [dispatch])

    function handleContentOne(){
        setShowContentOne(true)
        setShowContentTwo(false)
    }
    function handleContentTwo(){
        setShowContentOne(false)
        setShowContentTwo(true)
        window.scrollTo(0, 0);
    }

    function handleClick(){
      window.open("https://github.com/minima-global/Minima/raw/master/jar/minima-0.100.32.apk");
    }

    return (
        <>
            <h3 className="card-header">Android</h3>
            <div className="card-body">
                <div className="form-row">
                    <div className='form-group tab-row'>
                        <button type="submit" onClick={handleContentOne} className={`btn mb-4 ${showContentOne ? "btn-dark" : "btn-outline-dark"}`}>
                            Node Set-up
                        </button>
                        <button type="submit" onClick={handleContentTwo} className={`btn mb-4 ${showContentTwo ? "btn-dark" : "btn-outline-dark"}`}>
                            Incentive Set-up
                        </button>
                    </div>    
                </div>  
                <div className="form-row">
                    { showContentOne ? 
                        <div className='form-group'>
                            <h4>Steps</h4>
                                <p><span>1.</span>If you are viewing this on a desktop, navigate to your Android device and sign back in to incentive.minima.global</p>
                                <p><span>2.</span>Download the latest version of the Minima app using the button below.</p>
                                <p><span>3.</span>Press install and follow the on-screen instructions.</p>
                                <p><span>4.</span>Press the Next Step button below to set up your Incentive ID.</p>
                            <button onClick={handleClick} type="submit" className="btn btn-primary mb-4 mt-2">
                            Download Minima
                            </button>
                            <button type="submit" onClick={handleContentTwo} className="btn btn-outline-primary">
                            Next Step
                            </button>
                        </div> :  "" } 
                    { showContentTwo ?                       
                        <div className='form-group'>
                            <h4>Steps</h4>
                                <p><span>1.</span>Copy your Incentive ID found below. </p>
                                <p><span>2.</span>Navigate to the Incentive Program page in the Minima app and paste it in the Incentive ID field.</p>
                                <label><strong>Incentive ID</strong></label>
                                <input className='form-control mb-4'
                                    name="id"
                                    type="text"
                                    defaultValue={nodeId}

                                />
                            <button type="submit" onClick={() => {
                                        navigator.clipboard.writeText(nodeId)
                                        setNodeIdCopied(true)
                                        setTimeout(() => {
                                          setNodeIdCopied(false)
                                        }, 2000);
                                    }}
                                    className="btn btn-primary mt-2">
                                {nodeIdCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>  : "" }  
                </div>
            </div>
        </>
    )
}

export { GetStartedAndroid }
