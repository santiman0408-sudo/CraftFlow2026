import { useState } from "react";

export function useConfirmDialog() {
  const [visible, setVisible] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  function open(id: number) {
    setSelectedId(id);

    setVisible(true);
  }

  function close() {
    setVisible(false);

    setSelectedId(null);
  }

  return {
    visible,

    selectedId,

    open,

    close,
  };
}
