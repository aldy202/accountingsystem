import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const wasDark = useRef(false);

    useEffect(() => {
        const root = document.documentElement;
        wasDark.current = root.classList.contains("dark");

        // Paksa light selama di halaman auth
        root.classList.remove("dark");

        return () => {
            // Kembalikan tema asal saat keluar dari halaman auth
            if (wasDark.current) {
                root.classList.add("dark");
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            {children}
        </div>
    );
}
