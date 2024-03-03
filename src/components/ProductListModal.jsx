import React, { useCallback, useRef, useState } from "react";
import { Modal } from "./Modal"
import './../styles/ProductListModal.css'
import { GrClose } from "react-icons/gr";

export const ProductListModal = (props) => {
    const categories = [
        {
            id: 1,
            name: "Electronics"
        },
        {
            id: 2,
            name: "Furniture"
        },
        {
            id: 3,
            name: "Vehicles"
        },
        {
            id: 4,
            name: "Fashion"
        },
        {
            id: 5,
            name: "Others"
        }
    ]
    const [productDetails, setProductDetails] = useState({
        title: "",
        description: "",
        price_per_day: "",
        categoryId: "",
        ownerId: "",
        imageBase64URL: ""
    })
    const imageInputRef = useRef(null);

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
                    ...productDetails, // Spread the current formData
                    imageBase64URL: base64String // Update the value of the specific field
                });
            };

            reader.readAsDataURL(inputFile);
        }
    }

    const removeUploadedImage = () => {
        try {
            setProductDetails({
                ...productDetails, // Spread the current formData
                imageBase64URL: "" // Update the value of the specific field
            });
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitProductListDetails = useCallback((e) => {
        e.preventDefault()
        console.log(productDetails)
    })

    return (
        <React.Fragment>
            <Modal show={props.show} closeModal={props.closeModal} title="Enter your product details to list in Rent It All">
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
                                    name="price_per_day"
                                    type="number"
                                    value={productDetails.price_per_day}
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
                                    productDetails.imageBase64URL.length > 0 && (
                                        <div className="imagesPreview">
                                            <div className="imagePreview">
                                                <img src={productDetails.imageBase64URL} alt="" />
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
        </React.Fragment>
    )
}