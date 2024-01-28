import "react-widgets/styles.css";
import React, {useState} from 'react';
import {Combobox, DateTimePicker, DropdownList, NumberPicker} from 'react-widgets';
import EstateData from "../Data.json";
import '../App.css';
import {IoFilter} from "react-icons/io5";

export const PropertySearchForm = ({setFilteredEstates}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValues, setInputValues] = useState({
        EstateType: "",
        PriceLower: "",
        PriceUpper: "",
        RoomsLower: "",
        RoomsUpper: "",
        ZipCode: "",
        DateStart: "",
        DateEnd: ""
    });

    const handleInputUpdate = (name, value) => {
        if (name.startsWith('Date')) {
            value = value ? `${value.getMonth() + 1}/${value.getDate()}/${value.getFullYear()}` : '';
        }
        setInputValues({...inputValues, [name]: value});
    };

    const handleQuery = (e) => {
        e.preventDefault();
        const filtered = EstateData.properties.filter(estate => {
            return Object.keys(inputValues).every(key => {
                if (!inputValues[key]) return true;
                switch (key) {
                    case 'EstateType': return compareEstateType(estate.type, inputValues[key]);
                    case 'PriceLower': case 'PriceUpper': return compareValues(estate.price, inputValues[key], key.endsWith('Lower'));
                    case 'RoomsLower': case 'RoomsUpper': return compareValues(estate.bedrooms, inputValues[key], key.endsWith('Lower'));
                    case 'ZipCode': return compareZipCode(estate.location, inputValues[key]);
                    case 'DateStart': case 'DateEnd': return compareDates(estate.added, inputValues[key], key.endsWith('Start'));
                    default: return true;
                }
            });
        });
        setFilteredEstates(filtered);
    };

    const compareEstateType = (estateType, inputType) => {
        return inputType === 'Any' || estateType.toLowerCase() === inputType.toLowerCase();
    };

    const compareValues = (estateValue, inputValue, isLower) => {
        return isLower ? estateValue >= Number(inputValue) : estateValue <= Number(inputValue);
    };

    const compareZipCode = (estateLocation, inputZipCode) => {
        const zipCode = estateLocation.split(',').pop().trim();
        return zipCode.toLowerCase().includes(inputZipCode.toLowerCase());
    };

    const compareDates = (estateAdded, inputDateStr, isStart) => {
        const estateDate = new Date(estateAdded.year, getMonthNumber(estateAdded.month), estateAdded.day);
        const inputDateParts = inputDateStr.split('/');
        const inputDate = new Date(inputDateParts[2], inputDateParts[0] - 1, inputDateParts[1]);
        return isStart ? estateDate >= inputDate : estateDate <= inputDate;
    };

    const getMonthNumber = (monthName) => {
        const monthMap = {
            'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
            'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        return monthMap[monthName] || -1;
    };

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn-dark rounded-3" onClick={handleToggle}>
                    {isExpanded ? 'Hide Advanced Search' : 'Show Advanced Search'} Filter <IoFilter />
                </button>
            </div>
            {isExpanded && (
                <div className="queryForm-container py-5">
                    <form onSubmit={handleQuery} className="queryForm">
                        <div className="row g-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Estate Type</label>
                                    <DropdownList className="form-control" defaultValue="Any" data={["House", "Flat", "Any"]} filter='contains' onChange={value => handleInputUpdate('EstateType', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Lower Price</label>
                                    <NumberPicker className="form-control" format={{style: "currency", currency: "EUR"}} placeholder="Lower Price" onChange={value => handleInputUpdate('PriceLower', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Lower Rooms</label>
                                    <NumberPicker className="form-control" placeholder="Lower Rooms" onChange={value => handleInputUpdate('RoomsLower', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date Start</label>
                                    <DateTimePicker className="form-control" placeholder="mm/dd/yy (Start)" onChange={value => handleInputUpdate('DateStart', value)}/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Zip Code</label>
                                    <Combobox className="form-control" hideCaret hideEmptyPopup placeholder="Zip code" onChange={value => handleInputUpdate('ZipCode', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Upper Price</label>
                                    <NumberPicker className="form-control" format={{style: "currency", currency: "EUR"}} placeholder="Upper Price" onChange={value => handleInputUpdate('PriceUpper', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Upper Rooms</label>
                                    <NumberPicker className="form-control" placeholder="Upper Rooms" onChange={value => handleInputUpdate('RoomsUpper', value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date End</label>
                                    <DateTimePicker className="form-control" placeholder="m/dd/yy (End)" onChange={value => handleInputUpdate('DateEnd', value)}/>
                                </div>
                            </div>
                        </div>
                        <div className="d-grid gap-2">
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-warning w-25 text-center ">Find Estates</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );

};
