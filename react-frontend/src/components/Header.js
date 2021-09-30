import React, { useState } from 'react';
import Button from './Button'



const Header = ({ title , setPage}) => {

    return (
        <header className = 'header' >   
        <div>   
         <nav style={{height:"148"}}>
                <b><h1 style={{color:'green'}}>{title}</h1></b>
                    <ul>
                        <Button
                            color='#B3903F'
                            text ='Ana Sayfa'
                            onClick={()=>{
                                //setPage("main")
                                {setPage("home")}
                            }}
                        />
                         <Button
                            color='#B3903F'
                            text ='Duyurular'
                            onClick={()=>{
                               {setPage("announcementsForUser")}
                            }}
                        />   
                                             
                                             
                        <Button
                            color='#B3903F'
                            text ='Haberler'
                            onClick={()=>{
                               {setPage("newsForUser")}
                            }}
                        /> 
                        <Button
                            color='#B3903F'
                            text ='Admin Girişi'
                            onClick={()=>{
                            {setPage("admin")}
                        }} 
                        />   
                        
                    </ul>
                </nav>


                </div>
        </header>
    )
}

Header.defaultProps = {
    title:'Minik Dostlar Derneği',
}

export default Header