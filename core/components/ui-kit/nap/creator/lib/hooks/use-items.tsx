import * as Lib from '../'
import { MdFormatColorText } from 'react-icons/md'
import { BsFillImageFill, BsQuestionCircle, BsPlusSquare, BsChevronCompactLeft } from 'react-icons/bs'
import { FiBell } from 'react-icons/fi'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import { AiOutlineGif } from 'react-icons/ai'
import { GoMention } from 'react-icons/go'
import { IoFilmOutline } from 'react-icons/io5'
import { createNapAtoms } from '@/store/atoms'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useEffect } from 'react'

export const useItems = ({ onOptionsClick, boardRef }: Pick<Lib.T.ItemsProps, 'boardRef' | 'onOptionsClick'>) => {
  const showMoreOptions = useRecoilValue(createNapAtoms.showMoreOptions)
  const [activeOption, setActiveOptions] = useRecoilState(createNapAtoms.activeOption)
  const Insert = Lib.H.useInserters()

  const addItem = () => {
    const insert = new Insert(boardRef)

    if (activeOption !== 'none' && !boardContains(activeOption)) {
      switch (activeOption) {
        case 'text': {
          insert.newText()
          break
        }
      }
    }
  }

  const itemClicks = (key: Lib.T.Options) => {
    if (key === activeOption) {
      setActiveOptions('none')
    } else {
      onOptionsClick(key)
    }
  }

  const boardContains = (item: Lib.T.Options): boolean => {
    const board = boardRef.current
    if (!board) {
      return false
    }
    return board.querySelector(`.${item}`) !== null
  }

  const items: Lib.T.Item[] = [
    {
      Icon: MdFormatColorText,
      title: 'Text',
      key: 'text',
    },
    {
      Icon: BsPlusSquare,
      title: 'Post',
      key: 'post',
    },
    {
      Icon: GoMention,
      title: 'Mention',
      key: 'mention',
    },
    {
      Icon: HiOutlineChatAlt2,
      title: 'Ask',
      key: 'question',
    },
    {
      Icon: BsQuestionCircle,
      title: 'Quiz',
      key: 'quiz',
    },
    {
      Icon: FiBell,
      title: 'Reminder',
      key: 'reminder',
    },
    {
      Icon: AiOutlineGif,
      title: 'GIF',
      key: 'gif',
    },
    {
      Icon: BsFillImageFill,
      title: 'Image',
      key: 'image',
    },
    {
      Icon: IoFilmOutline,
      title: 'Video',
      key: 'video',
    },
    {
      Icon: BsChevronCompactLeft,
      title: showMoreOptions ? 'Less' : 'More',
      key: 'more|less',
    },
  ]

  useEffect(addItem, [activeOption])
  return {
    get: {
      items,
    },
    on: {
      itemClicks,
    },
  }
}