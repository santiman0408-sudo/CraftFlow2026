import { useState } from "react";

import { SnackbarType } from "@/presentation/components/common/AppSnackbar/types";

export function useSnackbar() {
  const [visible, setVisible] = useState(false);

  const [message, setMessage] = useState("");

  const [type, setType] = useState<SnackbarType>("info");

  function success(text: string) {
    setType("success");

    setMessage(text);

    setVisible(true);
  }

  function error(text: string) {
    setType("error");

    setMessage(text);

    setVisible(true);
  }

  function warning(text: string) {
    setType("warning");

    setMessage(text);

    setVisible(true);
  }

  function info(text: string) {
    setType("info");

    setMessage(text);

    setVisible(true);
  }

  function hide() {
    setVisible(false);
  }

  return {
    visible,

    message,

    type,

    hide,

    success,

    error,

    warning,

    info,
  };
}
