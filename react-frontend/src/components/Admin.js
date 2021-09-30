import React from 'react'
import NewsComponent from './NewsComponent'
import PropTypes from 'prop-types'
import Header from './Header'
import AnnouncementComponent from './AnnouncementComponent'
const Admin = props => {
    return (
<div style={{backgroundColor:'#241F1C'}} className="container">
    <div className="container">
       <div className="News">
         <NewsComponent />
       </div>  
    </div>
    <div style={{backgroundColor:'#241F1C'}} className="container">
      <div className="Announcement">
        <AnnouncementComponent />
      </div>
     </div> 
     </div> 
    )
}


export default Admin
