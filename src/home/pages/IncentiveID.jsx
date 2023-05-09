import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getNodeId, selectNodeId } from '../home.slice'


function IncentiveID() {
    const dispatch = useDispatch()

    const nodeId = useSelector(selectNodeId)
    const [nodeIdCopied, setNodeIdCopied] = useState(false)

    useEffect(() => {
        dispatch(getNodeId())
    }, [dispatch])

    return (
        <>
            <h3 className="card-header">Incentive ID</h3>
            <div className="card-body">
                <div className="form-row">
                    <div className='form-group'>
                    <p className='text-center'>Your Incentive ID can be found below. If you do not know what you need to do with your Incentive ID, please navigate to <Link to={`${process.env.PUBLIC_URL}/home/pages/get-started`}>Get Started</Link> for further instructions.</p>
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
                    </div>
                </div>
            </div>  
        </>
    )
}

export { IncentiveID }
