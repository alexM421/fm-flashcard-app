import styles from "./Button.module.css";
import { slugify } from "../../utils/slugify";
import { forwardRef } from "react";

type ButtonProps = {
    text: string;
    imgSrcName?: string;
    variants?: "reverse" | "shadow";
    onClick: () => void;
    disabled?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, imgSrcName, variants, onClick, disabled }: ButtonProps, ref) => {
        const sluggedText = slugify(text);

        return (
            <button
                className={`${styles["btn"]}  ${variants ? styles[variants] : ""}`}
                onClick={onClick}
                ref={ref}
                disabled={disabled}
            >
                {imgSrcName && (
                    <img
                        src={`/assets/images/${imgSrcName}`}
                        alt={`${sluggedText}-icon`}
                    />
                )}
                <p className="text-preset-4-medium">{text}</p>
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
