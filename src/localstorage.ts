import { Ref, ref, watch } from "vue";

export default function localRef<T>(
  key: string,
  value: T | undefined = undefined
): Ref<T> {
  const init = localStorage.getItem(key);

  const variable = ref(init ? JSON.parse(init) : value);

  watch(
    () => variable.value,
    (to) => {
      if (to != null) {
        localStorage.setItem(key, JSON.stringify(to));
      } else {
        localStorage.removeItem(key);
      }
    },
    { deep: true }
  );

  return variable;
}
