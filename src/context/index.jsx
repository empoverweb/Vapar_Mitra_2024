import React from "react";
import PropTypes from "prop-types";

export const VparmitraContext = React.createContext(null);
VparmitraContext.displayName = "Vparmitra Gloabl Storage";

export function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
        return { ...state, userSession: action.value };  
    case 'LOGOUT':
      return { ...state, userSession: null };  
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function VparmitraControllerProvider({ children }) { 
  const initialState = {
    openSidenav: false,
    sidenavColor: "deep-purple",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <VparmitraContext.Provider value={value}>
      {children}
    </VparmitraContext.Provider>
  );
}

export function useVparmitraController() {
  const context = React.useContext(VparmitraContext);

  if (!context) {
    throw new Error(
      "useVparmitraController should be used inside the VparmitraControllerProvider."
    );
  }

  return context;
}

VparmitraControllerProvider.displayName = "/src/context/index.jsx";

VparmitraControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setLoginDetails = (dispatch, value) =>
  dispatch({ type: "LOGIN", value });
export const setLogoutDetails = (dispatch, value) =>
dispatch({ type: "LOGOUT", value });
export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });

