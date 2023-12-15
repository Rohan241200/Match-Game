import './index.css'

const Tabs = props => {
  const {eachTab, onActive, isactive} = props
  const {tabId, displayText} = eachTab

  const isActiveTab = isactive ? 'active-tab' : 'inactive-tab'

  const onCLickTab = () => {
    onActive(tabId)
  }

  return (
    <li className="tabs-list">
      <button
        type="button"
        className={`tabs-btn ${isActiveTab}`}
        onClick={onCLickTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tabs
