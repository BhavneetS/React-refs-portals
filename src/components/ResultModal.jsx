export default function ResultModal({result, targetTime}){
    return (
        /* 
            The dialog element is 'invisible' by default, and it can be made visible by adding the open attribute to it.
            However due to adding the open attribute, the dialog does not render the built in backdrop.
        */
        <dialog open>
            <h2>{result}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
}