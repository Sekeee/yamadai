import {Button, TextInput} from "@mantine/core";
import {useState} from "react";

export default function Login () {

    const [emailValue , setEmailValue] = useState();
    const [passwordValue , setPasswordValue] = useState();
    const [isDisabled , setIsDisabled ] = useState(true);


    return (
        <div className='w-full h-screen flex justify-center content-center'>
        <div className='flex w-1/3 content-center pt-1 2 border-2 border-black my-10 '>
            <p className='mx-10'>ログイン</p>
           <div className='flex flex-col content-center justify-center'>
                <TextInput
                    label="Mail address"
                />
                <TextInput
                    label="Password"
                />
               <Button className={`my-6 ${isDisabled ? 'text-black bg-gray-400' : 'text-white bg-blue-400' } `} disabled={isDisabled} variant="filled">ログイン</Button>　
               <div className='text-blue-400 underline cursor-
               pointer'>パスワードを忘れましたか？</div>
               <div className='text-blue-400 underline cursor-pointer'>アカウントを作成</div>
            </div>
        </div>
        </div>
    );
}


