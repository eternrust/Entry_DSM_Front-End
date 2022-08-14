import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './Mypage.css'

const Mypage = () => {
  const [ Table, setTable ] = useState([]);
  const [ res, setRes ] = useState([]);
  const [ cookies ] = useCookies(['access_token']);
  let navigate = useNavigate();
  const [ hoverd, sethoverd ] = useState(false);
  const MaxId = useRef(1);
  const nextId = useRef(10);
  useEffect(() => {
    callServer();
  },[]);

  const callServer = () => {
    axios.get('https://freshman.entrydsm.hs.kr/users/mypage',
        {
            headers: {
                Authorization: 'Bearer ' + cookies['access_token']
            }
        })
        .then(function (response) {
          // 성공했을 때
          setRes(response.data);
          if(response.data['my_feed_list'].length > 10) {
            setTable(response.data['my_feed_list'].slice(nextId.current - 10, nextId.current));
            MaxId.current = Math.floor(response.data['my_feed_list'].length / 10 + 1);
          } else {
            setTable(response.data['my_feed_list']);
          }
        })
        .catch(function (error) {
          // 에러가 났을 때
          console.log(error);
        });
  }

  const forId = () => {
    let number = [];
    for(let i = 1; i <= MaxId.current; i++) {
      number.push(i);
    }
    return number;
  }

  const BlankId = () => {
    let number = [];
    for(let i = Table.length + 1; i <= 10; i++) {
      number.push(i);
    }
    return number;
  }

  const ListId = (e) => {
    nextId.current = e.target.innerText * 10;
    callServer();
  }

  return (
    <>
      <div className='profile'>
      <svg className='image' width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M51 0.800293C23.385 0.800293 1 23.1853 1 50.8003C1 78.4153 23.385 100.8 51 100.8C78.615 100.8 101 78.4153 101 50.8003C101 23.1853 78.615 0.800293 51 0.800293Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.355 82.5303C12.355 82.5303 23.5 68.3003 51 68.3003C78.5 68.3003 89.65 82.5303 89.65 82.5303M51 50.8003C54.9782 50.8003 58.7936 49.2199 61.6066 46.4069C64.4196 43.5939 66 39.7785 66 35.8003C66 31.822 64.4196 28.0067 61.6066 25.1937C58.7936 22.3806 54.9782 20.8003 51 20.8003C47.0217 20.8003 43.2064 22.3806 40.3934 25.1937C37.5803 28.0067 36 31.822 36 35.8003C36 39.7785 37.5803 43.5939 40.3934 46.4069C43.2064 49.2199 47.0217 50.8003 51 50.8003V50.8003Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <image src={res.profile_url}/>
        <div className='name_box'>
        <span className='name'>{res.name}</span>
        <svg className='change' width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" onMouseOver={() => sethoverd(true)} onMouseLeave={() => sethoverd(false)}>
        {
            hoverd ?
            <>
            <circle cx="14" cy="14" r="14" fill="#5F85BB"/>
            <path d="M14.8143 10.1852L17.8147 13.1857L11.2995 19.7012L8.62438 19.9965C8.26626 20.0361 7.96369 19.7333 8.00354 19.3752L8.30118 16.6981L14.8143 10.1852ZM19.6704 9.73845L18.2616 8.3296C17.8222 7.89013 17.1095 7.89013 16.67 8.3296L15.3447 9.65501L18.3451 12.6555L19.6704 11.3301C20.1099 10.8904 20.1099 10.1779 19.6704 9.73845Z" fill="white"/>
            </>
            :
            <>
            <circle cx="14" cy="14" r="13.5" stroke="#5F85BB"/>
            <path d="M14.8143 10.1852L17.8147 13.1857L11.2995 19.7012L8.62438 19.9965C8.26626 20.0361 7.96369 19.7333 8.00354 19.3752L8.30118 16.6981L14.8143 10.1852ZM19.6704 9.73845L18.2616 8.3296C17.8222 7.89013 17.1095 7.89013 16.67 8.3296L15.3447 9.65501L18.3451 12.6555L19.6704 11.3301C20.1099 10.8904 20.1099 10.1779 19.6704 9.73845Z" fill="#5F85BB"/>
            </>
        }
        </svg>
        
        </div>
        <span className='introduce'>{res.introduce}</span>
      </div>
      
      <table className='List'>
        <thead align="center">
          <tr>
            <td>NO</td>
            <td>제목</td>
          </tr>
        </thead>
        <tbody>
         {Table.map(({ id, title }, index) => (
           <tr key={index + 100}>
            <td align="center">{index + 1 + nextId.current - 10}</td>
            <td>
              <a onClick={() => navigate("/posts/" + id)}
                style={{cursor:'pointer'}}
              >{title}
              </a>
            </td>
         </tr>
        ))}
        {BlankId().map((index) => (
           <tr key={index + 100}>
            <td></td>
            <td></td>
         </tr>
        ))}
       </tbody>
      </table>
      <div className='number_bar'>
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10.59L2.67341 6L7 1.41L5.66802 0L0 6L5.66802 12L7 10.59Z" fill="black"/>
      </svg>
      <div style={{width:MaxId.current * 30 + 'px', display:'flex', justifyContent:'space-around'}}>
      {
        forId().map((index) => (
          <span onClick={(event) => ListId(event)}
            key={index}
            style={{cursor:'pointer'}}  
          >
            {index}
            </span>
        ))
      }
      </div>
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10.59L4.32659 6L0 1.41L1.33198 0L7 6L1.33198 12L0 10.59Z" fill="black"/>
      </svg>
      </div>
    </>
  );
}

export default Mypage;