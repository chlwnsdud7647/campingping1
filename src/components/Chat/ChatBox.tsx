interface ChatBox {
  roomId: number;
  nickname: string;
  lastMsg: string;
}

const ChatBox = ({ roomId, nickname, lastMsg }: ChatBox) => {
  return (
    <div className="w-11/12 border border-Green px-4 py-3 rounded-md flex justify-between items-center">
      <div className="w-9/12">
        <p className="w-full">{nickname}</p>
        <p>{lastMsg}</p>
        <p className="text-description text-Gray">2024. 12. 18 05: 21 pm</p>
      </div>
      <div className="text-Green">1</div>
    </div>
  );
};

export default ChatBox;
