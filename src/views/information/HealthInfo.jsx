import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'
import CustomButton from "../../components/common/Button";
import Header from "../../components/layouts/Header"
import message from '../../components/common/Message';
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { DatePicker, Radio, Select, Steps } from 'antd';
import { useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'

const CustomInput = ({ label = '', type = 'text', value = '', onChange = () => { }, ph = '', unit = '', isLong = false }) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-[#757575] text-[12px]' >{label}</p>
            <div className="border-b border-[#0000006B] flex pb-1">
                <input
                    type={type}
                    onChange={onChange}
                    value={value}
                    className='w-full outline-none' placeholder={ph} />
                <p className={`text-[#757575] text-[14px] ${isLong && 'w-[60px]'}`}>{unit}</p>
            </div>
        </div>
    );
};

const CustomRadio = ({ question = '', value = '', ansver1Value = '1', ansver2Value = '2', answer1 = '', answer2 = '', onChanged = () => { } }) => {
    const onChange = (e) => {
        onChanged(e.target.value);
    };

    return <div className='flex flex-col justify-center content-center  text-base'>
        <p className='text-[#757575] text-[12px] mb-2' >{question}</p>
        <Radio.Group onChange={onChange} value={value}>
            <Radio value={ansver1Value}>{answer1}</Radio>
            <Radio value={ansver2Value}>{answer2}</Radio>
        </Radio.Group>
    </div>
}

const CustomSelect = ({ options = [], label = '', value = '', onChange = () => { } }) => {
    return (
        <div>
            <p className='text-[#757575] text-[12px] mb-2' >{label}</p>
            <Select
                style={{ width: '100%', borderBottom: '1px solid #0000006B', padding: '0 !important' }}
                showSearch
                placeholder=''
                bordered={false}
                onChange={onChange}
                optionFilterProp="children"
                suffixIcon={<FaCaretDown />}
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
                options={options}
                value={value}
            />
        </div>
    )
}

const HealthInfo = () => {
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState({})
    const navigate = useNavigate();


    const createHealthInfo = async () => {
        if (!data?.checked_date) { message('健診日 field should be filled', false) }
        const { data: resultData } = await axios.post('/api/healthcheckinfo/create/', data);
        if (resultData?.id) { navigate('/result') }
    }

    const items = [
        { title: '健診情報', element: <FirstStep data={data} setData={setData} /> },
        { title: '質問票①', element: <SecondStep data={data} setData={setData} /> },
        { title: '質問票②', element: <ThirdStep createInfo={createHealthInfo} /> },
    ];

    return (
        <>
            <Header title='健康増進アプリ' />
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
            <div className='border-b border-[#0000006B] pb-2'>
                <p className='text-[#757575] text-[12px] mb-2 relative'>
                    <span className="text-error absolute -top-1 left-[36px]">*</span>
                    健診日
                </p>
                <DatePicker
                    style={{ width: '100%', borderBottom: '1px solid  !important', padding: '0 !important' }}
                    bordered={false}
                    placeholder='2023-12-23'
                    value={data?.checked_date ? dayjs(data?.checked_date) : ''}
                    onChange={(_, dateString) => {
                        changeData(dateString, 'checked_date')
                    }} />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'height')}
                    value={data?.height || ''}
                    label="height"
                    type="number"
                    unit="cm"
                />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'weight')}
                    value={data?.weight || ''}
                    label="体重"
                    type="number"
                    unit="kg"
                />
            </div>
            <CustomRadio question='喫煙' answer1='はい' answer2='いいえ' />
            <CustomRadio question='飲酒' answer1='はい' answer2='いいえ' />
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'systolic_blood_pressure')}
                    value={data.systolic_blood_pressure || ''}
                    label="収縮期血圧"
                    unit="mmHg" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'diastolic_blood_pressure')}
                    value={data.diastolic_blood_pressure || ''}
                    label="拡張期血圧"
                    unit="mmHg" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'hdl_cholesterol')}
                    value={data.hdl_cholesterol || ''}
                    label="HDLコレステロール"
                    unit="mg/dl" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'ldl_cholesterol')}
                    value={data.ldl_cholesterol || ''}
                    label="LDLコレステロール"
                    unit="mg/dl" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'blood_glucose')}
                    value={data.blood_glucose || ''}
                    label="血糖"
                    unit="mg/dl" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'hba1c')}
                    value={data.hba1c || ''}
                    type='number'
                    label="HbA1c"
                    unit="%" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'medication_blood_pressure')}
                    value={data.medication_blood_pressure || ''}
                    label="服薬1"
                    unit="血圧" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'medication_blood_sugar')}
                    value={data.medication_blood_sugar || ''}
                    label="服薬2"
                    unit="血糖" />
            </div>
            <CustomSelect options={[
                {
                    value: '1',
                    label: 'Not Identified',
                },
                {
                    value: '2',
                    label: 'Closed',
                },
            ]}
                label="日の歩く時間"
                onChange={(value) => changeData(value, 'hihi')}
                value={data.hihi || ''}
            />
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
                <CustomInput label="GOT（AST）" unit="U/I" />
                <CustomInput label="GPT（ALT）" unit="U/I" />
            </div>
            <div className="flex gap-6">
                <CustomInput label="γ-GT(γ-GTP)" unit="U/I" />
                <div className="w-1/2"></div>
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

const SecondStep = ({ data, setData }) => {
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
            <CustomRadio
                onChanged={(e) => { changeData(e, 'test') }}
                value={data?.test || ''}
                question='血圧を下げる薬'
                ansver2Value='test2'
                ansver1Value='test'
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio question='インスリン注射又は血糖を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomRadio question='コレステロール・中性脂肪を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomRadio question='血圧を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomRadio question='インスリン注射又は血糖を下げる薬' answer1='はい' answer2='いいえ' />
            <CustomRadio question='コレステロール・中性脂肪を下げる薬' answer1='はい' answer2='いいえ' />
        </div>
    )
}

const ThirdStep = ({ createInfo, data, setData }) => {
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
            <CustomRadio question='20 歳の時の体重から10kg 以上増加している' answer1='はい' answer2='いいえ' />
            <CustomRadio question='1 回30 分以上の軽く汗をかく運動を週2 日以上、1 年以上実施している。' answer1='はい' answer2='いいえ' />
            <CustomRadio question='日常生活において歩行又は同等の身体活動を1 日1 時間以上実施している。' answer1='はい' answer2='いいえ' />
            <CustomRadio question='ほぼ同じ年齢の同性と比較して歩く速度が速い' answer1='はい' answer2='いいえ' />
            <CustomRadio question='この1 年間で体重の増減が±3 ㎏以上あった。' answer1='はい' answer2='いいえ' />
            <CustomButton onClick={createInfo} text='予測を行う' />
        </div>
    )
}



export default HealthInfo