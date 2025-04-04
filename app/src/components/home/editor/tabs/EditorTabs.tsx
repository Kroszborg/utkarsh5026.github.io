import React, { useEffect, useMemo, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa";
import { useOutline } from "../outline/context/outlineContext";
import { useEditorContext, type SectionType } from "../context/explorerContext";
import styles from "./TabAnimations.module.css";
import { useTabDrag } from "./useTabDrag";

interface EditorTabsProps {
  sections: Record<SectionType, ReactNode>;
}

/**
 * EditorTabs component renders a set of tabs for the editor section.
 * It handles tab dragging, reordering, and selection.
 *
 * @param {Object} props - The component props.
 * @param {Record<SectionType, ReactNode>} props.sections - A record of section types to their corresponding React nodes.
 */
const EditorTabs: React.FC<EditorTabsProps> = ({ sections }) => {
  const { setCurrentSection } = useOutline();
  const { activeSection, setActiveSection } = useEditorContext();

  /**
   * Extracts section keys from the sections object.
   *
   * @returns {SectionType[]} - An array of section types.
   */
  const sectionKeys = useMemo(
    () => Object.keys(sections) as SectionType[],
    [sections]
  );

  /**
   * Initializes the useTabDrag hook with section keys.
   *
   * @returns {Object} - An object containing state and handlers for tab drag functionality.
   */
  const {
    draggedTab,
    dragOverTab,
    dragDirection,
    recentlyMovedTab,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    tabOrder,
    tabRefs,
  } = useTabDrag(sectionKeys);

  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Updates the current section in the outline context when the active section changes.
   */
  useEffect(
    () => setCurrentSection(activeSection),
    [activeSection, setCurrentSection]
  );

  /**
   * Generates classes for a tab based on its state.
   *
   * @param {SectionType} tab - The section type of the tab.
   * @returns {string} - A string of classes for the tab.
   */
  const getTabClasses = (tab: SectionType) => {
    const baseClasses = cn(
      styles.editorTab,
      "h-full px-4 whitespace-nowrap border-r border-ctp-surface2 hover:bg-ctp-surface1 text-sm flex items-center gap-2 relative"
    );

    const stateClasses = cn({
      [styles.active]: activeSection === tab,
      [styles.tabDragging]: draggedTab === tab,
      [styles.tabDragOver]: dragOverTab === tab,
      [styles.tabMoved]: recentlyMovedTab === tab,
      [styles.tabInsertLeft]: dragOverTab === tab && dragDirection === "left",
      [styles.tabInsertRight]: dragOverTab === tab && dragDirection === "right",
    });

    return cn(baseClasses, stateClasses);
  };

  return (
    <div
      className={cn(
        styles.tabsContainer,
        "bg-ctp-surface0 border-b border-ctp-surface2 font-roboto-mono sticky top-0 z-30 overflow-x-auto scrollbar-hide md:h-9"
      )}
      ref={containerRef}
    >
      <div className="flex items-center h-full">
        {tabOrder.map((id) => (
          <button
            key={id}
            ref={(el) => (tabRefs.current[id] = el)}
            className={getTabClasses(id)}
            onClick={() => {
              setActiveSection(id);
            }}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, id)}
            onDragOver={(e) => handleDragOver(e, id)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, id)}
            onDragEnter={(e) => {
              e.preventDefault();
            }}
          >
            <FaCode
              className={cn("w-3 h-3", {
                "text-ctp-red": id === "home",
                "text-ctp-green": id === "projects",
                "text-ctp-yellow": id === "skills",
                "text-ctp-blue": id === "about",
                "text-ctp-mauve": id === "experience",
                "text-ctp-pink": id === "contact",
                "text-ctp-teal": id === "articles",
                "text-ctp-sapphire": id === "learning",
              })}
            />
            {id}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              ×
            </span>
          </button>
        ))}

        <div className="flex-1 border-b border-ctp-base"></div>
      </div>
    </div>
  );
};

export default EditorTabs;
