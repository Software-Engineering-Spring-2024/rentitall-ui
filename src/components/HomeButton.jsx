import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaHome} from "react-icons/fa";

export const HomeButton = (props) => {
    const [isHovered,setIsHovered] = useState(false);

    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={() => navigate(props.path)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="inline bg-transparent hover:bg-black transition-colors duration-300 rounded-full"
            >
                <FaHome
                    color={isHovered ? 'white' : 'black'}
                    size='28'
                    className="transition-colors duration-300"
                />
            </button>

        </div>
    )
}