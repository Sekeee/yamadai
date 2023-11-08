const BorderLabelInput = ({ label = '', underLabel = false, ph = '' }) => {
	return (
		<div className='relative'>
			<label
				className='border-label'
				for='first'
			>
				{label}
			</label>
			<input
				className='border-label-input outline-none w-full'
				type='text'
				placeholder={ph}
			/>
			{underLabel && <label className='text-[#00000099] font-[12px]'>{underLabel}</label>}
		</div>
	);
};

export default BorderLabelInput;
