import { Drawer } from 'antd';
import { TbMenu2 } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaHome, FaRegUser } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import useStore from '../../store';

const CustomDrawer = ({ setIsDrawerOpen, isDrawerOpen }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { email } = useStore(state => state.auth.refreshToken);

	const handleLogout = () => {
		useStore.setState({ auth: { token: null } });
		localStorage.clear();
		window.location.href = '/';
	};

	return (
		<Drawer
			title={false}
			placement='right'
			closable={false}
			width={360}
			onClose={() => {
				setIsDrawerOpen(false);
			}}
			open={isDrawerOpen}
			getContainer={false}
		>
			<div className='flex flex-col h-full'>
				<div className='flex px-5 flex-col items-start gap-5 border-b border-[rgba(0,0,0,0.20)] py-5'>
					<img
						src={'/images/logo.png'}
						className='h-[40px]'
						alt='logo'
					/>
					<div className='text-[rgba(52,52,52,0.70)] font-medium text-[14px]'>{email}</div>
				</div>

				<div className='border-b px-5 border-[rgba(0,0,0,0.20)] py-6 flex flex-col gap-4'>
					<div
						onClick={() => navigate('/')}
						className={`flex text-black ${
							pathname === '/' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<FaHome />
						<p>ホームページ</p>
					</div>
					<div
						onClick={() => navigate('/user-info')}
						className={`flex text-black ${
							pathname === '/user-info' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<FaRegUser />
						<p>ユーザ設定</p>
					</div>
					<div
						onClick={() => navigate('/result')}
						className={`flex text-black ${
							pathname === '/result' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<TbMenu2 />
						<p>予測結果サマリ</p>
					</div>
					<div
						className={`flex text-black ${
							pathname === '/feedback' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<IoDocumentTextOutline />
						<p>フィードバックサマリ</p>
					</div>
					<div
						onClick={() => navigate('/health-info')}
						className={`flex text-black ${
							pathname === '/health-info' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<FaListCheck />
						<p>health check</p>
					</div>
				</div>

				<div className='flex-1 flex items-end justify-center gap-2 '>
					<div
						onClick={handleLogout}
						className='flex items-center font-semibold text-black cursor-pointer border-t px-6 border-[rgba(0,0,0,0.20)] py-[40px] gap-3 w-full'
					>
						<FiLogOut />
						<div>ログアウト</div>
					</div>
				</div>
			</div>
		</Drawer>
	);
};

export default CustomDrawer;
