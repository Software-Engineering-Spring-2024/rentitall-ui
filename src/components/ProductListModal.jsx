import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "./Modal"
import './../styles/ProductListModal.css'
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useUser } from '../hooks/UserContext';
import { useNavigate } from "react-router-dom";

export const ProductListModal = (props) => {
    // const categories = [
    //     {
    //         id: 1,
    //         name: "Electronics"
    //     },
    //     {
    //         id: 2,
    //         name: "Furniture"
    //     },
    //     {
    //         id: 3,
    //         name: "Vehicles"
    //     },
    //     {
    //         id: 4,
    //         name: "Fashion"
    //     },
    //     {
    //         id: 5,
    //         name: "Others"
    //     }
    // ]
    const [categories, setCategories] = useState([])
    const [productDetails, setProductDetails] = useState({
        title: "",
        description: "",
        pricePerDay: "",
        categoryId: "",
        ownerId: "",
        imgBase64: ""
    })
    const imageInputRef = useRef(null);
    const { user, loginData } = useUser();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure the name and value from the event target
        setProductDetails({
            ...productDetails, // Spread the current formData
            [name]: value // Update the value of the specific field
        });
        console.log(productDetails);
    };

    const handleFileUpload = (e) => {
        const inputFile = e.target.files[0]
        console.log(inputFile)
        if (inputFile) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                setProductDetails({
                    ...productDetails,
                    imgBase64: base64String
                });
            };

            reader.readAsDataURL(inputFile);
        }
    }

    const removeUploadedImage = () => {
        try {
            setProductDetails({
                ...productDetails, // Spread the current formData
                imgBase64: "" // Update the value of the specific field
            });
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitProductListDetails = useCallback(async (e) => {
        e.preventDefault()
        console.log('product details to be submitted', productDetails)
        const response = await axios.post(process.env.REACT_APP_PRODUCT_SERVICE + "/add-product", productDetails,
            {
                headers:
                {
                    "Content-Type": "application/json"
                }
            });
        console.log(response)
        if(response.status == 200) {
            handleModalClose()
        }
    })

    const handleModalClose = useCallback(() => {
        setProductDetails({
            title: "",
            description: "",
            pricePerDay: "",
            categoryId: "",
            ownerId: user?.user_id || "",
            imgBase64: ""
        })
        props.closeModal()
    })

    // Update owner id with logged in user's id
    useEffect(() => {
        console.log(user)
        if (user?.user_id) {
            setProductDetails({
                ...productDetails,
                ownerId: user.user_id
            });
        }
    }, [user])

    // Get all available categories 
    useEffect(() => {
        const getAvailableCategories = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_PRODUCT_SERVICE + "/categories");
                console.log("getAvailableCategories response", response?.data?.data)
                const availableCategories = response.data.data
                setCategories(availableCategories)

            } catch (error) {
                console.log(error)
            }
        }
        getAvailableCategories();
    }, [])

    const goToLoginPage = useCallback(() => {
        navigate('/login')
        handleModalClose()
    })

    return (
        <React.Fragment>
            {
                loginData.isLoggedIn ? (
                    <Modal show={props.show} closeModal={handleModalClose} title="Enter your product details to list in Rent It All">
                        <div className="product-listing-details-form">
                            <form className="" onSubmit={handleSubmitProductListDetails}>
                                <div className="field-wrapper">
                                    <label htmlFor="title" className="">
                                        Product Title
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={productDetails.title}
                                            placeholder="Enter your Product's Name"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="field-wrapper">
                                    <label htmlFor="description" className="">
                                        Product Description
                                    </label>
                                    <div className="input-wrapper">
                                        <textarea
                                            id="description"
                                            name="description"
                                            type="text"
                                            value={productDetails.description}
                                            placeholder="Enter your Product's description"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="field-wrapper">
                                    <label htmlFor="price" className="">
                                        Price
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            id="price"
                                            name="pricePerDay"
                                            type="number"
                                            value={productDetails.pricePerDay}
                                            placeholder="Enter your product price per day"
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="field-wrapper">
                                    <label htmlFor="categoryId" className="">
                                        Category
                                    </label>
                                    <div className="input-wrapper">
                                        <select name="categoryId" value={productDetails.categoryId} onChange={handleChange}>
                                            <option value="" disabled>Please select the category</option>
                                            {
                                                categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="field-wrapper">
                                    <label htmlFor="product_image" className="">
                                        Upload image
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            id="product_image"
                                            name="image"
                                            type="file"
                                            accept=".jpg, .jpeg, .png"
                                            required
                                            ref={imageInputRef}
                                            onChange={handleFileUpload}
                                        />
                                        {
                                            productDetails.imgBase64.length > 0 && (
                                                <div className="imagesPreview">
                                                    <div className="imagePreview">
                                                        <img src={productDetails.imgBase64} alt="" />
                                                        <span className="remove-image" onClick={removeUploadedImage}><GrClose size="8" /></span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="list-item-button"
                                    >
                                        List item
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                ) : (
                    <Modal show={props.show} closeModal={handleModalClose} title="Sign in to list an item">
                        <div className="sign-in-section">
                            <button onClick={goToLoginPage}>
                                Sign In
                            </button>
                        </div>
                    </Modal>
                )
            }

        </React.Fragment>
    )
}