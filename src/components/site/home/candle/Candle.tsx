// components/Candle.tsx

import React from 'react';

type CandleProps = {
    bodyHeight: number;
    shadowUp: number;
    shadowDown: number;
    color: string;
};

const Candle: React.FC<CandleProps> = ({ bodyHeight, shadowUp, shadowDown, color }) => {
    return (
        <div className="flex flex-col items-center -mt-[5px]">
            {/* Shadow Up */}
            <div
                style={{ height: `${shadowUp}px` }}
                className="w-[1px] bg-black"
            ></div>

            {/* Candle Body */}
            <div
                style={{ height: `${bodyHeight}px` }}
                className={`w-[5px] ${color} rounded-sm`}
            ></div>

            {/* Shadow Down */}
            <div
                style={{ height: `${shadowDown}px` }}
                className="w-[1px] bg-black"
            ></div>
        </div>
    );
};

export default Candle;