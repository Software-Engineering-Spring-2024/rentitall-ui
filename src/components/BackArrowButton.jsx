import {BsArrowLeftCircle} from "react-icons/bs";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const BackArrowButton = (props) => {
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
                <BsArrowLeftCircle
                    color={isHovered ? 'white' : 'black'}
                    size='28'
                    className="transition-colors duration-300"
                />
            </button>

        </div>
    )
}