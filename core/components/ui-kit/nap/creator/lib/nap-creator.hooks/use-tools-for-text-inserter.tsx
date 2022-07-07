import { pageCreateNapAtoms } from '@/store/atoms'
import { AiOutlineRotateRight } from 'react-icons/ai'
import { GoTextSize } from 'react-icons/go'
import { IoAddCircleOutline, IoColorFilterOutline } from 'react-icons/io5'
import { useRecoilValue } from 'recoil'
import * as Lib from '..'

export const useToolsForTextInserter = ({ boardRef }: Lib.T.ToolsForInserters) => {
  const Inserter = Lib.H.useInserters({ boardRef })
  const NapStorage = Lib.H.useNapStorage(boardRef)
  const insert = new Inserter()
  const { getFocusedItem, changeRotation, changeEffect } = Lib.H.useToolsForAllInserters({
    boardRef,
  })
  const activeItemID = useRecoilValue(pageCreateNapAtoms.activeItemID)
  const activeOption = useRecoilValue(pageCreateNapAtoms.activeOption)
  const fontSizeRange = [10, 50]
  const fontSizeStep = 10

  const tools: Pick<Lib.T.ToolProps, 'Icon' | 'type' | 'title' | 'disabled'>[] = [
    { Icon: IoAddCircleOutline, type: 'add-text', title: 'Add new', disabled: !insert.canInsert('text', false) },
    {
      Icon: GoTextSize,
      type: 'text-font-size',
      title: 'Font Size',
      disabled: activeOption !== 'text' || activeItemID === null,
    },
    {
      Icon: IoColorFilterOutline,
      type: 'text-effect',
      title: 'Effect',
      disabled: activeOption !== 'text' || activeItemID === null,
    },
    {
      Icon: AiOutlineRotateRight,
      type: 'text-rotation',
      title: 'Rotate',
      disabled: activeOption !== 'text' || activeItemID === null,
    },
  ]

  const toolClick = (type: Lib.T.Tool) => {
    switch (type) {
      case 'add-text': {
        insert.newText()
        break
      }

      case 'text-font-size': {
        const focusedItem = getFocusedItem()
        if (focusedItem) {
          const currentFontSize = parseInt(focusedItem.getAttribute(Lib.CO.FRAMES_DATA_ATTRS.FONT_SIZE) || '20px')
          const nextFontSize = currentFontSize + fontSizeStep
          const newFontSize = (nextFontSize > fontSizeRange[1] ? fontSizeRange[0] : nextFontSize) + 'px'
          focusedItem.style.fontSize = newFontSize
          focusedItem.setAttribute(Lib.CO.FRAMES_DATA_ATTRS.FONT_SIZE, newFontSize)
          focusedItem.focus()
          NapStorage.update(focusedItem)
        }
        break
      }

      case 'text-effect': {
        changeEffect('TEXT')
        break
      }

      case 'text-rotation': {
        changeRotation()
        break
      }
    }
  }

  return {
    get: {
      tools,
    },
    on: {
      toolClick,
    },
  }
}
