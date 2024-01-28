import "react-widgets/styles.css";
import React, {useState} from 'react';
import {Combobox, DateTimePicker, DropdownList, NumberPicker} from 'react-widgets';
import PropertyData from "../propertyData.json";
import {VscListSelection} from "react-icons/vsc";

export const SearchForm = ({setFilteredProperties}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [values, setValues] = useState({
        Type: "",
        PriceMin: "",
        PriceMax: "",
        BedroomsMin: "",
        BedroomsMax: "",
        PostCode: "",
        DateAfter: "",
        DateBefore: ""
    });

    const handleInputChange = (name, value) => {
        if (name.startsWith('Date')) {
            value = value ? `${value.getMonth() + 1}/${value.getDate()}/${value.getFullYear()}` : '';
        }
        setValues({...values, [name]: value});
    };

    const handleSearch = (e) => {
        e.preventDefault();

        const filtered = PropertyData.properties.filter(property => {
            return Object.keys(values).every(key => {
                if (!values[key]) return true;

                switch (key) {
                    case 'Type':
                        return compareType(property.type, values[key]);
                    case 'PriceMin':
                    case 'PriceMax':
                        return compareNumbers(property.price, values[key], key.endsWith('Min'));
                    case 'BedroomsMin':
                    case 'BedroomsMax':
                        return compareNumbers(property.bedrooms, values[key], key.endsWith('Min'));
                    case 'PostCode':
                        return comparePostCode(property.location, values[key]);
                    case 'DateAfter':
                    case 'DateBefore':
                        return compareDates(property.added, values[key], key.endsWith('After'));
                    default:
                        return true;
                }
            });
        });

        setFilteredProperties(filtered);
    };

    const compareType = (propertyType, inputType) => {
        return inputType === 'Any' || propertyType.toLowerCase() === inputType.toLowerCase();
    };

    const compareNumbers = (propertyValue, inputValue, isMin) => {
        return isMin ? propertyValue >= Number(inputValue) : propertyValue <= Number(inputValue);
    };

    const comparePostCode = (propertyLocation, inputPostCode) => {
        const postcode = propertyLocation.split(',').pop().trim();
        return postcode.toLowerCase().includes(inputPostCode.toLowerCase());
    };

    const compareDates = (propertyAdded, inputDateStr, isAfter) => {
        const propertyDate = new Date(propertyAdded.year, getMonthNumber(propertyAdded.month), propertyAdded.day);
        const inputDateParts = inputDateStr.split('/');
        const inputDate = new Date(inputDateParts[2], inputDateParts[0] - 1, inputDateParts[1]);
        return isAfter ? propertyDate >= inputDate : propertyDate <= inputDate;
    };

    const getMonthNumber = (monthName) => {
        const monthMap = {
            'January': 0,
            'February': 1,
            'March': 2,
            'April': 3,
            'May': 4,
            'June': 5,
            'July': 6,
            'August': 7,
            'September': 8,
            'October': 9,
            'November': 10,
            'December': 11
        };
        return monthMap[monthName] || -1;
    };

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="container">
            <button className="btn filter-btn" onClick={handleToggle}>
                {isVisible ? 'Hide' : 'Show'} Filter <VscListSelection />
            </button>
            {isVisible && (
                <div className="searchForm-container py-5">
                    <form onSubmit={handleSearch} className="searchForm">
                        <h2 className="text-center searchTitle">Property Search</h2>
                        <div className="row g-3">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Property Type</label>
                                    <DropdownList className="form-control" defaultValue="Any" data={["House", "Flat", "Bunglows", "Commercial Property", "Any"]} filter='contains' onChange={value => handleInputChange('Type', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Minimum Price</label>
                                    <NumberPicker className="form-control" format={{style: "currency", currency: "EUR"}} placeholder="Min Price" onChange={value => handleInputChange('PriceMin', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Minimum Bedrooms</label>
                                    <NumberPicker className="form-control" placeholder="Min Bedrooms" onChange={value => handleInputChange('BedroomsMin', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date Added After</label>
                                    <DateTimePicker className="form-control" placeholder="mm/dd/yy (After)" onChange={value => handleInputChange('DateAfter', value)}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Post Code</label>
                                    <Combobox className="form-control" hideCaret hideEmptyPopup placeholder="Post code" onChange={value => handleInputChange('PostCode', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Maximum Price</label>
                                    <NumberPicker className="form-control" format={{style: "currency", currency: "EUR"}} placeholder="Max Price" onChange={value => handleInputChange('PriceMax', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Maximum Bedrooms</label>
                                    <NumberPicker className="form-control" placeholder="Max Bedrooms" onChange={value => handleInputChange('BedroomsMax', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date Added Before</label>
                                    <DateTimePicker className="form-control" placeholder="m/dd/yy (Before)" onChange={value => handleInputChange('DateBefore', value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="d-grid gap-2">
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary w-25 text-center ">Find Properties</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );

};