import React from "react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border hover:shadow-lg transition-all">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className={`${color} h-14 w-14 rounded-xl flex items-center justify-center text-white`}>
          <Icon size={28} />
        </div>

      </div>

    </div>
  );
}