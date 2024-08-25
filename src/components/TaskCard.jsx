import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between items-center">
        <h2 className="text-lg md:text-2xl font-bold truncate">{task.title}</h2>
        <div className="flex gap-x-2 items-center">
          <buttton
          className="bg-red-500 px-3 rounded-md text-white px-4 py-2 rounded-md"

            onClick={() => {
              deleteTask(task._id);
            }}
          >
            delete
          </buttton>
          <Link to={`/tasks/${task._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >edit</Link>
        </div>
      </header>
      <p className="text-slate-300 mt-2 line-clamp-3">{task.description}</p>
      <p className="text-slate-400 mt-2">Created at: {
      dayjs.utc(task.date).format('DD/MM/YYYY')      
      }</p>
    </div>
  );
}

export default TaskCard;
