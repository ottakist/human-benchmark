import { useState } from 'react'
function App (): JSX.Element {
  const [count] = useState<number>(0)

  return <div className='App'>{count}</div>
}

export default App
