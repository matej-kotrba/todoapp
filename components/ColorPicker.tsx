import React from "react";

const COLOR_OPTIONS: `#${string}`[] = [
  "#03a5fc",
  "#493fa6",
  "#7d1930",
  "#3e9e26",
  "#bdab0b",
  "#c9690e",
  "#821f07",
  "#374151",
  "#f2f2f2",
];

function ColorPicker() {
  return (
    <div className="bg-white dark:bg-slate-800 grid grid-cols-3 md:grid-cols-6 gap-2 w-[150px] md:w-[300px] p-4 rounded-md">
      {COLOR_OPTIONS.map((color, index) => {
        return (
          <div
            className={`w-full aspect-square rounded-full duration-100 hover:scale-110`}
            style={{
              backgroundColor: color,
            }}
            key={index}
          ></div>
        );
      })}
    </div>
  );
}

export default ColorPicker;
