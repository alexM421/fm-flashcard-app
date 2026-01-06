import styles from "./CheckboxInput.module.css";

type CheckboxInputProps = {
    id: string;
    onChange: () => void;
    value: boolean;
};

export default function CheckboxInput({
    id,
    onChange,
    value,
}: CheckboxInputProps) {
    return (
        <label htmlFor={id} className={styles["checkbox-input"]}>
            <input
                type="checkbox"
                id={id}
                onChange={onChange}
                checked={value}
            />
            <img
                src="/assets/images/icon-check.svg"
                alt="checkbox check icon"
            />
        </label>
    );
}
