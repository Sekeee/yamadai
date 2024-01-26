import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomDrawer from "../../components/common/Drawer";
import Header from "../../components/layouts/Header"

const DailyResult = () => {
    const [searchParams] = useSearchParams();
    const [result, setResult] = useState({});
    const historyId = searchParams.get('historyId');
    const date = searchParams.get('date');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    useEffect(() => {
        if (historyId) { fetchData() }
    }, [])

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/dailyhabit/${historyId}/`,);
            const { point_scale_of_action, point_scale_of_condition, total_score_of_body_condition } = data
            setResult({
                point_scale_of_action: point_scale_of_action,
                point_scale_of_condition: point_scale_of_condition,
                total_score_of_body_condition: total_score_of_body_condition
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="relative w-full h-screen">
            <Header title='健康増進アプリ' setIsDrawerOpen={setIsDrawerOpen} />
            <div className="p-4 px-6">
                <div className="flex gap-4 items-center">
                    <p className="text-[20px]">予測結果</p>
                    {date && <div className="border-primary text-[16px] border text-primary rounded-[40px] py-1 px-3">{date}</div>}
                </div>

                <div className="flex gap-4 mt-[30px] mb-[50px] flex-col">
                    <div className="flex gap-6">
                        <p className="w-[55%] text-[#000000DE]">今後5年間の予測結果</p>
                        <p className="text-[#000000DE]">同年代平均との比較</p>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <div className="w-[40%] flex gap-5 items-center">
                            <div>action</div>
                        </div>
                        <div className="w-[60%] flex items-center">
                            <ResultData number={Number(result?.point_scale_of_action || 0)} />
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <div className="w-[40%] flex gap-5 items-center">
                            <div>condition</div>
                        </div>
                        <div className="w-[60%] flex items-center">
                            <ResultData number={Number(result?.point_scale_of_condition || 0)} />
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <div className="w-[68%] flex gap-5 items-center">
                            <div>total_score_of_body_condition</div>
                        </div>
                        <div className="w-[32%] flex justify-center items-center">
                            <div>{Number(result?.total_score_of_body_condition || 0)}/12</div>
                        </div>
                    </div>
                </div>

            </div>
            <CustomDrawer setIsDrawerOpen={setIsDrawerOpen} isDrawerOpen={isDrawerOpen} />
        </div>
    )
}

export default DailyResult


const ResultData = ({ number }) => {
    if (number === 5) {
        return <div className="bg-success rounded-[50px] text-white p-3 py-[5px]">大変良くできました</div>;
    } else if (number === 4) {
        return <div className="bg-primary rounded-[50px] text-white p-3 py-[5px]">よくできました</div>;
    } else if (number === 3) {
        return <div className="bg-grey rounded-[50px] text-black p-3 py-[5px]">ふつうです</div>;
    } else if (number === 2) {
        return <div className="bg-warning rounded-[50px] text-white p-3 py-[5px]">もうすこしがんばりましょう</div>;
    } else if (number === 1) {
        return <div className="bg-error rounded-[50px] text-white p-3 py-[5px]">もっとがんばりましょう</div>;
    } else {
        return ''
    }
}