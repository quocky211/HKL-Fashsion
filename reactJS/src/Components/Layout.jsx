import React, { Suspense } from "react";
import HeaderChristmas from "./HeaderDefault/HeaderChristmas.jsx";
import HeaderDefault from "./HeaderDefault/HeaderDefault.jsx";
import FooterDefault from "./FooterDefault/FooterDefault.jsx";
import FooterChristmas from "./FooterDefault/FooterChristmas.jsx";
import { useSelector } from "react-redux";
import Snowflakes from "../cssEffect/Snowflakes.jsx";
import MUICustomSwitch from "../Components/MUICustomSwitch/MUICustomSwitch.jsx";

const Layout = ({ children }) => {
  const layout = useSelector((state) => state.layoutState.layout);

  return (
      <>
          <div className="switchLayout">
              <MUICustomSwitch />
          </div>
          {!layout ? (
              <>
                  <HeaderDefault />

                  <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>

                  <FooterDefault />
              </>
          ) : (
              <>
                  <HeaderChristmas />
                  <Snowflakes />

                  <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>

                  <FooterChristmas />
              </>
          )}
      </>
  );
};
export default Layout;
