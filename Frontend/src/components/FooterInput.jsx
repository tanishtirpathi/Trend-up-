import { useChatStore } from "@/store/useChatStore";
import React, { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";

function FooterInput() {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setImageFile(file);
  };

  // Remove selected image
  const removeImage = () => {
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;
    if (!text.trim() && !imageFile) return;
    setIsSending(true);

    const formData = new FormData();
    formData.append("text", text.trim());
    if (imageFile) formData.append("image", imageFile);

    try {
      await sendMessage(formData);
      setText("");
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Send message failed:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-4 border-t border-black/10 bg-white/95  ">
      {/* Image preview */}
      {imageFile && (
        <div className="mb-2 relative w-16 h-16">
          <img
            src={URL.createObjectURL(imageFile)}
            alt="preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-white/10 text-white rounded-full p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          {/* Text input */}
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-black/24 border border-white/10
              text-sm text-black placeholder:text-black/40 font-serif
              focus:outline-none focus:ring-1 focus:ring-gray-400/40"
          />

          {/* Image upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg bg-gray-500 hover:bg-gray-500/10 text-white/70 hover:text-white transition"
          >
            <Image size={20} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={isSending || (!text.trim() && !imageFile)}
            className="p-3 rounded-xl bg-gray-500/20 text-gray-400
              hover:bg-white transition disabled:opacity-40"
          >
            {isSending ? "Sending…" : <Send size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FooterInput;
