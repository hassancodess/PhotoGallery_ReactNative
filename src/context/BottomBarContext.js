import React, {useState, createContext} from 'react';

export const BottomBarContext = createContext(null);

export const BottomBarContextProvider = ({children}) => {
  const [isHidden, setIsHidden] = useState(false);

  const values = {
    isHidden,
    setIsHidden,
  };
  return (
    <BottomBarContext.Provider value={values}>
      {children}
    </BottomBarContext.Provider>
  );
};
export default BottomBarContext;
