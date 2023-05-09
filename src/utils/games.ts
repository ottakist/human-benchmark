import { BsLightningFill } from 'react-icons/bs'
import { HiSquares2X2 } from 'react-icons/hi2'
import { FiTarget } from 'react-icons/fi'
const games = [
  {
    icon: BsLightningFill,
    title: 'reaction time',
    subtitle: 'Test your visual reflexes',
    about: [
      'This is a simple tool to measure your reaction time.',
      'The average (median) reaction time is 273 milliseconds, according to the data collected so far.',
      'In addition to measuring your reaction time, this test is affected by the latency of your computer and monitor. Using a fast computer and low latency / high framerate monitor will improve your score.',
      'Scores in this test are faster than the aim trainer test, because you can react instantly without moving the cursor.',
      'This is discussed in further detail on the the statistics page. While an average human reaction time may fall between 200-250ms, your computer could be adding 10-50ms on top. Some modern TVs add as much as 150ms!',
      'If you want, you can keep track of your scores, and see your full history of reaction times. Just perform at least 5 clicks and then save.'
    ],
    type: 'accuracy'
  },
  {
    icon: HiSquares2X2,
    title: 'sequence memory',
    subtitle: 'Remember an increasingly long pattern of button presses.',
    about: [
      'Memorize the sequence of buttons that light up, then press them in order.',
      'Every time you finish the pattern, it gets longer.',
      'Make a mistake, and the test is over.'
    ],

    type: 'accuracy'
  },
  {
    icon: FiTarget,
    title: 'aim trainer',
    subtitle: 'How quickly can you hit all the targets?',
    about: [
      'Click the targets as quickly and accurately as you can.',
      'This tests reflexes and hand-eye coordination.',
      "Once you've clicked 30 targets, your score and average time per target will be displayed.",
      'Scores in this test are slower than the simple reaction time test, because you must react and then move the cursor.',
      'This test is best taken with a mouse or tablet screen. Trackpads are difficult to score well with.'
    ],
    type: 'accuracy'
  }
]
export { games }
