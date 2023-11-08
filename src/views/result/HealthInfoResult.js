import {useNavigate} from "react-router-dom";
import Header from "../../components/layouts/Header";

const HealthInfoResult = () => {

    return <div className='w-full h-screen'>
        <Header title='健康増進アプリ'/>
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>予測結果一覧</p>
            <div className='flex=col justify-around content-center mx-10'>
                <div className='flex justify-center content-center h-48 w-full bg-grey my-4 cursor-pointer' >
                    <div >健診情報入力の保存内容を 表示</div>
                </div>
            </div>
        </div>
    </div>
}

export default HealthInfoResult;