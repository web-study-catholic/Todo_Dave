import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const ToDoItem = ({ todoItem, todoList, setTodoList }) => {
    const [edited, setEdited] = useState(false);
    const [newText, setNewTest] = useState(todoItem.text);

    const editInputRef = useRef(null);

    useEffect(() => {
        // edit 모드일때 포커싱을 한다.
        if (edited) {
            editInputRef.current.focus();
        }
    }, [edited]);

    const onChangeCheckbox = () => {
        const nextTodoList = todoList.map((item) => ({
            ...item,
            // id 값이 같은 항목의 checked 값을 Toggle 함
            checked: item.id === todoItem.id ? !item.checked : item.checked,
        }));

        setTodoList(nextTodoList);
    };

    const onClickEditButton = () => {
        setEdited(true);
    };

    const onChangeEditInput = (e) => {
        setNewTest(e.target.value);
    };

    const onClickSubmitButton = (e) => {
        if (e.key === 'Enter') {
            const nextTodoList = todoList.map((item) => ({
                ...item,
                text: item.id === todoItem.id ? newText : item.text, // 새로운 아이템 내용을 넣어줌
            }));
            setTodoList(nextTodoList);

            setEdited(false);
        }
    };

    const onClickDeleteButton = () => {
        if (window.confirm('정말로 지우실건가요?')) {
            const nextTodoList = todoList.map((item) => ({
                ...item,
                deleted: item.id === todoItem.id ? true : item.deleted,
            }));

            setTodoList(nextTodoList);
        }
    };
    const onClickDeleteAllButton = () => {
        if (window.confirm('모든 항목을 삭제하시겠습니까?')) {
            setTodoList([]);
        }
    };

    return (
        <li className="todoapp__item">
            {/* 아이템 완료 체크 / 체크 해제를 위한 체크박스 */}
            <input
                type="checkbox"
                className="todoapp__item-checkbox"
                checked={todoItem.checked}
                onChange={onChangeCheckbox}
            />
            {/* 아이템 내용 */}
            {edited ? (
                <input
                    type="text"
                    className="todoapp__item-edit-input"
                    value={newText}
                    ref={editInputRef}
                    onChange={onChangeEditInput}
                    onKeyPress={onClickSubmitButton}
                />
            ) : (
                <span
                    className={`todoapp__item-ctx ${
                        todoItem.checked ? 'todoapp__item-ctx-checked' : ''
                    }`}
                >
        {todoItem.text}
      </span>
            )}
            {/* 수정 버튼 */}
            {!todoItem.checked && (
                <button
                    type="button"
                    className="todoapp__item-edit-btn"
                    onClick={onClickEditButton}
                >
                    수정
                </button>
            )}
            {/* 삭제 버튼 */}
            <button
                type="button"
                className="todoapp__item-delete-btn"
                onClick={onClickDeleteButton}
            >
                삭제
            </button>
        </li>
    );
}
    ToDoItem.propTypes = {
        todoItem: PropTypes.shape({
            id: PropTypes.number,
            text: PropTypes.string.isRequired,
        }),
        todoList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired,
            })
        ),
        setTodoList: PropTypes.func.isRequired,
    };

export default ToDoItem;
