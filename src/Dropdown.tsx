import { useState } from "react";

type Props = {
  items: string[];
  selectedId: string | null;
  placeholder: string;
  onSelect: (item: string) => void;
};

export function Dropdown(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {props.selectedId === null ? props.placeholder : props.selectedId}{" "}
        {isOpen ? "opened" : "closed"}
      </div>
      {isOpen && (
        <ul>
          {props.items.map((item) => (
            <li key={item} onClick={() => props.onSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
