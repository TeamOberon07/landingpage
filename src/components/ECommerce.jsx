import { useState, useEffect } from 'react';

export function ECommerce() {
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [buyerAddress, setBuyerAddress] = useState('');
    const [sellerAddress, setSellerAddress] = useState('');
    const [status, setStatus] = useState('');

    //just to redirect to an existing order initially
    useEffect( () => {
        
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {id: id, price: price, buyerAddress: buyerAddress, sellerAddress: sellerAddress};
        fetch('http://localhost:8000/orders', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then((res) => {
            if(!res.ok) {
                setStatus('Post request failed: ' + res.statusText);
            }
            else {
                window.location = 'http://localhost:3000/?order=' + id;
            }
        });
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='id'>ID</label>
                <input type='text' name='id' value={id} onChange={ (e) => setId(e.target.value) } />

                <label htmlFor='price'>Price</label>
                <input type='text' name='price' value={price} onChange={ (e) => setPrice(e.target.value) } />

                <label htmlFor='buyerAddress'>Buyer Address</label>
                <input type='text' name='buyerAddress' value={buyerAddress} onChange={ (e) => setBuyerAddress(e.target.value) } />

                <label htmlFor='sellerAddress'>Seller Address</label>
                <input type='text' name='sellerAddress' value={sellerAddress} onChange={ (e) => setSellerAddress(e.target.value) } />

                <input type='submit' />
            </form>

            <p style={{color:"red"}}>{ status }</p>
        </div>
    );
}