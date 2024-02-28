import PropTypes from "prop-types";
import React from "react";

import { Link, NavLink } from "react-router-dom";
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon, PresentationChartBarIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const [open, setOpen] = React.useState(null);
  const handleOpen = (index) => {
    setOpen(open === index ? null : index);
  };
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
    className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed right-0 scroll-smooth inset-0 z-50 h-screen overflow-y-auto  w-72 scrollbar:w-4 transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 bg-white scrollbar-thin scrollbar-thumb-blue-gray-300 scrollbar-track-blue-gray-100`}
      
  >
  
      <div
        className={`relative`}
      >
        <div className="flex">
          <Link to="/" className="py-2 px-2 text-center">
            <Typography
              variant="h6"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
            >
              <img src={brandImg} className="w-1/3 rounded-xl ml-20" />
            </Typography>
          </Link>
        </div>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-1 mt-4">
        {routes.map(({ layout, title, pages }, key) => ( 
          <List>
            {pages.map(({ icon, name, path, subitems }) => (
              <React.Fragment key={name}>
                {subitems ? (
                  <Accordion
                    open={open === name}
                    icon={
                      <ChevronRightIcon
                        strokeWidth={2.5}
                        className={`mx-auto h-4 w-4 transition-transform ${open === name ? "rotate-90" : ""
                          }`}
                      />
                    }
                  >
                    <ListItem className="p-0" selected={open === name}>
                      <AccordionHeader onClick={() => handleOpen(name)} className="border-b-0 p-3">
                        <ListItemPrefix>
                          {icon} {/* Icon goes here */}
                        </ListItemPrefix>
                        <Typography color="gradient" className="mr-auto font-normal">
                          {name}
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                      <List className="p-3">
                        {subitems.map(({ icon, name, path }) => (
                          <NavLink key={name} to={`/${layout}${path}`}>
                            {({ isActive }) => (
                              <ListItem>
                                <ListItemPrefix>{icon}</ListItemPrefix>
                                <Typography
                                  color="inherit"
                                  className={`font-medium  capitalize ${isActive ? "text-gradient" : "text-blue-gray"
                                    }`}
                                >
                                  {name}
                                </Typography>
                              </ListItem>
                            )}
                          </NavLink>
                        ))}
                      </List>
                    </AccordionBody>
                  </Accordion>
                ) : ( 
                    <NavLink to={`/${layout}${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color={
                            isActive
                              ? sidenavColor
                              : sidenavType === "dark"
                                ? "white"
                                : "blue-gray"
                          }
                          className="flex items-center gap-4 px-4 capitalize"
                          fullWidth
                        >
                          {icon}
                          <Typography color="gradient" className="font-medium capitalize">
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink> 
                )}
              </React.Fragment>
            ))}
          </List>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo.png",
  brandName: "NSl-VyaparMitra",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
