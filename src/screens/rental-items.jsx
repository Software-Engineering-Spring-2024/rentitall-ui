import React, { useEffect, useState } from "react"
import ProductPopup from "../components/ProductPopup";
import { PageHeading } from "../components/PageHeading";
import axios from "axios";
import "./../styles/RentalItems.css"
import { ProductCard } from "../components/ProductCard";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

export const RentalItems = (props) => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [openProductPopup, setOpenProductPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleProductPopup = (selectedProduct) => {
        // console.log(selectedProduct);
        setSelectedProduct(selectedProduct);
        setOpenProductPopup(true);
    }

    const getAvailableCategories = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_PRODUCT_SERVICE + "/categories");
            // console.log("getAvailableCategories response", response?.data?.data)
            const availableCategories = response.data.data
            setCategories(availableCategories)

        } catch (error) {
            console.log(error)
        }
    }

    const getProductsList = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_PRODUCT_SERVICE + "/product-list", {
                params: {
                    ...filters
                }
            });
            // console.log("getProductsList response", response?.data?.data)
            const products_list = response.data.data
            // const new_products_list = products_list.map(product => {
            //     if(product.image[0] == '/') {
            //         const image = 'data:image/jpeg;base64,' + product.image
            //         console.log(image)
            //         product.image = image
            //     }
            //     return product
            // })
            setProducts(products_list)
        } catch (error) {
            console.log(error)
            setProducts([])
        }
    }

    // Get Categories and Products when page loads
    useEffect(() => {
        getAvailableCategories();
        getProductsList()
    }, [])

    // Accordion 
    const [expanded, setExpanded] = React.useState('sort-by');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [userSelectedFilters, setUserSelectedFilters] = useState({
        sortBy: 'newest',
        categories: []
    })

    const [filters, setFilters] = useState({
        sortBy: 'newest',
        categories: []
    })

    const handleSortFilterInput = (e) => {
        setUserSelectedFilters({
            ...userSelectedFilters,
            sortBy: e.target.value
        })
    }

    const handleCategoryFilterInput = (value) => {
        console.log('checkbox', value)
        const currentIndex = userSelectedFilters.categories.indexOf(value);
        const newCategories = [...userSelectedFilters.categories]

        if (currentIndex === -1) {
            newCategories.push(value)
        } else {
            newCategories.splice(currentIndex, 1)
        }
        setUserSelectedFilters({
            ...userSelectedFilters,
            categories: newCategories
        })
    }

    // useEffect(() => {
    //     console.log('userSelectedFilters', userSelectedFilters)
    // }, [userSelectedFilters])

    useEffect(() => {
        getProductsList()
    }, [filters])

    const handleApplyFilters = (reset = false) => {
        if (reset) {
            setUserSelectedFilters({
                sortBy: 'newest',
                categories: []
            })
            setFilters({
                sortBy: 'newest',
                categories: []
            })
        } else {
            setFilters({ ...userSelectedFilters })
        }
    }
    return (
        <div id="RentalItemsPage">
            <div className="page-container">
                <section className="mb-8">
                    <PageHeading title="Rentals" />
                </section>
                <section className="products-section">
                    <div className="filters-sidebar">
                        <h2 className="filters-heading">Filters</h2>
                        <div>
                            <FormGroup>
                                <Accordion expanded={expanded === 'sort-by'} onChange={handleChange('sort-by')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="sortBy-content"
                                        id="sortBy-header"
                                    >
                                        Sort By
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <RadioGroup
                                            aria-labelledby="sort-by"
                                            value={userSelectedFilters.sortBy}
                                            name="sort-by"
                                            onChange={handleSortFilterInput}
                                        >
                                            <FormControlLabel value="newest" control={<Radio />} label="Newest" />
                                            <FormControlLabel value="oldest" control={<Radio />} label="Oldest" />
                                        </RadioGroup>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'categories'} onChange={handleChange('categories')}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="categories-content"
                                        id="categories-header"
                                    >
                                        Categories
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {
                                            categories.map(category =>
                                                <FormControlLabel key={category.id} control={<Checkbox checked={userSelectedFilters.categories.includes(category.id)} onChange={() => { handleCategoryFilterInput(category.id) }} value={category.id} />} label={category.name} />
                                            )
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            </FormGroup>
                        </div>
                        <div className="filters-actions">
                            <button onClick={() => { handleApplyFilters(false) }}>
                                Apply
                            </button>
                            <button className="secondary-button" onClick={() => { handleApplyFilters(true) }}>
                                Reset
                            </button>
                        </div>
                    </div>
                    {products.length > 0 ?
                        <div className="products-list">
                            {
                                products.map(product =>
                                    <ProductCard key={product.product_id} product={product} categories={categories} onClick={() => { handleProductPopup(product) }} />
                                )
                            }
                        </div>
                        :
                        <p className="no-products-msg">No Products Available</p>
                    }
                </section>

                {selectedProduct && (
                    <ProductPopup
                        product={selectedProduct}
                        isOpen={openProductPopup}
                        onClose={() => setOpenProductPopup(false)}
                    />
                )}
            </div>
        </div>
    )
}