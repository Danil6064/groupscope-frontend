import InsertLinkPopup from "./InsertLinkPopup";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import { ReactComponent as LinkIcon } from "../icons/link.svg";
import { ReactComponent as SaveIcon } from "../icons/save.svg";
import { ReactComponent as DeleteIcon } from "../icons/delete.svg";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./addTaskPopup.css";
import { useState } from "react";
import { Editor, EditorState, editorState } from "draft-js";

export default function TaskPopup({ handleOpenState, taskInfo, isNewTask }) {
  const [isInsertLinkPopupOpen, setIsInsertLinkPopupOpen] = useState(false);
  const [editorState, setEditorState] = useState("");
  const axiosPrivate = useAxiosPrivate();

  // console.log("taskType", taskInfo?.type);

  const handleDeleteButton = () => {
    // console.log("subjectName", taskInfo.subjectName);
    // console.log("name", taskInfo.name);
    axiosPrivate
      .delete(`/api/subject/${taskInfo.subjectName}/task/delete`, {
        data: { name: taskInfo.name },
      })
      .then(() => {
        alert("Task deleted");
        handleOpenState();
      })
      .catch((error) => console.error(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const type = form.get("type");
    const number = form.get("number");
    const deadline = form.get("deadline");
    const description = form.get("description");
    const maxMark = form.get("maxMark");

    const name = ({
      PRACTICAL: "Практичне завдання",
      LABORATORY: "Лабораторна робота",
      TEST: "Тест",
    }[type] += ` №${number}`);

    console.log(type, number, deadline, description, name);

    isNewTask
      ? axiosPrivate
          .post(`/api/subject/${taskInfo.subjectName}/task/add`, {
            name: name,
            type: type,
            info: description,
            deadline: deadline.split("-").reverse().join("."),
            maxMark: maxMark,
          })
          .then(() => {
            alert("Task added");
            handleOpenState();
          })
          .catch((error) => {
            console.error(error);
          })
      : axiosPrivate
          .patch(`/api/subject/${taskInfo.subjectName}/task/patch`, {
            name: taskInfo.name,
            newName: name,
            type: type,
            info: description,
            deadline: deadline.split("-").reverse().join("."),
            maxMark: maxMark,
          })
          .then(() => {
            alert("Task changed");
            handleOpenState();
          })
          .catch((error) => {
            console.error(error);
          });
  };

  // console.log(taskDeadline);
  return (
    <div className="popup-overlay">
      <section className="popup">
        <header className="popup__header">
          <div />
          <h2>{isNewTask ? "Додаємо нове " : "Редагуємо "}завдання</h2>
          <CloseIcon className="popup__close-btn" onClick={handleOpenState} />
        </header>

        <form onSubmit={handleSubmit}>
          <div className="popup__form-item">
            <label>Оберіть тип завдання:</label>
            <select
              className="popup__form-item-input"
              name="type"
              required
              defaultValue={taskInfo?.type}
            >
              <option value="PRACTICAL">ПЗ</option>
              <option value="LABORATORY">ЛБ</option>
              <option value="TEST">ТЕСТ</option>
            </select>
          </div>

          <div className="popup__form-item">
            <label>Оберіть номер завдання:</label>
            <select
              className="popup__form-item-input"
              name="number"
              required
              defaultValue={taskInfo?.number}
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map(
                (number, index) => (
                  <option key={index} value={number}>
                    {number}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="popup__form-item">
            <label>Дата останьої здачи:</label>
            <input
              className="popup__form-item-input"
              type="date"
              name="deadline"
              required
              defaultValue={taskInfo?.deadline}
            />
          </div>

          <div className="popup__form-item">
            <label>Максимальна оцінка:</label>
            <input
              className="popup__form-item-input"
              type="number"
              min={1}
              max={100}
              name="maxMark"
              required
              defaultValue={taskInfo?.maxMark || 100}
              placeholder="Оцінка"
            />
          </div>

          <div className="popup__form-item">
            <label>Напишіть завдання:</label>
            <LinkIcon
              className="popup__link-btn"
              onClick={() => setIsInsertLinkPopupOpen(true)}
            />
            {isInsertLinkPopupOpen && (
              <InsertLinkPopup setIsOpen={setIsInsertLinkPopupOpen} />
            )}
          </div>

          <textarea
            name="description"
            required
            defaultValue={taskInfo?.description}
          ></textarea>

          <div
            className={`popup__btns ${isNewTask ? "center" : "space-between"}`}
          >
            {!isNewTask && (
              <button
                type="button"
                className="popup__btn"
                onClick={handleDeleteButton}
              >
                <DeleteIcon style={{ marginRight: 10 }} />
                Видалити
              </button>
            )}
            <button type="submit" className="popup__btn">
              <SaveIcon style={{ marginRight: 10 }} />
              Зберегти
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function TextEditor() {
  const [editorState, setEditorState] = useState("");

  return (
    <div
      name="description"
      className="text-editor"
      contentEditable="plaintext-only"
    >
      {editorState}
    </div>
  );
}

function TextEditor2() { }
