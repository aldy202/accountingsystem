export default function BrandingSection() {
    return (
        <div className="flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-login text-sm font-semibold text-primary-foreground">
                Logo
            </div>

            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-[#4A347D]">
                    Accounting Information System
                </h1>
                <p className="text-base text-muted-foreground">Welcome Back</p>
            </div>
        </div>
    );
}
