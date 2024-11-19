import { Spinner } from "@nextui-org/spinner";
import React from "react";

const Loading = ({ size, color }) => {
  return (
    <div className="flex justify-center">
      <Spinner
        color={`${color ? color : "primary"}`}
        size={`${size ? size : "md"}`}
      />
    </div>
  );
};

export default Loading;
