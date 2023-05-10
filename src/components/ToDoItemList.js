import DragList from 'react-drag-list';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ToDoItem from './ToDoItem';

const ToDoItemList = ({ title, todoList, setTodoList, checkedList }) => {
    useEffect(() => {
        const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
        if (storedTodoList) {
            setTodoList(storedTodoList);
        }
    }, [setTodoList]);

    return (
        <div className="todoapp__list">
            <p className="todoapp__list-tit">{title}</p>

            <DragList
                list={todoList}
                itemKey="id"
                template={(todoItem, index) => (
                    <ToDoItem
                        key={todoItem.id}
                        todoItem={todoItem}
                        todoList={todoList}
                        setTodoList={setTodoList}
                    />
                )}
                onUpdate={(newList) => setTodoList(newList)}
            />
        </div>
    );
};

ToDoItemList.propTypes = {
    title: PropTypes.string.isRequired,
    todoList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        })
    ),
    setTodoList: PropTypes.func.isRequired,
    checkedList: PropTypes.bool.isRequired,
};

export default ToDoItemList;




