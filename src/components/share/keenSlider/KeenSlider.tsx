"use client";

import React, { useEffect, useRef, useState } from "react"
import "@/style/share/keenSlider.css"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import SlideShowHomeItem from "@/components/site/home/slideShowHomeItem/SlideShowHomeItem";

export default function KeenSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
            resetAutoplay(); // مهم: هر بار تغییر اسلاید دستی = ریست تایمر
        },
        created() {
            setLoaded(true);
            startAutoplay(); // شروع اولیه
        },
        defaultAnimation: {
            duration: 1000,
            easing: (t) => t * (2 - t),
        },
    });

    const startAutoplay = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            instanceRef.current?.next();
        }, 5000); // هر ۳ ثانیه یکی جلو برو
    };

    const resetAutoplay = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setTimeout(() => {
            startAutoplay();
        }, 2000); // بعد از ۵ ثانیه از آخرین حرکت دستی، دوباره اتوماتیک شروع کن
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current); // هنگام unmount تمیزکاری
        };
    }, []);

    return (
        <>
            <div className="navigation-wrapper  w-full h-full">
                <div ref={sliderRef} className="keen-slider  w-full h-full">
                    <div className="keen-slider__slide  w-full h-full">
                        <SlideShowHomeItem />
                    </div>
                    <div className="keen-slider__slide  w-full h-full">
                        <SlideShowHomeItem />
                    </div>
                    <div className="keen-slider__slide  w-full h-full">
                        <SlideShowHomeItem />

                    </div>

                </div>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow

                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow left
                            onClick={(e: any) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides.length - 1
                            }
                        />
                    </>
                )}
            </div>
            {loaded && instanceRef.current && (
                <div className="dots">
                    {Array.from(
                        { length: instanceRef.current.track.details.slides.length },
                        (_, idx) => (
                            <button
                                key={idx}
                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                            />
                        )
                    )}
                </div>
            )}

        </>
    )
}

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}
