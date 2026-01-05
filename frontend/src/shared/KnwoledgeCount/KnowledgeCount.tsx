import styles from "./KnowledgeCount.module.css";

export default function KnowledgeCount({ knownCount }: { knownCount: number }) {
    const filledPercent =
        knownCount > 5 ? 100 : ((knownCount / 5) * 100).toFixed(2);

    return (
        <div className={styles["knowledge-count"]}>
            <div className={styles["external-bar"]}>
                <div
                    className={styles["filling-bar"]}
                    style={{ width: `${filledPercent}%` }}
                ></div>
            </div>
            <p className="text-preset-6">{knownCount}/5</p>
        </div>
    );
}
