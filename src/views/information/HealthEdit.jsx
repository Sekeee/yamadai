import { useNavigate, useSearchParams } from "react-router-dom";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'
import CustomButton from "../../components/common/Button";
import CustomDrawer from '../../components/common/Drawer'
import { DatePicker, Radio, Select, Steps } from 'antd';
import message from '../../components/common/Message';
import Header from "../../components/layouts/Header"
import { FaCaretDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'

const CustomInput = ({ label = '', type = 'text', value = '', onChange = () => { }, ph = '', unit = '', isLong = false }) => {
    return (
        <div className='flex flex-col gap-2'>
            <p className='text-[#757575] text-[12px]' >{label}</p>
            <div className="border-b border-[#0000006B] flex pb-1">
                <input
                    type={type}
                    onChange={(e) => {
                        if (type === "number" && e.target.value?.length > 5) { return }
                        onChange(e)
                    }}
                    value={value}
                    className='w-full outline-none' placeholder={ph} />
                <p className={`text-[#757575] text-[14px] ${isLong && 'w-[60px]'}`}>{unit}</p>
            </div>
        </div>
    );
};

const CustomRadio = ({ question = '', value = '', answer1Value = '1', answer2Value = '2', answer1 = '', answer2 = '', onChanged = () => { } }) => {
    const onChange = (e) => {
        onChanged(Number(e.target.value));
    };

    return <div className='flex flex-col justify-center content-center  text-base'>
        <p className='text-[#757575] text-[12px] mb-2' >{question}</p>
        <Radio.Group onChange={onChange} value={value}>
            <Radio value={answer1Value}>{answer1}</Radio>
            <Radio value={answer2Value}>{answer2}</Radio>
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

const HealthEdit = () => {
    const [searchParams] = useSearchParams();
    const resultId = searchParams.get('resultId');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState({})
    const navigate = useNavigate();

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        const { data: resultData } = await axios.get(`/api/healthcheckinfo/${resultId}/`);
        if (resultData?.id) {
            setData(resultData)
        }
    }

    const editHealthInfo = async () => {

        if (!data?.checked_date) { message('健診日を入力してください', false) }
        const { data: resultData } = await axios.patch(`/api/healthcheckinfo/${resultId}/`, data);
        if (resultData?.id) { navigate('/result') }
    }

    const items = [
        { title: '健診情報', element: <FirstStep data={data} setData={setData} /> }, 
        { title: '質問票①', element: <SecondStep data={data} setData={setData} /> },
        { title: '質問票②', element: <ThirdStep editHealthInfo={editHealthInfo} data={data} setData={setData} /> },
    ];

    return (
        <div className='relative !h-screen flex flex-col overflow-y-scroll'>
            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
            <div className="flex flex-col flex-1 overflow-auto gap-8 p-4 ">
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


        </div>
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
        <div className="flex flex-col gap-6 ">
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
                    label="身長"
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
            <CustomRadio
                onChanged={(e) => {
                    changeData(e, 'smoking')
                }}
                value={data?.smoking || ''}
                question='喫煙'
                answer1Value={1}
                answer2Value={2}
                answer1='吸う'
                answer2='吸わない'
            />

            <CustomSelect options={[
                {
                    value: 1,
                    label: '毎日',
                },
                {
                    value: 2,
                    label: '時々',
                },
                {
                    value: 3,
                    label: 'ほとんど飲まない（飲めない）',
                },
            ]}
                label="飲酒"
                onChange={(value) => changeData(value, 'drinking')}
                value={data.drinking || ''}
            />


            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'systolic_blood_pressure')}
                    value={data.systolic_blood_pressure || ''}
                    label="収縮期血圧"
                    type='number'
                    unit="mmHg" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'diastolic_blood_pressure')}
                    value={data.diastolic_blood_pressure || ''}
                    type='number'
                    label="拡張期血圧"
                    unit="mmHg" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'hdl_cholesterol')}
                    value={data.hdl_cholesterol || ''}
                    type='number'
                    label="HDLコレステロール"
                    unit="mg/dl" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'ldl_cholesterol')}
                    value={data.ldl_cholesterol || ''}
                    type='number'
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
                    type='number'
                    label="服薬1"
                    unit="血圧" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'medication_blood_sugar')}
                    value={data.medication_blood_sugar || ''}
                    type='number'
                    label="服薬2"
                    unit="血糖" />
            </div>
            <CustomSelect options={[
                {
                    value: 1,
                    label: '30分未満',
                },
                {
                    value: 2,
                    label: '30-59分',
                },
                {
                    value: 3,
                    label: '60分以上-59分',
                },
            ]}
                label="日の歩く時間"
                onChange={(value) => changeData(value, 'walking_time')}
                value={data.walking_time || ''}
            />
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
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'waist_circumference')}
                    value={data?.waist_circumference || ''}
                    label="腹囲"
                    type='number'
                    unit="cm" />
                <div className="w-1/2"></div>
            </div>

            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: '10時間未満',
                    },
                    {
                        value: 2,
                        label: '10時間以上',
                    },
                ]}
                label="採血時間（食後）"
                onChange={(value) => changeData(value, 'blood_sampling_time_post_meal')}
                value={data.blood_sampling_time_post_meal || ''}
            />

            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'medical_history')}
                    value={data?.medical_history || ''}
                    type='number'
                    label="既往歴" />

                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'triglycerides')}
                    value={data?.triglycerides || ''}
                    label="中性脂肪(トリグリセリド)"
                    type="number"
                    unit="mg/dl" />

            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'got_ast')}
                    value={data?.got_ast || ''}
                    type='number'
                    label="GOT（AST）"
                    unit="U/I" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'got_alt')}
                    value={data?.gpt_alt || ''}
                    type='number'
                    label="GPT（ALT）"
                    unit="U/I" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'gamma_gt')}
                    value={data?.gamma_gt || ''}
                    type='number'
                    label="γ-GT(γ-GTP)"
                    unit="U/I" />
                <div className="w-1/2"></div>
            </div>
            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: '-',
                    },
                    {
                        value: 2,
                        label: '±',
                    },
                    {
                        value: 3,
                        label: '1+',
                    },
                    {
                        value: 4,
                        label: '2+',
                    },
                    {
                        value: 5,
                        label: '3+',
                    },
                ]}
                label="尿糖"
                onChange={(value) => changeData(value, 'urinary_glucose')}
                value={data.urinary_glucose || ''}
            />
            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: '-',
                    },
                    {
                        value: 2,
                        label: '±',
                    },
                    {
                        value: 3,
                        label: '1+',
                    },
                    {
                        value: 4,
                        label: '2+',
                    },
                    {
                        value: 5,
                        label: '3+',
                    },
                ]}
                label="尿蛋白"
                onChange={(value) => changeData(value, 'urinary_protein')}
                value={data.urinary_protein || ''}
            />
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'hematocrit_value')}
                    value={data?.hematocrit_value || ''}
                    type='number'
                    label="ヘマトクリット値"
                    unit="%" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'hemoglobin_level')}
                    value={data?.hemoglobin_level || ''}
                    type='number'
                    label="血色素量"
                    unit="%" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'red_blood_cell_count')}
                    value={data?.red_blood_cell_count || ''}
                    type='number'
                    label="赤血球数"
                    unit="万/mm3" />
                <div className="w-1/2"></div>
            </div>
        </div>
    )
}

