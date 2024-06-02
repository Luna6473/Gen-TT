import React, {useState} from 'react';

import "./Modal.css";

export const Modal = ({ closemodal, onSubmit,  defalutValue }) => {
  const [formState, setFormState] = useState(
    defalutValue || {
    time:"",
    description:"",
  });

  const[errors, setErrors] = useState("")

  const validateForm = () => {
    if(formState.time && formState.description) {
      setErrors("")
      return true;
    } else {
      let errorFields = [];
      for(const [key,value] of Object.entries(formState)) {
        if(!value) {
          errorFields.push(key)
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }

  };


  const handldeChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState)

    closemodal();
  };

  return (
  <div 
    className="modal-container" 
    onClick={(e) => {
      if (e.target.className === "modal-container") closemodal();
    }}>
            <div className='modal'>
              <form>
                <div className='form-group'>
                  <label htmlfor="time">Time</label>
                  <input name="time" value={formState.time} 
                  onChange={handldeChange} 
                  />
                </div>
                <div className='form-group'>
                  <label htmlfor="description">Description</label>
                  <textarea name="description" value={formState.description}
                  onChange={handldeChange}
                  />
                </div>
                {errors && <div className="error">{`Please include: ${errors}`}</div>}
                <button type="submit" className='btn' onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
  );
}
