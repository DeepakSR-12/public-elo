import { ReactElement } from "react";

const Loader = ({
  icon,
  message = "AI is thinking...",
}: {
  icon: ReactElement;
  message?: string;
}) => {
  return (
    <div className="h-full gap-y-4 flex flex-col justify-center items-center">
      <div className="relative w-10 h-10 animate-bounce">{icon}</div>
      <p className="text-sm text-muted-foreground text-center">{message}</p>
    </div>
  );
};

export default Loader;
