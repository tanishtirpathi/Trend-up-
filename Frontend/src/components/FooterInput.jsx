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
 <div className="p-3 sm:p-4 border-t border-black/10 bg-white/95 backdrop-blur-md">

  {/* Image Preview */}
  {imageFile && (
    <div className="mb-3 relative w-20 h-20 sm:w-16 sm:h-16">
      <img
        src={URL.createObjectURL(imageFile)}
        alt="preview"
        className="w-full h-full object-cover rounded-lg"
      />
      <button
        type="button"
        onClick={removeImage}
        className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1.5 shadow"
      >
        <X size={14} />
      </button>
    </div>
  )}

  <form onSubmit={handleSubmit}>
    <div className="flex items-center gap-2 sm:gap-3">

      {/* Text Input */}
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-black/10 border border-black/10
          text-sm sm:text-base text-black placeholder:text-black/40 font-serif
          focus:outline-none focus:ring-2 focus:ring-gray-400/40"
      />

      {/* Image Upload */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2.5 sm:p-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-black transition"
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

      {/* Send Button */}
      <button
        type="submit"
        disabled={isSending || (!text.trim() && !imageFile)}
        className="px-4 py-2.5 sm:py-3 rounded-xl bg-blue-600 text-white
          hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isSending ? (
          <span className="text-sm">Sending…</span>
        ) : (
          <Send size={18} />
        )}
      </button>

    </div>
  </form>
</div>
  );
}

export default FooterInput;
