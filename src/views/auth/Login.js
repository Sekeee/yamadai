import {Button, PasswordInput, TextInput} from '@mantine/core';
import {useState} from "react";
import Header from "../../components/layouts/Header";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

export default function Login() {
	const [ email , setEmail ] = useState();
	const [ password , setPassword ] = useState();
	const [ isDisabled , setIsDisabled] = useState(true);
	const [isVisible , setIsvisible] = useState(false);


	return (
		<div className='w-full h-screen'>
			<Header title='健康増進アプリ'/>
			<div className='w-full flex-col justify-center content-center pt-1 bg-white border-2'>
				<p className='text-black h-6'>ログイン</p>
				<div className='flex=col justify-around content-center'>
					<TextInput
						label="Mail address"
					/>
					<div className='h-12'></div>
					<PasswordInput
						label="Password"
						required={true}
						onVisibilityChange={() => setIsvisible(!isVisible)}
						visibilityToggleIcon={isVisible ? <AiFillEye/> : <AiFillEyeInvisible/>}
					/>
					<Button className={`my-6 ${isDisabled ? 'text-black bg-gray-400' : 'text-white bg-blue-400' } `} disabled={isDisabled} variant="filled">ログイン</Button>
					<div className='text-primary underline cursor-pointer mb-4'>パスワードを忘れましたか？</div>
					<div className='text-primary underline cursor-pointer'>アカウントを作成</div>
					<div className='h-12'></div>
				</div>
			</div>
		</div>
	);
}
