import dayjs from 'dayjs'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from './values-objects/slug'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { QuestionAttachment } from './question-attachment'

export interface QuestionProps {
  bestAnswerId?: UniqueEntityID
  title: string
  slug: Slug
  content: string
  authorId: UniqueEntityID
  attachments: QuestionAttachment[]
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, 'days') < 3
  }

  get attachments() {
    return this.props.attachments
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ): Question {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return question
  }
}
