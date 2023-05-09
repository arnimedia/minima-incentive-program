import React from "react";
import classNames from "classnames";
import Logo from "./Logo";
import NavMain from '../_components/NavMain'
import { useSelector } from 'react-redux'
import {
  selectLastPing,
} from '../home/home.slice'

const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };

const Header = () => {

  const lastPing = useSelector(selectLastPing) // can be null

  const headerClass = classNames({
    "mn-header": true,
    "mn-header-fixed": true,
    "bg-white": true,
  });

  return (
    <>
      <div className={headerClass}>
        <div className="container-lg wide-xl">
          <div className="mn-header-wrap">
            <div className="mn-header-brand">
              <Logo />
            </div>
            <NavMain />
          </div>
        </div>
      </div>
      <div className="mn-header-line">
        <div className="container-lg wide-xl" text-align="left">
          The Minima Incentive Program
          <span className="alignright">Last ping: <strong>{lastPing ? new Date(lastPing).toLocaleString(undefined, options) : '...'}</strong></span>
        </div>
      </div>
    </>
  );
};
export default Header;