import Paprik from './paprik';
import Command from '../command';
import IQ from './iq';
import Dopice from './dopice';
import Stop from './stop';
import KtoJeKokot from './ktoJeKokot';
import Play from './play';
import AniZaKokot from './anizakokot';
import JeduDoPici from './jedudopici';
import Kurva from './kurva';
import PastVedlePasti from './pastvedlepasti';
import Playing from './playing';
import Vtip from './vtip';
import Povedzvtip from './povedz-vtip';
import PovedzDaco from './povedz-daco';
import Pocasie from './pocasie';
import Say from './say';
import Rychlost from './rychlost';
import Volume from './volume';
import Search from './search';
import Next from './next';
import Go from './go';
import Youtube from './youtube';

const CommandsList: Record<string, typeof Command> = {
  paprik: Paprik,
  iq: IQ,
  dopice: Dopice,
  anizakokot: AniZaKokot,
  jedudopici: JeduDoPici,
  kurva: Kurva,
  pastvedlepasti: PastVedlePasti,
  stop: Stop,
  next: Next,
  ktojekokot: KtoJeKokot,
  play: Play,
  playing: Playing,
  vtip: Vtip,
  povedzvtip: Povedzvtip,
  daco: PovedzDaco,
  pocasie: Pocasie,
  say: Say,
  rychlost: Rychlost,
  volume: Volume,
  search: Search,
  go: Go,
  youtube: Youtube,
};

export default CommandsList;
