import { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../lib/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

function Chat() {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState();
  const [img, setImage] = useState({
    file: null,
    url: "",
  });

  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  function handleImage(e) {
    if (e.target.files[0]) {
      setImage({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  function handleEmoji(e) {
    setText((prev) => prev + e.emoji);
    setOpenEmojiPicker(false);
  }

  async function handleSend() {
    if (text === "") return;

    let imgUrl = null;

    if (img.file) {
      imgUrl = await upload(img.file);
    }

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          // ...Chat(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatstRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatstRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatindex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatindex].lastMessage = text;
          userChatsData.chats[chatindex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatindex].updatedAt = Date.now();

          await updateDoc(userChatstRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    setImage({
      file: null,
      url: "",
    });

    setText("");
  }

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} />
          <div className="texts">
            <span>{user?.username}</span>
          </div>
        </div>
      </div>
      <div className="center">
        {/* <div className="message">
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
        </div> */}

        {chat?.messages?.map((message) => (
          <div
            className={
              message?.senderId === currentUser?.id ? "message own" : "message"
            }
            key={message?.createdAt}
          >
            <div className="texts">
              {message?.img && <img src="./avatar.png" alt="" />}
              <p>{message?.text}</p>
              {/* {<span>{message?.createdAt}</span>} */}
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} />
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          {/* <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" /> */}
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
        <button className="sendbutton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
