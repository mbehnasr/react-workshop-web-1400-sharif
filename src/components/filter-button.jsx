import React, { useCallback } from 'react';
import '../css/filter-button.css'
interface Props {
  isActive: boolean;
  text: string;
  onActivate: (filter: string) => void;
}

export default function FilterButton({
  isActive,
  text,
  onActivate,
}){
  const handleClick = useCallback(() => {
    onActivate(text);
  }, [text, onActivate]);

  return (
    <div className='filter-button'>
      <label>
        <input type="radio" checked={isActive} onClick={handleClick} />
        &nbsp;
        {text}
      </label>
    </div>
  );
}
