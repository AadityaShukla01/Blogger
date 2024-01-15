import React from "react";
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div className="max-w-xl mx-auto">
      <ReactLoading type={"cylon"} color={"#000"} height={67} width={75} className="max-w-xl mx-auto my-20"/>
    </div>
  );
};

export default Loader;
