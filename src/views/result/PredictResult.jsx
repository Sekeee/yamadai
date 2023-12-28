import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomDrawer from "../../components/common/Drawer";
import Header from "../../components/layouts/Header"

const PredictResult = () => {
    const navigate = useNavigate()
    const [commentList, setCommentList] = useState([]);
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState({});
    const resultId = searchParams.get('resultId');
    const date = searchParams.get('date');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => {
        if (resultId) {
            fetchData()
        }
    }, [])

    const fetchData = async () => {
        const { data } = await axios.get(`/api/result/${resultId}/`,);
        const { predict_result, comments } = data

        setResult(predict_result)
        setCommentList(comments)
    }

    const formatNumber = (number) => {
        return Math.floor(number * 10) / 10;
    }

    return (
        <div className="relative w-full h-screen">
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
            <div className="p-4 px-6">
                <div className="flex gap-4 items-center">
                    <p className="text-[20px]">予測結果</p>
                    <div className="border-primary text-[16px] border text-primary rounded-[40px] py-1 px-3">{date}</div>
                </div>

                <div className="flex gap-4 mt-[30px] mb-[50px] flex-col">
                    <div className="flex gap-6">
                        <p className="w-[55%] text-[#000000DE]">今後5年間の予測結果</p>
                        <p className="text-[#000000DE]">同年代平均との比較</p>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <div className="w-[68%] flex gap-5 items-center">
                            <div>がん発症リスク</div>
                            <div>{formatNumber(Number(result?.cancer_rate || 0))}%</div>
                        </div>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.cancer_risk || 0)} />
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <div className="w-[68%] flex gap-5 items-center">
                            <div>脳卒中発症率</div>
                            <div>{formatNumber(Number(result?.stroke_myocardial_infarction_rate || 0))}%</div>
                        </div>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.stroke_myocardial_infarction_risk || 0)} />
                        </div>
                    </div>

                    {/*
                    <div className="flex gap-4 text-[#000000DE] ">
                        <div className="w-[68%] flex gap-5 items-center">
                            <div>狭心症・心筋梗塞 発症率</div>
                            <div>{formatNumber(Number(result?.care_need_rate || 0))}%</div>
                        </div>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.care_need_risk || 0)} />
                        </div>
                    </div>
                    */}

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <div className="w-[68%] flex gap-5 items-center">
                            <div>生存率</div>
                            <div>{formatNumber(Number(result?.death_rate || 0))}%</div>
                        </div>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.death_risk || 0)} />
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <div className="w-[68%] flex gap-5 items-center">
                            <div>要介護発生率</div>
                            <div>{formatNumber(Number(result?.care_need_rate || 0))}%</div>
                        </div>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.care_need_risk || 0)} />
                        </div>
                    </div>
                </div>


                <div className="mb-6">アドバイス</div>

                {
                    commentList?.map(({ title, content }, index) => {
                        return (
                            <div key={index} className='mt-[14px]'>
                                <div className="mb-3">{title}</div>
                                <p>{content}</p>
                            </div>
                        )
                    })
                }

                <p onClick={() => navigate(`/health-edit?resultId=${resultId}`)} className='cursor-pointer underline mt-[40px] decoration-primary underline-offset-4 text-primary' >
                    健診情報を確認する
                </p>
            </div>
            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
    )
}

export default PredictResult


const ResultData = ({ number }) => {
    if (number === 1) {
        return <div className="bg-success rounded-[50px] text-white p-3 py-[5px]">とても低い</div>;
    } else if (number === 2) {
        return <div className="bg-primary rounded-[50px] text-white p-3 py-[5px]">低い</div>;
    } else if (number === 3) {
        return <div className="bg-grey rounded-[50px] text-black p-3 py-[5px]">ふつう</div>;
    } else if (number === 4) {
        return <div className="bg-warning rounded-[50px] text-white p-3 py-[5px]">高い</div>;
    } else if (number === 5) {
        return <div className="bg-error rounded-[50px] text-white p-3 py-[5px]">とても高い</div>;
    } else {
        return ''
    }
}