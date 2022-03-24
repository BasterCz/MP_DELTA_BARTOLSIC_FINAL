import React, { useEffect, useState, useRef, useCallback } from "react";

type ReferenceType = {
  fnc: (state: any) => void;
};

export const useStateCallback = <T>(initialState: T | (()=>T)) => {
  const [state, setState] = useState<T>(initialState instanceof Function? initialState() : initialState);
  const cbRef = useRef<ReferenceType | null>(null);

  const setStateCallback = useCallback((state:  T | (()=>T), cb?: (state: T, anything? : any) => void) => {
    setState(state instanceof Function? state() : state);
    if(cb)
    cbRef.current = { fnc: cb };
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current.fnc(state);
      cbRef.current = null
    }
  }, [state]);

  return [state, setStateCallback] as const;
};


export default useStateCallback;
