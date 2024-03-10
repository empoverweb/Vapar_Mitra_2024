import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from 'react';
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";

export function Retailers() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <DashboardNavbar />
      <div className="p-6 xl:ml-72">
        <Configurator />
        <Routes>
          {routes.map(({ layout, pages }) =>
            layout === "retailers" && (
              pages.map(({ path, element, subitems }) => {
                return (
                  <React.Fragment key={path}>
                    <Route exact path={path} element={element} />
                    {subitems && subitems.map(({ icon, name, path: subitemPath, element }) => {
                      return (
                        <Route key={subitemPath} exact path={subitemPath} element={element} />
                      );
                    })}
                  </React.Fragment>
                );
              })
            )
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Retailers.displayName = "/src/layout/retailers.jsx";

export default Retailers;
