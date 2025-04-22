import React from 'react';
import {getCurrentSession, loginUser, registerUser} from "@/action/auths";
import {redirect} from "next/navigation";
import SignUp from "@/components/auth/SignUp";
import zod from "zod";

const SignUpSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
})

async function SignUpPage() {
    const session = await getCurrentSession();
    if (session.user) {
        return redirect("/");
    }
    const action = async(prevState: any, formData:FormData) => {
        "use server"
        const parsed = SignUpSchema.safeParse(Object.fromEntries(formData));
        if (!parsed.success) {
            return {
                message:"Invalid form data"
            }
        }
        const {email, password} = parsed.data;
        const {user, error} = await registerUser(email, password);
        if(error) {
            return {
                message:error
            }
        }else if(user) {
            await loginUser(email, password);
            return redirect("/");
        }
    }

    return (
        <SignUp action={action}/>
    );
}

export default SignUpPage;