import React, { useCallback } from 'react';
import '../css/todo-item.css'

export default function TodoItem({
  todoItem,
  onDelete,
  onToggle,
}){
  const handleDeleteClick = useCallback(() => {
    onDelete(todoItem);
  }, [todoItem, onDelete]);

  const handleDone = useCallback(() => {
    onToggle(todoItem);
  }, [todoItem, onToggle]);

  return (
    <div className='todo-item'>
      <button type="button" onClick={handleDeleteClick}>
        x
      </button>
      &nbsp;
      <label>
        <input checked={todoItem.isDone} type="checkbox" onClick={handleDone} />
      </label>
      &nbsp;
      {todoItem.isDone ? <s>{todoItem.text}</s> : todoItem.text}
    </div>
  );
}
