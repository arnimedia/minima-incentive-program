import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getRewards,
    selectDailyRewards,
    selectPreviousRewards,
    selectInviterRewards,
} from './../home.slice'


function RewardsPage() {
    const dispatch = useDispatch()

    const dailyRewards = useSelector(selectDailyRewards)
    const previousRewards = useSelector(selectPreviousRewards)
    const inviterRewards = useSelector(selectInviterRewards)

    const [showContentOne, setShowContentOne] = useState(true)
    const [showContentTwo, setShowContentTwo] = useState(false)

    useEffect(() => {
        dispatch(getRewards())
    }, [dispatch])

    function handleContentOne(){
        setShowContentOne(true)
        setShowContentTwo(false)
    }
    function handleContentTwo(){
        setShowContentOne(false)
        setShowContentTwo(true)
    }

    return (
        <>
            <h3 className="card-header">Rewards</h3>
            <div className="card-body">
                <div className="form-row">
                    <div className='form-group tab-row'>
                        <button type="submit" onClick={handleContentOne} className={`btn mb-4 ${showContentOne ? "btn-dark" : "btn-outline-dark"}`}>
                            Rewards
                        </button>
                        <button type="submit" onClick={handleContentTwo} className={`btn mb-4 ${showContentTwo ? "btn-dark" : "btn-outline-dark"}`}>
                            Rewards info
                        </button>
                    </div>    
                </div>  
                <div className="form-row">
                    { showContentOne ? 
                        <div className='form-group'>
                                <label>Total Rewards</label>
                                <div className='infobox mb-4'>
                                    <span>{dailyRewards + inviterRewards + previousRewards}</span>
                                </div>
                                <h4 className='h4-mid mb-3'>Breakdown of Rewards</h4>
                                <label>Total Daily Node Rewards</label>
                                <div className='infobox mb-4'>
                                    <span>{dailyRewards}</span>
                                </div>
                                <label>Total Invite Rewards</label>
                                <div className='infobox mb-4'>
                                    <span>{inviterRewards}</span>
                                </div>
                                <label>Total Additional Rewards</label>
                                <div className='infobox mb-4'>
                                    <span>{previousRewards}</span>
                                </div>

                        </div> :  "" } 
                    { showContentTwo ?                       
                        <div className='form-group'>
                            <h4>Daily Node Rewards</h4>
                            <p>You will earn 1 Reward each day your node is successfully connected to the network. Any Rewards earned before the Dec 21 Hard Fork are included in this total. </p>

                            <h4>Invite Rewards</h4>
                            <p>For every person who registers using your Invite Link, you will earn an additional Reward of 0.1, each day their node is connected to the network. 
                                As an example, if you invite your friends & they run a node for 100 days, this is what you could earn:  </p>

                            <div className='infobox mb-4'>
                                <span>5 People Invited</span>
                                <span className='infobox-blue'>50 Rewards</span>
                            </div>
                            <div className='infobox mb-4'>
                                <span>10 People Invited</span>
                                <span className='infobox-blue'>100 Rewards</span>
                            </div>
                            <div className='infobox mb-4'>
                                <span>15 People Invited</span>
                                <span className='infobox-blue'>150 Rewards</span>
                            </div>
                            <div className='infobox mb-4'>
                                <span>20 People Invited</span>
                                <span className='infobox-blue'>200 Rewards</span>
                            </div>

                            <h4>Additional Rewards</h4>
                            <p>You can earn additional Rewards for:<br /><br />
                            &bull; Bug Reports<br />
                            &bull; Bounty Rewards<br />
                            &bull; Strategic Grants<br />
                            &bull; Developer Grants<br />
                            &bull; Prizes

                            </p>

                        </div>  : "" }  
                </div>
            </div>
        </>
    )
}

export { RewardsPage }
