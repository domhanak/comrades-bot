import Paprik from './paprik';
import Command from '../command';
import IQ from './iq';
import Dopice from './dopice';
import Stop from './stop';
import Skip from './skip';
import KtoJeKokot from './ktoJeKokot';
import Play from './play';
import AniZaKokot from './anizakokot';
import JeduDoPici from './jedudopici';
import Kurva from './kurva';
import PastVedlePasti from './pastvedlepasti';
import Playing from './playing';
import Vtip from './Vtip';
import Povedzvtip from './povedz-vtip';
import PovedzDaco from './povedz-daco';
import Pocasie from './pocasie';
import Say from './say';
import Rychlost from './rychlost';
import Volume from './volume';

const CommandsList: Record<string, typeof Command> = {
  paprik: Paprik,
  iq: IQ,
  dopice: Dopice,
  anizakokot: AniZaKokot,
  jedudopici: JeduDoPici,
  kurva: Kurva,
  pastvedlepasti: PastVedlePasti,
  stop: Stop,
  skip: Skip,
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
};

export default CommandsList;
