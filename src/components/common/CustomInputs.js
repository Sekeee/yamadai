import { FaCaretDown } from 'react-icons/fa';
import { Radio, Select } from 'antd';

export const CustomInput = ({ label = '', type = 'text', value = '', onChange = () => {}, ph = '', unit = '', isLong = false }) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-[#757575] text-[12px]'>{label}</p>
			<div className='border-b border-[#0000006B] flex pb-1'>
				<input
					type={type}
					onChange={e => {
						if (type === 'number' && e.target.value?.length > 5) {
							return;
						}
						onChange(e);
					}}
					value={value}
					className='w-full outline-none'
					placeholder={ph}
				/>
				<p className={`text-[#757575] text-[14px] ${isLong && 'w-[60px]'}`}>{unit}</p>
			</div>
		</div>
	);
};

export const CustomRadio = ({ question = '', value = '', answer1Value = '1', answer2Value = '2', answer1 = '', answer2 = '', onChanged = () => {} }) => {
	const onChange = e => {
		onChanged(Number(e.target.value));
	};

	const checkClicked = val => {
		if (val === value) {
			onChanged(null);
		}
	};

	return (
		<div className='flex flex-col justify-center content-center  text-base'>
			<p className='text-[#757575] text-[12px] mb-2'>{question}</p>
			<Radio.Group
				onChange={onChange}
				value={value}
			>
				<Radio
					onClick={() => checkClicked(answer1Value)}
					value={answer1Value}
				>
					{answer1}
				</Radio>
				<Radio
					onClick={() => checkClicked(answer2Value)}
					value={answer2Value}
				>
					{answer2}
				</Radio>
			</Radio.Group>
		</div>
	);
};

export const CustomSelect = ({ options = [], label = '', value = '', onChange = () => {} }) => {
	return (
		<div>
			<p className='text-[#757575] text-[12px] mb-2'>{label}</p>
			<Select
				style={{ width: '100%', borderBottom: '1px solid #0000006B', padding: '0 !important' }}
				showSearch={false}
				placeholder=''
				bordered={false}
				onChange={onChange}
				optionFilterProp='children'
				suffixIcon={<FaCaretDown />}
				options={options}
				value={value}
			/>
		</div>
	);
};
