import { Chat, ChatOptions } from '../base';
import { Pool } from '../../utils/pool';
import { Account } from './define';
import { Child } from './child';
import { Config } from '../../utils/config';
import Application from 'koa';
import { CreateVideoTaskRequest, QueryVideoTaskRequest } from '../define';
import { v4 } from 'uuid';

export class Pika extends Chat {
  constructor(options?: ChatOptions) {
    super(options);
  }

  private pool: Pool<Account, Child> = new Pool<Account, Child>(
    this.options?.name || 'pika',
    () => Config.config.pika?.size || 0,
    (info, options) => new Child(this.options?.name || 'pika', info, options),
    (info) => {
      if (!info.email || !info.password) {
        return false;
      }
      return true;
    },
    {
      preHandleAllInfos: async (allInfos) => {
        const oldset = new Set(allInfos.map((v) => v.email));
        for (const v of Config.config.pika?.accounts || []) {
          if (!oldset.has(v.email)) {
            allInfos.push({
              id: v4(),
              email: v.email,
              password: v.password,
              recovery: v.recovery,
            } as Account);
          }
        }
        return allInfos;
      },
      delay: 3000,
      serial: Config.config.pika?.serial || 1,
      needDel: (info) => {
        if (!info.email || !info.password) {
          return true;
        }
        return false;
      },
    },
  );

  async createVideoTask(
    ctx: Application.Context,
    req: CreateVideoTaskRequest,
  ): Promise<void> {
    const child = await this.pool.pop();
    const id = await child.generate(req.prompt || '');
    ctx.body = { id };
  }

  async queryVideoTask(
    ctx: Application.Context,
    req: QueryVideoTaskRequest,
  ): Promise<void> {
    const [child_id, id] = req.id.split('|');
    const child = await this.pool.popIf((v) => v.id === child_id);
    ctx.body = { url: await child.myLibrary(id) };
  }
}
