import { useRef, useState } from "react";

export default function useUI() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);

  const toastTimerRef = useRef(null);

  // 🟢 SIDEBAR
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // 🟡 LOADING
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  // 🔵 MODAL (supports component + props)
  const openModal = (component, props = {}) => {
    setModal({ component, props });
  };

  const closeModal = () => setModal(null);

  // 🟠 TOAST (SAFE + NO MEMORY LEAK)
  const showToast = (type, message) => {
    setToast({ type, message });

    // clear previous timer
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return {
    // state
    sidebarOpen,
    loading,
    modal,
    toast,

    // actions
    openSidebar,
    closeSidebar,
    toggleSidebar,
    startLoading,
    stopLoading,
    openModal,
    closeModal,
    showToast,
  };
}