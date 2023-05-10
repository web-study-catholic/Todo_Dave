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
            <ul className="todoapp__list-ul">
                {todoList &&
                    todoList.map((todoItem) => {
                        if (todoItem.deleted) return null;
                        if (checkedList !== todoItem.checked) return null;

                        return (
                            <ToDoItem
                                key={todoItem.id}
                                todoItem={todoItem}
                                todoList={todoList}
                                setTodoList={setTodoList}
                            />
                        );
                    })}
            </ul>
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




