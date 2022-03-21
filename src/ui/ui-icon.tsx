import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import './ui-icon.scss';

export default function UiIcon(props: {
    icon: IconDefinition;
    fill?: string;
}) {
    if (!props.icon) {
        console.warn(new Error('UiIcon: icon data is required'));
        return null;
    }

    const [width, height, /* iconname */, /* aliases */ , d] = props.icon.icon;

    const viewBox = `0 0 ${width} ${height}`;
    

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ui-icon"
            fill={props.fill || 'currentColor'}
            height="1"
            viewBox={viewBox}
            width="1">
            {Array.isArray(d) ? (
                d.map((path, i) => <path d={path} key={i} />)
            ) : (
                <path d={d} />
            )}
        </svg>
    );
}
