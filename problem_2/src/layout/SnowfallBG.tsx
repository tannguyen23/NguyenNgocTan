import React from "react";
import Snowfall from "react-snowfall";

interface SnowfallBGProps {
  snowColor?: string;
  snowflakeCount?: number;
}

const SnowfallBG: React.FC<SnowfallBGProps> = ({ snowColor = "#ffffff", snowflakeCount = 50 }) => {
  return (
    <Snowfall
      color={snowColor} 
      radius={[0.5, 1.2]} 
      snowflakeCount={snowflakeCount}
    />
  );
};

export default SnowfallBG;
