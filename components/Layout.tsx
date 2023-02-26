import React from "react"
import Navbar from "./Navbar/Navbar"

type LayoutProps = {
    children: any
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <>
            <div className="fixed top-0 z-50">
                <Navbar/>
            </div>
            <div className="top-50">
                {children}
            </div>
        </>
    )
}

export default Layout;