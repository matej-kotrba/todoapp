import type { NextPage } from "next";
import { ToDoHeader, ToDoItem } from "../components";
import { useState, useRef, useEffect } from "react";
import { SiRobotframework } from "react-icons/si";

export interface NestedItemsInterface {
  title: string;
  id: string;
  completed: boolean;
  items: NestedItemsInterface[];
}

const ToDoList: NextPage = () => {
  const [nestedItems, setNestedItems] = useState<
    { title: string; id: string }[]
  >([]);
  const idCount = useRef(0);

  const wholeArray = useRef<NestedItemsInterface[]>([]);

  // Handling localStorage with todos
  const saveTodosToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(wholeArray.current));
  };

  const loadTodosFromLocalStorage = () => {
    const response = localStorage.getItem("todos");
    return response === "" ? [] : response;
  };

  useEffect(() => {
    if (loadTodosFromLocalStorage() !== "[]") {
      wholeArray.current = JSON.parse(loadTodosFromLocalStorage() as string);
      const array = [];
      for (let i in wholeArray.current) {
        array.push({
          title: wholeArray.current[i].title,
          id: wholeArray.current[i].id,
        });
      }

      idCount.current = parseInt(
        array[array.length - 1].id.slice(
          array[array.length - 1].id.lastIndexOf("x") + 1,
          array[array.length - 1].id.length
        )
      );
      setNestedItems(array);
    }
  }, []);

  // Handling todos - creation, delete
  const handleNewTodo = () => {
    idCount.current++;
    setNestedItems((old) => {
      return [...old, { title: "New Todo", id: "index" + idCount.current }];
    });
    wholeArray.current.push({
      title: "New Todo",
      id: "index" + idCount.current,
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
    wholeArray.current = wholeArray.current.filter((item) => {
      return item.id !== idValue;
    });
  };

  return (
    <>
      <ToDoHeader
        newTodo={handleNewTodo}
        saveTodosFnc={saveTodosToLocalStorage}
      />
      {nestedItems.map((item, index) => {
        return (
          <ToDoItem
            key={item.id}
            title={item.title}
            id={item.id}
            arrayPart={wholeArray.current[index]}
            deleteFunction={handleDeleteTodo}
          />
        );
      })}
      {!nestedItems[0] && (
        <div className="relative grid place-items-center h-[6rem]">
          <p className="text-2xl text-center font-semibold">
            You have no Todos yet, lets fix that !
          </p>
          <SiRobotframework className="text-[6rem] absolute top-0 -z-10 text-gray-200" />
        </div>
      )}
    </>
  );
};

export default ToDoList;
