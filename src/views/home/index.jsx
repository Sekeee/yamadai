import Header from '../../components/layouts/Header';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    useStore.setState({ auth: { token: null } });
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className='w-full h-screen'>
      <Header title='健康増進アプリ' />
      <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
        <p className='text-black text-xl mt-4 mx-6'>ホーム（仮案）</p>
        <div className='flex=col justify-around content-center mx-10'>
          <div onClick={() => navigate('/user-info')} className='flex justify-center content-center h-36 w-full bg-grey my-4 cursor-pointer'>
            <div>User Info Screen</div>
          </div>
          <div onClick={() => navigate('/health-info')} className='flex justify-center content-center h-36 w-full bg-grey my-4 cursor-pointer'>
            <div>Health Check Screen</div>
          </div>

          {/* Logout Button */}
          <div onClick={handleLogout} className='flex items-center justify-center bg-error rounded-lg px-4 py-2 text-white'>
            <div>ログアウト</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
