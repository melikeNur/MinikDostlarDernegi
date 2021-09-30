import React from 'react';
import NewsService from '../services/NewsService';
import ModalGetContentComponent from './ModalGetContentComponent'
import { IconContext } from "react-icons";
import {FaEdit, FaPlus, FaPlusCircle, FaTimes, FaUpload, FaWeight} from 'react-icons/fa'

 class NewsReadOnly extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            news:[],
            showModalToGetContent: false,
            contentE:"",
            editingId:0,
        }
    }

    componentDidMount(){
        NewsService.getNews().then((response) => {
            this.setState({ news: response.data})
        });
    }
    isShowPopupToGetContent= (status) => {
      this.setState({ showModalToGetContent: status });  
    };  
      

    render (){
        return (
          <div style={{backgroundColor:'#241F1C'}} className="container">
          <div style ={{backgroundColor:"#393F2F"}}>
                <h1 className = "text-center"> Haberler</h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Konu</td>
                            <td> Geçerlilik Tarihi</td>
                            <td> İçerik </td>
                            <td> Haber Linki </td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                           this.state.news.sort((a,b)=>a.validityDate < b.validityDate ? -1 : 1).map(
                                news => 
                                <tr key = {news.id}>
                                      
                                     <td> {news.topic}</td>   
                                     <td> {news.validityDate}</td> 
                                     <td> 
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
                                         >Detaylar için tıklayınız
                                      <FaPlusCircle/>
                                        </div>
                                      </IconContext.Provider>  
                                      </td>   
                                     <td>
                                         <a href={ news.link }>Haber Linkine Git.</a> 
                                    </td>     
                                </tr>
                            
                          
                          )
                        }
                    </tbody>
                  </table>
                  <ModalGetContentComponent
                  showModalToGetContent={this.state.showModalToGetContent}
                  onPopupClose={this.isShowPopupToGetContent}
                  newsId={this.state.editingId}
                  content={this.state.contentE}
                >
                  </ModalGetContentComponent>
            </div>
            </div>

        )
    }
}

export default NewsReadOnly