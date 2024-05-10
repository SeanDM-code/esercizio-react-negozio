import viteLogo from "/vite.svg";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { Disclosure } from "@headlessui/react";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Product List", to: "/product-list/all", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  return (
    <>
      <Disclosure as="nav" className="bg-slate-800">
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Disclosure>

      <Outlet />
    </>
  );
}

export default App;
