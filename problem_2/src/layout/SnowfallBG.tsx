import React from "react";
import Snowfall from "react-snowfall";

interface SnowfallBGProps {
  snowColor?: string;
  snowflakeCount?: number;
}

const SnowfallBG: React.FC<SnowfallBGProps> = ({ snowColor = "#ffffff", snowflakeCount = 50 }) => {
  return (
    <Snowfall
      color={snowColor} // Màu sắc của tuyết
      radius={[0.5, 1.2]} // Kích thước của hạt tuyết (từ 0.5px đến 1.2px)
      snowflakeCount={snowflakeCount} // Số lượng hạt tuyết
    />
  );
};

export default SnowfallBG;
