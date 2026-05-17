import { forwardRef, useImperativeHandle, useRef } from "react"

/*  
    Older versions of React, before React 19, did not allow accepting REF as a prop, and it would throw an error if we tried to do so.
    For older versions we had a special warpper function called forwardRef that we had to use to wrap our component in order to accept a ref as a prop.
    However, with the introduction of React 19, we can now directly accept refs as props without needing to use forwardRef. 
    This is because React 19 introduced a new feature called "automatic ref forwarding" that allows refs to be passed down to child components without needing to use forwardRef.
*/

const ResultModal = forwardRef(function ResultMod({result, targetTime}, ref ) {

    const dialogRef = useRef();


    /* 
        useImperativeHandle(ref, callback()) helps when Parent wants to control child behavior imperatively, not through props.
        It encapsulates the child's internal declarative logic and exposes an imperative interface to the parent.
        It decouples the parent from the child's internal implementation by hiding declarative logic and exposing a simple imperative interface.
    */

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialogRef.current.showModal();
            }
        }
    })

    return (
        /* 
            The dialog element is 'invisible' by default, and it can be made visible by adding the open attribute to it.
            However due to adding the open attribute, the dialog does not render the built in backdrop.
        */
        <dialog ref={dialogRef} className="result-modal">
            <h2>{result}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>X seconds left.</strong></p>
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    )
});

export default ResultModal;