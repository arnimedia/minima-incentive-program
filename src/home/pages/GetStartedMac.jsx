import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNodeId, selectNodeId } from '../home.slice'


function GetStartedMac() {
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

    // function handleClick(){
    //     window.open("https://github.com/minima-global/Minima/raw/master/jar/minima.jar");
    // }

    return (
        <>
        <h3 className="card-header">Mac</h3>
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
                        <h4>Note:</h4>
                        <p>If you have not run Minima before, please ensure you have the latest version of Java installed: <a href="https://java.com/en/" target="_blank">https://java.com/en/</a> </p>

                        <h4>Instructions:</h4>
                            <p><span>1.</span>If you have a previous version of Minima running, type <span className='codeline'>quit</span> into the Terminal command line.</p>
                            <p><span>2.</span>If you have not used Homebrew before, you will need to install it first:</p>
                            <p> - Open a Terminal window</p>
                            <p> - Copy and execute the following script to install Homebrew. Follow all on-screen instructions and provide your system password when required:</p>
                            <code>
                            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
                            </code>
                            <p><span>3.</span>Once Homebrew is installed, or if already installed, you can follow the following steps to install and configure your node - please ensure you provide your system password when prompted:</p>
                            <code>
                            brew tap minima-global/minima<br />
                            brew install minima-global/minima/minima<br />
                            brew services start minima</code>
                            <p>Your Terminal will provide details of where your logs can be found, which you may need in the future. Please make a note of this location for future reference.</p>
                            <h4>Note:</h4>
                            <p>To update Minima to a new version:</p>
                            <code>
                            mcli quit<br />
                            brew services stop minima<br />
                            brew tap minima-global/minima<br />
                            brew install minima-global/minima/minima<br />
                            brew services start minima<br />
                            </code>
                            <p>Check your Incentive account is connected with </p>
                            <code>mcli incentivecash</code>

                            <p>Congratulations - your node is now installed & running! The last step is to connect it to your Incentive Account. Click Next Step to continue.</p>
                        <button onClick={handleContentTwo} className="btn btn-outline-primary">
                        Next Step
                        </button>
                    </div> :  "" } 
                { showContentTwo ?                       
                    <div className='form-group'>
                        <h4>Steps:</h4>
                            <p><span>1.</span>Once Minima is running, connect your Incentive account to your node, by copying your Incentive ID from the bottom of this page.</p>
                            <p><span>2.</span>Run the following command in your Terminal, replacing xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx with the copied Node ID:</p>
                            <code>
                            mcli incentivecash uid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
                            </code>
                        <h4>Example:</h4>
                            <code>
                            mcli incentivecash uid:00F3E50D-5A52-444B-8F1A-0DA72D6CAA84
                            </code>
                            <p>You should receive a return status of <span className='codeline'>true</span> and see your previous rewards balance (if any). </p>
                            <p>Once this is done, your installation is complete and your Incentive account is connected to your node! You may close your Terminal Window. </p>
                            <p><span>3.</span>Your node will then ping us so we know it's running</p>
                            <p><span>4.</span>For every day your node pings us, we'll add 1 Reward to your DAILY REWARDS</p>
                            <p><span>5.</span>To check your rewards, type <span className='codeline'>mcli incentivecash</span> into the Terminal</p>
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

export { GetStartedMac }
