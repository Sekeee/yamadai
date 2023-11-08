import Header from "../../components/layouts/Header";
import CustomButton from "../../components/common/Button";
import {useNavigate} from "react-router-dom";
import BorderLabelInput from "../../components/common/BorderLabelInput";

const ForgotPassword = () => {
    const navigate = useNavigate();

    return <div className='w-full h-screen'>
        <Header title='健康増進アプリ'/>
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>パスワード再設定①</p>
            <div className='flex=col justify-around content-center mx-10'>
                <div className='h-8'></div>
                {/*<div className='text-warning'>※メールアドレスまたはパスワードが正しくありません</div> */}
                <div>パスワードを再設定します。ご入力いただいたメールアドレス宛てに確認メールをお送りします。</div>
                <div className='h-4'></div>
                <BorderLabelInput label='メールアドレス'/>
                <div className='h-8'></div>
                <CustomButton onClick={() => navigate('verification')} text='メールを送信'/>

                <div className='h-8'></div>
                <div onClick={() => navigate('/')} className='text-primary underline cursor-pointer'>最初からやり直す</div>
                <div className='h-12'></div>
            </div>
        </div>
    </div>
}

export default ForgotPassword;