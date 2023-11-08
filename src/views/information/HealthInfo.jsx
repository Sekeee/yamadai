import Header from "../../components/layouts/Header"
import { Steps } from 'antd';
import { useState } from "react";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'

const CustomInput = ({ label = '', ph = '', unit = '', isLong = false }) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-[#757575] text-[12px]' >{label}</p>
            <div className="border-b border-[#0000006B] flex pb-1">
                <input className='w-full outline-none' placeholder={ph} />
                <p className={`text-[#757575] text-[14px] ${isLong && 'w-[60px]'}`}>{unit}</p>
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
        <div className="flex flex-col gap-6">
            <CustomInput label="健診日" ph={"2023/08/17"} />
            <div className="flex gap-6">
                <CustomInput label="身長" unit="cm" />
                <CustomInput label="体重" unit="kg" />
            </div>
            <div className="flex gap-6">
                <CustomInput label="腹囲" unit="cm" />
                <div className="w-1/2"> </div>
            </div>
            <CustomInput label="既往歴" />

            {/* TODO */}

            <div className="flex gap-6">
                <CustomInput label="採血時間（食後）" isLong unit="時間後" />
                <CustomInput label="中性脂肪(トリグリセリド)" unit="mg/dl" />
            </div>
            <div className="flex gap-6">
                <CustomInput label="HDLコレステロール" unit="mg/dl" />
                <CustomInput label="LDLコレステロール" unit="mg/dl" />
            </div>
            <div className="flex gap-6">
                <CustomInput label="GOT（AST）" unit="U/I" />
                <CustomInput label="GPT（ALT）" unit="U/I" />
            </div>
            <div className="flex gap-6">
                <CustomInput label="γ-GT(γ-GTP)" unit="U/I" />
                <div className="w-1/2"></div>
            </div>


            <div className="flex gap-6">
                <CustomInput label="血糖" unit="mg/dl" />
                <CustomInput label="HbA1c" unit="%" />
            </div>
            <div className="flex gap-6">
                <CustomInput label="尿蛋白" unit="TODO" />
                <div className="w-1/2"></div>
            </div>


            <div className="flex gap-6">
                <CustomInput label="ヘマトクリット値" unit="%" />
                <CustomInput label="血色素量" unit="%" />
            </div>
            <div className="flex gap-6">
                <CustomInput label="赤血球数" unit="万/mm3" />
                <div className="w-1/2"></div>
            </div>
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