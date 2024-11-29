import { Context, Schema, Session, h } from 'koishi';
import { pathToFileURL } from 'url';
import { resolve } from 'path';

export const inject = ['database'];
export const name = 'rusty-lake-lizard';

export interface Config { }

export const Config: Schema<Config> = Schema.object({});

const images = {
  bedroom: pathToFileURL(resolve(__dirname, '../assets/1-卧室.png')).href,
  notea: pathToFileURL(resolve(__dirname, '../assets/2a-纸条.png')).href,
  noteb: pathToFileURL(resolve(__dirname, '../assets/2b-纸条.png')).href,
  code: pathToFileURL(resolve(__dirname, '../assets/3-隐藏密码线索.png')).href,
  corridor: pathToFileURL(resolve(__dirname, '../assets/4-走廊.png')).href,
  kitchen: pathToFileURL(resolve(__dirname, '../assets/5-厨房.png')).href,
  laboratory: pathToFileURL(resolve(__dirname, '../assets/6-化学实验室.png')).href,
  description: pathToFileURL(resolve(__dirname, '../assets/7-实验说明.png')).href,
  electrical: pathToFileURL(resolve(__dirname, '../assets/8-电气室.png')).href,
  fuse: pathToFileURL(resolve(__dirname, '../assets/9-保险丝盒.png')).href,
  office: pathToFileURL(resolve(__dirname, '../assets/10-办公室.png')).href,
  document: pathToFileURL(resolve(__dirname, '../assets/12-文本文档.png')).href,
  diagram: pathToFileURL(resolve(__dirname, '../assets/14-指示图.png')).href,
  hide: pathToFileURL(resolve(__dirname, '../assets/13-隐藏房间.png')).href,
};

interface Room {
  id: string;
  name: string;
  description: string;
  image?: string;
  locked: boolean;
}

const rooms: Room[] = [
  {
    id: 'bedroom',
    name: '卧室',
    description: '这是一个黑暗的、方形的、铺着白色瓷砖的房间。',
    image: images.bedroom,
    locked: false,
  },
  {
    id: 'corridor',
    name: '走廊',
    description: '这是一条长长的、昏暗的走廊，尽头分成两条岔路。',
    image: images.corridor,
    locked: true,
  },
  {
    id: 'kitchen',
    name: '厨房',
    description: '这里摆着一张桌子和一个厨台。',
    image: images.kitchen,
    locked: false,
  },
  {
    id: 'laboratory',
    name: '化学实验室',
    description: '这里出奇的空旷——里面只有一个小型实验台立在房间中央，上面摆着少量化学设备。',
    image: images.laboratory,
    locked: false,
  },
  {
    id: 'electrical',
    name: '电气室',
    description: '空气中弥漫着一股霉味，天花板上布满了管道和电线，房间中央有一个大型保险丝盒，旁边是一个近乎空荡的货架，上面积满了灰尘。',
    image: images.electrical,
    locked: true,
  },
  {
    id: 'office',
    name: '办公室',
    description: '简朴干净的白色墙纸与遍布整座设施的冰冷单调的白色瓷砖形成了鲜明的对比。房间中央有一张桌子，上面放着一台电脑，发出轻微的电流声。',
    image: images.office,
    locked: true,
  },
  {
    id: 'hide',
    name: '隐藏房间',
    description: '从布满灰尘的通风口爬出来，到了一个黑暗房间的冰冷地板上。嵌入进墙体里的巨型机器矗立在你眼前，一个小屏幕发出红光，显示着闪烁的消息。',
    image: images.hide,
    locked: true,
  },
];

