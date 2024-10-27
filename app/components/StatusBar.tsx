'use client';
import { useState, useEffect } from 'react';

type StatusBarProps = {
  user: any;
}

export default function StatusBar({ user }: StatusBarProps) {
  const [capsLock, setCapsLock] = useState(false);
  const [numLock, setNumLock] = useState(false);

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      setCapsLock(e.getModifierState('CapsLock'));
      setNumLock(e.getModifierState('NumLock'));
    };

    window.addEventListener('keydown', handleKeyEvent);
    window.addEventListener('keyup', handleKeyEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
      window.removeEventListener('keyup', handleKeyEvent);
    };
  }, []);

  return (
    <div className="bg-gray-100 border-b border-gray-200 h-6 text-xs">
      <div className="max-w-full px-2 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            Kullanıcı: {user?.email}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-600">
            Versiyon: 1.0.0
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">
            Caps Lock: {capsLock ? 'Açık' : 'Kapalı'}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-600">
            Num Lock: {numLock ? 'Açık' : 'Kapalı'}
          </span>
        </div>
      </div>
    </div>
  );
}
