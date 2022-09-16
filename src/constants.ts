import dukou from './assets/dukou.flac';
import zheshijienameduoren from './assets/zheshijienameduoren.flac';
import gao from './assets/gao.flac';
import kong from './assets/kong.flac';

export interface PlayListItem {
  name: string;
  url: string;
}

export const defaultPlayList: PlayListItem[] = [
  {
    name: '蔡琴 - 渡口',
    url: dukou,
  },
  {
    name: '莫文蔚 - 这世界那么多人',
    url: zheshijienameduoren,
  },
  {
    name: 'RADWIMPS - 陽菜と、走る帆高',
    url: gao,
  },
  {
    name: 'RADWIMPS - 晴れゆく空',
    url: kong,
  },
]
