const container = document.querySelector('.content');
const button = document.getElementById('nobtn');

container.addEventListener('mousemove', function(e) {
    // Get cursor position relative to the container
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    // Get button dimensions
    const buttonRect = button.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;

    // Check if the cursor is near the button (adjust offset as needed)
    const avoidanceOffset = 0; // Distance to start moving away

    if (
        mouseX > button.offsetLeft - avoidanceOffset &&
        mouseX < button.offsetLeft + buttonWidth + avoidanceOffset &&
        mouseY > button.offsetTop - avoidanceOffset &&
        mouseY < button.offsetTop + buttonHeight + avoidanceOffset
    ) {
        // Calculate a new position (simple avoidance logic: move away from cursor)
        const moveX = mouseX > button.offsetLeft ? -15 : 15;
        const moveY = mouseY > button.offsetTop ? -15 : 15;

        let newX = button.offsetLeft + moveX;
        let newY = button.offsetTop + moveY;

        // Constrain movement within parent boundaries
        newX = Math.max(0, Math.min(newX, container.offsetWidth - buttonWidth));
        newY = Math.max(0, Math.min(newY, container.offsetHeight - buttonHeight));

        // Use transform for smooth, performance-friendly movement
        button.style.transform = `translate(${newX}px, ${newY}px)`;
    } else {
        // When not avoiding, just follow the cursor with a slight offset
        // Adjust these offsets to place the button adjacent to the cursor
        const offsetX = 5;
        const offsetY = 5;

        // Ensure the button stays within bounds even when following
        const boundedX = Math.max(0, Math.min(mouseX + offsetX, container.offsetWidth - buttonWidth));
        const boundedY = Math.max(0, Math.min(mouseY + offsetY, container.offsetHeight - buttonHeight));
        
        button.style.transform = `translate(${boundedX}px, ${boundedY}px)`;
    }
});
