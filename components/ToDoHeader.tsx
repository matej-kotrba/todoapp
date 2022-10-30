import React, { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { useMainContext } from "../context/MainContext";
import { BsCardChecklist, BsUpload } from "react-icons/bs";

function ToDoHeader({
  newTodo,
  saveTodosFnc,
}: {
  newTodo: Function;
  saveTodosFnc: () => void;
}) {
  const { isSavedNotificationOpen, setIsSavedNotificationOpen } =
    useMainContext();

  const handleToggleSavedOpen = () => {
    setIsSavedNotificationOpen(true);
    if (isSavedNotificationOpen === false) {
      setTimeout(() => {
        setIsSavedNotificationOpen(false);
      }, 3000);
    }
  };

  const DialogRef = useRef<HTMLDialogElement>(null);

  const handleDialog = () => {
    DialogRef.current?.showModal();
  };

  return (
    <>
      <div
        className="w-full mb-10 rounded-md p-8 flex justify-between flex-col md:flex-row gap-10 md:gap-0
       items-center shadow-lg dark:bg-slate-800"
      >
        <div className="relative text-3xl dark:text-white isolate">
          <h1 className="">
            <span className="font-bold">Do</span>mania
          </h1>
          <div
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
            rotate-[25deg] text-[3.5rem] text-slate-400 -z-10 opacity-40"
          >
            <BsCardChecklist />
          </div>
        </div>
        {/* Options list */}
        <div className="flex gap-4 items-center">
          {/* Save button */}
          <div
            className="flex flex-row items-center gap-2 text-2xl bg-blue-600
         text-white p-4 rounded-full hover:bg-blue-700 cursor-pointer
          active:scale-95 select-none shadow-lg group overflow-hidden relative"
            onClick={() => {
              handleDialog();
            }}
          >
            <div className="group-hover:translate-y-[200%] flex gap-2 items-center ease-cubicBazierCustom duration-200">
              <span>Save</span>
              <BiSave />
            </div>
            <BsUpload
              className="-translate-y-[200%] group-hover:translate-y-0 absolute left-[50%]
             translate-x-[-50%] ease-cubicBazierCustom duration-200"
            />
          </div>
          <div
            className="text-4xl p-2 cursor-pointer hover:bg-gray-200 rounded-full 
            dark:hover:bg-darkHoverColorEffect duration-200 dark:text-white"
            onClick={() => newTodo()}
          >
            <AiOutlinePlus />
          </div>
        </div>
      </div>
      {/* Save complete notification */}
      <div className="w-fit overflow-hidden right-5 bottom-5 p-4 pointer-events-none fixed">
        <div
          className={`flex items-center gap-2 p-4 shadow-lg duration-300 ease-linear bg-white dark:bg-[#2b2b2b]
       ${isSavedNotificationOpen ? "" : "translate-y-[200%]"}`}
        >
          <FiCheck className="text-4xl text-green-500" />
          <span className="text-xl text-green-600">
            Your todos were saved !
          </span>
        </div>
      </div>
      {/* Save confirm dialog */}
      <dialog
        ref={DialogRef}
        className="left-[50%] top-[30%] -translate-x-[50%] bg-white dark:bg-gray-800
        p-2 md:p-8 text-center rounded-md backdrop:opacity-30 backdrop:bg-black"
      >
        <p className="text-slate-800 text-3xl dark:text-white">
          You are about to overide your{" "}
          <span className="font-semibold">save</span>!
        </p>
        <p className="text-slate-600 text-xl my-3 dark:text-white">
          Do you want to proceed?
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            className="w-[100px] py-3 rounded-md border-green-500 border-2 dark:text-white
          hover:bg-green-500 hover:text-white duration-200 shadow-lg hover:shadow-green-200"
            onClick={() => {
              saveTodosFnc();
              handleToggleSavedOpen();
              DialogRef.current?.close();
            }}
          >
            Yes
          </button>
          <button
            className="w-[100px] py-3 rounded-md border-red-500 border-2 dark:text-white
          hover:bg-red-500 hover:text-white duration-200 shadow-lg hover:shadow-red-200"
            onClick={() => {
              DialogRef.current?.close();
            }}
          >
            No
          </button>
        </div>
      </dialog>
    </>
  );
}

export default ToDoHeader;
