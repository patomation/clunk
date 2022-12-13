import { Config } from '../..'
import { clunk } from '../..'

type Flags<C extends Config> = {
  [key in keyof C]: ReturnType<C[key]['type']>
}

// Works with config and gets types from config
const {
  flags: { option1, option2, option3 },
} = clunk({
  option1: {
    type: Boolean,
  },
  option2: {
    type: String,
  },
  option3: {
    type: Number,
  },
})

// Works without a config but type is string | number | boolean
const {
  flags: { option4, option5, option6 },
} = clunk()
