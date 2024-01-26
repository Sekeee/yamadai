import { CustomInput, CustomRadio, CustomSelect } from '../../components/common/CustomInputs'
import CustomDrawer from "../../components/common/Drawer";
import CustomButton from "../../components/common/Button";
import Header from '../../components/layouts/Header';
import { DatePicker, Tooltip, } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const HistoryEdit = () => {
    const [searchParams] = useSearchParams();
    const historyId = searchParams.get('historyId');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        if (!historyId) return

        try {
            const { data: res } = await axios.get(`/api/dailyhabit/${historyId}/`);
            setData(res)
        } catch (error) {
            console.log(error);
        }
    }

    const editDailyHabit = async () => {
        try {
            // const { data: res } = await axios.post('/api/dailyhabit/create/', data);
            // todo edit

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
        <div className='relative !h-screen flex flex-col overflow-y-scroll'>
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
            <div className='w-full overflow-auto h-full pb-6'>
                <div className='flex-col justify-around content-center mx-6 gap-4 flex mt-6'>
                    <div className="flex flex-col gap-6">
                        <div className='border-b border-[#0000006B] pb-2'>
                            <p className='text-[#757575] flex gap-2 text-[12px] mb-2'>
                                健診日
                            </p>

                            <DatePicker
                                inputReadOnly
                                style={{ width: '100%', borderBottom: '1px solid  !important', padding: '0 !important' }}
                                bordered={false}
                                placeholder='2023-12-23'
                                value={data?.date ? dayjs(data?.date) : ''}
                                onChange={(_, dateString) => {
                                    changeData(dateString, 'date')
                                }} />
                        </div>
                        <div className='flex '>
                            <CustomRadio
                                onChanged={(e) => { changeData(e, 'salt_reduction_effort') }}
                                value={data?.salt_reduction_effort || ''}
                                question='減塩に取り組む'
                                answer1Value={1}
                                answer2Value={2}
                                answer1='達成'
                                answer2='未達成'
                            />
                            {/*Tool tip*/}
                            {/*<div className='relative'>*/}
                            {/*    <Tooltip color="black" title="「現在、習慣的に喫煙している者」とは、「合計100 本以上、又は６ヶ月以上吸っている者」であり、最近1 ヶ月間も吸っている者">*/}
                            {/*        <div className='absolute text-warning cursor-pointer -top-1 left-0'>*</div>*/}
                            {/*    </Tooltip>*/}
                            {/*</div>*/}
                        </div>

                        <CustomRadio
                            onChanged={(e) => { changeData(e, 'vegetable_consumption') }}
                            value={data?.vegetable_consumption || ''}
                            question='野菜をたべる'
                            answer1Value={1}
                            answer2Value={2}
                            answer1='達成'
                            answer2='未達成'
                        />

                        <CustomRadio
                            onChanged={(e) => { changeData(e, 'regular_meal_timing') }}
                            value={data?.regular_meal_timing || ''}
                            question='1日3食決まった時間に食事をとる'
                            answer1Value={1}
                            answer2Value={2}
                            answer1='達成'
                            answer2='未達成'
                        />

                        <CustomRadio
                            onChanged={(e) => { changeData(e, 'smoking_cessation_attempt') }}
                            value={data?.smoking_cessation_attempt || ''}
                            question='禁煙にチャレンジする、または吸わない'
                            answer1Value={1}
                            answer2Value={2}
                            answer1='達成'
                            answer2='未達成'
                        />

                        <CustomRadio
                            onChanged={(e) => { changeData(e, 'positive_thinking') }}
                            value={data?.positive_thinking || ''}
                            question='前向きに考える'
                            answer1Value={1}
                            answer2Value={2}
                            answer1='達成'
                            answer2='未達成'
                        />

                        <CustomRadio
                            onChanged={(e) => { changeData(e, 'greeting_others') }}
                            value={data?.greeting_others || ''}
                            question='人にあいさつする'
                            answer1Value={1}
                            answer2Value={2}
                            answer1='達成'
                            answer2='未達成'
                        />

                        <CustomRadio
                            onChanged={(e) => { changeData(e, 'personal_grooming') }}
                            value={data?.personal_grooming || ''}
                            question='身だしなみに気を付ける'
                            answer1Value={1}
                            answer2Value={2}
                            answer1='達成'
                            answer2='未達成'
                        />

                        <CustomRadio
                            onChanged={(e) => { changeData(e, 'laughter') }}
                            value={data?.laughter  || ''}
                            question='笑う'
                            answer1Value={1}
                            answer2Value={2}
                            answer1='達成'
                            answer2='未達成'
                        />

                        <CustomRadio
                            onChanged={(e) => { changeData(e, 'exercise_or_walking') }}
                            value={data?.exercise_or_walking  || ''}
                            question='体操または15分以上歩く'
                            answer1Value={1}
                            answer2Value={2}
                            answer1='達成'
                            answer2='未達成'
                        />

                        <CustomSelect options={[
                            {
                                value: 5,
                                label: 'よい',
                            },
                            {
                                value: 4,
                                label: 'まあよい',
                            },
                            {
                                value: 3,
                                label: 'ふつう',
                            },
                            {
                                value: 2,
                                label: 'あまりよくない',
                            },
                            {
                                value: 1,
                                label: 'よくない',
                            },
                        ]}
                                      label="体の調子は"
                                      onChange={(value) => changeData(value, 'physical_condition')}
                                      value={data.physical_condition || ''}
                        />

                        <CustomSelect options={[
                            {
                                value: 5,
                                label: 'よい',
                            },
                            {
                                value: 4,
                                label: 'まあよい',
                            },
                            {
                                value: 3,
                                label: 'ふつう',
                            },
                            {
                                value: 2,
                                label: 'あまりよくない',
                            },
                            {
                                value: 1,
                                label: 'よくない',
                            },
                        ]}
                                      label="こころの調子は"
                                      onChange={(value) => changeData(value, 'mental_condition')}
                                      value={data.mental_condition  || ''}
                        />

                        <CustomSelect options={[
                            {
                                value: 2,
                                label: 'たくさん話した',
                            },
                            {
                                value: 1,
                                label: '少し話した',
                            },
                            {
                                value: 0,
                                label: 'まったく話さない',
                            },
                        ]}
                                      label="人との会話"
                                      onChange={(value) => changeData(value, 'talk_with_people')}
                                      value={data.talk_with_people  || ''}
                        />

                        <CustomInput
                            onChange={(e) => changeData(e.target.value, 'user_message')}
                            value={data.user_message || ''}
                            label="一言コメント"
                        />

                        <CustomSelect options={[
                            {
                                value: 1,
                                label: 'さわやかイケメン風',
                            },
                            {
                                value: 2,
                                label: 'ぶりっこ',
                            },
                            {
                                value: 3,
                                label: '熱血部活顧問',
                            },
                            {
                                value: 4,
                                label: '陰キャラ',
                            },
                        ]}
                                      label="コメントキャラ"
                                      onChange={(value) => changeData(value, 'comment_character')}
                                      value={data.comment_character  || ''}
                        />




                        <CustomButton onClick={editDailyHabit} text='変更する' />
                    </div>
                </div>
            </div>

            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
    );
};

export default HistoryEdit;