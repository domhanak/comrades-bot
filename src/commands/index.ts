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
};

export default CommandsList;
