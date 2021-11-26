import { FC } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const Loading: FC = () => {
  return (
    <>
      <div className="p-d-flex p-flex-column">
        <ProgressSpinner className="p-mt-4" />
        <h2 className="p-mt-4 p-text-center">loading...</h2>
      </div>
    </>
  );
};

export default Loading;
