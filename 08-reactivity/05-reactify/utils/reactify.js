import { computed } from 'vue';

/**
 * @template T
 * @param {function(...[*]): T} func - Исходная функция вычисления
 * @returns {function(...[*]): ComputedRef<T>} - Функция вычисления от ref-ов, возвращающая вычисляемое значение computed
 */
export function reactify(func) {
  return (...args) =>
    computed(() => {
      const notReactArgs = [];

      args.forEach((arg) => {
        if (arg['__v_isRef']) {
          notReactArgs.push(arg.value);
        } else {
          notReactArgs.push(arg);
        }
      });
      return func.apply(null, notReactArgs);
    });
}
