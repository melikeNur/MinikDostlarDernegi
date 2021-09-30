import React,{ useState, useEffect } from 'react';
import Header from './components/Header'
import Home from './components/Home'
import Admin from './components/Admin'
import NewsReadOnly from './components/NewsReadOnly';
import AnnouncementReadOnly from './components/AnnouncementReadOnly';
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client';

function App() {
  const [page, setPage] = useState("main")
  const [latestMessage, setLatestMessage] = useState("")
  useEffect(()=>{
    

    const stomp = webstomp.over(new SockJS('http://localhost:8081/websocket'));

      /*stomp.connect({}, function (frame) {
        console.log('Client connected: ' + frame);

        stomp.subscribe('/app/subscribe', function (response) {
          console.log(response, 'table-success');
        });

        const subscription = stomp.subscribe('/queue/responses', function (response) {
          console.log(response, 'table-success');
        });

        stomp.subscribe('/queue/errors', function (response) {
          console.log(response, 'table-danger');

            console.log('Client unsubscribes: ' + subscription);
            //subscription.unsubscribe({});
        });

        stomp.subscribe('/topic/periodic', function (response) {
          console.log(response, 'table-info');
        });
    });*/


  })
  const handleMessage = (stompMessage) => {
    setLatestMessage(stompMessage)
  }

  return (
    <>
      <div style={{
        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhI5ZfFhBY9bR3dJ6-Wsza8ZTRLIGqoLd-g&usqp=CAU)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
        backgroundSize: "30%",
        backgroundColor:"#12100E",
      }}>
        <Header 
          setPage = {setPage}
        />
        <div style={{margin:50, width:1400 }}>
            {page == "home" ? (<Home/>) : page == "announcementsForUser" ? (<AnnouncementReadOnly/>) :page == "newsForUser" ?(<NewsReadOnly/>) :page =="admin"? (<Admin/>) :(<></>)}
        </div>
      
      </div>
    </> 
  );
}

export default App;
