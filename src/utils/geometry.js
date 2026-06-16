export function isPointInsideRect(point, rect) {
    return (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
    );
}

export function getFoodCenter(foodPos, sceneRect, foodRect) {
    return {
        x: foodPos.x + sceneRect.left + foodRect.width / 2,
        y: foodPos.y + sceneRect.top + foodRect.height / 2
    };
}