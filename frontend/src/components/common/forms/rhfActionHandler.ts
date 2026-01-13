import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import _ from "lodash";
import { toast } from "sonner";

export function applyServerErrors<T extends FieldValues>(
  error: any,
  setError: UseFormSetError<T>,
  options?: {
    fallbackMessage?: string;
    toastMessage?: string;
  }
) {
  const fallbackMessage =
    options?.fallbackMessage ?? "Something went wrong. Please try again.";
  const toastMessage =
    options?.toastMessage ?? "Failed to submit the form.";

  let hasAppliedError = false;

  if (_.isPlainObject(error)) {
    const walk = (obj: any, parent = "") => {
      _.forOwn(obj, (value, key) => {
        const path = parent ? `${parent}.${key}` : key;

        if (_.isArray(value) && value[0]) {
          hasAppliedError = true;

          if (path.includes("non_field_errors")) {
            setError("root", {
              type: "server",
              message: value[0],
            });
          } else {
            setError(path as Path<T>, {
              type: "server",
              message: value[0],
            });
          }
          return;
        }

        if (_.isPlainObject(value)) {
          walk(value, path);
        }
      });
    };

    walk(error);
  }

  // Fallback: no server errors matched
  if (!hasAppliedError) {
    setError("root", {
      type: "server",
      message: fallbackMessage,
    });
  }

  // Global feedback
  toast.error(toastMessage);
}
