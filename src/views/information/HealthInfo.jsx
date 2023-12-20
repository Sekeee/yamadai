import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'
import Header from "../../components/layouts/Header"
import message from '../../components/common/Message';
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { DatePicker, Modal, Radio, Select, Steps, Tooltip } from 'antd';
import { useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'
import CustomButton from "../../components/common/Button";
import CustomDrawer from '../../components/common/Drawer';
import { useEffect } from 'react';

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

    const checkClicked = (val) => {
        if (val === value) {
            onChanged(null);
        }
    }

    return <div className='flex flex-col justify-center content-center  text-base'>
        <p className='text-[#757575] text-[12px] mb-2' >{question}</p>
        <Radio.Group onChange={onChange} value={value}>
            <Radio onClick={() => checkClicked(answer1Value)} value={answer1Value}>{answer1}</Radio>
            <Radio onClick={() => checkClicked(answer2Value)} value={answer2Value}>{answer2}</Radio>
        </Radio.Group>
    </div>
}

const CustomSelect = ({ options = [], label = '', value = '', onChange = () => { } }) => {
    console.log(options, 'mmm');
    return (
        <div>
            <p className='text-[#757575] text-[12px] mb-2' >{label}</p>
            <Select
                style={{ width: '100%', borderBottom: '1px solid #0000006B', padding: '0 !important' }}
                showSearch={false}
                placeholder=''
                bordered={false}
                onChange={onChange}
                optionFilterProp="children"
                suffixIcon={<FaCaretDown />}
                options={options}
                value={value}
            />
        </div>
    )
}

const HealthInfo = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [current, setCurrent] = useState(0);
    const [data, setData] = useState({})
    const navigate = useNavigate();


    const createHealthInfo = async () => {
        if (!data?.checked_date) { message('健診日を入力してください', false) }
        const { data: resultData } = await axios.post('/api/healthcheckinfo/create/', data);
        if (resultData?.id) { navigate('/result') }
    }

    useEffect(() => {
        const scrollableDiv = document.getElementById('scrollableDiv');
        if (scrollableDiv) { scrollableDiv.scrollTop = 0 }
    }, [current])

    const items = [
        { title: '健診情報', element: <FirstStep data={data} setData={setData} /> },
        { title: '質問票①', element: <SecondStep data={data} setData={setData} /> },
        { title: '質問票②', element: <ThirdStep createInfo={() => setIsModalOpen(true)} data={data} setData={setData} /> },
    ];

    return (
        <div className='relative !h-screen flex flex-col overflow-y-scroll'>
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
            <div id='scrollableDiv' className="flex flex-col z-30 flex-1 overflow-auto gap-8 p-4 ">
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
                            if (!data?.checked_date) {
                                return message('健診日を入力してください', false);
                            }

                            if (current + 1 >= items.length) return
                            setCurrent(current + 1)
                        }}
                        className={`flex text-primary ${current === 2 && '!text-[#00000061]'} gap-2 items-center text-[14px] cursor-pointer`}>
                        <p>次へ</p>
                        <BiChevronRight size={18} />
                    </div>
                </div>
            </div>

            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />

            <Modal
                width={360}
                centered={true}
                closable={false}
                open={isModalOpen}
                footer={false}
                styles={{ footer: { margin: 0, }, }}
                onCancel={() => setIsModalOpen(false)}
            >
                <p>個人情報が送信されます。よろしいですか？</p>

                <div className='flex gap-2 mt-6 items-end justify-end'>
                    <CustomButton onClick={() => setIsModalOpen(false)} variant='outline' text='戻る' />
                    <CustomButton onClick={() => createHealthInfo()} text='送信' />
                </div>
            </Modal>
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
                <p className='text-[#757575] flex gap-2 text-[12px] mb-2'>
                    健診日
                    <div className='relative'>
                        <Tooltip title="この項目で予後予測します">
                            <div className='absolute text-error cursor-pointer -top-1 left-0'>*</div>
                        </Tooltip>
                    </div>
                </p>
                <DatePicker
                    inputReadOnly
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
                onChanged={(e) => { changeData(e, 'smoking') }}
                value={data?.smoking || ''}
                question='今、吸いますか？'
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


            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'systolic_blood_pressure')}
                    value={data.systolic_blood_pressure || ''}
                    label="血圧（上)"
                    type='number'
                    unit="mmHg" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'diastolic_blood_pressure')}
                    value={data.diastolic_blood_pressure || ''}
                    type='number'
                    label="血圧（下）"
                    unit="mmHg" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'hdl_cholesterol')}
                    value={data.hdl_cholesterol || ''}
                    type='number'
                    label="HDLコレステロール"
                    unit="mg/dL" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'ldl_cholesterol')}
                    value={data.ldl_cholesterol || ''}
                    type='number'
                    label="LDLコレステロール"
                    unit="mg/dL" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'blood_glucose')}
                    value={data.blood_glucose || ''}
                    label="血糖"
                    unit="mg/dL" />
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
                    index: 1,
                    label: '30分未満',
                },
                {
                    value: 2,
                    index: 2,
                    label: '30-59分',
                },
                {
                    index: 3,
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
                    unit="mg/dL" />

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
                    {
                        value: 6,
                        label: '4+',
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
                    {
                        value: 6,
                        label: '4+',
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
                    unit="万/mm3 = 10^4/μL" />
                <div className="w-1/2"></div>
            </div>
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
                question='既往歴4（貧血）'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'weight_change_since_20') }}
                value={data?.weight_change_since_20 || ''}
                question='20歳の頃から体重が10ｷﾛ以上増加'
                answer1Value={1}
                answer2Value={2}
                answer1='あり'
                answer2='なし'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'exercise_habit_30min_plus') }}
                value={data?.exercise_habit_30min_plus || ''}
                question='30分以上の運動習慣'
                answer1Value={1}
                answer2Value={2}
                answer1='している'
                answer2='していない'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medical_history_cardiovascular') }}
                value={data?.medical_history_cardiovascular || ''}
                question='歩行を1日1時間以上'
                answer1Value={1}
                answer2Value={2}
                answer1='している'
                answer2='していない'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'walking_speed') }}
                value={data?.walking_speed || ''}
                question='歩行速度が同じ年代・性別の人より速い'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomSelect
                options={[
                    {
                        value: 1,
                        label: '3㎏以上増えた',
                    },
                    {
                        value: 2,
                        label: '3㎏以上減った',
                    },
                    {
                        value: 3,
                        label: '±3㎏以内の変化',
                    },
                ]}
                label="1年間の体重変化"
                onChange={(value) => changeData(value, 'annual_weight_change')}
                value={data?.annual_weight_change || ''}
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
                label="食べ方1（食べる速さ）"
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
                question='食習慣（朝食抜き週3回以上)'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
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
                onChanged={(e) => { changeData(e, 'sufficient_rest_through_sleep') }}
                value={data?.sufficient_rest_through_sleep || ''}
                question='睡眠で休養が十分とれている'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
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
                        label: '改善するつもりはない',
                    },
                    {
                        value: 2,
                        label: '改善するつもりである（概ね6か月以内）',
                    },
                    {
                        value: 3,
                        label: '近いうちに（概ね1か月以内）改善するつもりである',
                    },
                    {
                        value: 4,
                        label: '既に改善に取り組んでいる（6か月未満）',
                    },
                    {
                        value: 5,
                        label: '既に改善に取り組んでいる（6か月以上）',
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

            <CustomButton onClick={createInfo} text='予測を行う' />
        </div>
    )
}



export default HealthInfo