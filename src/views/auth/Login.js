import { useState } from 'react';
import Header from '../../components/layouts/Header';
import CustomButton from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import BorderLabelInput from '../../components/common/BorderLabelInput';
import { Input } from 'antd';
import useStore from '../../store';

const Login = () => {
	const setLoginInfo = useStore(store => store.auth.setLoginInfo);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const onFinishLogin = async () => {
		if (!Object.values(form).every(val => val)) return;
		const { data } = await axios.post(`/dj-rest-auth/login/`, form);
		setLoginInfo(data.access, data.user);
	};

	return (
		<div className='w-full h-screen'>
			<Header title='健康増進アプリ' />
			<div className='w-full flex-col justify-center content-center pt-1 bg-white'>
				<p className='text-black text-xl mt-4 mx-6'>ログイン</p>
				<div className='flex=col justify-around content-center mx-10'>
					<div className='h-8'></div>
					{/* <div className='text-warning'>※メールアドレスまたはパスワードが正しくありません</div> */}

					<BorderLabelInput
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						label='メールアドレス'
					/>
					<div className='h-4'></div>
					<div>パスワード</div>
					<Input.Password
						onChange={e => setForm({ ...form, password: e.target.value })}
						value={form.password}
						placeholder='パスワードを入力してください'
						iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
					/>
					<div className='h-8'></div>
					<CustomButton
						onClick={() => onFinishLogin()}
						disabled={!Object.values(form).every(val => val)}
						text='ログイン'
					/>
					<div className='h-8'></div>
					<div
						onClick={() => navigate('forgot-password')}
						className='text-primary underline cursor-pointer mb-4'
					>
						パスワードを忘れましたか？
					</div>
					<div
						onClick={() => navigate('register')}
						className='text-primary underline cursor-pointer'
					>
						アカウントを作成
					</div>
					<div className='h-12'></div>
				</div>
			</div>
		</div>
	);
};

export default Login;
