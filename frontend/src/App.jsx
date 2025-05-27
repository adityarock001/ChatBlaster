import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function App() {
  const [messages, setMessages] = useState("");
  const [count, setCount] = useState("");
  const [delay, setDelay] = useState("");
  const [output, setOutput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setMessages((prev) => prev + emojiData.emoji);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const messageList = messages.split(",").map((msg) => msg.trim());
    const payload = {
      messages: messageList,
      count: parseInt(count),
      delay: parseFloat(delay),
    };

    try {
      const response = await fetch("http://127.0.0.1:5050/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setOutput(
        `<strong>${result.status}</strong><br/>Click on WhatsApp chat in 5 seconds!`
      );

      // Clear form fields
      setMessages("");
      setCount("");
      setDelay("");

      // Clear output after 5 seconds
      setTimeout(() => setOutput(""), 5000);
    } catch (err) {
      console.error(err);
      setOutput("Something went wrong!");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <header className="text-center pb-10 pt-6">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-indigo-600">
            ChatBlaster💥
          </h1>
          <p className="text-gray-500 mt-2">
            Blast fun messages to your friends like never before!
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Messages input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Messages (comma-separated)
            </label>
            <textarea
              rows="3"
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Hello, What's up?, 😂😂😂"
              required
            ></textarea>

            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="bg-gray-100 text-xs font-medium p-2 rounded hover:bg-gray-200"
            >
              {showEmojiPicker ? "Close" : "Pick Emoji"}
            </button>
          </div>

          {showEmojiPicker && (
            <div className="mt-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}

          {/* Count input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Count
            </label>
            <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 10"
              required
            />
          </div>

          {/* Delay input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delay (seconds)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 1.5"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Start Spamming (for fun!)
          </button>
        </form>

        {/* Output */}
        {output && (
          <div
            className="mt-4 text-sm text-gray-600"
            dangerouslySetInnerHTML={{ __html: output }}
          ></div>
        )}
      </div>
    </div>
  );
}

export default App;
