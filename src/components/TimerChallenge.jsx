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

    // const[timerStarted, setTimerStarted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(targetTime *1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;

    if(timeRemaining <=0) {
        // reset if the time is over and show the dialog.
        clearInterval(timerRef.current);
        //resetting time here causes the remaining time to always be shown as the target time in the ResultModal.
        dialogRef.current.open();
    }
    
    function handleReset() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStop() {
        dialogRef.current.open();
        clearInterval(timerRef.current);
    }

    function handleTimerStart() {
        /*  
            With refs, we need to use the current property, because the ref itself is an object that contains a current property that holds the actual value we want to store. 
            
        */

        
        // use Interval in place of Timeout to identify the remaining time 
        timerRef.current  = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining -10);
            /* 
                updating the below call from .modal() to .open() to align with the use of Imerative Handle in the Result Modal component.
            */
            // dialogRef.current.open();
        }, 10)

        // setTimerStarted(true);
    }

    return (
        <>
        <ResultModal ref={dialogRef} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleTimerStart}>
                        {timerIsActive ? "Stop Challenge" : "Start Challenge"}
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? `Time is Running.... ${timerIsActive}` : 'Timer inactive' } 
                </p>
            </section>
        </>
    )
}