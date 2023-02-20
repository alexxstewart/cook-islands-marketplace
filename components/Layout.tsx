import React from "react"
import Navbar from "./Navbar"

type LayoutProps = {
    children: any
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default Layout;