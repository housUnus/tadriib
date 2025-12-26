import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}

export default function LoadingButton({
  isLoading = false,
  className = "",
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || props.disabled} // combine with any passed disabled
      className={`${className} relative flex items-center justify-center`}
      {...props}
    >
      {isLoading && (
        <Loader2 className="animate-spin w-4 h-4 absolute left-3" /> // optional left-aligned spinner
      )}
      <span className={isLoading ? "opacity-50" : ""}>{children}</span>
    </Button>
  );
}
