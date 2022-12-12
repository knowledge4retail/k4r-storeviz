import { Config } from '../../config/Config'
import { BottomLeftPositionStrategy } from './BottomLeftPositionStrategy'
import { DefaultPositionStrategy } from './DefaultPositionStrategy'
import { PositionStrategy } from './PositionStrategy'

export class PositionStrategyProvider {
  public static get(): PositionStrategy {
    if (Config.offsetToBottomLeft() === true) {
      return new BottomLeftPositionStrategy() as PositionStrategy
    }
    return new DefaultPositionStrategy() as PositionStrategy
  }
}
