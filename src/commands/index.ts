import Paprik from './paprik';
import Command from '../command';
import IQ from './iq';
import Play from './play';
import KtoJeKokot from './ktoJeKokot';

const CommandsList: Record<string, typeof Command> = {
  paprik: Paprik,
  iq: IQ,
  play: Play,
  ktojekokot: KtoJeKokot,
};

export default CommandsList;
