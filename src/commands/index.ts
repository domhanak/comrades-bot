import Paprik from './paprik';
import Command from '../command';
import IQ from './iq';
import Play from './play';

const CommandsList: Record<string, typeof Command> = {
  paprik: Paprik,
  iq: IQ,
  play: Play,
};

export default CommandsList;
