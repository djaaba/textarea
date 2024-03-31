import { Ref, onMounted } from 'vue';

/**
 * Композибл возвращает функцию пересчета высоты.
 *
 * @param {Ref<HTMLTextAreaElement | null>} elemRef ссылка на компонент
 * @param {Ref<Boolean>} isResizeAllowed сообщает нам разрешен ли перерасчет
 * * @returns {Function} Функция для вызора перерасчета.
 */

export const useAutoResize = (
  elemRef: Ref<HTMLTextAreaElement | null>,
  isResizeAllowed: Ref<Boolean>
) => {
  const resize = () => {
    if (!elemRef.value || !isResizeAllowed.value) return;
    elemRef.value.style.height = 'auto';
    elemRef.value.style.height = `${elemRef.value.scrollHeight}px`;
  };

  onMounted(() => {
    resize();
  });

  return {
    resize,
  };
};
