import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header({ bottomRef }) {
    const { user } = useContext(UserContext);

    const handleSearchClick = () => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-700 p-4 shadow-lg">
            <Link to={'/'} className="flex items-center gap-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
                <span className='font-bold text-2xl'>Maid Homies</span>
            </Link>
            <div className='flex gap-2 items-center border border-blue-300 rounded-full py-2 px-4 bg-white shadow-md hover:shadow-lg transition-shadow'>
                <div className='bg-blue-500 text-white px-2 py-1 rounded-full'>Anytime</div>
                <div className='border-l border-blue-300 h-6'></div>
                <div className='bg-blue-500 text-white px-2 py-1 rounded-full'>Anywhere</div>
                <div className='border-l border-blue-300 h-6'></div>
                <div className='bg-blue-500 text-white px-2 py-1 rounded-full'>Search Workers Nearby</div>
                <button onClick={handleSearchClick} className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
            <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-blue-300 rounded-full py-2 px-4 bg-white shadow-md hover:shadow-lg transition-shadow'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className='bg-blue-500 text-white rounded-full border border-blue-300 overflow-hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
                {!!user && (
                    <div className="text-blue-500 font-bold">
                        {user.name}
                    </div>
                )}
            </Link>
        </header>
    );
}
