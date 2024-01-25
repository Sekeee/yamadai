import CustomDrawer from "../../components/common/Drawer";
import Header from '../../components/layouts/Header';
import { useNavigate } from 'react-router-dom';
import { FaListCheck, FaRepeat } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { TbMenu2 } from "react-icons/tb";
import axios from 'axios';
import { MdManageHistory } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa";
import { LuNewspaper } from "react-icons/lu";

const Home = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => { checkUserInfo() }, [])

  const checkUserInfo = async () => {
    const { data: { birth_date, email, gender, handle_name } } = await axios.get(`/api/user/`);
    const newData = {
      birth_date: birth_date,
      email: email,
      gender: gender,
      handle_name: handle_name
    }

    const checkInfo = Object.entries(newData)?.every(([key, value]) => {
      if (!value) { return false } else { return true }
    })

    if (!checkInfo) { navigate('/user-info') }
  }

  return (
    <div className='w-full h-screen relative'>
      <Header title='健康増進アプリ' withBackButton={false} setIsDrawerOpen={setIsDrawerOpen} />

      <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
        <p className='text-black text-xl mt-4 mx-6'>ホーム</p>
        <div className='flex-col justify-around content-center mx-6 gap-4 flex mt-6'>
          <div onClick={() => navigate('/health-info')} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <FaListCheck />
            <p>健康予測</p>
          </div>
          <div onClick={() => navigate('/result')} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <TbMenu2 />
            <p>予測結果</p>
          </div>
          <div onClick={() => navigate('/daily-habit')} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <FaRepeat />
            <p>生活習慣入力</p>
          </div>
          <div onClick={() => navigate('/daily-history')} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <MdManageHistory />
            <p>過去の生活習慣</p>
          </div>
          <div onClick={() => navigate('/advice')} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <LuNewspaper />
            <p>あなたへのアドバイス</p>
          </div>
          <div onClick={() => navigate('/notification')} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
            <FaRegPaperPlane />
            <p>お知らせ</p>
          </div>


          {/* <div className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
                        <IoDocumentTextOutline />
                        <p>行動記録の入力</p>
                    </div>
                    <div className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
                        <IoDocumentTextOutline />
                        <p>あなたへのアドバイス</p>
                    </div>
                    <div className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
                        <IoDocumentTextOutline />
                        <p>アンケートのお願い</p>
                    </div>
                    <div className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
                        <IoDocumentTextOutline />
                        <p>問い合わせ</p>
                    </div> */}
        </div>
      </div>

      <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
    </div>
  );
};

export default Home;