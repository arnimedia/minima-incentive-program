import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNodeId, selectNodeId } from '../home.slice'


function GetStartedLinux() {
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
        <h3 className="card-header">Linux Desktop</h3>
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
                        <p>If you are using Debian OS (including Ubuntu) or a Raspberry Pi, follow the instructions <Link to={`${process.env.PUBLIC_URL}/home/pages/get-started-linuxvps`}>here</Link></p>
                        <p>If you have not run Minima before, please ensure you have the latest version of Java installed on the server: <a href="https://java.com/en/" target="_blank">https://java.com/en/</a> </p>

                        <h4>Instructions:</h4>
                            <p><span>1.</span>If you have a previous version of Minima running, type <span className='codeline'>quit</span> into the Command prompt window, then replace your existing minima.jar file with the latest version.</p>
                            <p><span>2.</span>Download and save the latest Minima JAR from here: <a href="https://github.com/minima-global/Minima/raw/master/jar/minima.jar">minima.jar</a></p>
                            <p><span>3.</span>Open the Command Prompt as Admin. When it opens, type the following: (including a space after -jar)</p>
                            <code>
                            sudo java -Xmx1G -jar 
                            </code>
                            <ul>
                              <li>then drag and drop the minima.jar file into the command window, </li>
                              <li>then add a space and type <span className='codeline'>-rpcenable</span></li>
                            </ul>
                            <p>The output should look like the below (all on one line):</p>
                            <code>
                            sudo java -Xmx1G -jar /home/user/minima.jar -rpcenable
                            </code>
                            <h4>Note:</h4>
                            <p>When starting a new node or to delete your existing node data -clean can be added to the end. Do not use -clean if you are simply restarting your node. Example below:</p>
                            <code>
                            sudo java -Xmx1G -jar /home/user/minima.jar -rpcenable -clean
                            </code>
                            <p><span>4.</span>Hit the Enter key</p>
                            <h4>Avoid:</h4>
                            <ul>
                              <li>Closing your Command Prompt window</li>
                              <li>Allowing your PC to go to sleep</li>
                              <li>Turning your PC off</li>
                            </ul>
                            <p>If any of the above happens, your Minima node will stop running and you will need to repeat step 3 to start it again.</p>
                        <button onClick={handleClick}className="btn btn-primary mb-4 mt-2">
                        Download Minima
                        </button>
                        <button onClick={handleContentTwo} className="btn btn-outline-primary">
                        Next Step
                        </button>
                    </div> :  "" } 
                { showContentTwo ?                       
                    <div className='form-group'>
                        <h4>Steps:</h4>
                            <p><span>1.</span>Once Minima is running, connect your Incentive account to your node by copying your Incentive ID from the bottom of this page and typing the following directly into the Terminal command line: </p>
                            <code>
                            incentivecash uid:InsertYourNodeID
                            </code>
                        <h4>Example:</h4>
                            <code>
                            incentivecash uid:00F3E50D-5A52-444B-8F1A-0DA72D6CAA84
                            </code>
                            <p>You should receive a return status of <span className='codeline'>true</span> and see your previous reward balance (if any). Your Incentive Program account is now connected to your node!</p>
                            <p><span>2.</span>Your node will then ping us so we know it's running. </p>
                            <p><span>3.</span>For every day your node pings us, we'll add 1 Reward to your DAILY REWARDS.</p>  
                            <p><span>4.</span>To check your rewards, type <span className='codeline'>incentivecash</span> into the command line.</p>
                            <p>Thank you for participating in the Minima Testnet!</p>
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

export { GetStartedLinux }
