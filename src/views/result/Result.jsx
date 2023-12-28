import CustomDrawer from "../../components/common/Drawer";
import Header from "../../components/layouts/Header";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiCalendar } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import CustomButton from "../../components/common/Button";
const Result = () => {
    const navigate = useNavigate();
    const [resultList, setResultList] = useState([])
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        const { data } = await axios.get(`/api/healthcheckinfo/`,);
        setResultList(data)
    }

    const deleteResult = async (resultId) => {
        if (!resultId) return
        try {
            const { status } = await axios.delete(`/api/healthcheckinfo/${resultId}/`);
            if (status === 204) {
                setIsDeleteModalOpen(false);
                fetchData()
            }
        } catch (error) {
            console.log(error);
        }
    }


    return <div className='w-full h-screen relative'>
        <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
        <div className='w-full flex-col justify-center content-center pt-1 bg-white'>
            <p className='text-black text-xl mt-4 mx-6'>予測結果一覧</p>
            <div className='flex-col flex gap-4 justify-around content-center mx-6 mt-6'>
                {
                    resultList?.map(({ checked_date, id }, index) => {
                        return (
                            <div key={index} onClick={() => navigate(`/predict-result?resultId=${id}&date=${checked_date}`)} className='flex bg-primary gap-3 items-center px-6 py-3 cursor-pointer font-semibold rounded-[10px] text-white'>
                                <FiCalendar />
                                <div>予測結果サマリ{index + 1}</div>
                                <div className="flex-1 text-end text-[#FFFFFFCC]">{checked_date}</div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsDeleteModalOpen({ id: id })
                                    }}

                                    className="text-end hover:text-[#FFFFFFCC]/50 text-[#FFFFFFCC]">
                                    <FiTrash2 />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <Modal
            width={360}
            centered={true}
            closable={false}
            open={isDeleteModalOpen}
            footer={false}
            styles={{ footer: { margin: 0, }, }}
            onCancel={() => setIsDeleteModalOpen(false)}
        >
            <p>健康予測結果が削除されます。よろしいですか？</p>

            <div className='flex gap-2 mt-6 items-end justify-end'>
                <CustomButton onClick={() => setIsDeleteModalOpen(false)} variant='outline' text='戻る' />
                <CustomButton onClick={() => deleteResult(isDeleteModalOpen?.id)} text='送信' />
            </div>
        </Modal>
        <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
    </div>
}

export default Result;