import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const BorderLabelInput = ({ label = '', type = 'text', onChange, onKeyDown, value, underLabel = false, ph = '' }) => {
  const isPasswordInput = type === 'password';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <label className='border-label' htmlFor='first'>
        {label}
      </label>
      {isPasswordInput ? (
        <div className='relative'>
          <input
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown} // Handle onKeyDown event
            type={showPassword ? 'text' : 'password'}
            className='border-label-input outline-none w-full bg-none hover:bg-none pr-10 focus:border-primary'
            placeholder={ph}
          />
          <div
            className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
          </div>
        </div>
      ) : (
        <input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown} // Handle onKeyDown event
          className='border-label-input outline-none w-full focus:border-primary'
          type='text'
          placeholder={ph}
        />
      )}
      {underLabel && <label className='text-[#00000099] font-[12px]'>{underLabel}</label>}
    </div>
  );
};

export default BorderLabelInput;
