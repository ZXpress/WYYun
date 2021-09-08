// api文件夹下 各个请求模块js, 都统一来到index.js再向外导出
import { recommendMusic, newMusic } from './Home'

import { hotSearch, searchResult } from './Search'
import { getSongById, getLyricById } from './Play'

export const recommendMusicAPI = recommendMusic

export const newMusicAPI = newMusic

export const hotSearchAPI = hotSearch

export const searchResultAPI = searchResult

export const getSongByIdAPI = getSongById

export const getLyricByIdAPI = getLyricById


