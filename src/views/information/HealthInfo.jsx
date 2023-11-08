import Header from "../../components/layouts/Header"
import { Steps } from 'antd';
import { useState } from "react";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'

const CustomInput = ({ label = '', ph = 'input', unit = '' }) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-[#00000061] text-[12px]' >{label}</p>
            <div className="border-b border-[#0000006B]">
                <input className='w-full outline-none' placeholder={ph} />
                <p>{unit}</p>
            </div>
        </div>
    );
};


const HealthInfo = () => {
    const [current, setCurrent] = useState(0);

    const items = [
        { title: '健診情報', element: <FirstStep /> },
        { title: '質問票①', element: <SecondStep /> },
        { title: '質問票②', element: <ThirdStep /> },
    ];

    return (
        <>
            <Header title='健康増進アプリ' />
            <div className="flex flex-col gap-8 p-4">
                <p>健診情報入力</p>
                <Steps current={current} onChange={(e) => setCurrent(e)} labelPlacement="vertical" items={items} />

                {items?.[current]?.element}

                <div className="flex justify-between">
                    <div
                        onClick={() => {
                            if (current - 1 < 0) return
                            setCurrent(current - 1)
                        }}
                        className={`flex text-primary ${current === 0 && '!text-[#00000061]'}  gap-2 items-center text-[14px] cursor-pointer`}>
                        <BiChevronLeft size={18} />
                        <p>戻る</p>
                    </div>
                    <div>{current + 1}/{items.length}</div>
                    <div
                        onClick={() => {
                            if (current + 1 >= items.length) return
                            setCurrent(current + 1)
                        }}
                        className={`flex text-primary ${current === 2 && '!text-[#00000061]'} gap-2 items-center text-[14px] cursor-pointer`}>
                        <p>次へ</p>
                        <BiChevronRight size={18} />
                    </div>
                </div>
            </div>

        </>
    )
}


const FirstStep = () => {
    return (
        <div>
            <CustomInput label="健診日" ph={"2023/08/17"} />
        </div>
    )
}

const SecondStep = () => {
    return (
        <div>fuck</div>
    )
}

const ThirdStep = () => {
    return (
        <div>kjsjnfd</div>
    )
}



export default HealthInfo