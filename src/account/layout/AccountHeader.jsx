import React from "react";
import classNames from "classnames";
import AccountLogo from "../layout/AccountLogo";

const AccountHeader = () => {

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
            <AccountLogo />
          </div>
        </div>
      </div>
    </div>
    <div className="mn-header-line">
        <div className="container-lg wide-xl">
          The Minima Incentive Program
        </div>
    </div>
    </>
  );
};
export default AccountHeader;
