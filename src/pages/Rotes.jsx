import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideNaveBar } from '../components'

export default function Rotes() {
  return (
     <section className='outlet-root-main-section '>

        <div className="outlet-root-wrapper">
            <div className="root-side-nave-wrapper">
                <SideNaveBar/>
            </div>
            <div className="root-main-content-wrapper ">
                <div className="container">
                    <Outlet/>
                </div>
            </div>
        </div>

     </section>
  )
}
