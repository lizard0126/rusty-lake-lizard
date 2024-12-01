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
    locked: true,
  },
  {
    id: 'laboratory',
    name: '化学实验室',
    description: '这里出奇的空旷——里面只有一个小型实验台立在房间中央，上面摆着少量化学设备。',
    image: images.laboratory,
    locked: true,
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
    description: '上面的照片已经褪色，但名字写着“R. Vanderboom”。',
  },
  '滤纸': {
    image: '',
    description: '从垃圾桶捡来的滤纸，里面残留着咖啡渣。',
  },
  '咖啡杯': {
    image: '',
    description: '简单的咖啡杯，可以用来泡咖啡。',
  },
  '咖啡': {
    image: '',
    description: '一杯咖啡，可以喝，但没必要。',
  },
  '咖啡壶': {
    image: '',
    description: '简单的咖啡壶，可以用来泡咖啡。',
  },
  '肉': {
    image: '',
    description: '不知道是什么生物的肉。',
  },
  '实验说明': {
    image: images.description,
    description: '一本写有实验说明的笔记本。',
  },
  '烧杯': {
    image: '',
    description: '一个普通的烧杯，似乎可以用来做实验。',
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
  '黑色混合物': {
    image: '',
    description: '蠕动着的黏糊糊的物质。',
  },
  '保险丝盒': {
    image: images.fuse,
    description: '巨大的保险丝盒连接着许多管道和电线，似乎控制着房间的电力。',
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
    image: images.diagram,
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
        return '输入超时。';
      }

      if (!gameName.trim()) {
        return '房间名称不能为空。';
      }

      const existingGame = await ctx.database.get('rusty_lake_games', { gameName });

      if (existingGame.length > 0) {
        return '已经存在同名的房间。';
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
      if (!selected) return '输入超时。';

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
        return '选择无效。';
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
      if (!selected) return '输入超时。';

      const index = parseInt(selected.trim(), 10) - 1;
      if (isNaN(index) || index < 0 || index >= games.length) {
        return '选择无效。';
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
      if (!selected) return '输入超时。';

      const index = parseInt(selected.trim(), 10) - 1;

      if (isNaN(index) || index < 0 || index >= availableRooms.length) {
        return '选择无效。';
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

      let roomList = '';
      const current = rooms.find(r => r.id === currentRoom);
      roomList += `当前所在房间：${current.name}\n`;

      roomList += '你已经访问过以下房间，选择一个查看详细信息：\n';
      visitedRooms.forEach((roomId, index) => {
        const room = rooms.find(r => r.id === roomId);
        if (room) {
          roomList += `${index + 1}. ${room.name}\n`;
        }
      });

      roomList += '\n请输入房间编号查看详细信息：';

      await session.send(roomList);

      const choice = await session.prompt(10000);
      const selectedRoomIndex = parseInt(choice) - 1;

      if (isNaN(selectedRoomIndex) || selectedRoomIndex < 0 || selectedRoomIndex >= visitedRooms.length) {
        return '选择无效或超时。';
      }

      const selectedRoomId = visitedRooms[selectedRoomIndex];
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
  }

  async function addTaskToDoneTasks(session: Session, task: string) {
    const state = await getPlayerState(session);
    const newTasks = [...state.doneTasks, task];
    await ctx.database.upsert('rusty_lake_games', [
      {
        id: state.id,
        gameId: state.gameId,
        gameName: state.gameName,
        currentRoom: state.currentRoom,
        inventory: state.inventory,
        visitedRooms: state.visitedRooms,
        doneTasks: newTasks,
      },
    ]);
  }

  command
    .subcommand('.查看 <point>', '探索当前房间')
    .action(async ({ session }, point) => {
      const state = await getPlayerState(session);
      const currentRoom = rooms.find(room => room.id === state.currentRoom);

      let response = '';

      if (point === '上锁的盒子') {
        await session.send('上面挂着五位数字密码的锁，里面似乎有金属的声音。');
        if (state.inventory.includes('半张纸条a') && state.inventory.includes('半张纸条b') && state.inventory.includes('隐藏密码线索')) {
          if (!state.inventory.includes('钥匙')) {
            await session.send('你似乎收集到了足够的线索，要试试打开盒子吗？（是/否）');
            const choice = await session.prompt(10000);
            if (choice === '是') {
              await session.send('输入五位数字密码：');
              const choice = await session.prompt(10000);
              if (choice === '26773') {
                response += '你打开了盒子，里面只有一把钥匙。\n（可在物品指令中查看）';
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
            response += '没有特别的发现。';
          }
        } else {
          return '你还没有收集到足够的线索。';
        }

      } else if (point === '实验说明') {
        await session.send('你打开笔记本，上面似乎是某个实验的说明。');
        await session.send(h.image(images.description));
        if (!state.inventory.includes('黑色混合物') && !state.inventory.includes('手')) {
          if (state.doneTasks.includes('水') && state.doneTasks.includes('酸') && state.inventory.includes('咖啡') && state.inventory.includes('肉') && state.inventory.includes('烧杯')) {
            await session.send('你似乎收集到了足够的材料，要试试这个实验吗？（是/否）');
            const choice = await session.prompt(10000);
            if (choice === '是') {
              response += '你拿出烧杯，对照着实验说明开始加入材料。';
              response += '\n\n首先来到厨房，往烧杯里加了四分之一的水。';
              response += '\n\n又前往电气室，往烧杯里加了四分之一的酸。';
              response += '\n\n拿出之前泡好的咖啡倒了进去，又加入了冷藏箱里获得的肉。';
              response += '\n\n回到化学实验室，将这一杯不可名状的物质搅拌了一会，变成了一杯奇怪的黑色混合物。\n（可在物品指令中查看）';
              await removeItemFromInventory(session, '烧杯');
              await removeItemFromInventory(session, '咖啡');
              await addItemToInventory(session, '咖啡杯');
              await removeItemFromInventory(session, '肉');
              await addItemToInventory(session, '黑色混合物');
            } else {
              return '你迟疑着，没有动作。';
            }
          } else {
            return '你还没有收集到足够的材料。';
          }
        } else {
          response += '你已经做过这个实验了。';
        }

      } else {
        if (currentRoom.id === 'bedroom') {
          if (/床/.test(point)) {
            response += '很简单的上下床，有多少人都能睡下。';
            if (!state.inventory.includes('半张纸条a')) {
              response += '\n\n你在床铺的垫子下发现了半张纸条。\n（可在物品指令中查看）';
              response += h.image(images.notea);
              await addItemToInventory(session, '半张纸条a');
            } else {
              response += '\n\n没有特别的发现。';
            }

          } else if (/柜/.test(point) || /抽屉/.test(point)) {
            await session.send('一张小巧而简单的柜子靠墙而立，有三个抽屉。');
            if (!state.inventory.includes('手电筒')) {
              await session.send('要拉开看看吗？（是/否）');
              const choice = await session.prompt(10000);
              if (choice === '是') {
                response += '顶部的抽屉内有一个上锁的盒子。\n（可在物品指令中查看）';
                await addItemToInventory(session, '上锁的盒子');
                response += '\n\n中间的抽屉内有纸条的另一半。\n（可在物品指令中查看）';
                response += h.image(images.noteb);
                await addItemToInventory(session, '半张纸条b');
                response += '\n\n底部的抽屉内有一个手电筒。\n（可在物品指令中查看）';
                await addItemToInventory(session, '手电筒');
              } else {
                return '你迟疑着，没有动作。';
              }
            } else {
              return '没有特别的发现。';
            }

          } else if (/地毯/.test(point)) {
            await session.send('整洁的地毯，下面的地面上似乎写了什么。环境太过昏暗，你看不清。');
            if (state.inventory.includes('手电筒')) {
              await session.send('你拥有手电筒。要打开照明吗？（是/否）');
              const choice = await session.prompt(10000);
              if (choice === '是') {
                if (!state.inventory.includes('隐藏密码线索')) {
                  response += '地上刻画着一些字符，似乎是什么密码的线索。\n（可在物品指令中查看）';
                  response += h.image(images.code);
                  await addItemToInventory(session, '隐藏密码线索');
                } else {
                  response += '\n\n没有特别的发现。';
                }
              }
              else {
                return '你迟疑着，没有动作。';
              }
            } else {
              return '没有特别的发现。';
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
                  await ctx.database.upsert('rusty_lake_games', [
                    {
                      id: state.id,
                      gameId: state.gameId,
                      gameName: state.gameName,
                      currentRoom: 'corridor',
                      inventory: state.inventory,
                      visitedRooms: [...state.visitedRooms, 'corridor'],
                      doneTasks: state.doneTasks,
                    },
                  ]);
                  response += '你小心翼翼地打开门，迈步走了出去。';
                  response += '\n\n你走进一条长长的、昏暗的走廊，尽头分成两条岔路。';
                  response += '\n\n你发现墙上钉着一张地图，旁边是你进入的地方。地图描绘了包括你刚刚走出来的房间在内的所有房间。';
                  response += h.image(images.corridor);
                  response += '\n\n在走廊的尽头，你看到墙上写着些什么。那是用黑色马克笔写着一条信息：\n\n“是时候醒来了。';
                } else {
                  return '你迟疑着，没有动作。';
                }
              } else {
                return '没有特别的发现。';
              }
            } else {
              response += '这扇门通往走廊，你随时可以离开。';
            }

          } else if (/开关/.test(point)) {
            response += '老式的电灯开关。';
            if (state.doneTasks.includes('房间电')) {
              response += '\n\n你打开开关，电灯发出惨白的光亮。';
            } else {
              response += '\n\n你反复拨弄开关，但没有任何反应。这里似乎停电了。';
            }

          } else if (/监控/.test(point) || /摄像/.test(point)) {
            response += '摄像头静止地悬挂在天花板上，以一种令人不安的姿态注视着你。';
            response += '\n\n你试着拨弄它，但它坚固的金属框架可以使它免受任何损害。';

          } else if (/通风口/.test(point)) {
            const hide = rooms.find(room => room.id === 'hide');
            await session.send('通风口被一块挡板覆盖，挡板被螺丝固定在墙上。');
            if (hide.locked = true) {
              if (state.inventory.includes('螺丝刀')) {
                await session.send('你拥有螺丝刀。要试着拆开挡板吗？（是/否）');
                const choice = await session.prompt(10000);
                if (choice === '是') {
                  await session.send('你拆开了挡板，通风口内幽暗昏聩，像是个迷宫。');
                  if (state.inventory.includes('指示图')) {
                    let msg = ''
                    msg += '你细细思忖，好像有什么东西可以用在这里。猛然间，你想起了在办公室拿到的指示图：';
                    msg += h.image(images.diagram);
                    msg += '\n\n你在迷宫里仔细探索摸路，终于明白自己进来的地方对应着方块1。';
                    msg += '\n（图里的方块从上到下从左到右分别为123456）';
                    msg += '\n\n你想了想，觉得哪里不对。（输入你觉得有问题的编号）';
                    await session.send(msg);
                    const choice = await session.prompt(10000);
                    if (choice === '6') {
                      response += '你摸索着来到6号方块的位置，透过通风口，看到的竟然是一个从未发现过的房间。';
                      response += '\n\n你设法打开通风口，从布满灰尘的通风口爬出来，到了一个黑暗房间的冰冷地板上，脑袋差点撞到上方的桌子。';
                      response += '\n\n你艰难地从桌子下面爬出来，然后就看到了嵌入进墙体里的巨型机器矗立在你眼前，一个小屏幕发出红光，显示着闪烁的消息。“';
                      hide.locked = false;
                      await ctx.database.upsert('rusty_lake_games', [
                        {
                          id: state.id,
                          gameId: state.gameId,
                          gameName: state.gameName,
                          currentRoom: 'hide',
                          inventory: state.inventory,
                          visitedRooms: [...state.visitedRooms, 'hide'],
                          doneTasks: state.doneTasks,
                        },
                      ]);
                    } else {
                      return '你想了想，好像没什么奇怪的。保险起见，你退了出来，装回了挡板。';
                    }
                  } else {
                    return '摸索了一阵，你毫无头绪。保险起见，你退了出来，装回了挡板。';
                  }
                } else {
                  return '你迟疑着，没有动作。';
                }
              } else {
                return '没有特别的发现。';
              }
            } else {
              return '没有特别的发现。';
            }
          } else {
            return '没有特别的发现。';
          }
        }

        if (currentRoom.id === 'corridor') {
          if (/厨房/.test(point)) {
            const kitchen = rooms.find(room => room.id === 'hide');
            if (kitchen.locked = true) {
              response += '厨房的门没锁，你开门走了进去。';
              response += '\n\n你走进厨房，面前是一张小桌子和一把椅子。';
              response += '\n\n远端的墙上有一个厨台，上面放着一个咖啡机。';
              response += '\n\n你听到角落的垃圾桶周围萦绕着嗡嗡作响的苍蝇声。';
              response += h.image(images.kitchen);
              kitchen.locked = false;
              await ctx.database.upsert('rusty_lake_games', [
                {
                  id: state.id,
                  gameId: state.gameId,
                  gameName: state.gameName,
                  currentRoom: 'kitchen',
                  inventory: state.inventory,
                  visitedRooms: [...state.visitedRooms, 'kitchen'],
                  doneTasks: state.doneTasks,
                },
              ]);
            } else {
              response += '没有特别的发现。';
            }

          } else if (/实验室/.test(point)) {
            const laboratory = rooms.find(room => room.id === 'hide');
            if (laboratory.locked = true) {
              response += '你来到化学实验室门口。';
              response += '\n\n当你靠近门边时，嗅到了从另外一侧传来的浓烈化学气味，直冲鼻腔。';
              response += '\n\n门没锁，你开门走了进去。';
              response += '\n\n化学实验室出奇地空旷——里面只有一个小型实验台立在房间中央，上面摆着少量化学设备。';
              response += '\n\n然而一股令人不安的寒意掠过你的脊背，你总感觉有什么东西在注视着你。';
              response += h.image(images.laboratory);
              laboratory.locked = false;
              await ctx.database.upsert('rusty_lake_games', [
                {
                  id: state.id,
                  gameId: state.gameId,
                  gameName: state.gameName,
                  currentRoom: 'laboratory',
                  inventory: state.inventory,
                  visitedRooms: [...state.visitedRooms, 'laboratory'],
                  doneTasks: state.doneTasks,
                },
              ]);
            } else {
              response += '没有特别的发现。';
            }

          } else if (/电/.test(point)) {
            const electrical = rooms.find(room => room.id === 'hide');
            if (electrical.locked = true) {
              await session.send('通往电气室的门是锁着的。门把手是简单的旋转式，看起来不是很牢固，中间有一个钥匙孔。');
              await session.send('你准备想办法把门弄开。（输入准备使用的道具或方式）');
              const choice = await session.prompt(15000);
              if (choice === '回形针' && state.inventory.includes('回形针')) {
                response += '你使用回形针作为撬锁工具强行开门。';
                response += '\n\n门嘎吱作响地打开了，映入眼帘的是一个狭小的房间，空气中弥漫着一股霉味。';
                response += '\n\n你看到天花板上布满了管道和电线，房间中央有一个大型保险丝盒，旁边是一个近乎空荡的货架，上面积满了灰尘。';
                response += h.image(images.electrical);
                electrical.locked = false;
                await ctx.database.upsert('rusty_lake_games', [
                  {
                    id: state.id,
                    gameId: state.gameId,
                    gameName: state.gameName,
                    currentRoom: 'electrical',
                    inventory: state.inventory,
                    visitedRooms: [...state.visitedRooms, 'electrical'],
                    doneTasks: state.doneTasks,
                  },
                ]);
              } else if (choice === '身份证' && state.inventory.includes('身份证')) {
                response += '你使用身份证，将其插入门缝中，来回晃动将锁打开。';
                response += '\n\n门嘎吱作响地打开了，映入眼帘的是一个狭小的房间，空气中弥漫着一股霉味。';
                response += '\n\n你看到天花板上布满了管道和电线，房间中央有一个大型保险丝盒，旁边是一个近乎空荡的货架，上面积满了灰尘。';
                response += h.image(images.electrical);
                electrical.locked = false;
                await ctx.database.upsert('rusty_lake_games', [
                  {
                    id: state.id,
                    gameId: state.gameId,
                    gameName: state.gameName,
                    currentRoom: 'electrical',
                    inventory: state.inventory,
                    visitedRooms: [...state.visitedRooms, 'electrical'],
                    doneTasks: state.doneTasks,
                  },
                ]);
              } else if (/力/.test(choice)) {
                response += '你用蛮力将门弄开。';
                response += '\n\n门嘎吱作响地打开了，映入眼帘的是一个狭小的房间，空气中弥漫着一股霉味。';
                response += '\n\n你看到天花板上布满了管道和电线，房间中央有一个大型保险丝盒，旁边是一个近乎空荡的货架，上面积满了灰尘。';
                response += h.image(images.electrical);
                electrical.locked = false;
                await ctx.database.upsert('rusty_lake_games', [
                  {
                    id: state.id,
                    gameId: state.gameId,
                    gameName: state.gameName,
                    currentRoom: 'electrical',
                    inventory: state.inventory,
                    visitedRooms: [...state.visitedRooms, 'electrical'],
                    doneTasks: state.doneTasks,
                  },
                ]);
              } else {
                return '你想了又想，没找到好方法。';
              }
            } else {
              response += '没有特别的发现。';
            }

          } else if (/办公室/.test(point)) {
            const office = rooms.find(room => room.id === 'hide');
            if (office.locked = true) {
              await session.send('办公室的门被一个牢固的电子锁锁住，旁边有一个指纹读取器。');
              if (state.doneTasks.includes('房间电')) {
                await session.send('你试了试自己的指纹，读取器闪烁红灯，门并未打开。');
                if (state.inventory.includes('手')) {
                  await session.send('你想起之前在化学实验室造出的那只手，要试试吗？（是/否）');
                  const choice = await session.prompt(10000);
                  if (choice === '是') {
                    response += '你将不断抽搐着的断手按在指纹读取器上，绿灯亮起，门打开了。';
                    response += '\n\n进入房间时，你发现这里的风格如此不同，';
                    response += '\n\n简朴干净的白色墙纸与遍布整座设施的冰冷单调的白色瓷砖形成了鲜明的对比。';
                    response += '\n\n房间中央有一张桌子，上面放着一台电脑，发出轻微的电流声。';
                    response += h.image(images.office);
                    office.locked = false;
                    await ctx.database.upsert('rusty_lake_games', [
                      {
                        id: state.id,
                        gameId: state.gameId,
                        gameName: state.gameName,
                        currentRoom: 'office',
                        inventory: state.inventory,
                        visitedRooms: [...state.visitedRooms, 'office'],
                        doneTasks: state.doneTasks,
                      },
                    ]);
                  } else {
                    return '你迟疑着，没有动作。';
                  }
                } else {
                  response += '没有特别的发现。';
                }
              } else {
                response += '指纹读取器此时并没有打开，似乎是没电导致的。';
              }
            } else {
              response += '没有特别的发现。';
            }
          } else if (/墙/.test(point)) {
            response += '走廊尽头的墙上用黑色马克笔写着一条信息：';
            response += '\n\n“是时候醒来了。”';

          } else {
            return '没有特别的发现。';
          }
        }

        if (currentRoom.id === 'kitchen') {
          if (/衣/.test(point) || /外套/.test(point)) {
            response += '椅背上挂着一件白大褂。';
            if (!state.inventory.includes('身份证')) {
              response += '\n\n里面有一张身份证。上面的照片已经褪色，但名字写着“R. Vanderboom”\n（可在物品指令中查看）';
              await addItemToInventory(session, '身份证');
            } else {
              response += '\n\n没有特别的发现。';
            }

          } else if (/水槽/.test(point) || /水池/.test(point) || /龙头/.test(point)) {
            if (!state.doneTasks.includes('水')) {
              response += '你打开水龙头，并没有水流出。';
            } else {
              response += '你打开水龙头，清水汩汩流淌。你随时都能取到水。';
            }

          } else if (/咖啡/.test(point)) {
            if (state.doneTasks.includes('房间电')) {
              if (!state.inventory.includes('咖啡')) {
                if (state.inventory.includes('咖啡杯') && state.inventory.includes('咖啡壶') && state.inventory.includes('滤纸') && state.doneTasks.includes('水')) {
                  await session.send('你发现手里的东西似乎足够做一杯咖啡，要做吗？（是/否）');
                  const choice = await session.prompt(10000);
                  if (choice === '是') {
                    await addItemToInventory(session, '咖啡');
                    await removeItemFromInventory(session, '咖啡杯');
                  } else {
                    return '你迟疑着，没有动作。';
                  }
                } else {
                  response += '你拥有的东西还不足以做一杯咖啡。';
                }
              } else {
                return '你已经有一杯咖啡了。';
              }
            } else {
              response += '咖啡机似乎没有通电，没有任何反应。';
            }

          } else if (/柜/.test(point)) {
            if (!state.doneTasks.includes('水')) {
              await session.send('你打开水槽下的柜子，发现水阀紧紧关闭着。');
              if (state.inventory.includes('扳手')) {
                await session.send('你想起之前拿到的扳手。要试着拧开水阀吗？（是/否）');
                const choice = await session.prompt(10000);
                if (choice === '是') {
                  await addTaskToDoneTasks(session, '水');
                  return '现在你随时都能取到水。';
                } else {
                  return '你迟疑着，没有动作。';
                }
              } else {
                response += '没有特别的发现。';
              }
            } else {
              response += '水阀已经打开，你随时都能取到水。';
            }

          } else if (/垃圾/.test(point)) {
            response += '垃圾桶周围萦绕着嗡嗡作响的苍蝇。';
            if (!state.inventory.includes('滤纸')) {
              response += '\n\n里装满了用过的咖啡滤纸，有些滤纸里有咖啡渣。';
              response += '\n\n你拿了一张，似乎可以用它来制作咖啡。\n（可在物品指令中查看）';
              await addItemToInventory(session, '滤纸');
            } else {
              response += '\n\n没有特别的发现。';
            }

          } else if (/箱/.test(point) && point !== '垃圾箱') {
            await session.send('冷藏箱锁着，需用四个大写字母组成的密码才能打开。');
            if (!state.inventory.includes('肉')) {
              if (state.inventory.includes('实验说明')) {
                await session.send('你似乎收集到了足够的线索，要试试打开盒子吗？（是/否）');
                const choice = await session.prompt(10000);
                if (choice === '是') {
                  await session.send('输入四个大写字母密码：');
                  const choice = await session.prompt(10000);
                  if (choice === 'COLD') {
                    response += '你打开了冷藏箱，里面放着一块肉，下面铺着冰块。';
                    response += '\n\n你拿起了那块不知道是什么生物的肉。\n（可在物品指令中查看）';
                    await addItemToInventory(session, '肉');
                  } else {
                    return '锁并未解开。是输错了吗？';
                  }
                } else {
                  return '你迟疑着，没有动作。';
                }
              } else {
                response += '没有特别的发现。';
              }
            } else {
              return '已经拿到肉了，就别再看冷藏箱了。';
            }

          } else if (/电话/.test(point)) {
            if (state.doneTasks.includes('房间电')) {
              await session.send('你拿起听筒，里面的电流声似乎催促着你输入号码。');
              if (state.doneTasks.includes('电话号码')) {
                await session.send('你猛然想起似乎在什么地方看到过一些数字。\n（输入你觉得正确的号码）');
                const choice = await session.prompt(10000);
                if (choice === '099174190') {
                  await session.send('听筒里电流声消失，却传来刺耳的声音。你仔细分辨，才明白对方说的是：\n\n“你是谁？”');
                  await session.send('你思考着怎么回答。（输入你觉得正确的文字）');
                  const choice = await session.prompt(10000);
                  if (/vanderboom/.test(choice)) {
                    response += '沉默了一会，你听到听筒里发出声音：\n\n“3141”';
                    await addTaskToDoneTasks(session, '电脑密码');
                  } else {
                    return '听筒里安静了一会，变成了滋滋的电流声。';
                  }
                } else if (choice === '110') {
                  return '你输入报警电话，没有任何反应。这似乎是个与世隔绝的地方。';
                } else if (choice === '119') {
                  return '你输入火警电话，没有任何反应。这似乎是个与世隔绝的地方。';
                } else if (choice === '120') {
                  return '你输入急救电话，没有任何反应。这似乎是个与世隔绝的地方。';
                } else {
                  return '你输入号码，没有任何反应。';
                }
              } else {
                return '你想不到可以拨打的号码，索性把听筒放了回去。';
              }
            } else {
              response += '电话似乎没有通电，没有任何反应。';
            }

          } else if (/通风口/.test(point)) {
            response += '天花板上有一个小通风口，位置很高。';
            response += '\n\n你站在高处往里看，但没有任何发现。';

          } else if (/监控/.test(point) || /摄像/.test(point)) {
            response += '摄像头静止地悬挂在天花板上，以一种令人不安的姿态注视着你。';
            response += '\n\n你试着拨弄它，但它坚固的金属框架可以使它免受任何损害。';

          } else {
            return '没有特别的发现。';
          }
        }

        if (currentRoom.id === 'laboratory') {
          if (/实验台/.test(point) || /桌/.test(point)) {
            await session.send('一张简单的桌子当做实验台，上面固定着一个本生灯，需要火柴才能点燃。');
            if (!state.inventory.includes('咖啡壶')) {
              await session.send('你看了看桌面，拿走了咖啡杯和咖啡壶。\n（可在物品指令中查看）');
              await addItemToInventory(session, '咖啡杯');
              await addItemToInventory(session, '咖啡壶');
              if (!state.inventory.includes('回形针')) {
                await session.send('实验台右侧有两个抽屉，要拉开看看吗？（是/否）');
                const choice = await session.prompt(10000);
                if (choice === '是') {
                  response += '上面的抽屉里有一本写有实验说明的笔记本和一个装满火柴的火柴盒。';
                  response += h.image(images.description);
                  await addItemToInventory(session, '实验说明');
                  await addItemToInventory(session, '火柴盒');
                  response += '\n\n下面的抽屉里面有几张松散的、空白的纸张和一个装有几枚回形针的小盒子。';
                  await addItemToInventory(session, '回形针');
                  response += '\n\n你拿走了实验说明、火柴盒和回形针。\n（可在物品指令中查看）';
                } else {
                  return '你迟疑着，没有动作。';
                }
              } else {
                return '没有特别的发现。';
              }
            } else {
              return '没有特别的发现。';
            }

          } else if (/灯/.test(point)) {
            await session.send('需要火柴才能点燃的本生灯，里面有充足的酒精。');
            if (state.inventory.includes('火柴盒')) {
              if (state.inventory.includes('黑色混合物')) {
                await session.send('你点燃了本生灯，似乎可以用来加热什么东西。你猛然想到刚做出来的那一杯黑色混合物。要试试吗？（是/否）');
                const choice = await session.prompt(10000);
                if (choice === '是') {
                  response += '你将混合物加热，完成了这个实验。';
                  response += '\n\n混合物开始剧烈地膨胀、起泡，你不自觉地往后退了一步。';
                  response += '\n\n烧杯突然破裂，有什么湿漉漉的东西掉在了地上。';
                  response += '\n\n你定睛一看，混合物消失了，取而代之的是躺在地上的，一只抽搐着的人手。';
                  response += '\n\n你强忍不适把它捡了起来。它似乎轻抚过你的手背。\n（可在物品指令中查看）';
                  await removeItemFromInventory(session, '黑色混合物');
                  await addItemToInventory(session, '手');
                } else {
                  return '你迟疑着，没有动作。';
                }
              } else {
                response += '你试着点燃了本生灯，又百无聊赖地熄灭了它。';
              }
            } else {
              response += '你没有火柴，安全起见，就不对酒精做什么了。';
            }

          } else if (/抽屉/.test(point)) {
            if (!state.inventory.includes('回形针')) {
              response += '你拉开实验台右侧的两个抽屉。';
              response += '\n\n上面的抽屉里有一本写有实验说明的笔记本和一个装满火柴的火柴盒。';
              response += h.image(images.description);
              await addItemToInventory(session, '实验说明');
              await addItemToInventory(session, '火柴盒');
              response += '\n\n下面的抽屉里面有几张松散的、空白的纸张和一个装有几枚回形针的小盒子。';
              await addItemToInventory(session, '回形针');
              response += '\n\n你拿走了实验说明、火柴盒和回形针。\n（可在物品指令中查看）';
            } else {
              response += '没有特别的发现。';
            }

          } else if (/架/.test(point)) {
            response += '架子上有一些玻璃制品，你拿了一个烧杯。';
            await addItemToInventory(session, '烧杯');

          } else if (/通风口/.test(point)) {
            response += '天花板上有一个小通风口，位置很高。';
            response += '\n\n你往通风口里看了一眼，差点跌落，因为你看到两只发光的眼睛正从另一侧盯着你。';
            response += '\n\n。随后，那双眼睛消失在通风口深处，你听到墙内有什么东西在跌跌撞撞地移动，直到那声音消失在远处。';

          } else if (/监控/.test(point) || /摄像/.test(point)) {
            response += '摄像头静止地悬挂在天花板上，以一种令人不安的姿态注视着你。';
            response += '\n\n你试着拨弄它，但它坚固的金属框架可以使它免受任何损害。';

          } else {
            return '没有特别的发现。';
          }
        }

        if (currentRoom.id === 'electrical') {
          if (/保险丝盒/.test(point) || /柜/.test(point)) {
            await session.send('你打开保险丝盒，8个插槽旁边各自画着符号。\n（可在物品指令中查看）');
            session.send(h.image(images.fuse));
            if (state.inventory.includes('保险丝')) {
              await session.send('插槽C和H已经插入了保险丝。你决定调整保险丝的位置，并把之前找到的那个也放进去。');
              await session.send('输入你想插入保险丝的三个插槽。（三个大写英文字母）');
              const choice = await session.prompt(10000);
              if (/A/.test(choice) && /B/.test(choice) && /G/.test(choice)) {
                response += '你将保险丝插入插槽A、B、G。';
                response += '\n\n放好了最后一个保险丝，你听到电流噼啪作响，伴着火花从保险丝盒中飞溅而出。';
                response += '\n\n你头顶的灯开始一明一灭地闪烁，然后彻底点亮，照亮了整个房间。';
                await addTaskToDoneTasks(session, '房间电');
              } else if (/A/.test(choice) && /C/.test(choice) && /F/.test(choice)) {
                response += '你将保险丝插入插槽A、C、F。';
                response += '\n\n当你插入最后一个保险丝的时候，保险丝盒内火花四溅，强烈的光亮蒙蔽了你的双眼。';
                response += '\n\n房间里的灯光闪烁了一下后便熄灭，将你彻底淹没在黑暗中。';
                response += '\n\n远处，你听到了一个大型机械启动时发出的渐强的嗡鸣声。';
                await addTaskToDoneTasks(session, '机器电');
              } else {
                return '你迟疑着，没有动作。';
              }
            } else {
              response += '安全起见，你没有动它，关上了门。';
            }
          } else if (/架/.test(point)) {
            response += '这是个铁质的空荡荡的货架。';
            if (!state.inventory.includes('扳手')) {
              response += '\n\n货架上只有一个扳手，你拿走了。\n（可在物品指令中查看）';
              await addItemToInventory(session, '扳手');
            } else {
              response += '\n\n没有特别的发现。';
            }

          } else if (/管/.test(point)) {
            await session.send('管道似乎在泄漏某种散发着强烈化学气味的物质。');
            if (!state.doneTasks.includes('酸')) {
              if (state.inventory.includes('扳手')) {
                await session.send('你看着刚拿到的扳手，要试着敲开管道的裂缝吗？（是/否）');
                const choice = await session.prompt(10000);
                if (choice === '是') {
                  response += '你用扳手敲击管道使其松动，酸液开始滴落到地面上。';
                  response += '\n\n你随时都能取到酸。';
                  await addTaskToDoneTasks(session, '酸');
                } else {
                  return '你迟疑着，没有动作。';
                }
              } else {
                return '管道上有一些裂缝，你想找个工具把它打开。';
              }
            } else {
              return '裂缝已经被你打开，你随时都能取到酸。';
            }

          } else if (/通风口/.test(point)) {
            await session.send('天花板上有一个小通风口，位置很高。');
            if (!state.inventory.includes('保险丝')) {
              await session.send('你看向通风口内部，有一个保险丝，但由于挡板格栅的缝隙太窄，手无法伸进去。');
              if (state.inventory.includes('回形针')) {
                await session.send('你掏出之前得到的回形针，把它拉长。要用它试试吗？（是/否）');
                const choice = await session.prompt(10000);
                if (choice === '是') {
                  response += '你掏出了保险丝，一个短小的玻璃制品，里面有一节金属丝。\n（可在物品指令中查看）';
                  await addItemToInventory(session, '隐藏密码线索');
                } else {
                  return '你迟疑着，没有动作。';
                }
              } else {
                response += '你需要一个细长的东西。';
              }
            } else {
              response += '没有特别的发现。';
            }

          } else if (/污渍/.test(point) || /黑/.test(point) || /水/.test(point)) {
            response += '地面上有一块小污渍，似乎是某种腐蚀性物质损坏了地板。';
            response += '\n\n你抬头望去，污渍刚好位于天花板的管道下方。';

          } else {
            return '没有特别的发现。';
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

          } else {
            return '没有特别的发现。';
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

          } else {
            return '没有特别的发现。';
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
          inventory: ["半张纸条a", "半张纸条b", "手电筒", "隐藏密码线索", "钥匙", "身份证", "滤纸", "肉", "实验说明", "火柴盒", "回形针", "手", "扳手", "保险丝", "白色文件夹", "文本文档", "螺丝刀", "指示图", "金属小钥匙", "金属盒子", "软盘"],
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
          currentRoom: 'electrical',
          inventory: ["半张纸条a", "半张纸条b", "手电筒", "隐藏密码线索", "钥匙", "身份证", "滤纸"],
          visitedRooms: ["bedroom", "corridor", "kitchen", "laboratory", "electrical"],
          doneTasks: [],
        },
      ]);

      await session.send(`修改成功`);
    });

  command
    .subcommand('.测试3', '测试')
    .action(async ({ session }) => {
      const player = await ctx.database.get('rusty_lake_players', { userId: session.userId });
      if (player.length === 0) return '你还未加入任何游戏，请使用“新建游戏”或“加入游戏”指令。';

      const id = player[0].id;
      await ctx.database.upsert('rusty_lake_games', [
        {
          id,
          currentRoom: 'bedroom',
          inventory: [],
          visitedRooms: ['bedroom'],
          doneTasks: [],
        },
      ]);

      await session.send(`修改成功`);
    });
}
