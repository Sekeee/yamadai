import Header from "../../components/layouts/Header"

const PredictResult = () => {
    return (
        <>
            <Header title='健康増進アプリ' />
            <div className="p-4 px-6">
                <div className="flex gap-4 items-center">
                    <p className="text-[20px]">予測結果</p>
                    <div className="border-primary text-[16px] border text-primary rounded-[40px] py-1 px-3">2023/08/17</div>
                </div>

                <div className="flex gap-4 mt-[30px] mb-[50px] flex-col">
                    <div className="flex gap-6">
                        <p className="w-[80%] text-[#000000DE]">今後○年間の予測結果</p>
                        <p className="text-[#00000099]">同年代と比べた リスクの程度</p>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <p className="w-[48%]">がん発症率</p>
                        <p className="w-[10%] ">10%</p>
                        <div className="w-[30%]">
                            <div className="bg-success rounded-[50px] text-white p-3 py-[5px]">とても低い</div>
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <p className="w-[48%]">脳卒中発症率</p>
                        <p className="w-[10%] ">30%</p>
                        <div className="w-[30%] flex items-center">
                            <div className="bg-primary rounded-[50px] text-white p-3 py-[5px]">低い</div>
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] ">
                        <p className="w-[48%]">狭心症・心筋梗塞 発症率</p>
                        <p className="w-[10%] ">50%</p>
                        <div className="w-[30%] flex items-center">
                            <div className="bg-grey rounded-[50px] text-black p-3 py-[5px]">ふつう</div>
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <p className="w-[48%]">生存率</p>
                        <p className="w-[10%] ">30%</p>
                        <div className="w-[30%] flex items-center">
                            <div className="bg-warning rounded-[50px] text-white p-3 py-[5px]">高い</div>
                        </div>
                    </div>

                    <div className="flex gap-4 text-[#000000DE] items-center">
                        <p className="w-[48%]">要介護率</p>
                        <p className="w-[10%] ">70%</p>
                        <div className="w-[30%] flex items-center">
                            <div className="bg-error rounded-[50px] text-white p-3 py-[5px]">とても高い</div>
                        </div>
                    </div>
                </div>


                <div className="mb-6">アドバイス</div>
                <div className="mb-3">アドバイス小見出し</div>
                <p>ここにアドバイスの詳細を書きます。例）1日15分以上の運動をしましょう。</p>
                <div className="mt-4 mb-3">アドバイス小見出し</div>
                <p>ここにアドバイスの詳細を書きます。例）1日15分以上の運動をしましょう。</p>

                <p className='cursor-pointer underline mt-[40px] decoration-primary underline-offset-4 text-primary' >
                    健診情報を確認する
                </p>
            </div>
        </>
    )
}

export default PredictResult