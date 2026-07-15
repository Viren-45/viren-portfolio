"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: `
            sonner-glass-toast
            relative flex items-center gap-4
            w-[min(400px,calc(100vw-32px))]
            px-5 py-4
            rounded-[20px]
            overflow-visible
            border
            backdrop-blur-[28px]
            text-sm text-white
          `,

          success: `
            sonner-success-toast
            bg-[rgba(16,55,35,0.58)]
            border-[rgba(74,222,128,0.42)]
          `,

          error: `
            sonner-error-toast
            bg-[rgba(60,18,18,0.58)]
            border-[rgba(239,68,68,0.42)]
          `,

          title: `
            relative z-10
            flex-1
            text-sm font-medium
            text-white
            leading-snug
          `,
        },
      }}
      icons={{
        success: (
          <div className="sonner-success-icon relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
            <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
              <path
                d="M2.75 8.5L6.5 12.25L14 4.75"
                stroke="#6EE7A2"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ),

        error: (
          <div className="sonner-error-icon relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <path
                d="M4 4L11 11M11 4L4 11"
                stroke="#F87171"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ),
      }}
      {...props}
    />
  );
};

export { Toaster };
