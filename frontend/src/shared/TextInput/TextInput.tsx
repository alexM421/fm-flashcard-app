import styles from "./TextInput.module.css";

type TextInputProps = {
  legend: string;
  placeholder: string;
  inputValue: string;
  setInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nameId: string;
};

export default function TextInput({
  legend,
  placeholder,
  inputValue,
  setInputValue,
  nameId,
}: TextInputProps) {
  return (
    <div className={styles["text-input"]}>
      <p className="text-preset-4-medium">{legend}</p>
      <input
        type="text"
        placeholder={placeholder}
        name={nameId}
        id={nameId}
        value={inputValue}
        onChange={setInputValue}
      />
    </div>
  );
}
