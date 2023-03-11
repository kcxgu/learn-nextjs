import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
    IoNotificationsOutline,
} from "react-icons/io5";

type IconsProps = {};

const Icons: React.FC<IconsProps> = () => {
    return (
        <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-2 pr-1">
                <BsArrowUpRightCircle style={{ fontSize: "18px" }} className="hover:opacity-80 cursor-pointer" />
                <BsChatDots style={{ fontSize: "18px" }} />
                <IoNotificationsOutline style={{ fontSize: "20px" }} />
                <GrAdd style={{ fontSize: "20px" }} />
            </div>
        </div>
    );
};
export default Icons;