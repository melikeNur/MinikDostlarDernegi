import React from 'react';
import AnnouncementService from '../services/AnnouncementService';
import ModalGetContentComponent from './ModalGetContentComponent'
import { IconContext } from "react-icons";
import {FaEdit, FaPlus, FaPlusCircle, FaTimes, FaUpload, FaWeight} from 'react-icons/fa'

 class AnnouncementReadOnly extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            announcements:[],
        }
    }

    componentDidMount(){
        AnnouncementService.getAnnouncements().then((response) => {
            this.setState({ announcements: response.data})
        });
    }
      

    render (){
        return (
            <div style={{backgroundColor:'#241F1C'}} className="container">
            <div style ={{backgroundColor:"#393F2F"}}>
                <h1 className = "text-center"> Duyurular</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Konu</td>
                            <td> Geçerlilik Tarihi</td>
                            <td> Görsel </td>

                        </tr>

                    </thead>
                    <tbody>
                        {
                           this.state.announcements.sort((a,b)=>a.validityDate < b.validityDate ? -1 : 1).map(
                            announcement  => 
                                <tr key = {announcement.id}>
                                     <td> {announcement.topic}</td>   
                                     <td> {announcement.validityDate}</td> 
                            
                                </tr>
                            
                          
                          )
                        }
                    </tbody>
                  </table>

            </div>
            </div>

        )
    }
}

export default AnnouncementReadOnly