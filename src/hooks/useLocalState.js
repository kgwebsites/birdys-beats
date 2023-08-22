import { useState, useCallback, useRef } from 'react';

export const useLocalState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const toStore = defaultValue;
    const item = window.localStorage.getItem(key);

    try {
      let returnItem = item ? JSON.parse(item) : toStore;
      // Parse javascript maps
      if (
        typeof returnItem === 'object' &&
        returnItem.length &&
        returnItem[returnItem.length - 1][0] === 'isMap'
      ) {
        returnItem = new Map(returnItem);
        returnItem.delete('isMap');
      }
      return returnItem;
    } catch (error) {
      return toStore;
    }
  });

  const lastValue = useRef(value);
  lastValue.current = value;

  const setLocalStateValue = useCallback(
    (newValue) => {
      const isMap = newValue.toString() === '[object Map]';
      let localValue = newValue;
      if (isMap) {
        localValue = new Map(newValue);
        localValue.set('isMap', true);
        localValue = [...localValue];
      }
      window.localStorage.setItem(key, JSON.stringify(localValue));
      setValue(newValue);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  const reset = useCallback(() => {
    const isCallable = (value) => (S) => typeof value === 'function';
    const toStore = isCallable(defaultValue) ? defaultValue() : defaultValue;
    setValue(toStore);
    window.localStorage.removeItem(key);
  }, [defaultValue, key]);

  return [value, setLocalStateValue, reset];
};

export default useLocalState;
