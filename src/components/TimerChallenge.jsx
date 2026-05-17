import { useState } from "react";

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


    const [timerExpired, setTimerExpired] = useState(false);
    const[timerStarted, setTimerStarted] = useState(false);

    function handleTimerStart() {
        timer  = setTimeout(() => {
            setTimerExpired(true)
        }, targetTime * 1000)

        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timer);
        setTimerStarted(false);
    }

    return (
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
    )
}