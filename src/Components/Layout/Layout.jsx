import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import LowerFoter from '../Footer/LowerFoter'

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
        <LowerFoter/>

    </div>
  )
}

export default Layout