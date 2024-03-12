import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
    Sidenav,
    DashboardNavbar,
    Configurator,
    Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useVparmitraController, setOpenConfigurator } from "@/context";

export function EKycBypassApproval() {
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
            <div className="p-6 xl:ml-80">
                <Configurator />
                <Routes>
                    {routes.map(
                        ({ layout, pages }) =>
                            layout === "eKycBypassApproval" &&
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

EKycBypassApproval.displayName = "/src/layout/eKycBypassApproval.jsx";

export default EKycBypassApproval;