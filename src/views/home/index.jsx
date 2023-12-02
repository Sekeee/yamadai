import CustomDrawer from "../../components/common/Drawer";
import { IoDocumentTextOutline } from "react-icons/io5";
import Header from '../../components/layouts/Header';
import { useNavigate } from 'react-router-dom';
import { FaListCheck } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { TbMenu2 } from "react-icons/tb";
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => { checkUserInfo() }, [])

  const checkUserInfo = async () => {
    const { data } = await axios.get(`/api/user/`);
    const checkInfo = Object.entries(data)?.every(([key, value]) => {
      if (key === 'username') return true
      if (!value) { return false } else { return true }
    })

    if (!checkInfo) { navigate('/user-info') }
  }

  return (
    <div className='w-full h-screen relative'>
      <Header title='健康増進アプリ' withBackButton={false} setIsDrawerOpen={setIsDrawerOpen} />

      <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
        <p className='text-black text-xl mt-4 mx-6'>ホーム（仮案）</p>
        <div className='flex-col justify-around content-center mx-6 gap-4 flex mt-6'>
          <div onClick={() => navigate('/result')} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <TbMenu2 />
            <p>予測結果サマリ</p>
          </div>
          <div className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <IoDocumentTextOutline />
            <p>フィードバックサマリ</p>
          </div>
          <div onClick={() => navigate('/health-info')} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <FaListCheck />
            <p>health check</p>
          </div>
        </div>
      </div>

      <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
    </div>
  );
};

export default Home;