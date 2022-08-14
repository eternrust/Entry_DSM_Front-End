import { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios";
import './WritePage.css'

const WritePage = () => {
    const [ cookies ] = useCookies(['access_token']);
    let navigate = useNavigate();
    
    const location = useLocation();

    useEffect(() => {
        !cookies['access_token'] && navigate("/");

        if(location.state != null){ 
            const title = document.querySelector(".write_title");
            const content = document.querySelector(".write_content");
            const btn = document.querySelector(".write_box button");

            title.value = location.state.title;
            content.value = location.state.content;
            btn.innerHTML = '수정한다'
            btn_clear();
        }
    }, [location]);

    const btn_clear = () => {
        const title = document.querySelector(".write_title");
        const content = document.querySelector(".write_content");
        const btn = document.querySelector(".write_box button");

        if(title.value != "" && content.value != "") {
            btn.style.background = '#5F85BB';
            btn.style.cursor = 'pointer';
        } else {
            btn.style.background = '#E0E0E0';
            btn.style.cursor = 'auto';
        }
    }

    let onWrite = async function () {
        const title = document.querySelector(".write_title");
        const content = document.querySelector(".write_content");
        
        if(title.value != '' && content.value != '') {
            if(location.state != null) {
                try {
                    let res = await axios({
                        method: 'PATCH',
                        url: 'https://freshman.entrydsm.hs.kr/posts/' + location.state.id,
                        headers: {
                            Authorization: 'Bearer ' + cookies['access_token']
                        },
                        data: {
                            title: title.value,
                            content: content.value,
                        },
                    });
                    alert('성공적으로 수정되었습니다.');
                    navigate('/');
                } catch (err) {
                    alert('실패하셨습니다.');
                }
            } else {
                try {
                    let res = await axios({
                        method: 'POST',
                        url: 'https://freshman.entrydsm.hs.kr/posts/',
                        headers: {
                            Authorization: 'Bearer ' + cookies['access_token']
                        },
                        data: {
                            title: title.value,
                            content: content.value,
                        },
                    });
                    alert('성공적으로 계시되었습니다.');
                    navigate('/');
                } catch (err) {
                    alert('실패하셨습니다.');
                }
            }
        }
    };

    return (
        <div className='write_box'>
            <input type='text' className="write_title"
              placeholder="제목을 입력해 주세요."
              onKeyUp={() => btn_clear()}  
            />
            <textarea className="write_content"
              placeholder="내용을 입력해 주세요."
              onKeyUp={() => btn_clear()}/>
            <button onClick={() => onWrite()}>게시하다</button>
        </div>
    )
} 

export default WritePage;