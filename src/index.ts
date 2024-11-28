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
  puzzleSolved: boolean;
}

const rooms: Room[] = [
  {
    id: 'bedroom',
    name: '卧室',
    description: '这是一个黑暗的、方形的、铺着白色瓷砖的房间。',
    image: images.bedroom,
    locked: false,
    puzzleSolved: false,
  },
  {
    id: 'corridor',
    name: '走廊',
    description: '你走进一条长长的、昏暗的走廊，尽头分成两条岔路。',
    image: images.corridor,
    locked: true,
    puzzleSolved: false,
  },
  {
    id: 'kitchen',
    name: '厨房',
    description: '厨房里摆着一张桌子和一个厨台。',
    image: images.kitchen,
    locked: false,
    puzzleSolved: false,
  },
  {
    id: 'laboratory',
    name: '化学实验室',
    description: '化学实验室出奇地空旷——里面只有一个小型实验台立在房间中央，上面摆着少量化学设备。',
    image: images.laboratory,
    locked: false,
    puzzleSolved: false,
  },
  {
    id: 'electrical',
    name: '电气室',
    description: '空气中弥漫着一股霉味，天花板上布满了管道和电线，房间中央有一个大型保险丝盒，旁边是一个近乎空荡的货架，上面积满了灰尘。',
    image: images.electrical,
    locked: true,
    puzzleSolved: false,
  },
  {
    id: 'office',
    name: '办公室',
    description: '进入房间，简朴干净的白色墙纸与遍布整座设施的冰冷单调的白色瓷砖形成了鲜明的对比。房间中央有一张桌子，上面放着一台电脑，发出轻微的电流声。',
    image: images.office,
    locked: true,
    puzzleSolved: false,
  },
  {
    id: 'hide',
    name: '隐藏房间',
    description: '你从布满灰尘的通风口爬出来，到了一个黑暗房间的冰冷地板上。嵌入进墙体里的巨型机器矗立在你眼前，一个小屏幕发出红光，显示着闪烁的消息。',
    image: images.hide,
    locked: true,
    puzzleSolved: false,
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
  gameName: string;
  currentRoom: string;
  inventory: string[];
  visitedRooms: string[];
  roomStates: Record<string, { locked: boolean; puzzleSolved: boolean }>;
}

interface PlayerState {
  id: string;
  userId: string;
}

declare module 'koishi' {
  interface Tables {
    rusty_lake_games: GameState;
    rusty_lake_players: PlayerState;
  }
}

export function apply(ctx: Context, config: Config) {
  const logger = ctx.logger('rusty-lake');

  ctx.model.extend('rusty_lake_games', {
    id: 'string',
    gameName: 'string',
    currentRoom: 'string',
    inventory: 'json',
    visitedRooms: 'json',
    roomStates: 'json',
  });

  ctx.model.extend('rusty_lake_players', {
    id: 'string',
    userId: 'string',
  });

  const command = ctx.command('锈湖', '锈湖桌游');

  async function getPlayerState(session: Session): Promise<GameState> {
    const player = await ctx.database.get('rusty_lake_players', { userId: session.userId });
    if (!player.length) throw new Error('你还未加入任何游戏。');

    const game = await ctx.database.get('rusty_lake_games', { id: player[0].id });
    if (!game.length) throw new Error('对局数据不存在。');

    return {
      ...game[0],
      visitedRooms: game[0].visitedRooms || [],
      roomStates: game[0].roomStates || {},
    };
  }

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

      const id = `game-${Date.now()}`;

      await ctx.database.create('rusty_lake_games', {
        id: id,
        gameName,
        currentRoom: 'bedroom',
        inventory: [],
        visitedRooms: [],
        roomStates: {},
      });

      await ctx.database.upsert('rusty_lake_players', [
        {
          id: id,
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
          await ctx.database.remove('rusty_lake_games', { id: game.id });
          await ctx.database.remove('rusty_lake_players', { id: game.id });
          logger.info(`删除了游戏 ${game.gameName} 的记录。`);
        }
        await session.send('所有房间记录已成功删除。');
        return;
      }

      if (isNaN(index) || index < 1 || index > games.length) {
        return '无效的选择，请重新输入：';
      }

      const id = games[index - 1].id;
      const gameName = games[index - 1].gameName;

      await ctx.database.remove('rusty_lake_games', { id });
      await ctx.database.remove('rusty_lake_players', { id: id });

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

      const id = games[index].id;

      await ctx.database.upsert('rusty_lake_players', [
        { userId: session.userId, id },
      ]);

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
          gameName: state.gameName,
          currentRoom: targetRoom.id,
          inventory: state.inventory,
          visitedRooms: [...state.visitedRooms, targetRoom.id],
          roomStates: state.roomStates,
        },
      ]);

      return `你进入了${targetRoom.name}。\n${targetRoom.description}${targetRoom.image ? '\n' + h.image(targetRoom.image) : ''}`;
    });

  async function addItemToInventory(session: Session, item: string) {
    const state = await getPlayerState(session);
    const newInventory = [...state.inventory, item];
    await ctx.database.upsert('rusty_lake_games', [
      {
        id: state.id,
        gameName: state.gameName,
        currentRoom: state.currentRoom,
        inventory: newInventory,
        visitedRooms: state.visitedRooms,
        roomStates: state.roomStates,
      },
    ]);
  }

  command
    .subcommand('.查看 <point>', '探索当前房间')
    .action(async ({ session }, point) => {
      const state = await getPlayerState(session);
      const currentRoom = rooms.find(room => room.id === state.currentRoom);

      let response = '';

      if (currentRoom.id === 'bedroom') {
        if (/床/.test(point)) {
          response += '你在床铺的垫子下发现了半张纸条。';
          await addItemToInventory(session, '半张纸条a');
          response += '\n你获得了半张纸条';
        } else if (/柜/.test(point)) {
          response += '';
        } else if (/地毯/.test(point)) {
          response += '';
        } else if (/门/.test(point)) {
          response += '';
        } else if (/开关/.test(point)) {
          response += '';
        } else if (/监控/.test(point) || /摄像/.test(point)) {
          response += '';
        } else if (/通风口/.test(point)) {
          response += '';
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

      const selected = await session.prompt(10000);

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
    .subcommand('.测试', '测试')
    .action(async ({ session }) => {
      if (!session?.userId) return '无法识别用户，请检查登录状态。';

      const player = await ctx.database.get('rusty_lake_players', { userId: session.userId });
      if (player.length === 0) return '你还未加入任何游戏，请使用“新建游戏”或“加入游戏”指令。';

      const id = player[0].id;

      await ctx.database.upsert('rusty_lake_games', [
        {
          id,
          inventory: ['钥匙'],
          visitedRooms: ['bedroom', 'corridor', 'kitchen', 'laboratory', 'electrical', 'office', 'hide'],
        },
      ]);

      await session.send(`修改成功`);
    });

}
