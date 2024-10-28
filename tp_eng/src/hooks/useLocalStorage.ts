import { useState } from 'react';

function useLocalStorage(key: string) {
    function isClient() {
        return typeof window !== 'undefined';
    }

    function setItem(value: unknown) {
        if (!isClient()) return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    }

    function getItem() {
        if (!isClient()) return undefined; // Verifica se está no cliente
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
        } catch (error) {
            console.log(error);
        }
    }

    function removeItem() {
        if (!isClient()) return;
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        setItem,
        getItem,
        removeItem,
    };
}

export default useLocalStorage;
