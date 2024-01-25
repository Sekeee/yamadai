import { CustomInput, CustomRadio, CustomSelect } from '../../components/common/CustomInputs'
import { useNavigate, useSearchParams } from "react-router-dom";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi'
import CustomButton from "../../components/common/Button";
import CustomDrawer from '../../components/common/Drawer'
import { DatePicker, Steps, Tooltip } from 'antd';
import message from '../../components/common/Message';
import Header from "../../components/layouts/Header"
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from 'dayjs'


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
            <div className='flex gap-1'>
                <CustomRadio
                    onChanged={(e) => { changeData(e, 'smoking') }}
                    value={data?.smoking || ''}
                    question='現在、たばこを習慣的に吸っている。'
                    answer1Value={1}
                    answer2Value={2}
                    answer1='吸う'
                    answer2='吸わない'
                />
                <div className='relative'>
                    <Tooltip color="black" title="「現在、習慣的に喫煙している者」とは、「合計100 本以上、又は６ヶ月以上吸っている者」であり、最近1 ヶ月間も吸っている者">
                        <div className='absolute text-error cursor-pointer -top-1 left-0'>*</div>
                    </Tooltip>
                </div>
            </div>

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
                label="お酒（清酒、焼酎、ビール、洋酒など）を飲む頻度"
                onChange={(value) => changeData(value, 'drinking')}
                value={data.drinking || ''}
            />
            <div className='flex gap-2'>
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
                    label="飲酒日の1日当たりの飲酒量"
                    onChange={(value) => changeData(value, 'alcohol_consumption')}
                    value={data?.alcohol_consumption || ''}
                />
                <div className='relative'>
                    <Tooltip color="black" title="清酒１合（１８０ｍｌ）の目安：ビール中瓶１本（約５００ｍｌ）、焼酎３５度（８０ｍｌ）、ウイスキーダブル一杯（６０ｍｌ）、ワイン２杯（２４０ｍｌ">
                        <div className='absolute text-error cursor-pointer -top-1 left-0'>*</div>
                    </Tooltip>
                </div>
            </div>

            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'systolic_blood_pressure')}
                    value={data.systolic_blood_pressure || ''}
                    label="血圧(上)"
                    type='number'
                    unit="mmHg" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'diastolic_blood_pressure')}
                    value={data.diastolic_blood_pressure || ''}
                    type='number'
                    label="血圧(下)"
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
                    label="空腹時血糖"
                    unit="mg/dL" />
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'hba1c')}
                    value={data.hba1c || ''}
                    type='number'
                    label="HbA1c（ヘモグロビンA1c）"
                    unit="%" />
            </div>
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medication_blood_pressure') }}
                value={data?.medication_blood_pressure || ''}
                question='血圧を下げる薬'
                answer1Value={1}
                answer2Value={2}
                answer1='飲んでいる'
                answer2='飲んでいない'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medication_blood_sugar') }}
                value={data?.medication_blood_sugar || ''}
                question='インスリン注射又は血糖を下げる薬'
                answer1Value={1}
                answer2Value={2}
                answer1='飲んでいる'
                answer2='飲んでいない'
            />
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
                    label: '60分以上',
                },
            ]}
                label="1日の歩く時間"
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
                    // type='number'
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
                    onChange={(e) => changeData(e.target.value, 'gpt_alt')}
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
                        label: '3+以上',
                    },
                    // {
                    //     value: 6,
                    //     label: '4+',
                    // },
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
                        label: '3+以上',
                    },
                    // {
                    //     value: 6,
                    //     label: '4+',
                    // },
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
                    unit="g/dL" />
            </div>
            <div className="flex gap-6">
                <CustomInput
                    onChange={(e) => changeData(e.target.value, 'red_blood_cell_count')}
                    value={data?.red_blood_cell_count || ''}
                    type='number'
                    label="赤血球数"
                    unit="万/mm3(10^4/μL)"
                />
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
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medication_lipids') }}
                value={data?.medication_lipids || ''}
                question='コレステロール・中性脂肪を下げる薬'
                answer1Value={1}
                answer2Value={2}
                answer1='飲んでいる'
                answer2='飲んでいない'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medical_history_cerebrovascular') }}
                value={data?.medical_history_cerebrovascular || ''}
                question='医師から、脳卒中（脳出血、脳梗塞等）にかかっているといわれたり、治療を受けたことがありますか。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medical_history_cardiovascular') }}
                value={data?.medical_history_cardiovascular || ''}
                question='医師から、心臓病（狭心症、心筋梗塞等）にかかっているといわれたり、治療を受けたことがありますか。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'medical_history_renal_failure_dialysis') }}
                value={data?.medical_history_renal_failure_dialysis || ''}
                question='医師から、慢性の腎不全にかかっているといわれたり、治療（人工透析）を受けたことがありますか。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'anemia') }}
                value={data?.anemia || ''}
                question='医師から、貧血といわれたことがある。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'weight_change_since_20') }}
                value={data?.weight_change_since_20 || ''}
                question='20歳の時の体重から10kg以上増加している。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'exercise_habit_30min_plus') }}
                value={data?.exercise_habit_30min_plus || ''}
                question='1回30分以上の軽く汗をかく運動を週2日以上、1年以上実施している。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'walking_or_physical_activity') }}
                value={data?.walking_or_physical_activity || ''}
                question='日常生活において歩行又は同等の身体活動を1日1時間以上実施している。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'walking_speed') }}
                value={data?.walking_speed || ''}
                question='ほぼ同じ年齢の同性と比較して歩く速度が速い。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'annual_weight_change') }}
                value={data?.annual_weight_change || ''}
                question='この1年間で体重の増減が±3㎏以上あった。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            {/* <CustomSelect
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
                label="この1年間で体重の増減が±3㎏以上あった。"
                onChange={(value) => changeData(value, 'annual_weight_change')}
                value={data?.annual_weight_change || ''}
            /> */}
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
                label="人と比較して食べる速度が速い"
                onChange={(value) => changeData(value, 'eating_habit_speed')}
                value={data?.eating_habit_speed || ''}
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'eating_habit_before_sleep') }}
                value={data?.eating_habit_before_sleep || ''}
                question='就寝前の2時間以内に夕食をとることが週に3回以上ある。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'eating_habit_night_snacking') }}
                value={data?.eating_habit_night_snacking || ''}
                question='夕食後に間食（3食以外の夜食）をとることが週に3回以上ある。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'eating_habit_skipping_breakfast') }}
                value={data?.eating_habit_skipping_breakfast || ''}
                question='朝食を抜くことが週に3回以上ある。'
                answer1Value={1}
                answer2Value={2}
                answer1='はい'
                answer2='いいえ'
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
                        label: '該当',
                    },
                    {
                        value: 2,
                        label: '非該当',
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
                label="保健指導レベル"
                onChange={(value) => changeData(value, 'health_guidance_level')}
                value={data?.health_guidance_level || ''}
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
                label="運動や食生活塔の生活習慣を改善してみようと思いますか。"
                onChange={(value) => changeData(value, 'lifestyle_improvement')}
                value={data?.lifestyle_improvement || ''}
            />
            <CustomRadio
                onChanged={(e) => { changeData(e, 'health_guidance_preference') }}
                value={data?.health_guidance_preference || ''}
                question='生活習慣の改善について保健指導を受ける機会があれば、利用しますか。'
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