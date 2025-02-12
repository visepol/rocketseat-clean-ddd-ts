import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/notification'
import { NotificationsRepository } from '../repositories/notification-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { notification: Notification }
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) return left(new ResourceNotFoundError())

    if (notification.recipientId.toString() !== recipientId)
      return left(new NotAllowedError())

    notification.read()

    await this.notificationRepository.save(notification)

    return right({ notification })
  }
}
