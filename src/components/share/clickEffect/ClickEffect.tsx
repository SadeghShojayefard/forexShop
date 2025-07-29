// components/ClickEffect.tsx
"use client";
import { TfiMoney } from "react-icons/tfi";

import { useEffect, useState } from "react";


type ClickItem = {
    id: number;
    x: number;
    y: number;
};

export default function ClickEffect() {
    const [clicks, setClicks] = useState<ClickItem[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const newClick: ClickItem = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };
            setClicks(prev => [...prev, newClick]);

            setTimeout(() => {
                setClicks(prev => prev.filter(c => c.id !== newClick.id));
            }, 700); // زمان حذف آیتم
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <>
            {clicks.map(click => (
                <span
                    key={click.id}
                    className="fixed pointer-events-none text-yellow-200 font-bold text-2xl animate-float-up z-50 flex flex-row"
                    style={{
                        top: click.y,
                        left: click.x,
                    }}
                >
                    <TfiMoney size={25} color={'yellow'} />50+
                </span>
            ))}
        </>
    );
}
