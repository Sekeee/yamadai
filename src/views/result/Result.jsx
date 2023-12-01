import Header from "../../components/layouts/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Result = () => {
    const navigate = useNavigate();
    const [resultList, setResultList] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const { data } = await axios.get(`/api/healthcheckinfo/`,);
        setResultList(data)
    }


    return <div className='w-full h-screen'>
        <Header title='健康増進アプリ' />
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>予測結果一覧</p>
            <div className='flex=col justify-around content-center mx-10'>
                {
                    resultList?.map(({ checked_date, id }, index) => {
                        return (
                            <div onClick={() => navigate(`/predict-result?resultId=${id}&date=${checked_date}`)} className='flex justify-center items-center h-24 w-full bg-grey my-4 cursor-pointer' >
                                <div >予測結果サマリ{index} : {checked_date}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
}

export default Result;