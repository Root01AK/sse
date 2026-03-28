"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import gsap from 'gsap';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </div>
      <style jsx global>{`
        .toast-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          pointer-events: none;
        }
      `}</style>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Entrance
    tl.fromTo(toastRef.current, 
      { x: 100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );

    // Auto-remove after 4s
    const timer = setTimeout(() => {
      tl.to(toastRef.current, {
        x: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: onRemove
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [onRemove]);

  const isSuccess = toast.type === 'success';

  return (
    <div 
      ref={toastRef}
      className={`toast-item ${toast.type}`}
      style={{
        pointerEvents: 'auto',
        background: isSuccess ? '#ffffff' : '#fff5f5',
        borderLeft: `5px solid ${isSuccess ? '#416983' : '#723936'}`,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        padding: '1rem 1.25rem',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        minWidth: '300px',
        maxWidth: '450px'
      }}
    >
      <div className="toast-icon">
        {isSuccess ? (
          <CheckCircle size={24} color="#416983" />
        ) : (
          <XCircle size={24} color="#723936" />
        )}
      </div>
      <div className="toast-content" style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: '500', color: '#171717', fontSize: '0.95rem' }}>
          {toast.message}
        </p>
      </div>
      <button 
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem',
          color: '#9ca3af',
          display: 'flex',
          alignItems: 'center',
          transition: 'color 0.2s'
        }}
      >
        <X size={18} />
      </button>
    </div>
  );
};
