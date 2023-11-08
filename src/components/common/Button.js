const CustomButton = ({ text = 'button', onClick }) => {
	return (
		<div
			onClick={onClick}
			className=' p-4 py-2 rounded-lg cursor-pointer bg-primary '
		>
			{text}
		</div>
	);
};

export default CustomButton;
