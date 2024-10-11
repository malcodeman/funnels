import { useLocalStorageValue } from "@react-hookz/web";

function useLocalStorage(
  key: "is-smartphone-view",
  { defaultValue }: { defaultValue: boolean }
) {
  const storage = useLocalStorageValue(key, {
    defaultValue,
    initializeWithValue: false,
  });

  return storage;
}

export { useLocalStorage };
