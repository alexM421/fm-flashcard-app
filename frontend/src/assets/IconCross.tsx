import * as React from "react";
const IconCross = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        viewBox="0 0 16 16"
        aria-label="Cross"
        {...props}
    >
        <path
            fill="currentColor"
            d="m9.484 7.984 3.375 3.375a.53.53 0 0 1 0 .72l-.78.78a.53.53 0 0 1-.72 0L8.016 9.484 4.64 12.86a.53.53 0 0 1-.72 0l-.78-.78a.53.53 0 0 1 0-.72l3.375-3.375L3.14 4.641a.53.53 0 0 1 0-.72l.78-.78a.53.53 0 0 1 .72 0l3.375 3.375 3.343-3.375a.53.53 0 0 1 .72 0l.78.78a.53.53 0 0 1 0 .72z"
        />
    </svg>
);
export default IconCross;
