import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadtask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    }
    loadtask();
  }, []);

  // Handle form submission logic here
  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(), // Convert date to UTC string
    };
    // handle form submission
    if (params.id) {
      updateTask(params.id, dataValid);
      navigate("/tasks");
    } else {
      createTask(dataValid);
      navigate("/tasks");
    }
  });
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          {...register("title")}
        />
        <label htmlFor="description">Description</label>
        <textarea
          rows="3"
          name="description"
          placeholder="Description"
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          {...register("description")}
        ></textarea>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
          {...register("date")}
        />
        <button className="bg-indigo-500 px-3 rounded-md">Save</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
