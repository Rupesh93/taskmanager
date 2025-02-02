import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const Dashboard = () => {

    const [taskData, setTaskData] = useState([]);
    const [taskListData, setTaskListData] = useState([]);
    const [addTask, setAddTask] = useState(false);
    const [newTask, setNewTask] = useState({
        id: "",
        title: "",
        completed: false,
        userId: ""
    });
    const [showDialog, setShowDialog] = useState(false);
    const [EditData, setEditData] = useState({});
    const [showError, setShowError] = useState(false);
    const [isAsc, setIsAsc] = useState(true);



    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((res) => res.json())
            .then((resData) => {
                setTaskData(resData);
                setTaskListData(resData);
            })
            .catch((err) => { console.log(err) })

    }, [])

    const handleOpenDialog = (data) => {
        setShowDialog(true);
        setEditData(data);
    }

    const handleCloseDialog = () => {
        setShowDialog(false);
        setEditData({});
    }

    const handleUpdateData = () => {
        const allData = [...taskData];

        if (addTask) {
            const incrId = allData.length + 1;
            let obj = { ...newTask, id: incrId };
            setTaskData([...allData, obj]);
        }
        else if (EditData.title) {
            allData[EditData.rowNo] = EditData;
            setTaskData(allData);
            setEditData({})
        }
        setShowDialog(false);
    }

    const handleDeleteTask = (index) => {
        const allData = [...taskData];
        const beforeDeleteObj = allData.slice(0, index);
        const afterDeleteObj = allData.slice(index + 1);
        let afterDelete = [...beforeDeleteObj, ...afterDeleteObj]
        setTaskData(afterDelete);
    }

    const handleSearch = (e) => {
        const fieldsData = e.target.value;
        if (fieldsData.length) {
            let filteredData = taskListData.filter(task => task.title.includes(fieldsData));
            setTaskData(filteredData);
        }
        else {
            setTaskData(taskListData);
        }
    }

    const handleSortData = () => {
        if (!isAsc) {
            const ascData = taskData.sort((a, b) => a.id - b.id);
            setTaskData(ascData);
        }
        else {
            const descData = taskData.sort((a, b) => b.id - a.id);
            setTaskData(descData);
        }
        setIsAsc(!isAsc);
    }

    return (
        <>
            <div className="bg-slate-100  dark:bg-slate-800 h-[100vh]">
                <Navbar />
                <div className="relative shadow-md sm:rounded-lg w-[90vw] m-auto p-2">
                    <div className="flex flex-col md:flex-row justify-between pb-4 bg-slate-100 dark:bg-slate-800 px-2 md:px-10">
                        <div className="flex flex-col md:flex-row">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="table-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search by title"
                                    onChange={handleSearch} />
                            </div>
                            <button type="button"
                                className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-800 w-auto mt-3 md:mt-0 ml-0 md:ml-3"
                                onClick={handleSortData}
                            >
                                Sort{" "}
                                {isAsc ? "\u2191" : "\u2193"}
                            </button>
                        </div>

                        <button type="button"
                            className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-800 w-auto mt-3 md:mt-0"
                            onClick={() => { setShowDialog(true); setAddTask(true); }}
                        >
                            + Add Task</button>
                    </div>
                    {/* Count */}
                    <p className="text-gray-700  dark:text-gray-400"> Total task:- <b>{taskData.length}</b></p>
                    {/* Table */}
                    <div className="max-h-[500px] overflow-x-auto ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Completed
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    taskData && taskData.map((task, index) => {
                                        return (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {task.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {task.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input type="checkbox" checked={task.completed} readOnly />
                                                </td>
                                                <td className="px-6 py-4 space-x-4 flex">
                                                    <button className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                                                        onClick={() => { setAddTask(false); handleOpenDialog({ ...task, rowNo: index }) }}>
                                                        Edit
                                                    </button>
                                                    <button className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
                                                        onClick={() => { handleDeleteTask(index); }}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {
                    showDialog &&
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="false">
                        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="false" />
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center">

                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full md:max-w-lg ">
                                    <div className="w-full bg-indigo-100 p-4 flex">
                                        <p className="font-bold">{addTask ? "Add Task" : "EDIT"}</p>
                                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-300 hover:text-indigo-800 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                            data-modal-hide="popup-modal" onClick={handleCloseDialog}>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>

                                    </div>
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="mt-3">

                                            <form className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={addTask ? taskData.length + 1 : EditData.id}
                                                        disabled
                                                        className="w-full px-4 py-2 cursor-not-allowed border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={EditData.title}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                        onChange={(e) => {
                                                            if (!e.target.value.length) { setShowError(true); }
                                                            else { setShowError(false); }
                                                            if (addTask) {
                                                                setNewTask({ ...newTask, title: e.target.value })
                                                            }
                                                            else {
                                                                setEditData({ ...EditData, title: e.target.value });
                                                            }
                                                        }}
                                                    />
                                                    {
                                                        showError && <p className="text-red-600">Title is required.</p>
                                                    }

                                                </div>
                                                <div className="flex">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Completed</label>
                                                    <input
                                                        type="checkbox"
                                                        required
                                                        checked={addTask ? newTask.completed : EditData.completed}
                                                        onChange={(e) => {
                                                            if (addTask) {
                                                                setNewTask({ ...newTask, completed: !newTask.completed })
                                                            }
                                                            else {
                                                                setEditData({ ...EditData, completed: !EditData.completed });
                                                            }
                                                        }}
                                                        className=" ml-3"
                                                    />
                                                </div>

                                                <div className="bg-gray-50 py-3 sm:flex sm:flex-row-reverse">
                                                    <button type="button"
                                                        className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-800 sm:ml-3 sm:w-auto"
                                                        onClick={handleUpdateData}
                                                    >
                                                        {addTask ? "Add Task" : "Update Task"}</button>
                                                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={handleCloseDialog}>Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }



            </div>
        </>
    )
}

export default Dashboard;