import styles from "./StudyStatistics.module.css"

type StudyStatCardProps = {
    title: string,
    count: number,
    imgSrc: string,
    variant: "total" | "mastered" | "in-progress" | "not-started"
}

export default function StudyStatCard ({ title, count, imgSrc, variant }: StudyStatCardProps) {
    return(
        <div className={styles["study-stat-card"]}>
            <div className={styles["study-stat-card-content"]}>
                <h2 className="text-preset-4-medium">{title}</h2>
                <p className="text-preset-1">{count}</p>
            </div>
            <div className={`${styles["study-stat-card-icon"]} ${styles[variant]}`}>
                <img 
                    src={imgSrc}
                    alt={`${title} icon`}
                />
            </div>
        </div>
    ) 
}