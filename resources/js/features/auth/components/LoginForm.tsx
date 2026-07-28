import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FormEventHandler } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginFormErrors {
    email?: string;
    password?: string;
}

interface LoginFormProps {
    data: LoginFormData;
    setData: <K extends keyof LoginFormData>(key: K, value: LoginFormData[K]) => void;
    errors: LoginFormErrors;
    processing: boolean;
    onSubmit: FormEventHandler;
}

export default function LoginForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
}: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="username"
                        autoFocus
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="h-11 rounded-xl border-border text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0"
                        placeholder="nama@perusahaan.com"
                    />
                    <InputError message={errors.email} />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="h-11 rounded-xl border-border text-foreground placeholder:text-muted-foreground pr-10 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    disabled={processing}
                    className="h-11 w-full rounded-xl bg-primary-login text-primary-foreground hover:bg-primary-login-hover active:bg-primary-hover disabled:opacity-70 transition-colors"
                >
                    {processing && <Spinner className="mr-2 h-4 w-4" />}
                    Sign In
                </Button>
            </form>
        </div>
    );
}
