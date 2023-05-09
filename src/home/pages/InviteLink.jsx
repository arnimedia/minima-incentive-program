import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectInviteCode,
    getRewards,
} from './../home.slice'


function InviteLink() {
    const dispatch = useDispatch()
    const tmpInviteCode = useSelector(selectInviteCode)
    const inviteCode = tmpInviteCode ? 'https://incentive.minima.global/account/register?inviteCode=' + tmpInviteCode: tmpInviteCode;

    const [inviteCodeCopied, setInviteCodeCopied] = useState(false)

    useEffect(() => {
      dispatch(getRewards())
      window.scrollTo(0, 0);
  }, [dispatch])

    return (
        <>
            <h3 className="card-header">Invite Link</h3>
            <div className="card-body">
                <div className="form-row">
                    <div className="form-group">
                      <p className="text-center"><strong>Your Invite Link enables you to earn additional Rewards for inviting others to run a node and join the Incentive Program.</strong></p>
                      <p className="text-center">Once the Minima network reaches one million nodes, Invite Codes will no longer be active.</p>
                      <label><strong>Invite Link</strong></label>
                      <input className='form-control mb-4'
                          name="id"
                          type="text"
                          defaultValue={inviteCode}
                      />
                      <button type="submit" onClick={() => {
                              navigator.clipboard.writeText(inviteCode)
                              setInviteCodeCopied(true)
                              setTimeout(() => {
                                setInviteCodeCopied(false)
                              }, 2000);
                              }}
                              className="btn btn-primary mt-2">
                          {inviteCodeCopied ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                </div>
            </div>  
        </>
    )
}

export { InviteLink }
