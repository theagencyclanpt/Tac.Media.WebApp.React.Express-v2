import React, { useEffect, useState } from "react";

interface CardProps {
    width?: number;
    height?: number;
    className?: string;
    onClick?: () => void | undefined,
    children?: React.ReactNode;
    title?: string;
    isHidden?: boolean;
}

export function Card({ width, height, onClick, className, children, title, isHidden }: CardProps) {
    const style: React.CSSProperties = {
        width: width ? width : '100%',
        height: height ? height : '100%',
        borderRadius: "17px",
    };

    if (onClick) {
        style.cursor = "pointer";
    }

    function onClickHandler() {
        if (onClick) {
            onClick();
        }
    }

    return (
        <div style={{ display: isHidden ? "none" : "block" }}>
            {title && (<h4>{title}</h4>)}
            <div className={className + " card"} style={style} onClick={onClickHandler}>
                {children}
            </div>
        </div>

    );
}