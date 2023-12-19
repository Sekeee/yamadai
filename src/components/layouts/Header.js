import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';
import { IoMenu } from 'react-icons/io5';

const Header = ({ title = '', withDrawer = true, setIsDrawerOpen = () => {}, withBackButton = true }) => {
	const navigate = useNavigate();

	return (
		<div className='flex gap-4 px-6 py-4 bg-primary text-white items-center'>
			{withBackButton && <IoChevronBack onClick={() => navigate(-1)} />}
			<div
				className='cursor-pointer'
				onClick={() => navigate('/')}
			>
				{title}
			</div>

			{withDrawer && (
				<div className='flex-1 w-full flex justify-end text-[20px]'>
					<IoMenu
						onClick={() => setIsDrawerOpen(true)}
						className='cursor-pointer'
					/>
				</div>
			)}
		</div>
	);
};

export default Header;
