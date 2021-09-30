import React from 'react';
import NewsService from '../services/NewsService';
import ModalPopupAddComponent from './ModalPopupAddComponent';
import ModalPopupUpdateComponent from './ModalPopupUpdateComponent';
import ModalGetContentComponent from './ModalGetContentComponent';
import { IconContext } from "react-icons";
import {FaEdit, FaPlus, FaPlusCircle, FaTimes, FaUpload, FaWeight} from 'react-icons/fa'
import axios from 'axios';


class NewsComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            news:[],
            showModalToAddNews: false,  
            showModalToUpdate:false,
            editingId:0,
            topicE:"",
            validityDateE:"",
            contentE:"",
            linkE : ""
        }
    }

    componentDidMount(){
        NewsService.getNews().then((response) => {
            this.setState({ news: response.data})
        });
    }
      isShowPopupToAdd = (status) => {
        console.log("noluyo lan")
        this.setState({ showModalToAddNews: status });  
      };  
      isShowPopupToUpdate = (status) => {  
        this.setState({ showModalToUpdate: status });  
      }; 
      isShowPopupToGetContent= (status) => {
        this.setState({ showModalToGetContent: status });  
      };  
      deleteRow(id){  
          axios.delete(`http://localhost:8081/api/news/${id}`)  
          .then(res => {  
            console.log(res);  
            console.log(res.data);  
        
            const news = this.state.news.filter(item => item.id !== id);  
            this.setState({ news });  
          })  
      }
      rowEditCallback = (data) => {
        const otherEntries = this.state.news.filter(a=>a.id != data.id)
        this.setState({news:[data, ...otherEntries]})
      }
      

    render (){
        return (
            <div style ={{backgroundColor:"#393F2F"}}>
                <h1 className = "text-center"> Haberler </h1>
                <table className = "table table-striped" >
                    <thead>
                        <tr>
                            <td> Konu </td>
                            <td><b> Geçerlilik Tarihi</b></td>
                            <td><b> İçerik</b> </td>
                            <td><b> Haber Linki</b> </td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.news.sort((a,b)=>a.validityDate < b.validityDate ? -1 : 1).map(
                                news => 
                                <tr key = {news.id}>
                                      
                                     <td><b> {news.topic}</b></td>   
                                     <td><b> {news.validityDate}</b></td> 
                                     <td><b>
                                        <IconContext.Provider
                                         value={{ color: 'green', size: '20px' }}
                                        >
                                        <div
                                        className="mindos-icon"
                                        
                                        onClick={() => {
                                          this.setState({
                                            editingId: news.id,
                                            contentE:news.content,
                                          },()=>{
                                            this.isShowPopupToGetContent(true)
                                          })
                                          
                                        }}
                                         > Detaylar için tıklayınız 
                                         <br/>
                                      <FaPlusCircle/>
                                        </div>
                                      </IconContext.Provider>  
                                     </b> </td>    
                                     <td><b>
                                     <a href={ news.link }>Haber Linkine Git.</a> 
                                    </b>
                                    </td>   
                                     <td>
                                    <IconContext.Provider
                                      value={{ color: 'red', size: '20px' }}
                                    >
                                      <div
                                        className="mindos-icon"
                                        onClick={() => this.deleteRow(news.id)}
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
                                              editingId: news.id,
                                              topicE: news.topic,
                                              validityDateE: news.validityDate,
                                              contentE:news.content,
                                              linkE:news.link
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
                  showModalToAddNews={this.state.showModalToAddNews}
                  onPopupClose={this.isShowPopupToAdd}
                >
                </ModalPopupAddComponent>
                  
                <ModalPopupUpdateComponent
                  showModalToUpdate={this.state.showModalToUpdate}
                  newsId={this.state.editingId}
                  topic={this.state.topicE}
                  validityDate={this.state.validityDateE}
                  content={this.state.contentE}
                  type="news"
                  link={this.state.linkE}
                  onPopupClose={this.isShowPopupToUpdate}
                  rowEditCallback={this.rowEditCallback}
                >
                </ModalPopupUpdateComponent>
                <ModalGetContentComponent
                  showModalToGetContent={this.state.showModalToGetContent}
                  onPopupClose={this.isShowPopupToGetContent}
                  newsId={this.state.editingId}
                  content={this.state.contentE}
                >
                  </ModalGetContentComponent>
            </div>

        )
    }
}

export default NewsComponent