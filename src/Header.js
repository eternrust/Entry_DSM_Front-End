import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './header.css'

const Header = () => {
    const [cookies, removeCookie] = useCookies(['access_token']);
    let navigate = useNavigate();
    const Logout = () => {
        removeCookie('access_token',{ path: '/' });
        alert('로그아웃 하셨습니다.');
        navigate('/');
    }
    
    return (
        <div className='header'>
            <Link to='/'>
                <div className='logo'>
                    <div className='logo_icon'>
                        <svg width="20" height="21" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.1209 0.928558H28.5V25.8438H0.5C0.5 19.2358 3.41005 12.8986 8.58998 8.22605C13.7699 3.55355 20.7954 0.928558 28.1209 0.928558V0.928558Z" fill="#5F85BB"/>
                            <path d="M0.5 0.928558H0.879077C4.50631 0.928558 8.09802 1.57301 11.4491 2.82512C14.8003 4.07722 17.8452 5.91246 20.41 8.22605C22.9749 10.5396 25.0094 13.2863 26.3975 16.3091C27.7856 19.332 28.5 22.5718 28.5 25.8438H0.5V0.928558Z" fill="#8DAFF0"/>
                            <path d="M0.5 1.38614C15.7923 1.38614 21.122 16.4209 21.122 30.0715L0.5 26.1041V1.38614Z" fill="#477DE3"/>
                        </svg>
                    </div>
                    <span>Entry DSN</span>
                </div>
            </Link>
            
                { cookies['access_token'] ?
                <div className='login_box' style={{width:"300px"}}>
                <Link to='users/writepage'>게시글 작성</Link>
                <Link to='users/Mypage'>마이페이지</Link>
                <span style={{cursor:'pointer'}} onClick={() => Logout()}>로그아웃</span>
                </div>
                :
                <div className='login_box' style={{width:"200px"}}>
                    <Link to='users/signup'>회원가입</Link>
                    <span className='login_line'></span>
                    <Link to='users/login'>로그인</Link>
                </div>
                }
        </div>
    );
}

export default Header;