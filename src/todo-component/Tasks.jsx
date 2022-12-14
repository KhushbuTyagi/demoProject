import React, { useEffect, useCallback, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TaskSearch from "./task-search-component/TaskSearch";
import "./Tasks.css";
import debounce from "@mui/utils/debounce";
import TaskItem from "./task-list-component/TaskList";
import Snackbar from "@mui/material/Snackbar";
import { getTaskList, removeTask, addTask, upgradeTask } from "../service/TaskService";

export default function Tasks() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [taskList, setTaskList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const selectedId = useRef();
  useEffect(() => {
    getFilteredList();
  }, [searchParams, taskList]);

  const setSelectedId = (task) => {
    selectedId.current = task;
  };
  const saveTask = async (taskName) => {
    console.log('name', taskName);
    if (taskName.length > 0) {
      try {
        await addTask(
          { taskTitle: taskName, taskStatus: "ACTIVE", operation: "sql" }
        );
        getTasks();
      } catch (ex) {
        showToast();
      }
    }
  };

  const updateTask = async (taskName) => {
    if (taskName.length > 0) {
      try {
        await upgradeTask(
          {
            taskTitle: taskName,
            operation: "sql",
            id: selectedId.current.id,
            taskStatus: selectedId.current.taskStatus,
          }
        );
        getTasks();
      } catch (ex) {
        showToast();
      }
    }
  };

  const doneTask = async (task) => {
    try {
      await upgradeTask({
          taskTitle: task.taskTitle,
          operation: "sql",
          id: task.id,
          taskStatus: task.taskStatus,
        }
      );
      getTasks();
    } catch (ex) {
      showToast();
    }
  };

  const deleteTask = async (task) => {
    try {
      await removeTask(task.id)
      getTasks();
    } catch (ex) {
      showToast();
    }
  };

  const getFilteredList = () => {
    if (searchParams.get("filter")) {
      const list = [...taskList];
      setFilteredList(
        list.filter(
          (item) => item.taskStatus === searchParams.get("filter").toUpperCase()
        )
      );
    } else {
      setFilteredList([...taskList]);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await getTaskList();
      setTaskList(res.data);
    } catch (ex) {
      showToast();
    }
  };

  const debounceSaveData = useCallback(debounce(saveTask, 500), []);
  const searchHandlder = async (taskName) => {
    debounceSaveData(taskName);
  };

  const showToast = () => {
    setMsg("Opps. Something went wrong!");
    setOpen(true);
  };

  return (
    <div className="main">
      <TaskSearch searchHandlder={searchHandlder} />
      <ul className="task-filters">
        <li>
          <a
            data-testid="view all"
            href="javascript:void(0)"
            onClick={() => navigate("/")}
            className={!searchParams.get("filter") ? "active" : ""}
          >
            View All
          </a>
        </li>
        <li>
          <a
          data-testid="active"
            href="javascript:void(0)"
            onClick={() => navigate("/?filter=active")}
            className={searchParams.get("filter") === "active" ? "active" : ""}
          >
            Active
          </a>
        </li>
        <li>
          <a
            data-testid="completed"
            href="javascript:void(0)"
            onClick={() => navigate("/?filter=completed")}
            className={
              searchParams.get("filter") === "completed" ? "active" : ""
            }
          >
            Completed
          </a>
        </li>
      </ul>
      {filteredList.map((task) => (
        <TaskItem
          key={task.id}
          deleteTask={deleteTask}
          doneTask={doneTask}
          getSelectedId={setSelectedId}
          task={task}
          searchComponent={
            <TaskSearch
              searchHandlder={updateTask}
              defaultValue={task.taskTitle}
            />
          }
        />
      ))}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={msg}
      />
    </div>
  );
}
