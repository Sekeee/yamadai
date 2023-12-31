import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/layouts/Header"

const PredictResult = () => {
    const navigate = useNavigate()
    const [commentList, setCommentList] = useState([]);
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState({});
    const resultId = searchParams.get('resultId');
    const date = searchParams.get('date');

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

    return (
        <>
            <Header title='健康増進アプリ' />
            <div className="p-4 px-6">
                <div className="flex gap-4 items-center">
                    <p className="text-[20px]">予測結果</p>
                    <div className="border-primary text-[16px] border text-primary rounded-[40px] py-1 px-3">{date}</div>
                </div>

                <div className="flex gap-4 mt-[30px] mb-[50px] flex-col">
                    <div className="flex gap-6">
                        <p className="w-[80%] text-[#000000DE]">今後○年間の予測結果</p>
                        <p className="text-[#00000099]">同年代と比べた リスクの程度</p>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <p className="w-[48%]">がん発症率</p>
                        <p className="w-[10%] ">{result?.cancer_rate}</p>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.cancer_rate || 0)} />
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <p className="w-[48%]">脳卒中発症率</p>
                        <p className="w-[10%] ">{result?.stroke_myocardial_infarction_rate}</p>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.cancer_rate || 0)} />
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] ">
                        <p className="w-[48%]">狭心症・心筋梗塞 発症率</p>
                        <p className="w-[10%] ">{result?.care_need_rate}</p>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.care_need_rate || 0)} />
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <p className="w-[48%]">生存率</p>
                        <p className="w-[10%] ">{result?.death_rate}</p>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.death_rate || 0)} />
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <p className="w-[48%]">要介護率</p>
                        <p className="w-[10%] ">{result?.care_need_rate}</p>
                        <div className="w-[32%] flex items-center">
                            <ResultData number={Number(result?.care_need_rate || 0)} />
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
        </>
    )
}

export default PredictResult


const ResultData = ({ number }) => {
    if (number >= 0 && number <= 20) {
        return <div className="bg-success rounded-[50px] text-white p-3 py-[5px]">とても低い</div>;
    } else if (number > 20 && number <= 40) {
        return <div className="bg-primary rounded-[50px] text-white p-3 py-[5px]">低い</div>;
    } else if (number > 40 && number <= 60) {
        return <div className="bg-grey rounded-[50px] text-black p-3 py-[5px]">ふつう</div>;
    } else if (number > 60 && number <= 80) {
        return <div className="bg-warning rounded-[50px] text-white p-3 py-[5px]">高い</div>;
    } else if (number > 80 && number <= 100) {
        return <div className="bg-error rounded-[50px] text-white p-3 py-[5px]">とても高い</div>;
    } else {
        return ''
    }
}