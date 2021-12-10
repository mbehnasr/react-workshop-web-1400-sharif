import React, { useCallback, useState } from 'react';
import '../css/add-form.css';

export default function AddForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setText(value);
    },
    [text]
  );

  const handleSubmit = useCallback(
    (event) => {
      onAdd(text);
      event.preventDefault();
    },
    [text]
  );

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <input value={text} placeholder="New item" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}
