import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionUseCase

describe('Fetch Recent Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2022-0-20'),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2022-0-18'),
      }),
    )

    await inMemoryQuestionsRepository.create(
      makeQuestion({
        createdAt: new Date('2022-0-23'),
      }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date('2022-0-23') }),
      expect.objectContaining({ createdAt: new Date('2022-0-20') }),
      expect.objectContaining({ createdAt: new Date('2022-0-18') }),
    ])
  })

  it('should be able to fetch pagineted recent questions', async () => {
    for (let i = 1; i < 23; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({
          createdAt: new Date(`2022-0-${i}`),
        }),
      )
    }

    const result = await sut.execute({ page: 2 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.questions).toHaveLength(2)
  })
})
