import { CustomInput, CustomRadio, CustomSelect } from '../../components/common/CustomInputs'
import CustomDrawer from "../../components/common/Drawer";
import CustomButton from "../../components/common/Button";
import Header from '../../components/layouts/Header';
import { DatePicker, Tooltip, } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const AdviceDetail = () => {
    const [searchParams] = useSearchParams();
    const adviceId = searchParams.get('adviceId');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        if (!adviceId) return

        try {
            // const { data: res } = await axios.get(`/api/personaladvice/${adviceId}/`);
            // setData(res)

            const a = {
                "id": 2,
                "another_field": "おりｇ",
                "title": "ABC",
                "message": "abcabcabcabcabcabc",
                "sent_at": "2024-01-12T14:07:39.003096+09:00",
                "is_read": false,
                "from_doctor": 2,
                "user": 382
            }

            if (!a.is_read) {
                editDailyHabit()
            }

            setData(a)
        } catch (error) {
            console.log(error);
        }
    }

    const editDailyHabit = async () => {
        try {
            await axios.patch(`/api/personaladvice/${adviceId}/`, { is_read: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='relative !h-screen flex flex-col overflow-y-scroll'>
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
            <div className='w-full overflow-auto h-full pb-6'>
                <p className='text-black text-xl mt-4 mx-6'>sekeboy</p>

            </div>

            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
    );
};

export default AdviceDetail;