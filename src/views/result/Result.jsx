import Header from "../../components/layouts/Header";
import {useNavigate} from "react-router-dom";

const Result = () => {
    const navigate = useNavigate();

    return <div className='w-full h-screen'>
        <Header title='健康増進アプリ'/>
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>予測結果一覧</p>
            <div className='flex=col justify-around content-center mx-10'>
                <div onClick={() => navigate('/user-info')} className='flex justify-center content-center h-24 w-full bg-grey my-4 cursor-pointer' >
                    <div >予測結果サマリ①</div>
                </div>
                <div onClick={() => navigate('/health-info-result')} className='flex justify-center content-center h-24 w-full bg-grey my-4 cursor-pointer' >
                    <div>予測結果サマリ② </div>
                </div>

            </div>
        </div>
    </div>
}

export default Result;