import React from "react";

interface BadgeProps {
    label?: string;
    value?: string | number;
    children?: React.ReactNode;
    variant?: "neutral" | "danger" | "success" | "warning";
    size?: "sm" | "md";
    icon?: React.ReactNode;
}

export const Badge = React.memo(function Badge({    
    value,
    children,
    variant = "neutral",
    size = "md",
    icon
}: BadgeProps) {
    const colors = {
        neutral: "bg-neutral-800 text-neutral-400 border-neutral-700",
        danger: "bg-red-500/10 text-red-400 border-red-500/20",
        success: "bg-green-500/10 text-green-400 border-green-500/20",
        warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2 py-0.5 text-[10px]",
    };

    const content = children || value;

    return (
        <div
            className={`flex items-center gap-1.5 rounded-full border font-medium ${colors[variant]} ${sizes[size]}`}
        >
            {icon && <span className="opacity-70">{icon}</span>}
            <span>{content}</span>
        </div>
    );
});
