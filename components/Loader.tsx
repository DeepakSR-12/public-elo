import { ReactElement } from "react";
import { Meta } from "./icons/icons";

const Loader = ({
  icon,
  message = "AI is thinking...",
}: {
  icon?: ReactElement;
  message?: string;
}) => {
  return (
    <div className="h-full gap-y-4 flex flex-col justify-center items-center">
      <div className="relative w-10 h-10 animate-bounce">
        <Meta />
      </div>
      <p className="text-sm text-muted-foreground text-center">{message}</p>
    </div>
  );
};

export default Loader;
