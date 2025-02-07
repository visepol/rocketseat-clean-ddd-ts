import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '123',
      title: 'Nova Pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
  })
})
