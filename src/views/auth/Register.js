import Header from '../../components/layouts/Header';
import { Checkbox, Modal } from 'antd';
import CustomButton from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import BorderLabelInput from '../../components/common/BorderLabelInput';
import { useState } from 'react';
import Button from '../../components/common/Button';
import axios from 'axios';

const CustomModal = ({ isModalOpen, children, setIsModalOpen }) => {
	return (
		<Modal
			width={360}
			centered={true}
			closable={false}
			open={isModalOpen}
			footer={false}
			styles={{
				footer: {
					margin: 0,
				},
			}}
			onCancel={() => setIsModalOpen(false)}
		>
			{children}
		</Modal>
	);
};

const Register = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [agreement, setAgreement] = useState({
		agree: false,
		temsOfService: false,
	});

	const [form, setForm] = useState({
		email: '',
		password1: '',
		password2: '',
	});

	const [checkboxError, setCheckboxError] = useState(false);

	const checkIsDisabled = () => {
		const checkForm = Object.values(form).every(val => val);
		const checkAgreement = Object.values(agreement).every(val => val);
		return !(checkForm && checkAgreement);
	};

	const onFinishRegistration = async () => {
		if (!checkIsDisabled()) {
			setCheckboxError(false);

			const a = await axios.post(`/dj-rest-auth/registration/`, form);
			console.log(a, 'To be continued...');
		} else {
			setCheckboxError(true);
		}
	};

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			onFinishRegistration();
		}
	};

	return (
		<div className='w-full h-screen'>
			<Header title='健康増進アプリ' />
			<div className='w-full flex-col justify-center content-center pt-1 bg-white'>
				<p className='text-black text-xl mt-4 mb-8 mx-6'>アカウント作成</p>
				<div className='flex=col justify-around content-center mx-10'>
					<BorderLabelInput
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						label='メールアドレス'
					/>
					<div className='h-4'></div>
					<BorderLabelInput
						type='password'
						label='パスワード'
						value={form.password1}
						onChange={e => setForm({ ...form, password1: e.target.value })}
					/>
					<div className='h-4'></div>
					<BorderLabelInput
						type='password'
						label='パスワード'
						value={form.password2}
						onChange={e => setForm({ ...form, password2: e.target.value })}
						onKeyDown={handleKeyDown}
					/>
					<div className='text-xs mb-3 text-grey'>もう一度入力してください</div>
					<div className='h-2'></div>
					<Checkbox
						checked={agreement.agree}
						onChange={e => setAgreement({ ...agreement, agree: e.target.checked })}
					>
						<div className='flex'>
							<div
								onClick={() => setIsModalOpen(true)}
								className='text-primary text-sm underline cursor-pointer'
							>
								利用規約
							</div>
							<div className='text-sm text-black'>に同意します</div>
						</div>
					</Checkbox>
					<div className='h-2'></div>
					<Checkbox
						checked={agreement.temsOfService}
						onChange={e => setAgreement({ ...agreement, temsOfService: e.target.checked })}
					>
						<div className='flex'>
							<div
								onClick={() => setIsModalOpen(true)}
								className='text-primary text-sm underline cursor-pointer'
							>
								プライバシーポリシー
							</div>
							<div className='text-sm text-black'>に同意します</div>
						</div>
					</Checkbox>
					<div className='h-4'></div>
					{checkboxError && <div className='text-error'>Please check the checkboxes</div>}
					<div className='h-6'></div>
					<CustomButton
						onClick={onFinishRegistration}
						disabled={checkIsDisabled()}
						text='アカウントを作成する'
					/>
					<div
						onClick={() => navigate('/')}
						className='flex justify-center mt-4 text-primary cursor-pointer'
					>
						最初からやり直す
					</div>
				</div>
			</div>

			<CustomModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			>
				<p>利用規約</p>
				<div className='p-3 flex flex-col gap-4'>
					<p className='font-[14px]'>1. 規約 1</p>
					<p className='font-[14px] ml-4'>a. 項目</p>
					<p className='font-[14px]'>2. 規約 2</p>
					<p className='font-[14px] ml-4'>a. 項目</p>
					<p className='font-[14px] ml-4'>b. 項目</p>
				</div>
				<div className='flex gap-2 mt-6 items-end justify-end'>
					<Button
						onClick={() => setIsModalOpen(false)}
						variant='outline'
						text='閉じる'
					/>
					<Button
						onClick={() => setIsModalOpen(false)}
						text='同意する'
					/>
				</div>
			</CustomModal>
		</div>
	);
};

export default Register;
