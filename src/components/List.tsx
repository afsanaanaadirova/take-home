import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";

type CardProps = {
  title: ListItem["title"];
  description: ListItem["description"];
  isDeleted?: boolean;
  onDelete?: () => void;
};

export const Card: FC<CardProps> = ({ title, description, isDeleted, onDelete }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        {/* <ToggleButton
          isActive={visible}
          onToggle={() => setVisible(!visible)}
          active={<ChevronUpIcon />}
          inactive={<ChevronDownIcon/>}
        /> */}
        {!isDeleted && (
          <div className="flex">
            <ExpandButton
              onClick={() => setVisible(!visible)}
              className={`transform transition-transform duration-300 ${visible ? "rotate-180" : "rotate-0"
                }`}
            >
              <ChevronUpIcon />
            </ExpandButton>
            <DeleteButton onClick={onDelete} />
          </div>
        )}
      </div>

      {!isDeleted && (
        <div
          className={`overflow-hidden transition-all duration-500 ${visible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <p className="text-sm">{description}</p>
        </div>
      )}
    </div>
  );
};
