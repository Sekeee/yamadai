import CustomDrawer from "../../components/common/Drawer";
import Header from '../../components/layouts/Header';
import { useState } from 'react';
import { useEffect } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa6";

const Notification = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [announcementData, setAnnouncementData] = useState([])

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const { data: res } = await axios.get(`/api/announcement/`);
            setAnnouncementData(res)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='!h-screen relative flex flex-col overflow-y-scroll'>
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />

            <div className='w-full flex-col overflow-auto justify-center content-center pt-1 bg-white'>
                <p className='text-black text-xl mt-4 mx-6'>お知らせ</p>

                <div className='flex-col justify-around content-center mx-6 gap-4 flex my-6'>
                    {
                        announcementData?.map(({ content, title }, index) => {
                            return (
                                <div key={index}>
                                    <div className='flex gap-4' >
                                        <div className="text-primary !h-[36px] min-w-[36px] rounded-full bg-primary/20 flex items-center justify-center">
                                            <FaBell />
                                        </div>
                                        <div className="flex-1 gap-2 flex flex-col">
                                            <div className="font-semibold">{title}</div>
                                            <div className="text-sm  text-black/60">{content}</div>
                                        </div>

                                    </div>
                                    {index !== announcementData?.length - 1 && <div className="border-t border-black/10 mt-4"></div>}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
    );
};

export default Notification;