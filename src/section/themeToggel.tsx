'use client'

import React from "react";
import { FaMoon } from "react-icons/fa"
import { BsSunFill } from "react-icons/bs"
import { useTheme } from '../app/context/themeContext';

export const ThemeToggle = () => {
    const { darkMode, toggleDarkMode } = useTheme();

    return (
        <div 
            className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-teal-500 cursor-pointer rounded-full p-1 mx-16" 
            onClick={toggleDarkMode}
        >
            <FaMoon className="text-white" size={18} />
            <div 
                className="absolute bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300" 
                style={darkMode ? {left: "2px"} : {right: "2px"}}
            />
            <BsSunFill className="ml-auto text-yellow-400" size={18} />
        </div>
    )
}