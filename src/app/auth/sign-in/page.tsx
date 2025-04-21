import React from 'react';
import {getCurrentSession, loginUser, registerUser} from "@/action/auths";
import {redirect} from "next/navigation";
import SignUp from "@/components/auth/SignUp";
import zod from "zod";
import SignIn from "@/components/auth/SignIn";

const SignInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
})

async function SignInPage(props) {
    const session = await getCurrentSession();
    if (session.user) {
        return redirect("/");
    }
    const action = async(prevState: any, formData:FormData) => {
        "use server"
        const parsed = SignInSchema.safeParse(Object.fromEntries(formData));
        if (!parsed.success) {
            return {
                message:"Invalid form data"
            }
        }
        const {email, password} = parsed.data;
        const {user, error} = await loginUser(email, password);
        if(error) {
            return {
                message:error
            }
        }else if(user) {
            return redirect("/");
        }
    }

    return (
        <SignIn action={action}/>
    );
}

export default SignInPage;