const CustomButton = ({ text = '', disabled = false, textColor, color = 'primary', onClick, variant = 'default' }) => {
	switch (variant) {
		case 'default':
			return (
				<div
					onClick={onClick}
					className={`p-4 ${
						disabled && '!bg-[#0000001F] !text-[#00000061] cursor-not-allowed'
					} py-2 rounded cursor-pointer bg-primary text-white flex items-center justify-center`}
					style={{
						backgroundColor: color !== 'primary' ? color : '',
						color: textColor !== 'primary' ? textColor : '',
					}}
				>
					{text}
				</div>
			);

		case 'outline':
			return (
				<div
					onClick={onClick}
					className={`p-4 py-2 rounded-lg cursor-pointer border-primary border text-primary flex items-center justify-center`}
					style={{
						backgroundColor: color !== 'primary' ? color : '',
						color: textColor !== 'primary' ? textColor : '',
					}}
				>
					{text}
				</div>
			);
		default:
			return '';
	}
};

export default CustomButton;
