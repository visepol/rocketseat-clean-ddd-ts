import dayjs from 'dayjs'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from './values-objects/slug'

export interface QuestionProps {
  bestAnswerId?: UniqueEntityID
  title: string
  slug: Slug
  content: string
  authorId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
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

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set title(title: string) {
    this.props.content = title
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

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ): Question {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return question
  }
}
