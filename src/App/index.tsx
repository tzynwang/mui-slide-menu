import React, { memo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import SlideMenu from './../Component/SlideMenu'
import type { Parent, Child } from './types'

const PARENT: Parent[] = [
  { id: 1, label: '法務類' },
  { id: 2, label: '金融類' },
  { id: 3, label: '資訊軟體類' },
  { id: 4, label: '設計類' },
  { id: 5, label: '人資類' }
]
const CHILD: Child[] = [
  { id: uuidv4(), parent: 1, label: '法務人員' },
  { id: uuidv4(), parent: 1, label: '律師' },
  { id: uuidv4(), parent: 2, label: '會計師' },
  { id: uuidv4(), parent: 2, label: '財務人員' },
  { id: uuidv4(), parent: 3, label: '系統分析師' },
  { id: uuidv4(), parent: 3, label: '軟體設計工程師' },
  { id: uuidv4(), parent: 4, label: '廣告設計' },
  { id: uuidv4(), parent: 4, label: '工業設計' },
  { id: uuidv4(), parent: 5, label: '人力資源主管' },
  { id: uuidv4(), parent: 5, label: '教育訓練人員' }
]

function App(): React.ReactElement {
  // Main
  return (
    <div>
      <SlideMenu parentArr={PARENT} childArr={CHILD} />
    </div>
  )
}

export default memo(App)
