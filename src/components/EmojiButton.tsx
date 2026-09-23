import { SmileIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from "./ui/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type EmojiBtnProps = {
  handleEmojiOnClick: (emoji: string) => void;
};

function EmojiButton({ handleEmojiOnClick }: EmojiBtnProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <SmileIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 will-change-transform">
        <EmojiPicker
          className="h-75"
          onEmojiSelect={({ emoji }) => {
            handleEmojiOnClick(emoji);
          }}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}

export default EmojiButton;
