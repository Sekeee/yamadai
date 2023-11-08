import { TextInput } from '@mantine/core';

export default function Login() {
	return (
		<div className='flex w-1/2 justify-center pt-12'>
			<div className='bg-blue-300'>
				<TextInput
					label='Mail address'
					description='Input description'
					placeholder='Input placeholder'
				/>
			</div>
		</div>
	);
}
