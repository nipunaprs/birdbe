

export const getProducts = async () => {

    try {
        const response = await fetch('https://web-ge8buw2ff-bird-and-be.vercel.app/api/interview');

        const data = await response.json();

        return data;

    } catch (error) {
        console.log(error)
    }


}