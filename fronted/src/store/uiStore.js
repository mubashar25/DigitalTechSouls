import { useCallback, useRef, useState } from "react";

export default function useUI() {
  // 🟣 STATE
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  // 🧠 TIMER REF (prevent multiple timers)
  const toastTimer = useRef(null);

  // 🟣 SIDEBAR
  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // 🟡 LOADING
  const startLoading = useCallback(() => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  // 🔵 MODAL
  const openModal = useCallback((component) => {
    setModal(component);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  // 🟢 TOAST
  const showToast = useCallback((type, message) => {

    // clear old timer
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToast({
      type,
      message,
    });

    // auto hide
    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 3000);

  }, []);

  return {
    // state
    sidebarOpen,
    loading,
    modal,
    toast,

    // sidebar
    openSidebar,
    closeSidebar,
    toggleSidebar,

    // loading
    startLoading,
    stopLoading,

    // modal
    openModal,
    closeModal,

    // toast
    showToast,
  };
}