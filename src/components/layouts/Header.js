import { GiHamburgerMenu } from 'react-icons/gi';

const Header = ({ title = '' }) => {
	return (
		<div className='flex gap-4 px-6 py-4 bg-primary text-white items-center'>
			<GiHamburgerMenu />
			{title}
		</div>
	);
};

export default Header;
