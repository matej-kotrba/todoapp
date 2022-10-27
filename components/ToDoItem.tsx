import React, { useState, useRef, memo, useEffect } from "react";
import { MdDelete, MdRefresh } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPaintBrush } from "react-icons/fa";
import { CirclePicker } from "react-color";
import { NestedItemsInterface } from "./ToDoList";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

const ToDoItem = memo(function ToDoItem({
  title,
  id,
  deleteFunction,
  hasPath,
  bgColor,
  arrayPart,
}: {
  title: string;
  id: string;
  deleteFunction: Function;
  arrayPart: NestedItemsInterface;
  hasPath?: boolean;
  bgColor?: string;
}) {
  const [nestedItems, setNestedItems] = useState<
    { title: string; id: string }[]
  >(arrayPart.items);

  const [isChecked, setIsChecked] = useState<boolean>(arrayPart.completed);

  useEffect(() => {
    arrayPart.completed = isChecked;
  });

  const [color, setColor] = useState(bgColor || "#f2f2f2");
  const [isColorOpen, setIsColorOpen] = useState(false);

  const idCount = useRef(arrayPart.items.length);

  const handleNewTodo = () => {
    idCount.current++;

    setNestedItems((old) => {
      return [...old, { title: "New ToDo", id: id + "i" + idCount.current }];
    });
    arrayPart.items.push({
      title: "New Todo",
      id: id + "i" + idCount.current,
      completed: false,
      items: [],
    });
  };

  const handleDeleteTodo = (idValue: string) => {
    setNestedItems((old) => {
      return old.filter((item) => {
        return item.id !== idValue;
      });
    });

    let spliceIndex = 0;
    for (let i = 0; i < arrayPart.items.length; i++) {
      if (arrayPart.items[i].id === idValue) {
        spliceIndex = i;
        break;
      }
    }

    arrayPart.items.splice(spliceIndex, 1);
  };

  const handleColor = (color: any) => {
    setColor(color.hex);
  };

  const handleOpenColor = () => {
    setIsColorOpen((old) => !old);
  };

  const handleChange = () => {
    arrayPart;
  };

  return (
    <>
      <div
        className="relative max-w-2xl p-8 my-4 shadow-lg rounded-xl flex justify-between items-center group"
        style={{ backgroundColor: color }}
        onMouseLeave={() => setIsColorOpen(false)}
      >
        {hasPath && (
          <svg
            width={"50px"}
            height={"100%"}
            className="absolute -left-[1.25rem] -top-[50%] -z-10"
          >
            <line
              x1={"0"}
              y1={"0"}
              x2={"0px"}
              y2={"100%"}
              strokeWidth="2px"
              stroke="black"
            />
            <line
              x1={"0"}
              y1={"100%"}
              x2={"50px"}
              y2={"100%"}
              strokeWidth="2px"
              stroke="black"
            />
          </svg>
        )}
        <div className="relative flex items-center gap-2">
          <div
            onClick={() => setIsChecked((old) => !old)}
            className="accent-slate-500 rounded-full text-4xl p-1 cursor-pointer
            hover:bg-whiteHoverColorEffect duration-200 shadow-lg"
          >
            {isChecked ? (
              <TiTick className="text-green-500" />
            ) : (
              <IoClose className="text-red-500" />
            )}
          </div>
          <input
            type={"text"}
            className={`text-xl bg-transparent outline-none peer w-full
             md:w-80 ${
               isChecked
                 ? "text-slate-400 line-through decoration-slate-600 decoration-2"
                 : "text-gray-800"
             }`}
            defaultValue={title}
            placeholder={"Your new awesome ToDo"}
            onChange={handleChange}
          ></input>
          <div
            className="absolute top-full left-0 w-full h-1 rounded-full bg-red-500 origin-center 
        scale-x-0 peer-focus:scale-x-100 duration-150 ease-linear"
          ></div>
        </div>
        {/* Options part */}
        <div className="relative flex gap-2 justify-between items-center opacity-0 group-hover:opacity-100 duration-300">
          <div
            onClick={handleOpenColor}
            className="text-slate-700 text-3xl rounded-full bg-transparent hover:bg-whiteHoverColorEffect p-2 duration-200 cursor-pointer"
          >
            <FaPaintBrush />
            {isColorOpen && (
              <div className="z-10 absolute right-[100%]">
                <CirclePicker
                  onChange={handleColor}
                  className="bg-white p-4 shadow-lg rounded-md"
                />
                <MdRefresh
                  onClick={() => setColor("#f2f2f2")}
                  className="absolute bottom-0 right-0 text-slate-700"
                />
              </div>
            )}
          </div>
          <div
            className="text-slate-700 text-3xl rounded-full bg-transparent hover:bg-whiteHoverColorEffect p-2 duration-200 cursor-pointer"
            onClick={() => deleteFunction(id)}
          >
            <MdDelete />
          </div>
          <div
            className="text-slate-700 text-3xl rounded-full bg-transparent hover:bg-whiteHoverColorEffect p-2 duration-200 cursor-pointer"
            onClick={handleNewTodo}
          >
            <AiOutlinePlus />
          </div>
        </div>
      </div>
      <div className="ml-10">
        {nestedItems.map((item, index) => {
          return (
            <ToDoItem
              title={item.title}
              key={item.id}
              id={item.id}
              arrayPart={arrayPart.items[index]}
              deleteFunction={handleDeleteTodo}
              hasPath
              bgColor={color}
            />
          );
        })}
      </div>
    </>
  );
});

export default ToDoItem;
