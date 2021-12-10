import React, { useCallback, useMemo, useState } from 'react';
import * as uuid from 'uuid';
import FilterButton from '../components/filter-button';
import AddForm from '../components/add-form';
import   TodoItem from '../components/todo-item';
//style and icons
import '../css/application.css'


const FILTERS = ['all', 'done', 'undone'];

const initialTodoItems = [
  { text: 'Warm up', id: uuid.v4(), isDone: true },
  { text: 'Go run outside for half an hour', id: uuid.v4(), isDone: false },
  { text: 'Take a shower', id: uuid.v4(), isDone: false },
  { text: 'Eat your breakfast', id: uuid.v4(), isDone: false },
  { text: 'Brush your teeth', id: uuid.v4(), isDone: false },
];

function Application() {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [currentFilter, setCurrentFilter] = useState(FILTERS[0]);

  const handleAdd = useCallback(
    (newItemText) => {
      setTodoItems([
        ...todoItems,
        { text: newItemText, id: uuid.v4(), isDone: false },
      ]);
    },
    [todoItems]
  );

  const handleDelete = useCallback(
    (todoItem) => {
      setTodoItems(todoItems.filter((item) => item !== todoItem));
    },
    [todoItems]
  );

  const handleFilterActivate = useCallback((filter) => {
    setCurrentFilter(filter);
  }, []);

  const handleToggle = useCallback(
    (todoItem) => {
      setTodoItems(
        todoItems.map((item) =>
          item === todoItem ? { ...todoItem, isDone: !todoItem.isDone } : item
        )
      );
    },
    [todoItems]
  );

  const filteredTodoItems = useMemo(
    () =>
      todoItems.filter(({ isDone }) => {
        switch (currentFilter) {
          case 'all':
            return true;
          case 'done':
            return isDone;
          case 'undone':
            return !isDone;
        }
      }),
    [currentFilter, todoItems]
  );

  return (
    <div className="Application">
      {FILTERS.map((filter) => (
        <FilterButton
          key={filter}
          isActive={filter === currentFilter}
          text={filter}
          onActivate={handleFilterActivate}
        />
      ))}
      {filteredTodoItems.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          todoItem={todoItem}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
      <AddForm onAdd={handleAdd} />
    </div>
  );
}

export default Application;
