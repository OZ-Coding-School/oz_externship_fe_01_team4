import { useState } from 'react'

export function useSelection() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string, checked: boolean) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  const toggleAll = (ids: string[], checked: boolean) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev)
      ids.forEach((id) => {
        if (checked) {
          void newSet.add(id)
        } else {
          newSet.delete(id)
        }
      })
      return newSet
    })
  }

  const isAllChecked = (ids: string[]) =>
    ids.length > 0 && ids.every((id) => checkedItems.has(id))

  return { checkedItems, toggleItem, toggleAll, isAllChecked, setCheckedItems }
}
