import CustomDrawer from "../../components/common/Drawer";
import Header from '../../components/layouts/Header';
import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";

const Advice = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [adviceData, setAdviceData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const { data: res } = await axios.get(`/api/personaladvice/`);
            setAdviceData(res)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-screen relative'>
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />

            <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
                <p className='text-black text-xl mt-4 mx-6'>あなたへのアドバイス</p>
                <div className='flex-col flex gap-4 justify-around content-center mx-6 mt-6'>
                    {
                        adviceData?.map(({ id, title, sent_at, is_read }, index) => {
                            return (
                                <div key={index} onClick={() => navigate(`/advice-detail?adviceId=${id}&active`)} className='flex bg-primary gap-3 relative items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
                                    <FiCalendar />
                                    <div>{title}</div>
                                    <div className="flex-1 text-end text-[#FFFFFFCC]">{sent_at?.split('T')?.[0] || ''}</div>
                                    {!is_read && <div className="absolute -right-0.5 -top-1 p-1 bg-error rounded-full text-xs">新</div>}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
    );
};

export default Advice;