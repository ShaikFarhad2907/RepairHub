import {
    useEffect,
    useState
} from "react";

import api from "../../api/axiosConfig";

import "./ManageServices.css";


function ManageServices(){


    const [services,setServices] =
        useState([]);



    const [showForm,setShowForm] =
        useState(false);



    const [editId,setEditId] =
        useState(null);



    const [service,setService] =
        useState({

            serviceName:"",
            category:"",
            description:"",
            price:"",
            imageUrl:""

        });





    useEffect(()=>{


        loadServices();


    },[]);







    const loadServices = async()=>{


        try{


            const response =
                await api.get(
                    "/services"
                );


            setServices(
                response.data
            );


        }
        catch(error){


            console.log(error);


            alert(
                "Unable to load services"
            );


        }


    };








    const handleChange=(e)=>{


        setService({

            ...service,

            [e.target.name]:
                e.target.value

        });


    };







    const saveService = async()=>{


        try{


            if(editId){


                await api.put(

                    `/services/${editId}`,

                    service

                );


                alert(
                    "Service updated successfully"
                );


            }


            else{


                await api.post(

                    "/services",

                    service

                );


                alert(
                    "Service added successfully"
                );


            }





            setService({

                serviceName:"",
                category:"",
                description:"",
                price:"",
                imageUrl:""

            });



            setEditId(null);


            setShowForm(false);


            loadServices();



        }
        catch(error){


            console.log(error);


            alert(
                "Operation failed"
            );


        }


    };







    const editService=(item)=>{


        setService({

            serviceName:item.serviceName,

            category:item.category,

            description:item.description,

            price:item.price,

            imageUrl:item.imageUrl


        });


        setEditId(
            item.id
        );


        setShowForm(true);


    };








    const deleteService=async(id)=>{


        const confirmDelete =
            window.confirm(
                "Delete this service?"
            );


        if(!confirmDelete)
            return;



        try{


            await api.delete(

                `/services/${id}`

            );



            alert(
                "Service deleted"
            );


            loadServices();


        }
        catch(error){


            console.log(error);


            alert(
                "Delete failed"
            );


        }


    };









    return(


        <div className="manage-page">


            <h1>
                Manage Services
            </h1>




            <button

                className="add-btn"

                onClick={()=>{

                    setEditId(null);

                    setShowForm(true);

                }}

            >

                + Add New Service

            </button>







            {
                showForm &&


                <div className="service-form">


                    <input

                    name="serviceName"

                    placeholder="Service Name"

                    value={
                        service.serviceName
                    }

                    onChange={handleChange}

                    />



                    <input

                    name="category"

                    placeholder="Category"

                    value={
                        service.category
                    }

                    onChange={handleChange}

                    />



                    <textarea

                    name="description"

                    placeholder="Description"

                    value={
                        service.description
                    }

                    onChange={handleChange}

                    />



                    <input

                    name="price"

                    placeholder="Price"

                    value={
                        service.price
                    }

                    onChange={handleChange}

                    />



                    <input

                    name="imageUrl"

                    placeholder="Image URL"

                    value={
                        service.imageUrl
                    }

                    onChange={handleChange}

                    />




                    <button

                    className="save-btn"

                    onClick={saveService}

                    >

                        {
                            editId
                            ?
                            "Update Service"
                            :
                            "Add Service"
                        }

                    </button>



                </div>

            }









            <table>


                <thead>


                    <tr>

                        <th>ID</th>

                        <th>Service</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Action</th>


                    </tr>


                </thead>





                <tbody>


                {

                    services.map((item)=>(


                        <tr key={item.id}>


                            <td>
                                {item.id}
                            </td>



                            <td>
                                {item.serviceName}
                            </td>



                            <td>
                                {item.category}
                            </td>



                            <td>
                                ₹{item.price}
                            </td>



                            <td>


                                <button

                                onClick={()=>
                                    editService(item)
                                }

                                >

                                    Edit

                                </button>





                                <button

                                onClick={()=>
                                    deleteService(
                                        item.id
                                    )
                                }

                                >

                                    Delete

                                </button>


                            </td>


                        </tr>


                    ))

                }



                </tbody>


            </table>




        </div>


    );


}


export default ManageServices;