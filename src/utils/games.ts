import { BsLightningFill } from 'react-icons/bs'
import { HiSquares2X2 } from 'react-icons/hi2'
import { FiTarget } from 'react-icons/fi'
const games = [
  {
    icon: BsLightningFill,
    title: 'Reaction Time',
    subtitle: 'Test your visual reflexes',
    type: 'accuracy'
  },
  {
    icon: HiSquares2X2,
    title: 'Sequence Memory',
    subtitle: 'Remember an increasingly long pattern of button presses.',
    type: 'accuracy'
  },
  {
    icon: FiTarget,
    title: 'Aim Trainer',
    subtitle: 'How quickly can you hit all the targets?',
    type: 'accuracy'
  }
]
export { games }
