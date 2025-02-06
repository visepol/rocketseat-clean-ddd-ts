import { QuestionsRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'

interface EditQuestionUseCaseRequest {
  title: string
  questionId: string
  authorId: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) throw new Error('Question not found')

    if (question.authorId.toString() !== authorId)
      throw new Error('You are not the author of this question')

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return { question }
  }
}
