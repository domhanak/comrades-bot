import Paprik from './paprik';
import Command from '../command';
import IQ from './iq';
import Dopice from './dopice';
import Stop from './stop';
import Skip from './skip';
import Play from './play';
import KtoJeKokot from './ktoJeKokot';

const CommandsList: Record<string, typeof Command> = {
  paprik: Paprik,
  iq: IQ,
  dopice: Dopice,
  stop: Stop,
  skip: Skip,
  play: Play,
  ktojekokot: KtoJeKokot,
};

export default CommandsList;
