import Header from "../../components/layouts/Header";
import {Checkbox, Input} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import CustomButton from "../../components/common/Button";
import {useNavigate} from "react-router-dom";

export default function Register () {

    const navigate = useNavigate();

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onPrivacyAndPolicyChanged = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    return <div className='w-full h-screen'>
        <Header title='健康増進アプリ'/>
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>アカウント作成</p>
            <div className='flex=col justify-around content-center mx-10'>
                <div className='h-8'></div>
                {/*<div className='text-warning'>※メールアドレスまたはパスワードが正しくありません</div> */}

                <Input placeholder="メールを入力してください"/>
                <div className='h-4'></div>
                <Input placeholder="メールを入力してください"/>
                <div className='h-4'></div>
                <Input placeholder="メールを入力してください"/>
                <div className='text-xs text-grey'>もう一度入力してください</div>
                <div className='h-2'></div>
                <Checkbox onChange={onChange}>
                    <div className='flex'>
                        <div className='text-primary text-sm underline cursor-pointer'>利用規約</div>
                        <div className='text-sm text-black'>に同意します</div>
                    </div>
                </Checkbox>
                <div className='h-2'></div>
                <Checkbox onChange={onPrivacyAndPolicyChanged}>
                    <div className='flex'>
                        <div className='text-primary text-sm underline cursor-pointer'>プライバシーポリシー</div>
                        <div className='text-sm text-black'>に同意します</div>
                    </div>
                </Checkbox>
                <div className='h-6'></div>
                <CustomButton text='アカウントを作成する'/>
                <div onClick={() => navigate('/')} className='flex justify-center mt-4 text-primary cursor-pointer'>最初からやり直す</div>
            </div>
        </div>
    </div>
}