const ThirdStep = ({ editHealthInfo, data, setData }) => {
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
            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: 'なし',
                    },
                    {
                        value: 2,
                        label: '動機付け支援',
                    },
                    {
                        value: 3,
                        label: '積極的支援',
                    },
                ]}
                label="メタボリックシンドローム判定"
                onChange={(value) => changeData(value, 'metabolic_syndrome_assessment')}
                value={data?.metabolic_syndrome_assessment || ''}
            />
            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: '該当',
                    },
                    {
                        value: 2,
                        label: '非該当',
                    },
                ]}
                label="保健指導レベル"
                onChange={(value) => changeData(value, 'health_guidance_level')}
                value={data?.health_guidance_level || ''}
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medication_lipids') }}
                value={data?.medication_lipids || ''}
                question='服薬３（脂質）'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medical_history_cerebrovascular') }}
                value={data?.medical_history_cerebrovascular || ''}
                question='既往歴１（脳血管）'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medical_history_cardiovascular') }}
                value={data?.medical_history_cardiovascular || ''}
                question='既往歴２（心血管）'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medical_history_renal_failure_dialysis') }}
                value={data?.medical_history_renal_failure_dialysis || ''}
                question='既往歴３（腎不全・人工透析）'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'anemia') }}
                value={data?.anemia || ''}
                question='貧血'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'weight_change_since_20') }}
                value={data?.weight_change_since_20 || ''}
                question='２０歳からの体重変化'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'exercise_habit_30min_plus') }}
                value={data?.exercise_habit_30min_plus || ''}
                question='３０分以上の運動習慣'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'walking_or_physical_activity') }}
                value={data?.medical_history_cardiovascular || ''}
                question='歩行又は身体活動'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'walking_speed') }}
                value={data?.walking_speed || ''}
                question='歩行速度'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'annual_weight_change') }}
                value={data?.annual_weight_change || ''}
                question='1年間の体重変化'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: '速い',
                    },
                    {
                        value: 2,
                        label: 'ふつう',
                    },
                    {
                        value: 3,
                        label: '遅い',
                    },
                ]}
                label="食べ方1（早食い等）"
                onChange={(value) => changeData(value, 'eating_habit_speed')}
                value={data?.eating_habit_speed || ''}
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'eating_habit_before_sleep') }}
                value={data?.eating_habit_before_sleep || ''}
                question='食べ方２（就寝前）'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'eating_habit_night_snacking') }}
                value={data?.eating_habit_night_snacking || ''}
                question='食べ方３（夜食間食)'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'eating_habit_skipping_breakfast') }}
                value={data?.eating_habit_skipping_breakfast || ''}
                question='食習慣（朝食抜き)'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: '1合未満',
                    },
                    {
                        value: 2,
                        label: '1～2合未満',
                    },
                    {
                        value: 3,
                        label: '2～3合未満',
                    },
                    {
                        value: 4,
                        label: '3合以上',
                    },
                ]}
                label="飲酒量"
                onChange={(value) => changeData(value, 'alcohol_consumption')}
                value={data?.alcohol_consumption || ''}
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'sufficient_rest_through_sleep') }}
                value={data?.sufficient_rest_through_sleep || ''}
                question='睡眠で休養が十分'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: '改善するつもりはない',
                    },
                    {
                        value: 2,
                        label: '近いうちに（概ね１か月以内）改善するつもりである',
                    },
                    {
                        value: 3,
                        label: '改善するつもりである（概ね６か月以内）',
                    },
                    {
                        value: 4,
                        label: '既に改善に取り組んでいる（６か月未満）',
                    },
                    {
                        value: 5,
                        label: '既に改善に取り組んでいる（６か月以上）',
                    },
                ]}
                label="生活習慣の改善"
                onChange={(value) => changeData(value, 'lifestyle_improvement')}
                value={data?.lifestyle_improvement || ''}
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'health_guidance_preference') }}
                value={data?.health_guidance_preference || ''}
                question='保健指導の希望'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomButton onClick={editHealthInfo} text='情報更新' />
        </div>
    )
}



export default HealthEdit