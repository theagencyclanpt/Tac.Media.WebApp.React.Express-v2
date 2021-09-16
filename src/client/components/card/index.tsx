import React, { useState } from "react";

interface CardProps {
    width: number;
    heigth: number;
    className?: string;
    onClick?: () => void | undefined,
    children?: React.ReactNode;
}

export function Card({ width, heigth, onClick, className, children }: CardProps) {
    const [clickable, setClickable] = useState<boolean>(false);
    const [style, setStyle] = useState<React.CSSProperties>({
        width: width,
        height: heigth,
        borderRadius: "17px"
    });

    if (onClick && !clickable) {
        setClickable(true);
        setStyle({
            ...style,
            cursor: "pointer"
        });
    }

    function onClickHandler() {
        if (clickable) {
            onClick();
        }
    }

    return (
        <div className={className + " card"} style={style} onClick={onClickHandler}>
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}