import React from "react";
export default function Error(data) {
  console.log(data);
  return (
    <ul style={{ color: "red", fontSize: "14px" }}>
      {data.errors &&
        Object.keys(data.errors).map(key => {
          return (
            <li key={key}>
              {key}:{data.errors[key][0]}
            </li>
          );
        })}
    </ul>
  );
}
