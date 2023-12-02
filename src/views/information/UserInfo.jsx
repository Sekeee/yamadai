import { useEffect, useState } from 'react';
import Button from '../../components/common/Button';
import Header from '../../components/layouts/Header';
import { DatePicker, Modal } from 'antd';
import BorderLabelInput from '../../components/common/BorderLabelInput';
import axios from 'axios';
import dayjs from 'dayjs'
import message from '../../components/common/Message';
import { useNavigate } from 'react-router-dom';

const CustomInput = ({ label = '', value = '', onChange = () => { }, placeholder = 'input' }) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-[#00000061] text-[12px]' >{label}</p>
            <input value={value || ''} onChange={onChange} className='border-b border-[#0000006B] w-full outline-none' placeholder={placeholder} />
        </div>
    );
};


const CustomModal = ({ isModalOpen, children, setIsModalOpen }) => {
    return (
        <Modal
            width={360}
            centered={true}
            closable={false}
            open={isModalOpen}
            footer={false}
            styles={{
                footer: {
                    margin: 0,
                },
            }}
            onCancel={() => setIsModalOpen(false)}
        >
            {children}
        </Modal>
    )
}

const UserInfo = () => {
    const navigate = useNavigate()

    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [userInfo, setUserInfo] = useState({})
    const [password, setPassword] = useState({
        new_password1: '',
        new_password2: '',
        old_password: ''
    });

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const { data } = await axios.get(`/api/user/`);
        setUserInfo(data)
    }

    const saveData = async () => {
        if (!checkSendValidation()) return;
        const { data } = await axios.patch(`/api/user/`, userInfo);
        setUserInfo(data)
        navigate('/')
    }

    const changeUserInfo = (value, key) => {
        setUserInfo((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const changePassword = async () => {
        if (passwordValidation()) return;
        const { data } = await axios.post(`/dj-rest-auth/password/change/`, password);
        message(data.detail, true)
        setIsPasswordOpen(false)
        setPassword({
            new_password1: '',
            new_password2: '',
            old_password: ''
        })
    }

    const onChangePassword = (value, key) => {
        setPassword((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    const passwordValidation = () => {
        const check = Object.values(password).every(val => val)
        const checkNewPass = password.new_password1 === password.new_password2

        return !(check && checkNewPass)
    }


    const checkSendValidation = () => {
        return Object.entries(userInfo)?.every(([key, value]) => {
            if (key === 'username') return true
            if (!value) {
                return false
            } else {
                return true
            }
        })
    }

    return (
        <>
            <Header title='健康増進アプリ' />
            <div className='p-2 px-4'>
                <p>ユーザー設定</p>
                <div className='p-3 flex flex-col gap-5'>
                    <p className='text-primary'>基本情報を更新しました</p>
                    <CustomInput
                        value={userInfo.email}
                        onChange={(e) => changeUserInfo(e.target.value, 'email')}
                        label='メールアドレス'
                        placeholder='kenkou_app@sample.com'
                    />

                    <CustomInput
                        value={userInfo.handle_name}
                        onChange={(e) => changeUserInfo(e.target.value, 'handle_name')}
                        label='お名前（ハンドルネーム）'
                        placeholder='大田須太郎'
                    />

                    <div className='border-b border-[#0000006B] pb-2'>
                        <p className='text-[#757575] text-[12px] mb-2'> 生年月日 </p>
                        <DatePicker
                            style={{ width: '100%', borderBottom: '1px solid  !important', padding: '0 !important' }}
                            bordered={false}
                            placeholder='2023-12-23'
                            value={userInfo.birth_date ? dayjs(userInfo.birth_date) : ''}
                            onChange={(_, dateString) => {
                                changeUserInfo(dateString, 'birth_date')
                            }} />
                    </div>

                    <div>
                        <div className='text-[#00000099]'>性別</div>
                        <div className='flex px-4 py-2 gap-8'>
                            <div className='flex items-center gap-2 '>
                                <input onChange={() => { changeUserInfo(2, 'gender') }} checked={userInfo.gender === 2} type={'radio'} />
                                <div>女</div>
                            </div>

                            <div className='flex items-center gap-2 '>
                                <input onChange={() => { changeUserInfo(1, 'gender') }} checked={userInfo.gender === 1} type={'radio'} />
                                <div>男</div>
                            </div>
                        </div>
                    </div>

                    <Button disabled={!checkSendValidation()} onClick={saveData} text='保存' />

                    <p
                        onClick={() => setIsEmailOpen(true)}
                        className='cursor-pointer mt-10 underline decoration-primary underline-offset-4 text-primary'
                    >
                        メールアドレスを変更する
                    </p>
                    <p
                        onClick={() => setIsPasswordOpen(true)}
                        className='cursor-pointer underline decoration-primary underline-offset-4 text-primary'
                    >
                        パスワードを変更する
                    </p>
                    <p
                        onClick={() => setIsDeleteOpen(true)}
                        className='cursor-pointer underline decoration-error underline-offset-4 text-error'
                    >
                        アカウントを削除する
                    </p>

                </div>
            </div>


            <CustomModal isModalOpen={isEmailOpen} setIsModalOpen={setIsEmailOpen} >
                <p>メールアドレス変更</p>
                <div className='p-3 flex flex-col gap-4'>
                    <p className='font-[14px]'>ご入力いただいたメールアドレス宛てに確認メールをお送りします。</p>
                    <p className='font-[14px] text-error'>※登録済みのメールアドレスです</p>
                    <p className='font-[14px] text-error'>※メールアドレスが正しくありません</p>
                    <div className='mt-4'>
                        <BorderLabelInput label='メールアドレス' />
                    </div>
                </div>
                <div className='flex gap-2 mt-6 items-end justify-end'>
                    <Button onClick={() => setIsEmailOpen(false)} variant='outline' text='戻る' />
                    <Button onClick={() => setIsEmailOpen(false)} text='確認メールを送信する' />
                </div>
            </CustomModal>

            <CustomModal isModalOpen={isPasswordOpen} setIsModalOpen={setIsPasswordOpen} >
                <p>パスワード変更</p>
                <div className='p-3 flex flex-col gap-4'>
                    {/* <p className='font-[14px] text-error'>※現在のパスワードが違います</p> */}
                    <div className='mt-4'>
                        <BorderLabelInput
                            type='password'
                            onChange={(e) => { onChangePassword(e.target.value, 'old_password') }}
                            value={password.old_password}
                            label='現在のパスワード' />
                    </div>
                    <div className='mt-4'>
                        <BorderLabelInput
                            type='password'
                            onChange={(e) => { onChangePassword(e.target.value, 'new_password1') }}
                            value={password.new_password1}
                            label='新しいパスワード' />
                    </div>
                    <div className='mt-4'>
                        <BorderLabelInput
                            type='password'
                            onChange={(e) => { onChangePassword(e.target.value, 'new_password2') }}
                            value={password.new_password2}
                            label='新しいパスワード' underLabel="もう一度入力してください" />
                    </div>
                </div>
                <div className='flex gap-2 mt-6 items-end justify-end'>
                    <Button onClick={() => setIsPasswordOpen(false)} variant='outline' text='戻る' />
                    <Button disabled={passwordValidation()} onClick={changePassword} text='変更する' />
                </div>
            </CustomModal>

            <CustomModal isModalOpen={isDeleteOpen} setIsModalOpen={setIsDeleteOpen} >
                <p className='text-[20px]'>アカウント削除</p>
                <p className='font-[16px] mt-3'>アカウントを削除します。よろしいですか？</p>
                <p className='font-[16px] mt-6 text-error'>※パスワードが違います</p>
                <div className='mt-8'>
                    <BorderLabelInput label='パスワード' />
                </div>
                <div className='flex gap-2 mt-6 items-end justify-end'>
                    <Button onClick={() => setIsDeleteOpen(false)} variant='outline' text='戻る' />
                    <Button color='#D32F2F' onClick={() => setIsDeleteOpen(false)} text='削除する' />
                </div>
            </CustomModal>
        </>
    );
};

export default UserInfo;
