import styles from "./TextInput.module.css";

type TextInputProps = {
    legend: string;
    placeholder: string;
    inputValue: string;
    setInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    nameId: string;
    error?: {
        errorState: boolean,
        errorText: string
    }
};

export default function TextInput({
    legend,
    placeholder,
    inputValue,
    setInputValue,
    nameId,
    error
}: TextInputProps) {
    return (
        <div className={`${styles["text-input"]} ${error?.errorState && styles["text-input-error"]} `}>
            <p className="text-preset-4-medium">{legend}</p>
            <input
                type="text"
                placeholder={placeholder}
                name={nameId}
                id={nameId}
                value={inputValue}
                onChange={setInputValue}
            />
            {error?.errorState && 
                <div className={styles["error-msg"]}>
                    <img src="/assets/images/icon-error.svg" alt="Error Icon"/>
                    <p className="text-preset-5-regular">{error.errorText}</p>
                </div>
            }
        </div>
    );
}
