import React from 'react'

import classes from './footer.module.css'


const Footer = () => {
  return (
    <section  className={classes.footer_wrapper}>
      <div className={classes.footer_h2}>
        <h2>see personalized recommendation</h2>
      </div>
      <div>
        <button className={classes.Footer_button}>
          <a href='#'> sign in

          </a>
          
        </button>
      </div>
      <div className={classes.footer_Customer}>
        <p>new customer?</p>
        <a href='#'>
          start here
        </a>
      </div>

   
      
    </section>

    
    
  )
}

export default Footer
