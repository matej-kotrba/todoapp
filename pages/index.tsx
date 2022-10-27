import type { NextPage } from "next";
import ToDoList from "../components/ToDoList";
import MainContext from "../context/MainContext";

const Home: NextPage = () => {
  return (
    <MainContext>
      <div className="container mx-auto">
        <ToDoList />
      </div>
    </MainContext>
  );
};

export default Home;
