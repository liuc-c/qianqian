const showAnswer = ref(false)

export const useShowAnswer = function () {
  const changeShowAnswer = function () {
    showAnswer.value = !showAnswer.value
  }
  return { showAnswer, changeShowAnswer }
}
