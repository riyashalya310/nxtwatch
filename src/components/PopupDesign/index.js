import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const PopupDesign = props => {
  const {onClickLogout} = props
  return (
    <div className="popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="trigger-button">
            Logout
          </button>
        }
      >
        {close => (
          <>
            <div>
              <p>Are you sure, you want to logout</p>
            </div>
            <button
              type="button"
              className="trigger-button"
              onClick={() => close()}
            >
              Cancel
            </button>
            <button
              type="button"
              className="trigger-button"
              onClick={onClickLogout}
            >
              Confirm
            </button>
          </>
        )}
      </Popup>
    </div>
  )
}

export default PopupDesign
