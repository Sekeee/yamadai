import {useState} from "react";
import Header from "../../components/layouts/Header";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import CustomButton from "../../components/common/Button";
import {useNavigate} from "react-router-dom";

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
			<div className='w-full flex-col justify-center content-center pt-1 bg-white border-2'>
				<p className='text-black text-xl'>ログイン</p>
				<div className='flex=col justify-around content-center'>
					 {/*<div className='text-warning'>※メールアドレスまたはパスワードが正しくありません</div> */}

					<CustomButton  onClick={() => navigate('verification')} text='ログイン'/>
					<div className='h-8'></div>
					<div className='text-primary underline cursor-pointer mb-4'>パスワードを忘れましたか？</div>
					<div className='text-primary underline cursor-pointer'>アカウントを作成</div>
					<div className='h-12'></div>
				</div>
			</div>
		</div>
	);
}
