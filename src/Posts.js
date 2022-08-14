import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from "axios";
import './Posts.css';

const Posts = () => {
    const [cookies] = useCookies(['access_token']);
    const [ make, setmake ] = useState(false);
    const [ view, setView ] = useState({
        content:'',
        name:'',
        title: '',
        is_mine: false
    });
    const params = useParams()

    let navigate = useNavigate();

    useEffect(() => {
        if(params.hasOwnProperty('id')) {
            if(cookies['access_token']) {
                search_cookies();
            } else {
                search();
            }
        } else {
            navigate("/");
        }
    }, []);
    let search_cookies = async function () {
            try {
                let res = await axios({
                    method: 'get',
                    url: 'https://freshman.entrydsm.hs.kr/posts/'+params.id,
                    headers: {
                        Authorization: 'Bearer ' + cookies['access_token']
                    }
                });
                setView(res.data);
            } catch (err) {
                navigate("/");
            }
    };
    let search = async function () {
        try {
            let res = await axios({
                method: 'get',
                url: 'https://freshman.entrydsm.hs.kr/posts/'+params.id,
            });
            setView(res.data);
        } catch (err) {
            navigate("/");
        }
    };
    let Deleted = async function () {
        try {
            let res = await axios({
                method: 'DELETE',
                url: 'https://freshman.entrydsm.hs.kr/posts/'+params.id,
                headers: {
                    Authorization: 'Bearer ' + cookies['access_token']
                }
            });
            alert('성공적으로 삭제되었습니다.');
            navigate("/");
        } catch (err) {
            alert('오류가 발생했습니다.');
            console.log(err);
        }
    };

    const onDelete = () => {
        const result = window.confirm('정말로 삭제하실 건가요?');
        result && Deleted();
    }

    return (
        <>
        <table className="Posts">
                <thead>
                <tr>
                    <td>{view.title}</td>
                    <td>{view.name}</td>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan='2'>
                            {view.content}
                        </td>
                    </tr>
            </tbody>
        </table>
        { view.is_mine &&
        <div className="Post_Btn_Box">
                <button className="Delete_Post" onClick={() => onDelete()}>삭제하기</button>
                <button className="Rewrite_Post"
                onClick={() => navigate("/users/writepage",
                {
                    state: {
                        id:params.id,
                        title: view.title,
                        content: view.content,
                }
                })}
                >수정하기</button>
        </div>
        }
            </>
    )
} 

export default Posts;

// <p>{!params.hasOwnProperty('id') ? "없음" : params.id } : Content</p>