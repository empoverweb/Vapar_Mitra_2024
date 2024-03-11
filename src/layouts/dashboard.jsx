import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useVparmitraController } from "@/context";
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [controller, dispatch] = useVparmitraController(); 
  const { sidenavType ,userSession} = controller;   
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      /> 
      <DashboardNavbar /> 
      <div className="p-6 xl:ml-56 bg-bodyColor"> 
        <Typography variant="h4" className="pl-4">Welcome <span className="text-primaryColor">{name}</span></Typography> 
        <Typography variant="paragraph" className="pl-4 font-medium">Dashaboard</Typography>
        <Configurator /> 
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
