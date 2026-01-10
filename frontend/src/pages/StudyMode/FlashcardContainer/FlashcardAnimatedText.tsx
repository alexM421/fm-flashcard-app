// import { useRef, useLayoutEffect, useState } from "react";
import styles from "./FlashcardContainer.module.css";
import { motion } from "motion/react";


export default function FlashcardAnimatedText({ question, answer, isRevealed }: { question: string, answer: string, isRevealed: boolean }) {


    // const [height, setHeight] = useState({
    //     h1: 0,
    //     p: 0,
    // });

    // const h1ref = useRef<HTMLHeadingElement>(null);
    // const pRef = useRef<HTMLParagraphElement>(null);

    // useLayoutEffect(() => {
        
    //     if (!h1ref.current || !pRef.current) return;
        
    //     setHeight({
    //         h1: h1ref.current.clientHeight,
    //         p: pRef.current.clientHeight,
    //     });
        
    // }, [isRevealed, question, answer]);
    
    // const gap = 16;
    // const totalHeight = height.h1 + height.p + gap;
    // const halfHeight = totalHeight/2;


    // // const h1Offset = isRevealed ? halfHeight : halfHeight-height.h1;  
    // // const pOffset = isRevealed ? halfHeight-height.p : halfHeight;

    // const h1top = -halfHeight;
    // const h1bottom = halfHeight-height.h1;

    // console.log(height.h1);
    // const ptop = -halfHeight;
    // const pbottom = halfHeight-height.p;
    
    return (
        <div  className={styles["flashcard-main"]}>
                <motion.h1 
                    // ref={h1ref} 
                    className="text-preset-1"
                    // initial={isRevealed ? { y: h1top, x: "-50%", fontSize: "40px" } : { y: h1bottom, x: "-50%", fontSize: "24px" }}
                    // animate={isRevealed ? { y: h1bottom, x: "-50%", fontSize: "24px"} : { y: h1top, x: "-50%", fontSize: "40px" }}
                    // transition={{ type: "spring", duration: 0.3 }}
                    layout
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    {isRevealed ? answer : question}
                </motion.h1>
                <motion.p
                    // ref={pRef}
                    className="text-preset-4-medium"
                    // initial={isRevealed ? { y: pbottom, x: "-50%" } : { y: ptop, x: "-50%" }}
                    // animate={isRevealed ? { y: ptop, x: "-50%" } : { y: pbottom, x: "-50%" }}
                    // transition={{ type: "spring", duration: 0.3 }}
                    layout
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    {!isRevealed ? "Click to reveal answer" : "Answer :"}
                </motion.p>
        </div>
    );
}