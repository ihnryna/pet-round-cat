export function ProgressBar({ value, max, iconFull, iconEmpty }) {
    const items = [];

    for (let i = 0; i < max; i++) {
        items.push(
            <img key={i}
                src={i < value ? iconFull : iconEmpty}
                className="bar-icon pixel"
                alt="bar" />
        );
    }

    return (
        <div className="progress-bar">
            {items}
        </div>
    );
}