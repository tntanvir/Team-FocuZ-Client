import React, { createContext, useState } from 'react';

export const DrawerContext = createContext();

const SidebarContext = ({ children }) => {
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    return (
        <DrawerContext.Provider value={{ open, openDrawer, closeDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export default SidebarContext;