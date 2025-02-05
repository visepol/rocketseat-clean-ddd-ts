import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/values-objects/slug'

export function makeQuestion(overide: Partial<Question>) {
  const question = Question.create({
    title: 'Nova Pergunta',
    authorId: new UniqueEntityID('123'),
    content: 'Conteúdo da pergunta',
    slug: Slug.create('nova-pergunta'),
    ...overide,
  })

  return question
}
