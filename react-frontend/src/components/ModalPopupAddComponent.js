import React, { Component, Fragment } from 'react';  
import { Modal, Form, Col} from "react-bootstrap";
import  Button from './Button';
import axios from 'axios';
import { FaSave,FaWindowClose,FaEdit } from 'react-icons/fa';
import { IconContext} from 'react-icons';
import AnnouncementComponent from './AnnouncementComponent';
import NewsComponent from './NewsComponent';
//import DatePicker from 'react-bootstrap-date-picker';
 
//import "react-datepicker/dist/react-datepicker.css";
//import 'bootstrap/dist/css/bootstrap.min.css';

  
class ModalPopupAddComponent extends Component {  
    constructor(props) {  
        super(props);  
        this.state = {  
            showModalToAddAnnouncement: false,
            showModalToAddNews: false,
            newsId:0,
            announcementId: 0,
            topic:"",
            validityDate:"",
            content:"",
            link:"",
            pic:"",
            type:0,
        };  
    }  


    submitAnnouncement = (event) => {
      event.preventDefault();

      const announcement = {
        topic: this.state.topic,
        validityDate: this.state.validityDate,
        pic: this.state.pic,
        type: this.setState.type=1
      };

      let axiosOptions = {
        headers: {
          "Content-Type": "application/json",
        }
      }

      axios.post(`http://localhost:8081/api/announcments`,announcement, axiosOptions) 
      .then(response => this.setState({ announcementId: response.data.id }))  

      this.handleClose();

      

  
    }
    submitNews = (event) => {
      event.preventDefault();

      const news = {
        topic: this.state.topic,
        validityDate: this.state.validityDate,
        content:this.state.content,
        link:this.state.link,
        type:this.setState.type=0
      };

      let axiosOptions = {
        headers: {
          "Content-Type": "application/json",
        }
      }

      axios.post(`http://localhost:8081/api/news`,news, axiosOptions) 
      .then(response => this.setState({ newsId: response.data.id }))  

      this.handleClose();

    }
  
  
    isShowModalA = (status) => {  
        this.handleClose();  
        this.setState({ showModalToAddAnnouncement: status }); 
    }  
    isShowModalN = (status) => {  
      this.handleClose();  
      this.setState({ showModalToAddNews: status }); 
  }  
    
    handleClose = () => {  
        this.props.onPopupClose(false);
    }  
    ComponentChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
      
    componentDidUpdate(prevProps, prevState, snapshot) {
      console.log(prevProps,this.state,"------------------")

    }

    handleChange(date) {
      this.setState({
        startDate: date
      })
    }
    render() {  
        return (  
          <><Modal show={this.props.showModalToAddAnnouncement} onHide={this.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title id="sign-in-title">
                Yeni Duyuru Ekleme Ekranı
              </Modal.Title>
              <IconContext.Provider
                value={{ color: 'red', size: '40px' }}
              >
                <div
                  className="mindos-icon"
                  onClick={() => this.isShowModalA(false)}
                >
                  <FaWindowClose />
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
                      placeholder="Duyuru Konusunu Giriniz" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridAuthor">
                    <Form.Label>Geçerlilik Tarihi</Form.Label>
                    <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="validityDate"
                      value={this.validityDate}
                      onChange={this.ComponentChange}
                      className={"bg-dark text-white"}
                      placeholder="Duyurunun Geçerlilik Tarihini Giriniz" />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridAuthor">
                      <Form.Label>Görsel  = </Form.Label>
                      <Form.Control method="POST" action="/upload" enctype="multipart/form-data"
                        required
                        autoComplete="off"
                        type="file" 
                        name="pic"
                        value={this.pic}
                        onChange={this.upload}
                        className={"bg-dark text-white"}
                        />
                    </Form.Group>
                </Form.Row>
                <Button
                  color="green"
                  text="Kaydet"
                  onClick={this.submitAnnouncement}
                >
                  <FaSave />
                  {this.state.announcementId ? "Update" : "Save"}
                </Button>
              </Form>
              <p>
                Pencereyi kapatmak istiyor musunuz?
                <Button
                  color="red"
                  text="Kapat"
                  onClick={() => this.isShowModalA(false)} />

              </p>
            </Modal.Body>

          </Modal><Modal show={this.props.showModalToAddNews} onHide={this.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
              <Modal.Header>
                <Modal.Title id="sign-in-title">
                  Yeni Haber Ekleme Ekranı
                </Modal.Title>
                <IconContext.Provider
                  value={{ color: 'red', size: '40px' }}
                >
                  <div
                    className="mindos-icon"
                    onClick={() => this.isShowModalN(false)}
                  >
                    <FaWindowClose />
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
                        placeholder="Haber Konusunu Giriniz" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAuthor">
                      <Form.Label>Geçerlilik Tarihi</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="test"
                        name="validityDate"
                        value={this.validityDate}
                        onChange={this.ComponentChange}
                        className={"bg-dark text-white"}
                        placeholder="Haberin Geçerlilik Tarihini Giriniz" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAuthor">
                      <Form.Label>İçerik</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="test"
                        name="content"
                        value={this.content}
                        onChange={this.ComponentChange}
                        className={"bg-dark text-white"}
                        placeholder="İçerik Yazınız" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridAuthor">
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="test"
                        name="link"
                        value={this.link}
                        onChange={this.ComponentChange}
                        className={"bg-dark text-white"}
                        placeholder="Haber Linki Giriniz" />
                    </Form.Group>
                  </Form.Row>
                  <Button
                    color="green"
                    text="Kaydet"
                    onClick={this.submitNews}
                  >
                    <FaSave />
                    {this.state.newsId ? "Update" : "Save"}
                  </Button>
                </Form>
                <p>
                  Pencereyi kapatmak istiyor musunuz?
                  <Button
                    color="red"
                    text="Kapat"
                    onClick={() => this.isShowModalN(false)} />

                </p>
              </Modal.Body>

            </Modal></>  

        );  
    }  
}  
  
export default (ModalPopupAddComponent);  