import React from "react";
import groupStore from './groups';

const rootStore = {
  groupStore,
}
 const StoresContext = React.createContext(null);


export const StoreProvider = ({children}) => {
  return <StoresContext.Provider value={rootStore}>
    {children}
  </StoresContext.Provider>
}

export const useStore = () => React.useContext(StoresContext);

export const withStore = (Component) => (props) => {
  return <Component {...props} store={useStore()} />;
};