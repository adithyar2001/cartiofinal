
export const createOrder = (userId, token, orderData) => {
    const formData = new FormData();
    for (const name in orderData) {
        formData.append(name, orderData[name]);
    }
    return fetch(`http://127.0.0.1:8000/api/order/add/${userId}/${token}/`, {
        method: 'POST',
        body: formData
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    })
    .catch((error) => {
        console.error('Error creating order:', error);
        throw error;
    });
};
