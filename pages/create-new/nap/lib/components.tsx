import { FC, useEffect } from 'react'
import * as Lib from '.'
import { HiChevronRight } from 'react-icons/hi'
import { createNapAtoms } from '@/store/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FaPause, FaShare, FaEllipsisH } from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'
import { Button } from 'antd'

export const Toolbox: FC<Lib.T.ToolboxProps> = ({ active }) => {
  const [activeOption, setActiveOption] = useRecoilState(createNapAtoms.activeOption)

  return (
    <Lib.S.ToolboxContainer active={active}>
      <div className={`withTitle ${activeOption === 'none'}`}>
        <h1>Create Your Nap</h1>
        <ToolBoxNextBtn />
      </div>

      <div className={`toolsContainer ${activeOption !== 'none'}`}>
        <span className="backButton" onClick={() => setActiveOption('none')}>
          <MdOutlineClose color="var(--layer-2-text-3)" size={22} />
        </span>
        <div className="tools">
          <Tools selectedOption={activeOption} />
        </div>
        <ToolBoxNextBtn />
      </div>
    </Lib.S.ToolboxContainer>
  )
}

export const ToolBoxNextBtn: FC = () => (
  <Button type="primary" className="nextBtn">
    <span>Next</span>
    <HiChevronRight color="var(--layer-2-text-3)" size={20} />
  </Button>
)

export const Items: FC<Lib.T.ItemsProps> = ({ onOptionsClick, boardRef }) => {
  const showMoreOptions = useRecoilValue(createNapAtoms.showMoreOptions)
  const activeOption = useRecoilValue(createNapAtoms.activeOption)
  const { get, on } = Lib.H.useItems({ onOptionsClick, boardRef })

  return (
    <>
      <Lib.S.ItemsShadowing active={showMoreOptions} />
      <Lib.S.ItemsContainer className={`${!showMoreOptions && 'showLess'}`}>
        <ul>
          {get.items.map(({ icon, title, key }, index) => (
            <li key={index} title={showMoreOptions ? undefined : title} className={`${activeOption === key ? 'active' : ''}`} onClick={() => on.itemClicks(key)}>
              <span>{icon}</span>

              <p>{title}</p>
            </li>
          ))}
        </ul>
      </Lib.S.ItemsContainer>
    </>
  )
}

export const GuidLines: FC = () => {
  return (
    <Lib.S.GuidLines>
      <div className="left">
        <div className="top">
          <span className="profile" />

          <div className="name">
            <span className="username" />
            <span className="job" />
          </div>

          <div className="gap" />

          <span className="action">
            <FaShare size={20} />
          </span>

          <span className="action">
            <FaPause size={20} />
          </span>

          <span className="action">
            <FaEllipsisH size={20} />
          </span>
        </div>

        <div className="gap" />

        <div className="bottom">
          <span className="input">Reply to this nap...</span>
        </div>
      </div>

      <div className="right">
        <span className="timer" />
      </div>
    </Lib.S.GuidLines>
  )
}

export const Tool: FC<Lib.T.ToolProps> = ({ active, disabled, icon, type, onClick, title }) => {
  return (
    <Lib.S.Tool title={title} onClick={() => onClick(type)} className={`${disabled && 'disabled'} ${active && 'active'}`}>
      {icon}
    </Lib.S.Tool>
  )
}

export const Tools: FC<Lib.T.ToolsProps> = ({ selectedOption }) => {
  switch (selectedOption) {
    case 'text': {
      return <ToolsForTextInserter />
    }

    default:
    case 'post': {
      return <ToolsForPostExplorer />
    }
  }
}

export const ToolsForTextInserter: FC = () => {
  const { get, on } = Lib.H.useToolsForTextInserter()
  return (
    <>
      {get.tools.map((tool, index) => (
        <Tool {...tool} onClick={on.toolClick} active={false} disabled={false} key={index} />
      ))}
    </>
  )
}

export const ToolsForPostExplorer: FC = () => {
  return <>post explorer tools</>
}
