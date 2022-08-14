import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './List.css'

const List = () => {
  const [ Table, setTable ] = useState([]);
  let navigate = useNavigate();
  const MaxId = useRef(1);
  const nextId = useRef(10);
  useEffect(() => {
    callServer();
  },[]);

  const callServer = () => {
    axios.get('https://freshman.entrydsm.hs.kr/posts/lists')
        .then(function (response) {
          // 성공했을 때
          if(response.data['post_list'].length > 10) {
            setTable(response.data['post_list'].slice(nextId.current - 10, nextId.current));
            MaxId.current = Math.floor(response.data['post_list'].length / 10 + 1);
          } else {
            setTable(response.data['post_list']);
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
      <span className='Title'>게시글 목록</span>
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

export default List;