import { useState } from 'react';
import Button from '../../components/common/Button';
import Header from '../../components/layouts/Header';
import { Modal } from 'antd';
import BorderLabelInput from '../../components/common/BorderLabelInput';

const CustomInput = ({ label = '', ph = 'input' }) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-[#00000061] text-[12px]' >{label}</p>
            <input className='border-b border-[#0000006B] w-full outline-none' placeholder={ph} />
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
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);



    return (
        <>
            <Header title='健康増進アプリ' />
            <div className='p-2 px-4'>
                <p>ユーザー設定</p>
                <div className='p-3 flex flex-col gap-5'>
                    <p className='text-primary'>基本情報を更新しました</p>
                    <CustomInput
                        label='メールアドレス'
                        ph='kenkou_app@sample.com'
                    />

                    <CustomInput
                        label='お名前（ハンドルネーム）'
                        ph='大田須太郎'
                    />
                    <CustomInput
                        label='生年月日'
                        ph='1993/08/17'
                    />
                    <div>
                        <div className='text-[#00000099]'>性別</div>

                        <div className='flex px-4 py-2 gap-8'>
                            <div className='flex items-center gap-2 '>
                                <input type={'radio'} />
                                <div>女</div>
                            </div>

                            <div className='flex items-center gap-2 '>
                                <input type={'radio'} />
                                <div>男</div>
                            </div>
                        </div>
                    </div>

                    <Button text='保存' />

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
                    <p className='font-[14px] text-error'>※現在のパスワードが違います</p>
                    <div className='mt-4'>
                        <BorderLabelInput label='現在のパスワード' />
                    </div>
                    <div className='mt-4'>
                        <BorderLabelInput label='新しいパスワード' />
                    </div>
                    <div className='mt-4'>
                        <BorderLabelInput label='新しいパスワード' underLabel="もう一度入力してください" />
                    </div>
                </div>
                <div className='flex gap-2 mt-6 items-end justify-end'>
                    <Button onClick={() => setIsPasswordOpen(false)} variant='outline' text='戻る' />
                    <Button onClick={() => setIsPasswordOpen(false)} text='変更する' />
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
