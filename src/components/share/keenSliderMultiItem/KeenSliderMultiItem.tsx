"use client";

import React, { useEffect, useRef, useState } from "react"
import "@/style/share/keenSlider.css"
import "keen-slider/keen-slider.min.css"
import {
    useKeenSlider,
    KeenSliderPlugin,
    KeenSliderInstance,
} from "keen-slider/react"
import "@/style/share/keenSlider.css"
import "keen-slider/keen-slider.min.css"
import type { MutableRefObject } from "react"

export default function KeenSliderMultiItem({ slides }: { slides: string[] }) {

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
    const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 5,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

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
            <div ref={sliderRef} className="keen-slider h-96  ">
                {
                    slides.map((item, index) => (
                        <div key={index} className="keen-slider__slide rounded-3xl p-2 flex flex-row justify-center items-center w-full h-full">
                            <img src={item} className="slideImg rounded-xl  shadow shadow-black" />
                        </div>
                    ))
                }
            </div>

            <div ref={thumbnailRef} className="keen-slider thumbnail ">
                {
                    slides.map((item, index) => (
                        <div key={index} className="keen-slider__slide  "><img src={item} /></div>
                    ))
                }

            </div>
        </>
    )
}



function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active")
            })
        }
        function addActive(idx: number) {
            slider.slides[idx].classList.add("active")
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main: KeenSliderInstance) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}