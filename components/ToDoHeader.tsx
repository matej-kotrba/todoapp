import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSave } from "react-icons/bi";
import { FiCheck } from "react-icons/fi";
import { useMainContext } from "../context/MainContext";

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

  return (
    <>
      <div className="w-full mb-10 rounded-md p-8 flex justify-between items-center shadow-lg">
        <p className="text-3xl">
          Create yours <span className="font-bold">Todo</span> list
        </p>
        {/* Options list */}
        <div className="flex gap-4 items-center">
          <div
            className="flex flex-row items-center gap-2 text-2xl bg-blue-600
         text-white p-4 rounded-full hover:bg-blue-700 cursor-pointer
          active:scale-95 select-none shadow-lg"
            onClick={() => {
              saveTodosFnc();
              handleToggleSavedOpen();
            }}
          >
            <span>Save</span>
            <BiSave />
          </div>
          <div
            className="text-4xl p-2 cursor-pointer hover:bg-gray-200 rounded-full duration-200"
            onClick={() => newTodo()}
          >
            <AiOutlinePlus />
          </div>
        </div>
      </div>
      <div className="w-fit overflow-hidden absolute right-5 bottom-5 p-4">
        <div
          className={`flex items-center gap-2 p-4 shadow-lg duration-300 ease-linear
       ${isSavedNotificationOpen ? "" : "translate-y-[200%]"}`}
        >
          <FiCheck className="text-4xl text-green-500" />
          <span className="text-xl text-green-600">
            Your todos were saved !
          </span>
        </div>
      </div>
    </>
  );
}

export default ToDoHeader;
