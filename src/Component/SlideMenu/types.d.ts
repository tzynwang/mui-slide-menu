export interface Parent {
  id: number
  label: string
}

export interface Child {
  id: string
  parent: number
  label: string
}

export interface SlideMenuProps {
  parentArr: Parent[]
  childArr: Child[]
}
