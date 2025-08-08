// components/templates/HeroDark.jsx
export const HeroDark = ({ data }) => {
    return (
        <div className="bg-gray-900 text-white min-h-screen p-10">
            <h1 className="text-5xl font-bold">{data.name}</h1>
            <h2 className="text-xl text-gray-400">{data.location.city}, {data.location.country}</h2>
            <p className="mt-6 max-w-xl">{data.bio}</p>
        </div>
    );
};
