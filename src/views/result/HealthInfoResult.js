import {useNavigate} from "react-router-dom";
import Header from "../../components/layouts/Header";

const HealthInfoResult = () => {

    return <div className='w-full h-screen'>
        <Header title='健康増進アプリ'/>
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <div className="flex gap-4 items-center">
                <p className="text-[20px]">健診情報詳細</p>
                <div className="border-primary text-[16px] border text-primary rounded-[40px] py-1 px-3">2023/08/17</div>
            </div>

            <div className='flex=col justify-around content-center mx-10'>
                <div className='flex justify-center content-center h-48 w-full bg-grey my-4 cursor-pointer' >
                    <div >健診情報入力の保存内容を 表示</div>
                </div>
            </div>
        </div>
    </div>
}

export default HealthInfoResult;