import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function CurrencyFormatter({ value }) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  return <span>{formattedValue}</span>;
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const { categoryParam } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredProducts =
    categoryParam == "all"
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          selectedCategory &&
          selectedCategory == "all"
            ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
            : product.category == selectedCategory &&
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          selectedCategory !== "all"
            ? product.category == selectedCategory
            : product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
              product.category == categoryParam
        );

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    console.log(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortProducts = (products) => {
    if (sortOrder === "asc") {
      return products.slice().sort((a, b) => a.data.price - b.data.price);
    } else {
      return products.slice().sort((a, b) => b.data.price - a.data.price);
    }
  };

  useEffect(() => {
    fetch("https://mocki.io/v1/e383bff8-3cf7-4141-8e75-e2b9547d9f25")
      .then((res) => res.json())
      .then((product) => {
        const modifiedData = product.map((item) => {
          const categoryMapping = {
            ipad: "tablets",
            watch: "smartwatches",
            iphone: "smartphones",
            pixel: "smartphones",
            galaxy: "smartphones",
            air: "earphones",
            beats: "earphones",
            book: "laptops",
          };

          const findCategory = (itemName) => {
            for (const keyword in categoryMapping) {
              if (itemName.toLowerCase().includes(keyword)) {
                return categoryMapping[keyword];
              }
            }
            return "Other";
          };

          const category = findCategory(item.name);

          return {
            ...item,
            category: category,
            imageSrc:
              "https://images.unsplash.com/photo-1549921296-3b0f9a35af35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWxlY3Ryb25pYyUyMHByb2R1Y3RzfGVufDB8fDB8fHww",
            data: {
              ...item.data,
              price:
                item.data && (item.data.price || item.data.Price)
                  ? item.data.price || item.data.Price
                  : 100,
              Description:
                item.data && item.data.Description
                  ? item.data.Description
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
          };
        });

        setProducts(modifiedData);
        console.log(modifiedData);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Our Products</h2>
        <div className="flex justify-center w-auto">
          <label
            htmlFor="search"
            className="block text-sm font-medium leading-6 text-gray-900"
          ></label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm"></span>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="bg-white block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
          </div>

          <div className="relative mt-2 ml-4 rounded-md shadow-sm">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="bg-white block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="all">All Categories</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="earphones">Earphones</option>
              <option value="smartwatches">Smartwatches</option>
              <option value="tablets">Tablets</option>
            </select>
          </div>
          <div className="relative mt-2 ml-4 rounded-md shadow-sm flex gap-4">
            <button
              className="bg-white block w-auto rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onClick={() => handleSortChange("asc")}
            >
              Sort Price: Lowest to Highest
            </button>
            <button
              className="bg-white block w-auto rounded-md border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onClick={() => handleSortChange("desc")}
            >
              Sort Price: Highest to Lowest
            </button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {sortProducts(filteredProducts).map((product) => (
            <Link key={product.id} to={`/product-detail/${product.id}`}>
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-indigo-600">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    <CurrencyFormatter
                      value={
                        product.data.price
                          ? product.data.price
                          : product.data.Price
                      }
                    />
                  </p>
                </div>
                <p className="text-sm font-small text-gray-900 italic">
                  {product.data.Description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
