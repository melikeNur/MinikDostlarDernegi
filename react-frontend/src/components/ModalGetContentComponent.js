import React, { Component, Fragment } from 'react';  
import { Modal, Form, Col} from "react-bootstrap";
import  Button from './Button';
import axios from 'axios';
import { FaSave,FaWindowClose,FaEdit } from 'react-icons/fa';
import { IconContext} from 'react-icons';


class ModalGetContentComponent extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModalToGetContent: false,
            content:"",
            id:""
        };  
    }
    getContent = event => {
        event.preventDefault();
        const news = {
          content:this.state.content
        };
        return news;
    }
    
    isShowModal = (status) => {  
        this.handleClose();  
        this.setState({ showModalToGetContent: status }); 
    }  
    handleClose = () => {  
        this.props.onPopupClose(false);
    }  
    ComponentChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    render() {  
        return (  
          <Modal show={this.props.showModalToGetContent} onHide={this.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="sign-in-title">
                Detaylar
              </Modal.Title>
              <IconContext.Provider
                value={{ color: 'red', size: '40px' }}
              >
                <div
                  className="mindos-icon"
                  onClick={() => this.isShowModal(false)}
                >
                  <FaWindowClose />
                </div>

              </IconContext.Provider>
            </Modal.Header>
            <Modal.Body>
 
               
       { <p>{this.props.content}</p>}


                <p>
                Pencereyi kapatmak istiyor musunuz?
                <Button
                  color="red"
                  text="Kapat"
                  onClick={() => this.isShowModal(false)} />

              </p>           
            </Modal.Body>            
            </Modal>
            );  
        }  
     }  
              
export default (ModalGetContentComponent);  
