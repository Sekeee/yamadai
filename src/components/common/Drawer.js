import { Drawer } from 'antd';
import { TbMenu2 } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaRegPaperPlane, FaRegUser } from 'react-icons/fa';
import { FaListCheck, FaRepeat } from 'react-icons/fa6';
import { MdManageHistory } from 'react-icons/md';
import { LuNewspaper } from 'react-icons/lu';
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
			zIndex={2000}
			onClose={() => {
				setIsDrawerOpen(false);
			}}
			open={isDrawerOpen}
			getContainer={false}
		>
			<div className='flex flex-col h-full'>
				<div className='flex px-5 flex-col items-start gap-5 border-b border-[rgba(0,0,0,0.20)] py-5'>
					<a
						target={'_blank'}
						rel='noreferrer'
						href={'https://www.yamagata-u.ac.jp/jp/'}
					>
						<img
							src={'/images/logo.png'}
							className='h-[40px]'
							alt='logo'
						/>
					</a>
					<div className='text-[rgba(52,52,52,0.70)] font-medium text-[14px]'>ログインID: {email}</div>
				</div>

				<div className='border-b px-5 border-[rgba(0,0,0,0.20)] py-6 flex flex-col gap-4'>
					<div
						onClick={() => {
							if (pathname === '/') {
								setIsDrawerOpen(false);
							}
							navigate('/');
						}}
						className={`flex text-black ${
							pathname === '/' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<FaHome />
						<p>ホーム</p>
					</div>
					<div
						onClick={() => {
							if (pathname === '/user-info') {
								setIsDrawerOpen(false);
							}
							navigate('/user-info');
						}}
						className={`flex text-black ${
							pathname === '/user-info' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<FaRegUser />
						<p>ユーザ設定</p>
					</div>
					<div
						onClick={() => navigate('/health-info')}
						className={`flex text-black ${
							pathname === '/health-info' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<FaListCheck />
						<p>健康予測</p>
					</div>
					<div
						onClick={() => navigate('/result')}
						className={`flex text-black ${
							(pathname === '/result' || pathname === '/predict-result') && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<TbMenu2 />
						<p>予測結果</p>
					</div>

					<div
						onClick={() => navigate('/daily-habit')}
						className={`flex text-black ${
							pathname === '/daily-habit' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<FaRepeat />
						<p>生活習慣入力</p>
					</div>
					<div
						onClick={() => navigate('/daily-history')}
						className={`flex text-black ${
							pathname === '/daily-history' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<MdManageHistory />
						<p>過去の生活習慣</p>
					</div>
					<div
						onClick={() => navigate('/advice')}
						className={`flex text-black ${
							pathname === '/advice' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<LuNewspaper />
						<p>あなたへのアドバイス</p>
					</div>
					<div
						onClick={() => navigate('/notification')}
						className={`flex text-black ${
							pathname === '/notification' && '!bg-primary/20 !text-primary'
						} gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
					>
						<FaRegPaperPlane />
						<p>お知らせ</p>
					</div>
					{/* <div
                        className={`flex text-black ${
                            pathname === '/feedback' && '!bg-primary/20 !text-primary'
                        } gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
                    >
                        <IoDocumentTextOutline />
                        <p>行動記録の入力</p>
                    </div>
                    <div
                        className={`flex text-black ${
                            pathname === '/feedback' && '!bg-primary/20 !text-primary'
                        } gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
                    >
                        <IoDocumentTextOutline />
                        <p>あなたへのアドバイス</p>
                    </div>
                    <div
                        className={`flex text-black ${
                            pathname === '/feedback' && '!bg-primary/20 !text-primary'
                        } gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
                    >
                        <IoDocumentTextOutline />
                        <p>アンケートのお願い</p>
                    </div>
                    <div
                        className={`flex text-black ${
                            pathname === '/feedback' && '!bg-primary/20 !text-primary'
                        } gap-3 items-center px-4 py-3 cursor-pointer font-semibold rounded-[10px] `}
                    >
                        <IoDocumentTextOutline />
                        <p>問い合わせ</p>
                    </div> */}
				</div>
				<div
					onClick={handleLogout}
					className='flex items-center font-semibold cursor-pointer text-error px-6 py-[40px] gap-3 w-full'
				>
					<FiLogOut />
					<div>ログアウト</div>
				</div>
			</div>
		</Drawer>
	);
};

export default CustomDrawer;
