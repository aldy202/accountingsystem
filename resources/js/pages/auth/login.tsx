import { Head, useForm } from "@inertiajs/react";
import type { FormEventHandler } from "react";

import BrandingSection from "@/features/auth/components/BrandingSection";
import FooterSection from "@/features/auth/components/FooterSection";
import LoginForm from "@/features/auth/components/LoginForm";
import AuthLayout from "@/layouts/AuthLayout";


interface LoginPageForm {
    email: string;
    password: string;
    remember: boolean;
}

export default function Login() {
    const { data, setData, post, processing, errors, reset } =
        useForm<LoginPageForm>({
            email: "",
            password: "",
            remember: false,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <AuthLayout>
            <Head title="Login" />

            <div className="flex w-full max-w-lg flex-col gap-8">
                <BrandingSection />

                <LoginForm
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={submit}
                />

                <FooterSection />
            </div>
        </AuthLayout>
    );
}
