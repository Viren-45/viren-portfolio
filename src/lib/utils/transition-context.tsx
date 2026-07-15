// src/lib/utils/transition-context.tsx
"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";

interface TransitionState {
  isTransitioning: boolean;
  destinationLabel: string;
  destination: string;
}

type TransitionAction =
  | { type: "START"; destination: string; destinationLabel: string }
  | { type: "END" };

const initialState: TransitionState = {
  isTransitioning: false,
  destinationLabel: "",
  destination: "",
};

function transitionReducer(
  state: TransitionState,
  action: TransitionAction,
): TransitionState {
  switch (action.type) {
    case "START":
      return {
        isTransitioning: true,
        destination: action.destination,
        destinationLabel: action.destinationLabel,
      };
    case "END":
      return initialState;
    default:
      return state;
  }
}

interface TransitionContextValue {
  state: TransitionState;
  startTransition: (destination: string, destinationLabel: string) => void;
  endTransition: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(transitionReducer, initialState);

  const startTransition = useCallback(
    (destination: string, destinationLabel: string) => {
      dispatch({ type: "START", destination, destinationLabel });
    },
    [],
  );

  const endTransition = useCallback(() => {
    dispatch({ type: "END" });
  }, []);

  return (
    <TransitionContext.Provider
      value={{ state, startTransition, endTransition }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition(): TransitionContextValue {
  const ctx = useContext(TransitionContext);
  if (!ctx)
    throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}
