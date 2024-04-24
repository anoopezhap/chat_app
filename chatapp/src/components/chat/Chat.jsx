import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

function Chat() {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", "ZfigupBAy4O9RfhOdPCK"),
      (res) => {
        setChat(res.data());
      }
    );
    return () => {
      unSub();
    };
  }, []);

  console.log("chats", chat);

  function handleEmoji(e) {
    setText((prev) => prev + e.emoji);
    setOpenEmojiPicker(false);
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png"></img>
          <img src="./video.png"></img>
          <img src="./info.png"></img>
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <img src="./avatar.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              cupiditate praesentium similique magni amet obcaecati numquam fuga
              quae quam in eaque minus a, quis ipsum quibusdam laboriosam
              accusantium, facilis ratione?
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type your message"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpenEmojiPicker((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={openEmojiPicker} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendbutton">Send</button>
      </div>
    </div>
  );
}

export default Chat;
