import React from 'react';
import SpinnerImg from "../../../../assets/BKSpinner.gif"

let Spinner = () => {
    return(
        <React.Fragment>
            <img src={SpinnerImg} alt="" className='d-flex m-auto' />;
        </React.Fragment>

    )
}

export default Spinner;