import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNodeId, selectNodeId } from '../home.slice'


function GetStartedVPS() {
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
        window.open("https://github.com/minima-global/Minima/raw/master/jar/minima.jar");
    }

    return (
        <>
        <h3 className="card-header">Linux VPS/Raspberry Pi</h3>
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
                        <h4>Videos:</h4>
                        <p>Set up the Minima Protocol on Linux Cloud Server:  <a href="https://www.youtube.com/watch?v=5ivW2Q69-Nc" target="_blank">https://www.youtube.com/watch?v=5ivW2Q69-Nc </a></p>
                        <p>Interacting with the Minima Protocol on VPS: <a href="https://www.youtube.com/watch?v=_CXx69sveyc" target="_blank">https://www.youtube.com/watch?v=_CXx69sveyc</a></p>

                        <h4>Instructions:</h4>
                            <p><span>1.</span>Log in as the root user. (You may need to create a secure connection to your server using PuTTY, Terminal or a similar tool)</p>
                            <p><span>2.</span>Open the command prompt, ensure you are in the root directory</p>
                            <p><span>3.</span>If you have not run Minima before, please ensure you have the latest version of Java installed on the server <a href="https://java.com/en/" target="_blank">https://java.com/en/</a>  </p>
                            <p><span>4.</span>From the root directory, please run the following script:</p>
                            <code>
                            wget -O minima_setup.sh https://raw.githubusercontent.com/minima-global/Minima/master/scripts/minima_setup.sh && chmod +x minima_setup.sh && sudo ./minima_setup.sh -r 9002 -p 9001
                            </code>
                            <p><span>5.</span>This may take up to 30 minutes for the script to complete and for Minima to start. Please be patient, you will be instructed when it has completed.</p>
                            <p>Running multiple nodes on one server? You can specify different port numbers on the end to do this. For example (using 9122 and 9121): </p>
                            <code>wget -O minima_setup.sh https://raw.githubusercontent.com/minima-global/Minima/master/scripts/minima_setup.sh && chmod +x minima_setup.sh && sudo ./minima_setup.sh -r 9122 -p 9121</code>
                        <button onClick={handleClick} className="btn btn-primary mb-4 mt-2">
                        Download Minima
                        </button>
                        <button onClick={handleContentTwo} className="btn btn-outline-primary">
                        Next Step
                        </button>
                    </div> :  "" } 
                { showContentTwo ?                       
                    <div className='form-group'>
                        <h4>Steps:</h4>
                            <p><span>1.</span>Once the Minima is running, connect your Incentive Account to your node by copying your Incentive ID from the bottom of this page: </p>
                            <p><span>2.</span>To send commands to Minima, you need to have curl installed. If you do not have curl installed, type the following directly into the command line:</p>
                            <code>
                            sudo apt install curl
                            </code>
                            <p><span>3.</span>To set your Incentive ID, type the following directly into the command line, replacing the xxx with your ID:</p>
                            <code>
                            curl 127.0.0.1:9002/incentivecash%20uid:xxx-xxx-xxx-xxx-xxx
                            </code>
                        <h4>Example:</h4>
                            <code>
                            curl 127.0.0.1:9002/incentivecash%20uid:00F3E50D-5A52-444B-8F1A-0DA72D6CAA84
                            </code>
                            <p>You should receive a return status of <span className='codeline'>true</span> and see your previous reward balance (if any).</p>
                            <p>If you have multiple nodes on one server, you will need to change the port number in the curl command to the same port number used after -r with the installation script</p>
                          <h4>Example:</h4>
                            <code>curl 127.0.0.1:9122/incentivecash%20uid:xxx-xxx-xxx-xxx-xxx</code>
                            <p>Your Incentive Program account is now connected to your node! </p>
                            <p><span>4.</span>Your node will then ping us so we know it's running. </p>
                            <p><span>5.</span>For every day your node pings us, we'll add 1 Reward to your DAILY REWARDS. </p>
                            <p><span>6.</span>To check your rewards, type <span className='codeline'>curl 127.0.0.1:9002/incentivecash | jq</span> into the command line.</p>
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

export { GetStartedVPS }
