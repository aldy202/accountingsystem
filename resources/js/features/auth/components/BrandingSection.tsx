export default function BrandingSection() {
    return (
        <div className="flex flex-col items-center text-center gap-3">
            <div className="flex h-32 w-32 items-center justify-center rounded-xl text-sm font-semibold">
                <img
                    src="/image/logo/login.png"
                    alt="Logo"
                    className="h-full w-full object-contain rounded-xl"
                />
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-[#4A347D]">
                    Pulse Digital
                </h1>
                <p className="text-base text-muted-foreground">Welcome Back</p>
            </div>
        </div>
    );
}
