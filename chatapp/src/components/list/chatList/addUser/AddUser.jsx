import "./adduser.css";

function AddUser() {
  return (
    <div className="adduser">
      <form>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src="./avatar.png" alt="" />
          <span>Anoop J</span>
        </div>
        <button>Add User</button>
      </div>
    </div>
  );
}

export default AddUser;
