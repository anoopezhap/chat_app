import "./detail.css";
function Detail() {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Anoop</h2>
        <p>Lorem ipsum dolor sit </p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy And Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoitem">
              <div className="photodetail">
                <img src="./avatar.png" lt="" />
                <span>photo_123.png</span>
              </div>
              <img src="download.png" className="icon" alt="" />
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="./avatar.png" lt="" />
                <span>photo_123.png</span>
              </div>
              <img src="download.png" className="icon" alt="" />
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="./avatar.png" lt="" />
                <span>photo_123.png</span>
              </div>
              <img src="download.png" className="icon" alt="" />
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="./avatar.png" lt="" />
                <span>photo_123.png</span>
              </div>
              <img src="download.png" className="icon" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}

export default Detail;
