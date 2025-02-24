import { FC } from "react";

interface StatusIndicatorProps {
    progress?: number;
}

const StatusIndicator:FC<StatusIndicatorProps> = ({ progress = 50 }) => {
    return <div className="statusIndicator">
        <span style={{width: `${progress}%`}} className="statusIndicator__progress" />
    </div>
}

export default StatusIndicator;