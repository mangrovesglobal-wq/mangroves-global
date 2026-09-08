import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', ...defaultTheme.fontFamily.sans],
                serif: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                mangrove: {
                    50: '#f2f6f5',
                    100: '#dde7e4',
                    500: '#3a5951',
                    800: '#22332e',
                    900: '#141f1c',
                    accent: '#d5ad75',
                },
            },
        },
    },

    plugins: [forms],
};
