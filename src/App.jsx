import React,{useContext, useEffect} from 'react'
import Routering from './Routering'
import { DataContext } from './Components/DataProvider/DataProvider'
import { Type } from './Utility/action.type'
import { auth } from './Utility/firebase'


const App = () => {

  const [{user}, dispatch]=useContext(DataContext)
      useEffect(() =>{
        auth.onAuthStateChanged((authUser)=>{
          if (authUser){
               dispatch ({
             Type:Type.SET_USER,
             user:authUser
                      })
          } else {

             dispatch ({
             Type:Type.SET_USER,
             user:null
                      })
          }
            

            
        })
     
    }, [])


  return (
    <>
    
      <Routering/>
      
    </>
  )
}

export default App
