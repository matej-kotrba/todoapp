import React, {
  useState,
  useRef,
  memo,
  useEffect,
  useMemo,
  type ChangeEvent,
  RefObject,
} from "react";
import { MdDelete, MdRefresh } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPaintBrush } from "react-icons/fa";
import { NestedItemsInterface } from "./ToDoList";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useMainContext } from "../context/MainContext";
import { ColorPicker } from "../components";

const ToDoItem = memo(function ToDoItem({
  title,
  id,
  deleteFunction,
  hasPath,
  bgColor,
  arrayPart,
  parentCompletion,
  setParentTotalCompletion,
  parentRef,
}: {
  title: string;
  id: string;
  deleteFunction: Function;
  arrayPart: NestedItemsInterface;
  hasPath?: boolean;
  bgColor?: string;
  parentCompletion: boolean;
  setParentTotalCompletion?: Function;
  parentRef?: RefObject<HTMLElement>;
}) {
  const [nestedItems, setNestedItems] = useState<
    { title: string; id: string }[]
  >(arrayPart.items);

  const [isChecked, setIsChecked] = useState<boolean>(arrayPart.completed);
  const [color, setColor] = useState(bgColor || "#f2f2f2");
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [changeOfCompletion, setChangeOfCompletion] = useState(0);
  const { setForceRerenderCount } = useMainContext();

  const idCount = useRef(0);
  const totalTodosCompletion = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  useMemo(() => {
    totalTodosCompletion.current = 0;
    for (let i in arrayPart.items) {
      if (arrayPart.items[i].completed) totalTodosCompletion.current++;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeOfCompletion]);

  useEffect(() => {
    if (parentCompletion === true) setIsChecked(true);
  }, [parentCompletion]);

  // set parents completion
  useEffect(() => {
    arrayPart.completed = isChecked;
    if (setParentTotalCompletion)
      setParentTotalCompletion((old: number) =>
        isChecked ? old + 1 : old - 1
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  // At the start set right index
  useEffect(() => {
    if (arrayPart.items[0]) {
      idCount.current = parseInt(
        arrayPart.items[arrayPart.items.length - 1].id.slice(
          arrayPart.items[arrayPart.items.length - 1].id.lastIndexOf("i") + 1,
          arrayPart.items[arrayPart.items.length - 1].id.length
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setForceRerenderCount((old: number) => old + 1);
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

    setForceRerenderCount((old: number) => old + 1);
    arrayPart.items.splice(spliceIndex, 1);
  };

  const handleColor = (color: any) => {
    setColor(color.hex);
  };

  const handleOpenColor = () => {
    setIsColorOpen((old) => !old);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    arrayPart.title = e?.target?.value;
  };

  useEffect(() => {
    if (connectorRef.current) {
      connectorRef.current.style.height =
        elementRef.current && parentRef?.current
          ? String(
              elementRef.current.offsetTop -
                parentRef.current.offsetTop -
                parentRef.current.clientHeight / 2
            ) + "px"
          : "0px";
    }
  });

  return (
    <>
      <div
        ref={elementRef}
        className={`relative w-[15rem] max-w-[15rem] md:w-[21rem] md:max-w-[21rem] lg:w-[42rem] 
        lg:max-w-2xl p-8 my-4 shadow-lg rounded-xl flex justify-between 
        flex-col lg:flex-row items-center group bg-lightPrimary dark:bg-gray-700
        `}
        onMouseLeave={() => setIsColorOpen(false)}
      >
        {parentRef?.current && (
          <div
            ref={connectorRef}
            className={`absolute border-2 border-red-500 border-solid w-[30px] 
          bottom-[50%] left-[-30px] rounded-bl-lg border-t-0 border-r-0`}
          ></div>
        )}
        <div className="relative flex items-center gap-2 w-full flex-wrap">
          <div
            onClick={() => setIsChecked((old) => !old)}
            className="accent-slate-500 rounded-full text-4xl p-1 cursor-pointer
            hover:bg-whiteHoverColorEffect dark:hover:bg-darkHoverColorEffect duration-200 shadow-lg"
          >
            {isChecked ? (
              <TiTick className="text-green-500" />
            ) : (
              <IoClose className="text-red-500" />
            )}
          </div>
          <div className="relative max-w-full">
            <input
              type={"text"}
              className={`text-xl bg-transparent outline-none peer
             md:w-80 inline-block max-w-full text-ellipsis ${
               isChecked
                 ? "text-slate-400 dark:text-slate-900"
                 : "text-gray-800 dark:text-white"
             }`}
              defaultValue={title}
              placeholder={"Your new awesome ToDo"}
              onChange={handleTitleChange}
              disabled={isChecked}
            ></input>
            <div
              className="absolute top-full left-0 w-full h-1 rounded-full bg-red-500 origin-center 
        scale-x-0 peer-focus:scale-x-100 duration-150 ease-linear"
            ></div>
            <div
              className={`absolute left-0 w-full h-1 top-[50%] translate-y-[-50%] bg-slate-500
              rounded-full duration-200 origin-left ${
                isChecked ? "scale-x-100" : "scale-x-0"
              }`}
            ></div>
          </div>
        </div>
        {/* Options part */}
        <div className="relative">
          {/* Absolutely placed total completed number */}
          {arrayPart?.items?.length > 0 && (
            <p
              className={`absolute left-0 top-[50%] translate-y-[-50%] text-black dark:text-white 
          group-hover:opacity-0 duration-100`}
            >
              Completed:{" "}
              <span
                className={`${
                  totalTodosCompletion.current === arrayPart?.items?.length
                    ? "text-green-400 dark:text-green-400"
                    : ""
                }`}
              >
                {totalTodosCompletion.current}/{arrayPart?.items?.length}
              </span>
            </p>
          )}
          {/* Options */}
          <div className="relative flex gap-2 justify-between items-center opacity-1 md:opacity-0 group-hover:opacity-100 duration-300">
            <div
              onClick={handleOpenColor}
              className="text-slate-700 dark:text-white text-3xl rounded-full bg-transparent 
            hover:bg-whiteHoverColorEffect dark:hover:bg-darkHoverColorEffect p-2 duration-200 cursor-pointer"
            >
              <FaPaintBrush />
              {isColorOpen && (
                <div className="z-10 absolute right-[100%] bottom-0">
                  <ColorPicker />
                </div>
              )}
            </div>
            <div
              className="text-slate-700 dark:text-white text-3xl rounded-full bg-transparent 
            hover:bg-whiteHoverColorEffect dark:hover:bg-darkHoverColorEffect p-2 duration-200 cursor-pointer"
              onClick={() => deleteFunction(id)}
            >
              <MdDelete />
            </div>
            <div
              className="text-slate-700 dark:text-white text-3xl rounded-full bg-transparent 
            hover:bg-whiteHoverColorEffect dark:hover:bg-darkHoverColorEffect p-2 duration-200 cursor-pointer"
              onClick={handleNewTodo}
            >
              <AiOutlinePlus />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-10">
        {nestedItems.map((item, index) => {
          if (arrayPart.items[index] !== undefined) {
            return (
              <ToDoItem
                title={item.title}
                key={item.id}
                id={item.id}
                arrayPart={arrayPart.items[index]}
                deleteFunction={handleDeleteTodo}
                hasPath
                bgColor={color}
                parentCompletion={isChecked}
                setParentTotalCompletion={setChangeOfCompletion}
                parentRef={elementRef}
              />
            );
          }
          return;
        })}
      </div>
    </>
  );
});

export default ToDoItem;
