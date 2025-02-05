import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an question', async () => {
    const { answer } = await sut.execute({
      content: 'Conteúdo da resposta',
      instructorId: '123',
      questionId: '123',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]).toEqual(answer)
  })
})
