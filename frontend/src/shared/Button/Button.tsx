import styles from "./Button.module.css";
import { slugify } from "../../utils/slugify";
import { forwardRef } from "react";

type ButtonProps = {
    text: string;
    imgSrcName?: string;
    variants?: "reverse" | "shadow";
    onClick: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, imgSrcName, variants, onClick, disabled, type = "button" }: ButtonProps, ref) => {
        const sluggedText = slugify(text);

        return (
            <button
                className={`${styles["btn"]}  ${variants ? styles[variants] : ""}`}
                onClick={onClick}
                ref={ref}
                disabled={disabled}
                type={type}
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
