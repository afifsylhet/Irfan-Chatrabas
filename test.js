import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorderDetails, updateBorderData } from "../../features/slice/BordersSlice"; // Assuming you have the updateBorderData action
import { useParams } from "react-router-dom";

const EditBorder = () => {
    const { edit } = useParams();
    const dispatch = useDispatch();
    const { border } = useSelector((state) => state.border);
  
    const [formData, setFormData] = useState(border);

    useEffect(() => {
        dispatch(fetchBorderDetails(edit));
    }, [dispatch, edit]);

    useEffect(() => {
        setFormData(border);
    }, [border]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch an action to update the border data
        dispatch(updateBorderData(formData));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <br/>
            <h2 className="text-success text-center"> Edit Border Details</h2>
            <br/>
            <div 
                className="container p-4 border border-success"
                style={{width:"100%", maxWidth:"650px"}}
            >
                <Form onSubmit={handleSubmit}>
                    {/* ... other form groups */}
                    
                    <Button variant="success" type="submit" className="w-100">
                        Submit
                    </Button>
                </Form>
            </div>
            <br/>
        </>
    );
};

export default EditBorder;
