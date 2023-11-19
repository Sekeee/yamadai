import Header from "../../components/layouts/Header"
import { Steps } from 'antd';
import { useState } from "react";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'
import CustomButton from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { Radio } from 'antd';
import axios from "axios";

const CustomInput = ({ label = '', value = '', onChange = () => { }, ph = '', unit = '', isLong = false }) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-[#757575] text-[12px]' >{label}</p>
            <div className="border-b border-[#0000006B] flex pb-1">
                <input
                    onChange={onChange}
                    value={value}
                    className='w-full outline-none' placeholder={ph} />
                <p className={`text-[#757575] text-[14px] ${isLong && 'w-[60px]'}`}>{unit}</p>
            </div>
        </div>
    );
};

const CustomTest = ({ question = '', answer1 = '', answer2 = ''  , onChanged = () => {}}) => {
    const [value, setValue] = useState(0);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        onChanged(e);
    };

    return <div className='flex flex-col justify-center content-center mt-4 text-base'>
        <div className='mb-2'>{question}</div>
        <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>{answer1}</Radio>
            <Radio value={2}>{answer2}</Radio>
        </Radio.Group>

    </div>
}


const HealthInfo = () => {
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState({})

    const items = [
        { title: '健診情報', element: <FirstStep data={data} setData={setData} /> },
        { title: '質問票①', element: <SecondStep /> },
        { title: '質問票②', element: <ThirdStep /> },
    ];

    return (
        <>
            <Header title='健康増進アプリ' />
            <div onClick={ async () => {
                console.log(data, 'check data')
                const { response } = await axios.post('/api/healthcheckinfo/create/' , data);
                console.log('setgel :' , response);

             }
            }>hi</div>
            <div className="flex flex-col gap-8 p-4 ">
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


const FirstStep = ({ data, setData }) => {
    const changeData = (value, key) => {
        setData((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    return (
        <div className="flex flex-col gap-6">
            <CustomInput
                onChange={(e) => changeData(e.target.value, '健診日')}
                value={data?.健診日 || ''}
                label="健診日"
                ph={"2023/08/17"}
            />
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, '身長')}
                    value={data?.身長 || ''}
                    label="身長"
                    unit="cm" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, '体重')}
                    value={data?.体重 || ''}
                    label="体重"
                    unit="kg" />
            </div>
            <CustomTest question='喫煙' answer1='はい'answer2='いいえ'/>
            <CustomTest question='飲酒' answer1='はい'answer2='いいえ'/>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, '腹囲')}
                    value={data?.腹囲 || ''}
                    label="腹囲"
                    unit="cm" />
                <div className="w-1/2"></div>
            </div>
            <CustomInput
                onChange={(e) => changeData(e.target.value, '既往歴')}
                value={data?.既往歴 || ''}
                label="既往歴" />

            {/* TODO */}

            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, '採血時間')}
                    value={data?.採血時間 || ''}
                    label="採血時間（食後）"
                    isLong unit="時間後"
                />
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
        <div className="flex flex-col gap-6">
            <CustomTest question='血圧を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomTest question='インスリン注射又は血糖を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomTest question='コレステロール・中性脂肪を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomTest question='血圧を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomTest question='インスリン注射又は血糖を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomTest question='コレステロール・中性脂肪を下げる薬' answer1='はい' answer2='いいえ' />


        </div>
    )
}

const ThirdStep = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-6">
            <CustomTest question='20 歳の時の体重から10kg 以上増加している' answer1='はい' answer2='いいえ' />
            <CustomTest question='1 回30 分以上の軽く汗をかく運動を週2 日以上、1 年以上実施している。' answer1='はい' answer2='いいえ' />
            <CustomTest question='日常生活において歩行又は同等の身体活動を1 日1 時間以上実施している。' answer1='はい' answer2='いいえ' />
            <CustomTest question='ほぼ同じ年齢の同性と比較して歩く速度が速い' answer1='はい' answer2='いいえ' />
            <CustomTest question='この1 年間で体重の増減が±3 ㎏以上あった。' answer1='はい' answer2='いいえ' />
            <CustomButton onClick={() => navigate('/result')} text='予測を行う' />
        </div>
    )
}



export default HealthInfo