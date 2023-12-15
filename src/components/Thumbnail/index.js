import './index.css'

const Thumbnail = props => {
  const {thumbnailDetails, onThumbnail} = props
  const {id, imageUrl} = thumbnailDetails

  const onClickThumbnail = () => {
    onThumbnail(id)
  }

  return (
    <li className="thumbnail-lists">
      <button
        type="button"
        className="thubmbnail-btn"
        onClick={onClickThumbnail}
      >
        <img src={imageUrl} alt="thumbnail" className="thumbnail-img" />
      </button>
    </li>
  )
}

export default Thumbnail