const itemsDetails = {
  '半张纸条a': {
    image: images.notea,
    description: '纸条的一半，上面有一些字。',
  },
  '半张纸条b': {
    image: images.noteb,
    description: '纸条的另外一半，上面有一些字。',
  },
  '手电筒': {
    image: '',
    description: '普通的手电筒，电量充足。',
  },
  '上锁的盒子': {
    image: '',
    description: '上面挂着五位数字密码的锁，里面似乎有金属的声音。',
  },
  '钥匙': {
    image: '',
    description: '古铜色的钥匙，似乎对应着某扇门。',
  },
  '隐藏密码线索': {
    image: images.code,
    description: '地板上记录着的奇怪文字。',
  },
  '身份证': {
    image: '',
    description: '。上面的照片已经褪色，但名字写着“R. Vanderboom”。',
  },
  '滤纸': {
    image: '',
    description: '从垃圾桶捡来的滤纸，里面残留着咖啡渣。',
  },
  '肉': {
    image: '',
    description: '不知道是什么生物的肉。',
  },
  '实验说明': {
    image: images.description,
    description: '一本写有实验说明的笔记本。',
  },
  '火柴盒': {
    image: '',
    description: '里面有一些火柴，数量充足。',
  },
  '回形针': {
    image: '',
    description: '闪烁着金属光泽，软软的很容易掰开。',
  },
  '手': {
    image: '',
    description: '不断抽搐着的断手。',
  },
  '扳手': {
    image: '',
    description: '闪烁着金属光泽，硬硬的。',
  },
  '保险丝': {
    image: '',
    description: '短小的玻璃制品，里面有一节金属丝。',
  },
  '白色文件夹': {
    image: '',
    description: '背面用黑色记号笔写着汉字“生”。',
  },
  '文本文档': {
    image: images.document,
    description: '电脑屏幕上弹出的文本。',
  },
  '螺丝刀': {
    image: '',
    description: '闪烁着金属光泽，硬硬的。',
  },
  '指示图': {
    image: '',
    description: '抽屉底部刻印着奇怪的图案。',
  },
  '金属小钥匙': {
    image: '',
    description: '银白色的钥匙。',
  },
  '金属盒子': {
    image: '',
    description: '银白色的小盒子，里面似乎有什么东西。',
  },
  '软盘': {
    image: '',
    description: '老式电脑用品，封装了某种程序。',
  },
};

interface GameState {
  id: string;
  gameId: string;
  gameName: string;
  currentRoom: string;
  inventory: string[];
  visitedRooms: string[];
  doneTasks: string[];
}

interface PlayerState {
  id: string;
  gameId: string;
  userId: string;
}

declare module 'koishi' {
  interface Tables {
    rusty_lake_games: GameState;
    rusty_lake_players: PlayerState;
  }
}

