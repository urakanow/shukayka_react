"use client"
import React, { useState, useRef, useEffect } from "react";
import { useFloating, autoUpdate, offset, shift, useClick, useDismiss, useInteractions, useRole } from "@floating-ui/react";
import styles from './styles.module.css'
import { CldImage } from "next-cloudinary";

interface HamburgerMenuProps {
    items: string[],
    onSelect: (index: number) => void,
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
    items,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const hamburger_initial_image = "icons8-menu_viptxn";
    const hamburger_opened_image = "icons8-close_meabuj";

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

    const handleSelect = (index: number) => {
    onSelect(index);
    setIsOpen(false);
    };

    return (
    <div className={styles.dropdown_container}>
        <button
        ref={refs.setReference}
        className={`${styles.dropdown_button} small-card`}
        {...getReferenceProps()}
        >
    <CldImage src={isOpen ? hamburger_opened_image : hamburger_initial_image} alt="hamburger unselected" height={32} width={32} />
    </button>

        {isOpen && (
        <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={`card ${styles.dropdown_menu} vertical_container`}
            {...getFloatingProps()}
        >
            {items.map((item, index) => (
            <button
                key={index}
                className={styles.dropdown_item}
                {...getItemProps({
                onClick: () => handleSelect(index),
                })}
            >
                {item}
            </button>
            ))}
        </div>
        )}
    </div>
    );
};

          