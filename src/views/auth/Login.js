import {useState} from "react";
import Header from "../../components/layouts/Header";
import CustomButton from "../../components/common/Button";
import {useNavigate} from "react-router-dom";

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

export default function Login() {
	const [ email , setEmail ] = useState();
	const [ password , setPassword ] = useState();
	const [ isDisabled , setIsDisabled] = useState(true);
	const [isVisible , setIsvisible] = useState(false);

	const toggleVisibility = () => {
		setIsvisible((prevVisible) => !prevVisible);
	};

	const navigate = useNavigate();

	return (
		<div className='w-full h-screen'>
			<Header title='健康増進アプリ'/>
			<div className='w-full flex-col justify-center content-center pt-1 bg-white'>
				<p className='text-black text-xl mt-4 mx-6'>ログイン</p>
				<div className='flex=col justify-around content-center mx-10'>
					<div className='h-8'></div>
					 {/*<div className='text-warning'>※メールアドレスまたはパスワードが正しくありません</div> */}

					<Input
						placeholder="メールを入力してください"/>
					<div className='h-4'></div>
					<div>パスワード</div>
					<Input.Password
						onChange={(value) => setPassword(value)}
						placeholder="パスワードを入力してください"
						iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					/>
					<div className='h-8'></div>
					<CustomButton  onClick={() => navigate('verification')} text='ログイン'/>
					<div className='h-8'></div>
					<div className='text-primary underline cursor-pointer mb-4'>パスワードを忘れましたか？</div>
					<div onClick={() => navigate('register')} className='text-primary underline cursor-pointer'>アカウントを作成</div>
					<div className='h-12'></div>
				</div>
			</div>
		</div>
	);
}
