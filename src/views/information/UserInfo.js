import { Modal, TextInput } from '@mantine/core';
import { useState } from 'react';
import Button from '../../components/common/Button';
import Header from '../../components/layouts/Header';

const CustomInput = ({ label = '', ph = 'input', des = '' }) => {
	return (
		<TextInput
			styles={{
				wrapper: {
					padding: '2px 2px',
					borderBottom: '1px solid #0000006B',
				},
				label: {
					color: '#00000099',
					fontSize: '12px',
				},
				input: {
					width: '100%',
					outline: 'none',
				},
			}}
			label={label}
			placeholder={ph}
			description={des}
		/>
	);
};

const UserInfo = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Header title='健康増進アプリ' />
			<div className='p-2 px-4'>
				<p>ユーザー設定</p>
				<div className='p-3 flex flex-col gap-5'>
					<p className='text-primary'>基本情報を更新しました</p>
					<CustomInput
						label='メールアドレス'
						ph='kenkou_app@sample.com'
					/>

					<CustomInput
						label='お名前（ハンドルネーム）'
						ph='大田須太郎'
					/>
					<CustomInput
						label='生年月日'
						ph='1993/08/17'
					/>
					<div>
						<div className='text-[#00000099]'>性別</div>

						<div className='flex px-4 py-2 gap-8'>
							<div className='flex items-center gap-2 '>
								<input type={'radio'} />
								<div>女</div>
							</div>

							<div className='flex items-center gap-2 '>
								<input type={'radio'} />
								<div>男</div>
							</div>
						</div>
					</div>

					<Button text='保存' />

					<p
						onClick={() => setIsModalOpen(true)}
						className='cursor-pointer mt-10 underline decoration-primary underline-offset-4 text-primary'
					>
						メールアドレスを変更する
					</p>
					<p className='cursor-pointer underline decoration-primary underline-offset-4 text-primary'>パスワードを変更する</p>
					<p className='cursor-pointer underline decoration-error underline-offset-4 text-error'>アカウントを削除する</p>
				</div>
			</div>

			<Modal
				opened={true}
				title='Authentication'
				centered
				onClose={() => {}}
			>
				matarjingoo
			</Modal>
		</>
	);
};

export default UserInfo;
