import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { logout } from '../account/account.slice'
import useMountTransition from "./useMountTransition";

function NavMain() {

    const [isMounted, setIsMounted] = useState(false);
    const hasTransitionedIn = useMountTransition(isMounted, 1000);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const dispatch = useDispatch()

    function onLogoutClicked() {
        dispatch(logout())
    }

    const toggleNav = () => {
      setIsMounted(!isMounted);
    }
  
    useEffect(() => {

      setIsMounted(false)
  
      const changeWidth = () => {
        setScreenWidth(window.innerWidth);
        setIsMounted(false);
      }

      window.addEventListener('resize', changeWidth)
  
      return () => {
          window.removeEventListener('resize', changeWidth)
      }
  
    }, [])

    return (

            <>
            <div className="mn-header-menu">
              {(hasTransitionedIn || isMounted || screenWidth > 992) && (
                  <ul className={`mn-menu mn-menu-main ${hasTransitionedIn && "in"} ${isMounted && "visible"}`}>
                      <li className="mn-menu-item">
                          <NavLink onClick={toggleNav} to={`${process.env.PUBLIC_URL}/home/pages/get-started`} className="mn-menu-link">Get Started</NavLink>                     
                      </li>
                      <li className="mn-menu-item">
                          <NavLink onClick={toggleNav} to={`${process.env.PUBLIC_URL}/home/pages/incentiveid`} className="mn-menu-link">Incentive ID</NavLink>
                      </li>
                      <li className="mn-menu-item">
                          <NavLink onClick={toggleNav} to={`${process.env.PUBLIC_URL}/home/pages/rewards`} className="mn-menu-link">Rewards</NavLink>
                      </li>
                      <li className="mn-menu-item">
                          <NavLink onClick={toggleNav} to={`${process.env.PUBLIC_URL}/home/pages/invite-link`} className="mn-menu-link">Invite Link</NavLink>
                      </li>
                  </ul>
              )}
            </div>

            <div className="mn-header-tools">
                  <ul className="mn-quick-nav">
                    <li>
                        <div onClick={onLogoutClicked} className="mn-quick-item log-out"></div>
                    </li>    
                    <li className="d-lg-none">
                        <div onClick={toggleNav} className="mn-quick-item mobile-nav"></div>
                    </li>               
                  </ul>
            </div>     
            </>
    )
}

export default NavMain
