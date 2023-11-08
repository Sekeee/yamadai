import Header from "../../components/layouts/Header";
import {Checkbox, Input, Modal} from "antd";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import CustomButton from "../../components/common/Button";
import {useNavigate} from "react-router-dom";
import BorderLabelInput from "../../components/common/BorderLabelInput";
import {useState} from "react";
import Button from "../../components/common/Button";


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

const Register = () => {

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onPrivacyAndPolicyChanged = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };

    return <div className='w-full h-screen'>
        <Header title='健康増進アプリ'/>
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>アカウント作成</p>
            <div className='flex=col justify-around content-center mx-10'>
                <div className='h-8'></div>
                {/*<div className='text-warning'>※メールアドレスまたはパスワードが正しくありません</div> */}

                <BorderLabelInput label='メールアドレス'/>
                <div className='h-4'></div>
                <BorderLabelInput label='パスワード'/>
                <div className='h-4'></div>
                <BorderLabelInput label='パスワード'/>
                <div className='text-xs text-grey'>もう一度入力してください</div>
                <div className='h-2'></div>
                <Checkbox onChange={onChange}>
                    <div className='flex'>
                        <div onClick={showModal} className='text-primary text-sm underline cursor-pointer'>利用規約</div>

                        <div className='text-sm text-black'>に同意します</div>
                    </div>
                </Checkbox>
                <div className='h-2'></div>
                <Checkbox onChange={onPrivacyAndPolicyChanged}>
                    <div className='flex'>
                        <div onClick={showModal}  className='text-primary text-sm underline cursor-pointer'>プライバシーポリシー</div>
                        <div className='text-sm text-black'>に同意します</div>
                    </div>
                </Checkbox>
                <div className='h-6'></div>
                <CustomButton text='アカウントを作成する'/>
                <div onClick={() => navigate('/')} className='flex justify-center mt-4 text-primary cursor-pointer'>最初からやり直す</div>
            </div>
        </div>

        {/* Modal */}
        <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
            <p>利用規約</p>
            <div className='p-3 flex flex-col gap-4'>
                <p className='font-[14px]'>1. 規約 1</p>
                <p className='font-[14px] ml-4'>a. 項目</p>
                <p className='font-[14px]'>2. 規約 2</p>
                <p className='font-[14px] ml-4'>a. 項目</p>
                <p className='font-[14px] ml-4'>b. 項目</p>
            </div>
            <div className='flex gap-2 mt-6 items-end justify-end'>
                <Button onClick={() => setIsModalOpen(false)} variant='outline' text='閉じる' />
                <Button onClick={() => setIsModalOpen(false)} text='同意する' />
            </div>
        </CustomModal>

    </div>
}

export default Register;