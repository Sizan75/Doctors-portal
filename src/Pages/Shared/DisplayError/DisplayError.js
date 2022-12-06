import React from 'react'
import { useRouteError } from 'react-router-dom'

const DisplayError = () => {
 
  const error = useRouteError();
  return (
    <>
     
      <div className='flex flex-col min-h-[700px] justify-center items-center'>
        <h1 className='text-4xl'>Ops! An Error Ocurred!</h1>
        { error &&(
          <div>
          <p className='text-red-600 font-semibold text-2xl'>{error.statusText || error.message}</p>
          <p className='text-red-600 font-semibold text-2xl'>{error.status}</p>
        </div>
        )}
      </div>
    </>
  )
}

export default DisplayError
