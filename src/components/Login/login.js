import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const handleLogin = () => {

        if (email === "user1" && password === "password123") {
            const d = new Date();
            d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            const userData = email
            document.cookie = 'userData' + "=" + userData + ";" + expires + ";path=/";
            navigate("/dashboard");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="email@email.com"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>

                        <div className="max-w-sm">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input id="hs-toggle-password"
                                    type={showPass ? "text" : "password"}
                                    className="w-full py-2 ps-4 pe-10 block border border-gray-300 rounded-lg focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="Enter password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <button type="button"
                                    data-hs-toggle-password='{ "target": "#hs-toggle-password"}'
                                    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none "
                                    onClick={() => { setShowPass(!showPass); }}

                                >
                                    {
                                        showPass ?
                                            <svg className="shrink-0 size-4.5" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 18 1 10 4.4 2.24"></path>
                                                <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 91 0 1 12 5c7 0 10 7 10 7a13.16 13.16 10 0 1-1.67 2.68"></path>
                                                <path className="hs-password-active:hidden" d="M9.9 5.21A13.526 10.526 23 0 0 2 12s3 7 10 7a9.74 9.74 12 0 0 8.39-4.5"></path>
                                            </svg>
                                            :
                                            <svg className="shrink-0 size-4.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                                                <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                                                <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                                                <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                                                <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                                            </svg>
                                    }



                                </button>
                            </div>
                        </div>


                        <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors" onClick={handleLogin}>
                            Sign In
                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;