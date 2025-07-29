"use client"
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { typeWriterTranslationType } from '@/Type/translationType/typeWriterTranslationType.type'

function TypeWriterEffect(
    { translate, }:
        { translate: typeWriterTranslationType }
) {


    return (
        <>
            <Typewriter
                words={
                    [translate.typeWriterTerm1,
                    translate.typeWriterTerm2,
                    translate.typeWriterTerm3,
                    translate.typeWriterTerm4,
                    translate.typeWriterTerm5
                    ]
                }
                loop={0}
                cursor
                cursorStyle="!"
                typeSpeed={40}
                deleteSpeed={20}
                delaySpeed={1000}
            />
        </>
    )
}

export default TypeWriterEffect;

