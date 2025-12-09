import React from "react";

import { Outlet } from "react-router";

const AuthLayouts = () => {
  return (
    <div>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayouts;
