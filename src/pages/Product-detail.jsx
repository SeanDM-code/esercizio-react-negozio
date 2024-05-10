import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://api.restful-api.dev/objects/${id}`)
        // fetch('https://mocki.io/v1/4109a36f-2bad-4e7e-acf9-74388de1ea3b')
            .then((res) => res.json())
            .then((item) => {
                const modifiedData = {
                    ...item,
                    imageSrc: 'https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWxlY3Ryb25pYyUyMHByb2R1Y3RzfGVufDB8fDB8fHww',
                    data: {
                        ...item.data,
                        price: (item.data && (item.data.price || item.data.Price)) ? item.data.price : '100.00 $',
                        Description: (item.data && item.data.Description) ? item.data.Description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    }
                };

                setProduct(modifiedData);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const editedData = {};
        formData.forEach((value, key) => {
            editedData[key] = value;
        });
        setProduct(prevProduct => ({
            ...prevProduct,
            data: {
                ...prevProduct.data,
                ...editedData
            }
        }));
        setIsEditing(false);
    };

    if (!product) {
        return <p>Loading...</p>;
    }

    const dynamicFeatures = [];
    for (const key in product.data) {
        dynamicFeatures.push({ name: key, description: product.data[key] });
    }

    return (
        <>
            <div className="bg-white p-2">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 last:gap-y-1 gap-y-16 px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h2>
                        <p className="mt-4 text-gray-500">
                            {product.description ? product.description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
                        </p>

                        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                            {dynamicFeatures.map((feature, index) => (
                                <div key={index} className="border-t border-gray-200 pt-4">
                                    <dt className="font-medium text-gray-900">{feature.name.charAt(0).toUpperCase() + feature.name.slice(1)}</dt>
                                    <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>

                    </div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                            className="rounded-lg bg-gray-100"
                        />
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                            alt="Top down view of walnut card tray with embedded magnets and card groove."
                            className="rounded-lg bg-gray-100"
                        />
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                            alt="Side of walnut card tray with card groove and recessed card area."
                            className="rounded-lg bg-gray-100"
                        />
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                            alt="Walnut card tray filled with cards and card angled in dedicated groove."
                            className="rounded-lg bg-gray-100"
                        />
                    </div>
                    <div>
                    <button onClick={handleEditClick} className=" bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                            Edit Product
                        </button>
                    </div>
                </div>
            {isEditing && (
                <form onSubmit={handleSubmit} className="my-2 w-fit rounded border-2 border-indigo-500 p-4 mx-auto lg:mx-48 bg-slate-100">
                    {dynamicFeatures.map((feature, index)=>(
                        <div className="flex-column p-1 justify-start rounded " key={index}>
                            <label className="flex justify-center text-indigo-500" htmlFor={feature.name}>{feature.name}</label>
                            <input className="bg-slate-300 text-fuchsia-950" type="text" name={feature.name} defaultValue={feature.description} />
                        </div>
                    ))}
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                        Save Changes
                    </button>
                </form>
            )}
            </div>
        </>
    );
}

export default ProductDetail;
