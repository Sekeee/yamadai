import CustomDrawer from "../../components/common/Drawer";
import Header from "../../components/layouts/Header";
import { useNavigate } from "react-router-dom";
import { FiCalendar } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";

const Result = () => {
    const navigate = useNavigate();
    const [resultList, setResultList] = useState([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        const { data } = await axios.get(`/api/healthcheckinfo/`,);
        setResultList(data)
    }


    return <div className='w-full h-screen relative'>
        <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>予測結果一覧</p>
            <div className='flex-col flex gap-4 justify-around content-center mx-6 mt-6'>
                {
                    resultList?.map(({ checked_date, id }, index) => {
                        return (
                            <div key={index} onClick={() => navigate(`/predict-result?resultId=${id}&date=${checked_date}`)} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
                                <FiCalendar />
                                <div>予測結果{index + 1}</div>
                                <div className="flex-1 text-end text-[#FFFFFFCC]">{checked_date}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
    </div>
}
 
export default Result;