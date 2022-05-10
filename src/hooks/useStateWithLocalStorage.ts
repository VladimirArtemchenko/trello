import {useState, useEffect} from "react";

export const useStateWithLocalStorage = <T>( key: string, defaultValue: T) => {
    const [value, setValue] = useState(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? (JSON.parse(stickyValue) as T) : defaultValue;
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue] as const;
};