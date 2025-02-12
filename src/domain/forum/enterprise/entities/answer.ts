import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from './answer-attachment-list'

export interface AnswerProps {
  content: string
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  set content(content: string) {
    this.props.content = content
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    // this.touch()
    // needs to implement touch method
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat('...')
  }

  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID,
  ): Answer {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return answer
  }
}
