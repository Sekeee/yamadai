import Header from "../../components/layouts/Header";
import CustomButton from "../../components/common/Button";
import BorderLabelInput from "../../components/common/BorderLabelInput";
import {useNavigate} from "react-router-dom";

export default function Verification () {
    const navigate = useNavigate();

    return <div className='w-full h-screen'>
        <Header title='健康増進アプリ'/>
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>ワンタイムパスワード入力</p>
            <div className='flex=col justify-around content-center mx-10'>
                <div className='h-8'></div>
                {/*<div className='text-warning'>※メールアドレスまたはパスワードが正しくありません</div> */}
                <div className='text-sm mb-4'>送信されたメールに記載されたワンタイムパスワードを入力してください</div>
                <BorderLabelInput label='ワンタイムパスワード' />
                <div className='h-8'></div>
                <CustomButton  onClick={() => navigate('/home')} text='ログイン'/>
                <div className='h-8'></div>
                <div className='text-primary underline cursor-pointer mb-4'>メールを再送信する</div>
                <div onClick={() => navigate('/')} className='text-primary underline cursor-pointer'>最初からやり直す</div>
                <div className='h-12'></div>
            </div>
        </div>
    </div>
}