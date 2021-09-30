import React, { Component, Fragment } from 'react';  
import { Modal , Form, Col} from 'react-bootstrap';  
import axios from 'axios'
import  Button from './Button';
import { FaSave,FaWindowClose } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';


  
class ModalPopupUpdateComponent extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {
            showModalToUpdate: false ,
            topic:"",
            validityDate:"",
            pic:"",
            id:"",
            content:"",
            link:"",
            type:"news"

        };  
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.showModalToUpdate != this.props.showModalToUpdate && this.props.showModalToUpdate) {
            const {topic, validityDate, content, link ,type,pic,} = this.props
            console.log(this.props, topic, validityDate, content, link,pic)
            this.setState({topic, validityDate, content, link,type,pic, })
        }
    }


    updateAnnouncement = event => {
        event.preventDefault();
        const announcement = {
          id:this.state.id,
          topic: this.state.topic,
          validityDate: this.state.validityDate
        };
        let axiosOptions = {
          headers: {
            "Content-Type": "application/json",
          }
        }
        axios.put(`http://localhost:8081/api/announcments/${this.props.announcementId}`, announcement,axiosOptions)
        .then(response => {
            this.props.rowEditCallback(response.data)
        })
        this.handleClose(); 

}
    
      ComponentChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

      updateNews = event => {
        event.preventDefault();
        const news = {
          id:this.state.id,
          topic: this.state.topic,
          validityDate: this.state.validityDate,
          content:this.state.content,
          link:this.state.link
        };
        let axiosOptions = {
          headers: {
            "Content-Type": "application/json",
          }
        }
        axios.put(`http://localhost:8081/api/news/${this.props.newsId}`, news,axiosOptions)
        .then(response => {
            this.props.rowEditCallback(response.data)
        })
        this.handleClose(); 

}

    isShowModal = (status) => {
        this.handleClose();  
        this.setState({ showModalToUpdate: status });  
    }  
  
    handleClose = () => {
        this.props.onPopupClose(false);
    }  
  
  
    render() {  
        return (  
                <Modal show={this.props.showModalToUpdate} onHide={this.handleClose}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  
                >  
                    <Modal.Header>  
                        <Modal.Title id="sign-in-title">
                          {this.props.type == "news" ?
                            (<>Haber Güncelleme Ekranı</>) :
                            this.props.type == "announcement" ?
                            (<>Duyuru Güncelleme Ekranı</>) :
                            (<></>)
                          }
                             
                         </Modal.Title>  
                            <IconContext.Provider
                                value={{ color: 'red', size: '40px' }}
                            >
                            <div
                                className="mindos-icon"  
                                onClick={() => this.isShowModal(true)}
                            > 
                                <FaWindowClose/>
                            </div> 
                        </IconContext.Provider>
                    </Modal.Header>  
                    <Modal.Body>  
                    <Form>
                          <Form.Row> 
                          <Form.Group as={Col} controlId="formGridTitle">
                          <Form.Label>Konu</Form.Label>
                            <Form.Control
                              required
                              autoComplete="off"
                              type="test"
                              name="topic"
                              value={this.state.topic}
                              onChange={this.ComponentChange}
                              className={"bg-dark text-white"}
                              placeholder="Duyuru Konusunu Giriniz"
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridAuthor">
                          <Form.Label>Geçerlilik Tarihi</Form.Label>
                            <Form.Control
                              required
                              autoComplete="off"
                              type="test"
                              name="validityDate"
                              value={this.state.validityDate}
                              onChange={this.ComponentChange}
                              className={"bg-dark text-white"}
                            />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridAuthor">
                          {this.props.type == "announcement" ?
                              (<><Form.Label>Görsel =   </Form.Label>
                              <Form.Control method="POST" action="/upload" enctype="multipart/form-data"
                                required
                                autoComplete="off"
                                type="file" 
                                name="pic"
                                value={this.pic}
                                onChange={this.ComponentChange}
                                className={"bg-dark text-white"}
                               />
                               </>):
                              
                               (<></>)
                             }
                          </Form.Group>
                          
                          <Form.Group as={Col} controlId="formGridAuthor">
                            {this.props.type == "news" ?
                            (<><Form.Label>İçerik</Form.Label>
                              <Form.Control
                                required
                                autoComplete="off"
                                type="test"
                                name="content"
                                value={this.state.content}
                                onChange={this.ComponentChange}
                                className={"bg-dark text-white"}
                            
                              />
                              
                              </>):
                              
                              (<></>)
                            }
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridAuthor">
                            {this.props.type == "news" ?
                            (<><Form.Label>Link</Form.Label>
                              <Form.Control
                                required
                                autoComplete="off"
                                type="test"
                                name="link"
                                value={this.state.link}
                                onChange={this.ComponentChange}
                                className={"bg-dark text-white"}
                            
                              />
                              </>):
                              
                              (<></>)
                            }
                          </Form.Group>
                          </Form.Row> 
                            <Button
                            color="green"
                            text="Kaydet"
                            
                            onClick = {this.props.type == "announcement" ?
                                      this.updateAnnouncement :
                                       this.props.type == "news" ?
                                      this.updateNews : ()=>{}
                          }

                          >
                            <FaSave />
                            {this.state.id ? "Update" : "Save"}
                          </Button>
                          </Form>
                          <p>
                          Pencereyi kapatmak istiyor musunuz?
                          <Button
                              color = "red"
                              text = "Kapat"
                              onClick={() =>
                                 this.isShowModal(true)}
                          />
                        
                         
                        </p>    
                    </Modal.Body>  
  
                </Modal >  
  
        );  
    }  
}  
  
export default (ModalPopupUpdateComponent);  