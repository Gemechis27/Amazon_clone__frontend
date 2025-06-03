import React from 'react'
import {FadeLoader} from 'react-spinners'
const Loader = () => {
  return (
    <div
        style={{
            display: "Flex",
            alignItem:"center",
            justifyContent:"Center",
            height:"50vh"
        }}
        >
      <FadeLoader color="#7be0b7" />
    </div>
  )
}

export default Loader
