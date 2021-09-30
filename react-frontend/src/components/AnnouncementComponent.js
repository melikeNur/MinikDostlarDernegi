import React from 'react';
import AnnouncementService from '../services/AnnouncementService';
import { IconContext } from "react-icons";
import {FaEdit, FaPlus, FaPlusCircle, FaTimes, FaUpload, FaWeight} from 'react-icons/fa'
import axios from 'axios';
import ModalPopupAddComponent from './ModalPopupAddComponent';
import ModalPopupUpdateComponent from './ModalPopupUpdateComponent';



class AnnouncementComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            announcements:[],
            showModalToAddAnnouncement: false,  
            showModalToUpdate:false,
            editingId:0,
            topicE:"",
            validityDateE:"",
            picE:""
        }
    }
    componentDidMount(){
        AnnouncementService.getAnnouncements().then((response) => {
            this.setState({ announcements: response.data})
        });
    }
    
    isShowPopupToAdd = (status) => {
      this.setState({ showModalToAddAnnouncement: status });  
    };  
    isShowPopupToUpdate = (status) => {  
      this.setState({ showModalToUpdate: status });  
    }; 
    deleteRow(id){  
        axios.delete(`http://localhost:8081/api/announcments/${id}`)  
        .then(res => {  
          console.log(res);  
          console.log(res.data);  
      
          const announcements = this.state.announcements.filter(item => item.id !== id);  
          this.setState({ announcements });  
        })  
    }
    rowEditCallback = (data) => {
      console.log(data)
      //const theEntry = this.state.announcements.find(a=>a.id == data.id)
      const otherEntries = this.state.announcements.filter(a=>a.id != data.id)
      this.setState({announcements:[data, ...otherEntries]})
    }
    
    render (){
        return (
          <div style ={{backgroundColor:"#393F2F"}}>
                <h1 className = "text-center"> Duyurular</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Konu</td>
                            <td> Geçerlilik Tarihi</td>
                            <td> Resim </td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.announcements.sort((a,b)=>a.validityDate < b.validityDate ? -1 : 1).map(
                              announcement  => 
                                <tr key={announcement.id}>
                                  <td> {announcement.topic}</td>
                                  <td> {announcement.validityDate}</td>
                                  <td> {announcement.image}</td>
                                  <td>
                                    <IconContext.Provider
                                      value={{ color: 'red', size: '20px' }}
                                    >
                                      <div
                                        className="mindos-icon"
                                        onClick={() => this.deleteRow(announcement.id)}
                                      >
                                        <FaTimes/>
                                      </div>
                                    </IconContext.Provider>
                                  </td>

                                  <td>
                                    <IconContext.Provider
                                        value={{ color: 'green', size: '20px' }}
                                      >
                                        <div
                                          className="mindos-icon"
                                          onClick={() => {
                                            this.setState({
                                              editingId: announcement.id,
                                              topicE: announcement.topic,
                                              validityDateE: announcement.validityDate,
                                              picE:announcement.pic
                                            },()=>{
                                              this.isShowPopupToUpdate(true)
                                            })
                                          }} 
                                          >
                                            <FaEdit/>
                                        </div>
                                      </IconContext.Provider>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <IconContext.Provider
                    value={{ color: 'green', size: '30px' }}
                  >
                  <div
                    className="mindos-icon"
                    onClick={() => {
                      this.isShowPopupToAdd(true)
                    }}
                  >
                  <FaPlusCircle/>
                  </div>
                </IconContext.Provider>  
                <ModalPopupAddComponent
                  showModalToAddAnnouncement={this.state.showModalToAddAnnouncement}
                  onPopupClose={this.isShowPopupToAdd}
                >
                </ModalPopupAddComponent>
                  
                <ModalPopupUpdateComponent
                  showModalToUpdate={this.state.showModalToUpdate}
                  announcementId={this.state.editingId}
                  topic={this.state.topicE}
                  validityDate={this.state.validityDateE}
                  type="announcement"
                  onPopupClose={this.isShowPopupToUpdate}
                  rowEditCallback={this.rowEditCallback}
                >
                </ModalPopupUpdateComponent>
            </div>

        )
    }
}

export default AnnouncementComponent