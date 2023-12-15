import {Component} from 'react'
import './index.css'
import Tabs from '../Tabs'
import Thumbnail from '../Thumbnail'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = props
    this.state = {
      score: 0,
      seconds: 60,
      activeTab: tabsList[0].tabId,
      activeImg: imagesList[0].imageUrl,
      checkImg: true,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.updateValues, 1000)
  }

  updateValues = () => {
    const {seconds} = this.state
    if (seconds === 0) {
      clearInterval(this.timerId)
      this.setState({checkImg: false})
    }
    this.setState(prevState => ({seconds: prevState.seconds - 1}))
  }

  onClickActiveTab = id => {
    this.setState({activeTab: id})
  }

  getfilterThumbnail = () => {
    const {activeTab} = this.state
    const {imagesList} = this.props

    const filterImages = imagesList.filter(each => each.category === activeTab)
    return filterImages
  }

  onCheckThumbnailImg = id => {
    const {imagesList} = this.props
    const {activeImg} = this.state

    const checkImg = imagesList.filter(each => each.id === id)
    const isSameObject = checkImg[0].imageUrl

    const randomImg = Math.ceil(Math.random() * imagesList.length)
    const randomChangeImg = imagesList[randomImg].imageUrl
    this.setState({activeImg: randomChangeImg})

    if (isSameObject === activeImg) {
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({checkImg: false})
    }
  }

  onCLickReset = () => {
    clearInterval(this.timerId)
    this.setState({checkImg: true, score: 0, seconds: 60})
    this.timerId = setInterval(this.updateValues, 1000)
  }

  render() {
    const {score, seconds, activeTab, activeImg, checkImg} = this.state
    const {tabsList} = this.props
    const getFilterThumbnail = this.getfilterThumbnail()

    return (
      <div className="bg-container">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="website-img"
          />
          <ul className="navbar-items">
            <li className="navbar-lists">
              <p className="user-sc">
                Score: <span className="user-score">{score}</span>
              </p>
            </li>
            <li className="navbar-lists">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-img"
              />
              <p className="user-sc user-score">{seconds} sec</p>
            </li>
          </ul>
        </nav>
        <div className="bg-card">
          {checkImg && (
            <div className="match-game-container">
              <img src={activeImg} alt="match" className="match-img" />
              <ul className="tabs-items">
                {tabsList.map(each => (
                  <Tabs
                    eachTab={each}
                    key={each.tabId}
                    isactive={activeTab === each.tabId}
                    onActive={this.onClickActiveTab}
                  />
                ))}
              </ul>
              <ul className="thumbnail-items">
                {getFilterThumbnail.map(each => (
                  <Thumbnail
                    thumbnailDetails={each}
                    key={each.id}
                    onThumbnail={this.onCheckThumbnailImg}
                  />
                ))}
              </ul>
            </div>
          )}
          {!checkImg && (
            <div className="scorecard-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
                className="trophy-img"
              />
              <p className="your-score-desc">YOUR SCORE</p>
              <p className="your-score">{score}</p>
              <button
                type="button"
                className="playagain-btn"
                onClick={this.onCLickReset}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset-img"
                />
                <p className="playagain-text">PLAY AGAIN</p>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
