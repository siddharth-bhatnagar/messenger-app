import React from 'react';
import { Menu } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 p-4 shadow-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-white text-2xl font-bold">Messenger</h1>
                </div>
                <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center">
                        <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-200 transition-colors duration-200" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            {['Profile', 'Settings', 'Logout'].map((item) => (
                                <Menu.Item key={item}>
                                    {({ active }) => (
                                        <button
                                            className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm transition-colors duration-200`}
                                        >
                                            {item}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Menu>
            </div>
        </nav>
    );
};

export default Navbar;