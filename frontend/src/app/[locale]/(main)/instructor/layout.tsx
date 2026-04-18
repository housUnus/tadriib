"use client";
import React, { useContext, useEffect } from "react";
import { CustomizerContext } from "@/app/context/CustomizerContext";

export default function InstructorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { setIsCollapse, isCollapse, isLayout, setActiveMode, activeMode } = useContext(CustomizerContext);
    
    useEffect(() => {
       setIsCollapse('mini-sidebar');
    }, []);
    
    return (
        <div className="p-4">
            {children}
        </div>
    );
}
