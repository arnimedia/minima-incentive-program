import React from "react";

const AccountFooter = () => {
  return (
    <div className="mn-footer mn-auth-footer-full">
      <div className="container wide-xl">
        <div className="mn-footer-wrap">
          <div className="mn-footer-slogan">
                The evolution will not be centralized.<br />
                <span>Become part of it.</span>
          </div>
          <div className="mn-footer-bottom">
            <div className="mn-footer-links">
              <ul className="nav nav-sm">
                  <li className="nav-item">
                    <a href="https://docs.minima.global/docs/incentiveprogramtermsandconditions/applicationoftheseterms" target="blank"className="nav-link">
                    Incentive Program Terms & Conditions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="https://docs.minima.global/docs/minimatermsandconditions" target="blank"className="nav-link">
                    Minima Terms & Conditions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="https://docs.minima.global/docs/minimaprivacypolicy" target="blank"className="nav-link">
                    Privacy Policy
                    </a>
                  </li>
              </ul>
            </div>
            <div className="mn-footer-copyright in.visible">
            All rights reserved Minima Global Ltd &copy;2022.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountFooter;
