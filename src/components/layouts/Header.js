import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { IoMenu } from 'react-icons/io5';

const Header = ({ title = '', withDrawer = true, setIsDrawerOpen = () => {}, withBackButton = true }) => {
	const navigate = useNavigate();

	return (
		<div className='flex gap-4 px-6 py-4 bg-primary text-white items-center'>
			{withBackButton && (
				<div
					onClick={() => navigate(-1)}
					className='cursor-pointer relative '
				>
					<IoChevronBack />
					<div className='text-[10px] flex absolute w-[30px]'>戻る</div>
				</div>
			)}
			<div
				className='cursor-pointer'
				onClick={() => navigate('/')}
			>
				{title}
			</div>

			{withDrawer && (
				<div
					onClick={() => setIsDrawerOpen(true)}
					className='flex-1 w-full relative flex justify-end text-[20px]'
				>
					<IoMenu className='cursor-pointer' />
					<div className='text-[10px] absolute -bottom-3 cursor-pointer -right-1'>メニュ</div>
				</div>
			)}
		</div>
	);
};

export default Header;
