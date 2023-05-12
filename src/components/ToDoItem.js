import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const ToDoItem = ({ todoItem, todoList, setTodoList }) => {
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(todoItem.text);

  const editInputRef = useRef(null);

  useEffect(() => {
    // edit 모드일때 포커싱을 한다.
    if (edited) {
      editInputRef.current.focus();
    }
  }, [edited]);

  const updateTodoList = (update) => {
    setTodoList(
      todoList.map((item) =>
        item.id === todoItem.id ? { ...item, ...update(item) } : item
      )
    );
  };

  const onChangeCheckbox = () => {
    updateTodoList((item) => ({ checked: !item.checked }));
  };

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onChangeEditInput = (e) => {
    setNewText(e.target.value);
  };

  const onClickSubmitButton = (e) => {
    if (e.type === "keypress" && e.key !== "Enter") {
      return;
    }

    updateTodoList(() => ({ text: newText }));
    setEdited(false);
  };

  const onClickDeleteButton = () => {
    if (window.confirm("정말로 지우실건가요?")) {
      updateTodoList(() => ({ deleted: true }));
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
      {
        // 아이템 내용
        edited ? (
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
              todoItem.checked ? "todoapp__item-ctx-checked" : ""
            }`}
          >
            {todoItem.text}
          </span>
        )
      }
      {
        // 수정 버튼
        // 완료한 일인 경우에는 null을 반환하여 보이지 않도록 함
        !todoItem.checked ? (
          edited ? (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickSubmitButton}
            >
              완료
            </button>
          ) : (
            <button
              type="button"
              className="todoapp__item-edit-btn"
              onClick={onClickEditButton}
            >
              수정
            </button>
          )
        ) : null
      }

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
};

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
