import { CustomInput, CustomRadio, CustomSelect } from '../../components/common/CustomInputs'
import CustomDrawer from "../../components/common/Drawer";
import CustomButton from "../../components/common/Button";
import Header from '../../components/layouts/Header';
import { DatePicker, Tooltip, } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs'
import axios from 'axios';

const DailyHabit = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [data, setData] = useState({})

    const createDailyHabit = async () => {
        try {
            const { data: res } = await axios.post('/api/dailyhabit/create/', data);

        } catch (error) {
            console.log(error);
        }
    }

    const changeData = (value, key) => {
        setData((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    }

    return (
        <div className='!h-screen flex flex-col overflow-y-scroll'>
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
            <div className='w-full overflow-auto h-full pb-6'>
                <p className='text-black text-xl mt-4 mx-6'>sekeboy</p>
                <div className='flex-col justify-around content-center mx-6 gap-4 flex mt-6'>
                    <div className="flex flex-col gap-6">
                        <div className='border-b border-[#0000006B] pb-2'>
                            <div className='text-black text-[14px] mb-4'>このページの項目で予測を行います。</div>
                            <p className='text-[#757575] flex gap-2 text-[12px] mb-2'>
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
                        <div className='flex '>
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
                                    <div className='absolute text-warning cursor-pointer -top-1 left-0'>*</div>
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
                                <Tooltip color="black" title="「現在、習慣的に喫煙している者」とは、「合計100 本以上、又は６ヶ月以上吸っている者」であり、最近1 ヶ月間も吸っている者">
                                    <div className='absolute text-warning cursor-pointer -top-1 left-0'>*</div>
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
                                label: '60分以上',
                            },
                        ]}
                            label="1日の歩く時間"
                            onChange={(value) => changeData(value, 'walking_time')}
                            value={data.walking_time || ''}
                        />
                        <CustomButton onClick={createDailyHabit} text='予測を行う' />
                    </div>
                </div>
            </div>

            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
    );
};

export default DailyHabit;