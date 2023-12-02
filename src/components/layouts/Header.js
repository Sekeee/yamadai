import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from 'react-icons/io5';

const Header = ({ title = '', withBackButton = true }) => {
	const navigate = useNavigate();
	return (
		<div className='flex gap-4 px-6 py-4 bg-primary text-white items-center'>
			{withBackButton && <IoChevronBack onClick={() => navigate(-1)} />}

			{title}
		</div>
	);
};

export default Header;
