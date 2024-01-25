import CustomDrawer from "../../components/common/Drawer";
import Header from '../../components/layouts/Header';
import { useState } from 'react';

const DailyHistory = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <div className='w-full h-screen relative'>
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />

            <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
                <p className='text-black text-xl mt-4 mx-6'>過去の生活習慣</p>
                <div className='flex-col justify-around content-center mx-6 gap-4 flex mt-6'>
                    <div>...rest</div>
                </div>
            </div>

            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
    );
};

export default DailyHistory;