export function apply(ctx: Context) {
  const logger = ctx.logger('rusty-lake');

  ctx.model.extend('rusty_lake_games', {
    id: 'string',
    gameId: 'string',
    gameName: 'string',
    currentRoom: 'string',
    inventory: 'json',
    visitedRooms: 'json',
    doneTasks: 'json'
  }, {
    primary: 'id',
    autoInc: true,
  });

  ctx.model.extend('rusty_lake_players', {
    id: 'string',
    gameId: 'string',
    userId: 'string',
  }, {
    primary: 'id',
    autoInc: true,
  });

  const command = ctx.command('锈湖', '锈湖桌游');

  async function getPlayerState(session: Session): Promise<GameState> {
    const player = await ctx.database.get('rusty_lake_players', { userId: session.userId });
    if (!player.length) throw new Error('你还未加入任何游戏。');

    const game = await ctx.database.get('rusty_lake_games', { gameId: player[0].gameId });
    if (!game.length) throw new Error('对局数据不存在。');

    return {
      ...game[0],
      visitedRooms: game[0].visitedRooms || [],
    };
  }

  let currentId = 1;
  command
    .subcommand('.新建', '新建游戏房间')
    .action(async ({ session }) => {
      const existingPlayer = await ctx.database.get('rusty_lake_players', { userId: session.userId });
      if (existingPlayer.length > 0) {
        return '你已经加入了一个房间，无法重复创建。';
      }

      await session.send('请输入新房间的名称：');

      const gameName = await session.prompt(10000);

      if (!gameName) {
        return '输入超时，房间创建失败。';
      }

      if (!gameName.trim()) {
        return '房间名称不能为空，请重新输入：';
      }

      const existingGame = await ctx.database.get('rusty_lake_games', { gameName });

      if (existingGame.length > 0) {
        return '已经存在同名的房间，请换一个名称。';
      }

      const gameId = `game-${Date.now()}`;

      const players = await ctx.database.get('rusty_lake_players', {});
      const maxId = players.reduce((max, player) => Math.max(max, parseInt(player.id, 10)), 0);
      const id = maxId + 1;

      await ctx.database.create('rusty_lake_games', {
        id: id.toString(),
        gameId: gameId,
        gameName,
        currentRoom: 'bedroom',
        inventory: [],
        visitedRooms: ['bedroom'],
        doneTasks: [],
      });

      await ctx.database.upsert('rusty_lake_players', [
        {
          id: id.toString(),
          gameId: gameId,
          userId: session.userId,
        },
      ]);
      logger.info(`用户 ${session.userId} 已加入房间 ${gameName}`);

      await session.send(`成功创建房间：${gameName}。\n已自动为您加入`);
    });

  command
    .subcommand('.删除', '清除游戏房间')
    .action(async ({ session }) => {
      const games = await ctx.database.get('rusty_lake_games', {});

      if (games.length === 0) {
        return '当前没有任何房间记录可以删除。';
      }

      const gameList = games.map((game, index) => `${index + 1}: ${game.gameName}`).join('\n');
      await session.send(`输入序号选择要删除的房间：\n${gameList}\n\n输入 0 删除所有房间`);

      const selected = await session.prompt(10000);
      if (!selected) return '输入超时，删除操作失败。';

      const index = parseInt(selected.trim(), 10);

      if (index === 0) {
        for (const game of games) {
          await ctx.database.remove('rusty_lake_games', { gameId: game.gameId });
          await ctx.database.remove('rusty_lake_players', { gameId: game.gameId });
          logger.info(`删除了游戏 ${game.gameName} 的记录。`);
        }
        await session.send('所有房间记录已成功删除。');
        currentId = 1;
        return;
      }

      if (isNaN(index) || index < 1 || index > games.length) {
        return '无效的选择，请重新输入：';
      }

      const gameId = games[index - 1].gameId;
      const gameName = games[index - 1].gameName;

      await ctx.database.remove('rusty_lake_games', { gameId });
      await ctx.database.remove('rusty_lake_players', { gameId: gameId });

      await session.send(`游戏 ${gameName} 的记录已成功删除。`);
    });

  command
    .subcommand('.加入', '加入现有游戏房间')
    .action(async ({ session }) => {
      const games = await ctx.database.get('rusty_lake_games', {});
      if (games.length === 0) return '当前没有任何房间可以加入。';

      const existingPlayer = await ctx.database.get('rusty_lake_players', { userId: session.userId });
      if (existingPlayer.length > 0) {
        return '你已经加入了一个房间，无法重复加入。';
      }

      const gameList = games.map((game, index) => `${index + 1}: ${game.gameName}`).join('\n');
      await session.send(`以下是可加入的房间，请输入序号选择：\n${gameList}`);

      const selected = await session.prompt(10000);
      if (!selected) return '输入超时，加入操作失败。';

      const index = parseInt(selected.trim(), 10) - 1;
      if (isNaN(index) || index < 0 || index >= games.length) {
        return '无效的选择，请重新输入：';
      }

      const gameId = games[index].gameId;

      const players = await ctx.database.get('rusty_lake_players', {});
      const maxId = players.reduce((max, player) => Math.max(max, parseInt(player.id, 10)), 0);
      const id = maxId + 1;

      await ctx.database.create('rusty_lake_players', {
        id: id.toString(),
        gameId: gameId,
        userId: session.userId,
      });
      await session.send(`你成功加入了房间：${games[index].gameName}！`);
    });

  command
    .subcommand('.移动 <room>', '游戏内移动到另一个房间')
    .action(async ({ session }) => {
      const state = await getPlayerState(session);

      const availableRooms = rooms.filter((room) =>
        state.visitedRooms.includes(room.id) && room.id !== state.currentRoom
      );

      if (availableRooms.length === 0) {
        return '你无处可去，只能在这里活动。';
      }

      const availableRoomNames = availableRooms.map((room, index) => `${index + 1}: ${room.name}`).join('\n');
      await session.send(`你可以前往以下房间，请输入序号选择：\n${availableRoomNames}`);

      const selected = await session.prompt(10000);
      if (!selected) return '输入超时，移动操作失败。';

      const index = parseInt(selected.trim(), 10) - 1;

      if (isNaN(index) || index < 0 || index >= availableRooms.length) {
        return '无效的选择，请重新输入：';
      }

      const targetRoom = availableRooms[index];

      await ctx.database.upsert('rusty_lake_games', [
        {
          id: state.id,
          gameId: state.gameId,
          gameName: state.gameName,
          currentRoom: targetRoom.id,
          inventory: state.inventory,
          visitedRooms: state.visitedRooms,
          doneTasks: state.doneTasks,
        },
      ]);

      return `你进入了${targetRoom.name}。\n${targetRoom.description}${targetRoom.image ? '\n' + h.image(targetRoom.image) : ''}`;
    });

  command
    .subcommand('.房间', '查看已访问的房间地图')
    .action(async ({ session }) => {
      const state = await getPlayerState(session);
      const visitedRooms = state.visitedRooms || [];
      const currentRoom = state.currentRoom;

      const allVisitedRooms = [currentRoom, ...visitedRooms];

      let roomList = '你已经访问过以下房间，选择一个查看详细信息：\n';
      allVisitedRooms.forEach((roomId, index) => {
        const room = rooms.find(r => r.id === roomId);
        if (room) {
          roomList += `${index + 1}. ${room.name}\n`;
        }
      });

      roomList += '\n请输入房间编号查看详细信息：';

      await session.send(roomList);

      const choice = await session.prompt(10000);
      const selectedRoomIndex = parseInt(choice) - 1;

      if (isNaN(selectedRoomIndex) || selectedRoomIndex < 0 || selectedRoomIndex >= allVisitedRooms.length) {
        return '无效的选择，请重试。';
      }

      const selectedRoomId = allVisitedRooms[selectedRoomIndex];
      const selectedRoom = rooms.find(r => r.id === selectedRoomId);

      if (selectedRoom) {
        let response = `你想起了${selectedRoom.name}的样子\n`;
        response += selectedRoom.description + '\n';
        response += h.image(selectedRoom.image);
        await session.send(response);
      } else {
        return '无法找到该房间的详细信息。';
      }
    });

  async function addItemToInventory(session: Session, item: string) {
    const state = await getPlayerState(session);
    const newInventory = [...state.inventory, item];
    await ctx.database.upsert('rusty_lake_games', [
      {
        id: state.id,
        gameId: state.gameId,
        gameName: state.gameName,
        currentRoom: state.currentRoom,
        inventory: newInventory,
        visitedRooms: state.visitedRooms,
        doneTasks: state.doneTasks,
      },
    ]);
  }

  async function removeItemFromInventory(session: Session, item: string) {
    const state = await getPlayerState(session);
    const newInventory = state.inventory.filter(i => i !== item);
    await ctx.database.upsert('rusty_lake_games', [
      {
        id: state.id,
        gameId: state.gameId,
        gameName: state.gameName,
        currentRoom: state.currentRoom,
        inventory: newInventory,
        visitedRooms: state.visitedRooms,
        doneTasks: state.doneTasks,
      },
    ]);

    async function completeTask(session: Session, taskId: string) {
      const state = await getPlayerState(session);
      const newtasks = [...state.inventory, taskId];
      await ctx.database.upsert('rusty_lake_games', [
        {
          id: state.id,
          gameId: state.gameId,
          gameName: state.gameName,
          currentRoom: state.currentRoom,
          inventory: state.inventory,
          visitedRooms: state.visitedRooms,
          doneTasks: newtasks,
        },
      ]);

      return `任务：${taskId} 完成！`;
    }

    return `${item} 已从你的背包中移除。`;
  }

  command
    .subcommand('.查看 <point>', '探索当前房间')
    .action(async ({ session }, point) => {
      const state = await getPlayerState(session);
      const currentRoom = rooms.find(room => room.id === state.currentRoom);

      let response = '';

      if (point === '上锁的盒子') {
        if (state.inventory.includes('半张纸条a') && state.inventory.includes('半张纸条b') && state.inventory.includes('隐藏密码线索')) {
          if (!state.inventory.includes('钥匙')) {
            await session.send('你似乎收集到了足够的线索，要试试打开盒子吗？（是/否）');
            const choice = await session.prompt(10000);
            if (choice === '是') {
              await session.send('输入五位数字密码：');
              const choice = await session.prompt(10000);
              if (choice === '26773') {
                response += '\n\n你打开了盒子，里面只有一把钥匙。\n（可在物品指令中查看）';
                response += '\n\n你丢掉了没用的空盒子。';
                await addItemToInventory(session, '钥匙');
                await removeItemFromInventory(session, '上锁的盒子');
              } else {
                return '锁并未解开。是输错了吗？';
              }
            } else {
              return '你迟疑着，没有动作。';
            }
          } else {
            response += '没有特别的发现了。';
          }
        } else {
          return '你还没有收集到足够的线索。';
        }
      } else if (/2/.test(point)) {
        response += '';
      } else {
        if (currentRoom.id === 'bedroom') {
          if (/床/.test(point)) {
            response += '很简单的上下床，有多少人都能睡下。';
            if (!state.inventory.includes('半张纸条a')) {
              response += '\n\n你在床铺的垫子下发现了半张纸条。\n（可在物品指令中查看）';
              response += h.image(images.notea);
              await addItemToInventory(session, '半张纸条a');
            } else {
              response += '\n\n没有特别的发现了。';
            }

          } else if (/柜/.test(point) || /抽屉/.test(point)) {
            await session.send('一张小巧而简单的柜子靠墙而立，有三个抽屉。要拉开看看吗？（是/否）');
            const choice = await session.prompt(10000);
            if (choice === '是') {
              if (!state.inventory.includes('手电筒')) {
                response += '\n\n顶部的抽屉内有一个上锁的盒子。\n（可在物品指令中查看）';
                await addItemToInventory(session, '上锁的盒子');
                response += '\n\n中间的抽屉内有纸条的另一半。\n（可在物品指令中查看）';
                response += h.image(images.noteb);
                await addItemToInventory(session, '半张纸条b');
                response += '\n\n底部的抽屉内有一个手电筒。 ';
                await addItemToInventory(session, '手电筒');
              }
            } else {
              return '你迟疑着，没有动作。';
            }

          } else if (/地毯/.test(point)) {
            await session.send('整洁的地毯，下面的地面上似乎写了什么。环境太过昏暗，你看不清。');
            if (state.inventory.includes('手电筒')) {
              await session.send('你拥有手电筒。要打开照明吗？（是/否）');
              const choice = await session.prompt(10000);
              if (choice === '是') {
                if (!state.inventory.includes('隐藏密码线索')) {
                  response += '\n\n地上刻画着一些字符，似乎是什么密码的线索。\n（可在物品指令中查看）';
                  response += h.image(images.code);
                  await addItemToInventory(session, '隐藏密码线索');
                } else {
                  response += '\n\n没有特别的发现了。';
                }
              }
              else {
                return '你迟疑着，没有动作。';
              }
            }

          } else if (/门/.test(point)) {
            const corridor = rooms.find(room => room.id === 'corridor');
            if (corridor.locked = true) {
              await session.send('这扇装有坚固的金属门把手的白门被锁上了，需要钥匙才能开。');
              if (state.inventory.includes('钥匙')) {
                await session.send('你拥有钥匙。要试着开门吗？（是/否）');
                const choice = await session.prompt(10000);
                if (choice === '是') {
                  corridor.locked = false;
                  const player = await ctx.database.get('rusty_lake_players', { userId: session.userId });
                  const id = player[0].id;
                  await ctx.database.upsert('rusty_lake_games', [
                    {
                      id,
                      currentRoom: 'corridor',
                      visitedRooms: [...state.visitedRooms, 'corridor'],
                    },
                  ]);
                  response += '\n\n你小心翼翼地打开门，迈步走了出去。';
                  response += '\n你走进一条长长的、昏暗的走廊，尽头分成两条岔路。';
                  response += '\n你发现墙上钉着一张地图，旁边是你进入的地方。地图描绘了包括你刚刚走出来的房间在内的所有房间。';
                  response += h.image(images.corridor);
                  response += '\n\n在走廊的尽头，你看到墙上写着些什么。那是用黑色马克笔写着一条信息：\n\n“是时候醒来了。';
                } else {
                  return '你迟疑着，没有动作。';
                }
              }
            } else {
              response += '这扇门已经打开，你随时可以离开。';
            }

          } else if (/开关/.test(point)) {
            if (!state.doneTasks.includes('电力')) {
              response += '你打开开关，电灯发出惨白的光亮。';
            } else {
              return '你反复拨弄开关，但没有任何反应。这里似乎停电了。';
            }

          } else if (/监控/.test(point) || /摄像/.test(point)) {
            response += '摄像头静止地悬挂在天花板上，以一种令人不安的姿态注视着你。';
            response += '你试着拨弄它，但它坚固的金属框架可以使它免受任何损害。';

          } else if (/通风口/.test(point)) {
            await session.send('通风口被一块挡板覆盖，挡板被螺丝固定在墙上。');
            if (!state.inventory.includes('螺丝刀')) {
              await session.send('你拥有螺丝刀。要试着拆开挡板吗？（是/否）');
              const choice = await session.prompt(10000);
              if (choice === '是') {
                response += '通风口内幽暗昏聩，似乎是个迷宫。';
              } else {
                return '你迟疑着，没有动作。';
              }
            } else {
              response += '没有特别的发现了。';
            }
          }
        }

        if (currentRoom.id === 'corridor') {
          if (/厨房/.test(point)) {
            response += '';
          } else if (/化学实验室/.test(point)) {
            response += '';
          } else if (/电/.test(point)) {
            response += '';
          } else if (/办公室/.test(point)) {
            response += '';
          }
        }

        if (currentRoom.id === 'kitchen') {
          if (/衣/.test(point) || /外套/.test(point)) {
            response += '';
          } else if (/水槽/.test(point) || /水池/.test(point)) {
            response += '';
          } else if (/咖啡机/.test(point)) {
            response += '';
          } else if (/柜/.test(point)) {
            response += '';
          } else if (/垃圾桶/.test(point)) {
            response += '';
          } else if (/箱/.test(point)) {
            response += '';
          } else if (/电话/.test(point)) {
            response += '';
          } else if (/通风口/.test(point)) {
            response += '';
          } else if (/监控/.test(point) || /摄像/.test(point)) {
            response += '';
          }
        }

        if (currentRoom.id === 'laboratory') {
          if (/实验台/.test(point)) {
            response += '';
          } else if (/通风口/.test(point)) {
            response += '';
          }
        }

        if (currentRoom.id === 'electrical') {
          if (/保险丝盒/.test(point) || /柜/.test(point)) {
            response += '';
          } else if (/架/.test(point)) {
            response += '';
          } else if (/管道/.test(point)) {
            response += '';
          } else if (/通风口/.test(point)) {
            response += '';
          } else if (/污渍/.test(point) || /黑/.test(point) || /水/.test(point)) {
            response += '';
          }
        }

        if (currentRoom.id === 'office') {
          if (/桌/.test(point)) {
            response += '';
          } else if (/抽屉/.test(point)) {
            response += '';
          } else if (/电脑/.test(point)) {
            response += '';
          } else if (/架/.test(point)) {
            response += '';
          } else if (/海报/.test(point) || /画/.test(point)) {
            response += '';
          } else if (/通风口/.test(point)) {
            response += '';
          }
        }

        if (currentRoom.id === 'hide') {
          if (/机器/.test(point) || /门/.test(point)) {
            response += '';
          } else if (/海报/.test(point) || /画/.test(point)) {
            response += '';
          } else if (/按钮/.test(point)) {
            response += '';
          } else if (/纸/.test(point) || /地/.test(point)) {
            response += '';
          }
        }
      }
      if (!response) {
        response = `你观察了一会${point}，并没有什么特别的发现。`;
      }

      await session.send(response);
    });

  command
    .subcommand('.物品', '查看你拥有的物品')
    .action(async ({ session }) => {
      const state = await getPlayerState(session);

      if (state.inventory.length === 0) {
        return '你没有物品。';
      }

      const itemList = state.inventory.map((item, index) => `${index + 1}: ${item}`).join('\n');
      await session.send(`你拥有的物品有：\n${itemList}\n请输入物品的编号查看详细信息，输入 0 取消。`);

      const selected = await session.prompt(15000);

      if (!selected) {
        return '输入超时，操作失败。';
      }

      const index = parseInt(selected.trim(), 10) - 1;

      if (index === -1) {
        return '操作取消。';
      }

      if (isNaN(index) || index < 0 || index >= state.inventory.length) {
        return '无效的选择，请重新输入。';
      }

      const selectedItem = state.inventory[index];
      const itemDetail = itemsDetails[selectedItem];

      if (itemDetail) {
        const { image, description } = itemDetail;
        let message = `${selectedItem}：\n${description}`;
        if (image) {
          message += `\n${h.image(image)}`;
        }
        return message;
      } else {
        return `${selectedItem} 没有更多详情。`;
      }
    });

  command
    .subcommand('.测试1', '测试')
    .action(async ({ session }) => {
      const player = await ctx.database.get('rusty_lake_players', { userId: session.userId });
      if (player.length === 0) return '你还未加入任何游戏，请使用“新建游戏”或“加入游戏”指令。';

      const id = player[0].id;
      await ctx.database.upsert('rusty_lake_games', [
        {
          id,
          inventory: ["半张纸条a", "上锁的盒子", "半张纸条b", "手电筒", "隐藏密码线索", "钥匙"],
          visitedRooms: ['bedroom', 'corridor', 'kitchen', 'laboratory', 'electrical', 'office', 'hide'],
          doneTasks: [],
        },
      ]);

      await session.send(`修改成功`);
    });

  command
    .subcommand('.测试2', '测试')
    .action(async ({ session }) => {
      const player = await ctx.database.get('rusty_lake_players', { userId: session.userId });
      if (player.length === 0) return '你还未加入任何游戏，请使用“新建游戏”或“加入游戏”指令。';

      const id = player[0].id;
      await ctx.database.upsert('rusty_lake_games', [
        {
          id,
          currentRoom: 'bedroom',
          inventory: ["半张纸条a", "半张纸条b", "手电筒", "隐藏密码线索", "钥匙"],
          visitedRooms: ['bedroom'],
          doneTasks: [],
        },
      ]);

      await session.send(`修改成功`);
    });

}
