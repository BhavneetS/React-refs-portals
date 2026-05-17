import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

/* 
    If we delcare the timer outside the component function, it will be shared across all instances of the Timer component. 
    This means that if multiple Timer components are rendered, they will all reference the same timer variable, which can lead to unexpected behavior when starting and stopping the timers. For example, if one timer is started and then another timer is started before the first one is stopped, both timers will reference the same timer variable, and stopping one timer will stop both timers. 
    This can cause confusion for users and make it difficult to manage multiple timers effectively.
 */

let timer;

export default function TimerChallenge({ title, targetTime }) {

    /* 
        Declaring the Timer within the component function means that it will be re-declared on every render.
        Due to this the, pointer to the timeout created in the first render is never cleared in the second render, and the timeout callback will execute after the target time has elapsed, even if the timer was stopped in the meantime. 
        This is because the clearTimeout function is called with a different timer variable that does not reference the original timeout.
    */
    //    let timer;

    /* 
        Refs are stored behind the scences in a mutable object that persists for the entire lifetime of the component. 
        When we assign a value to a ref, it does not trigger a re-render of the component, and the value is preserved across renders. 
        This makes refs ideal for storing mutable values that need to persist across renders, such as timers or DOM elements.
    */

    const timerRef = useRef();
    const dialogRef =useRef();

    const [timerExpired, setTimerExpired] = useState(false);
    const[timerStarted, setTimerStarted] = useState(false);

    function handleTimerStart() {
        /*  
            With refs, we need to use the current property, because the ref itself is an object that contains a current property that holds the actual value we want to store. 
            
        */
        timerRef.current  = setTimeout(() => {
            setTimerExpired(true)
            dialogRef.current.showModal();
        }, targetTime * 1000)

        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timerRef.current);
        setTimerStarted(false);
    }

    return (
        <>
        <ResultModal ref={dialogRef} targetTime={targetTime} result="You lost!" />
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired && <p>You lost!</p>}
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleTimerStart}>
                        {timerStarted ? "Stop Challenge" : "Start Challenge"}
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Time is Running....' : 'Timer inactive' } 
                </p>
            </section>
        </>
    )
}