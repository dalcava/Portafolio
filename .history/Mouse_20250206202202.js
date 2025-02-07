/* Custom Mouse Interactions Script */
(function () {
    // Create the custom cursor element and add it to the document
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);
  
    // Utility function to update cursor styles (if needed)
    function updateCursorStyles(styles) {
      Object.assign(customCursor.style, styles);
    }
  
    // When the mouse is over an element that normally shows a pointer, add a class to the cursor.
    document.addEventListener("mouseover", (e) => {
      const target = e.target;
      const isPointer = getComputedStyle(target).cursor === "pointer";
      if (isPointer) {
        customCursor.classList.add("pointer");
      } else {
        customCursor.classList.remove("pointer");
      }
    });
  
    // Update the custom cursor on every mouse move
    document.addEventListener("mousemove", (e) => {
      const target = e.target;
      if (!customCursor) return;
  
      // Set the cursor's position to follow the mouse
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
  
      // For elements with a pointer cursor style, center and enlarge the custom cursor
      if (getComputedStyle(target).cursor === "pointer") {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        customCursor.style.transform = `translate(-50%, -50%) scale(3.5)`;
        customCursor.style.left = `${centerX}px`;
        customCursor.style.top = `${centerY}px`;
        customCursor.style.backgroundColor = "#077E69";
        customCursor.style.borderRadius = "24px";
        customCursor.style.transition =
          "transform 0.15s ease-out, background-color 0.3s ease, border-radius 0.3s ease";
        customCursor.style.zIndex = "2";
      }
      // For text elements, change the size, shape, and color of the cursor for a subtle effect
      else if (
        getComputedStyle(target).cursor === "text" ||
        ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6"].includes(target.tagName)
      ) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        customCursor.style.transform = `translate(-50%, -50%)`;
        customCursor.style.width = "4px";
        customCursor.style.height = "58px";
        customCursor.style.backgroundColor = "rgba(7, 126, 105, 0.15)";
        customCursor.style.borderRadius = "8px";
        customCursor.style.transition =
          "transform 0.15s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease";
        customCursor.style.zIndex = "1";
        customCursor.style.border = "1px solid rgba(7, 126, 105, 0.5)";
      }
      // For all other elements, reset to a default small circle cursor
      else {
        customCursor.style.transform = `translate(-50%, -50%) scale(1)`;
        customCursor.style.backgroundColor = "rgba(7, 126, 105, 1)";
        customCursor.style.borderRadius = "50%";
        customCursor.style.width = "16px";
        customCursor.style.height = "16px";
        customCursor.style.zIndex = "1000";
        customCursor.style.transition =
          "transform 0.25s ease-out, width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease, z-index 0.3s ease";
        customCursor.style.border = "1px solid rgba(7, 126, 105, 1)";
      }
    });
  
    // Remove the pointer effect when the mouse leaves an element
    document.addEventListener("mouseout", () => {
      customCursor.classList.remove("pointer");
    });
  })();
  