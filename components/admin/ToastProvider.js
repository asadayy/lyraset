'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import Icon from '@/components/Icon';

const ToastContext = createContext(() => {});

/** useToast() → toast(message, type?) where type is 'success' | 'error' | 'info'. */
export const useToast = () => useContext(ToastContext);

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const show = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    window.clearTimeout(show._t);
    show._t = window.setTimeout(() => setToast(null), 3200);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`} role="status" aria-live="polite">
          <Icon name={toast.type === 'error' ? 'close' : 'check'} size={18} />
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}
