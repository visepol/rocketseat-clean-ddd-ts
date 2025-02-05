import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  async create(answer): Promise<Answer> {
    return answer
  },
}

test('create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await answerQuestionUseCase.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'Nova Resposta',
  })

  expect(answer.content).toEqual('Nova Resposta')
})
