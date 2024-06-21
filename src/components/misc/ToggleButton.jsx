import React from "react";

export default function ToggleButton(props) {
  const { func } = props;

  return (
    <label class="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        onClick={() => func()}
        value=""
        className="sr-only peer outline-none"
      />
      <div className="relative w-11 h-6 bg-bg peer-focus:outline-none hover:ring-2 peer-hover:ring-a dark:peer-focus:ring-a rounded-md peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-p after:border-bg after:border after:rounded-md after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-a"></div>
    </label>
  );
}
