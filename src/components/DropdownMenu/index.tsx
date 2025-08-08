"use client"
import React, { useState, useRef, useEffect } from "react";
import { useFloating, autoUpdate, offset, shift, useClick, useDismiss, useInteractions, useRole } from "@floating-ui/react";
import styles from './styles.module.css'

interface DropdownMenuProps {
  items: string[],
  onSelect: (index: number) => void,
  initialText: string,
  selectedIndex?: number
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  onSelect,
  initialText = "",
  selectedIndex
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(4), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  useEffect(() => {
    if(selectedIndex !== undefined){
      setActiveIndex(selectedIndex);
    }
  }, [selectedIndex])

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    onSelect(index);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown_container}>
      <button
        ref={refs.setReference}
        className={`${styles.dropdown_button} ${styles.dropdown_item} ${activeIndex === null ? styles.dropdown_item_unselected : ""}`}
        {...getReferenceProps()}
      >
        {activeIndex !== null ? items[activeIndex] : initialText}
      </button>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={`${styles.dropdown_menu} vertical_container`}
          {...getFloatingProps()}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className={`${styles.dropdown_item} ${
                index === activeIndex ? styles.dropdown_item_selected : ""
              }`}
              {...getItemProps({
                onClick: () => handleSelect(index),
              })}
              disabled={ index === activeIndex ? true : undefined}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

          