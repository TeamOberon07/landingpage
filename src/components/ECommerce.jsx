import { useState, useEffect } from 'react';

export function ECommerce() {
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [sellerAddress, setSellerAddress] = useState('0xc6d8fEFc59868633e04b8DE3D7c69CbE92c2ac2E');
    const [buyerAddress, setBuyerAddress] = useState('');
    const [status, setStatus] = useState('');
    const [orderLink, setOrderLink] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetch('http://localhost:8000/orders')
        .then(res => res.json())
        .then(res => {
            setId(res.length + 1);
            setIsLoading(false);
        });
    }, []);

    if(isLoading) {
        return <p>Loading...</p>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setOrderLink('');

        const order = {id, price, sellerAddress, buyerAddress, confirmed: false, hash: ''};

        if (price === '') {
            setStatus('Please enter a valid price');
        }
        else
        if (buyerAddress === "") {
            setStatus("Please enter your address");
        }
        else {
            fetch('http://localhost:8000/orders', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order)
            })
            .then((res) => {
                if(!res.ok) {
                    setStatus('POST request failed: ' + res.status + ' ('+ res.statusText + ')');
                }
                else {
                    setStatus('Request processed correctly, please complete the payment on ShopChain');
                    setOrderLink('http://localhost:3000/landing-page?order='+id);

                    window.open('http://localhost:3000/landing-page?order='+id);
                    setPrice('');
                    setSellerAddress('0xc6d8fEFc59868633e04b8DE3D7c69CbE92c2ac2E');
                    setBuyerAddress("");
                    setId(id+1);
                }
            });
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor='price'>Price:</label>
                <input type='text' name='price' id='price' value={price} onChange={ (e) => setPrice(e.target.value) } />

                <label htmlFor='sellerAddress'>Seller Address:</label>
                <select name='sellerAddress' id='sellerAddress' value={sellerAddress} onChange={ (e) => setSellerAddress(e.target.value) } >
                    <option value='0xc6d8fEFc59868633e04b8DE3D7c69CbE92c2ac2E'>S1: 0xc6d8fEFc59868633e04b8DE3D7c69CbE92c2ac2E</option>
                    <option value='0x25EfE244b43036aF8915Aa9806a478f9405D31db'>S2: 0x25EfE244b43036aF8915Aa9806a478f9405D31db</option>
                    <option value='0x7FA3E0bbff7082cf4f2fcCB2CfcC92f2e5602999'>S3: 0x7FA3E0bbff7082cf4f2fcCB2CfcC92f2e5602999</option>
                    <option value='0x26d44a260c6dde286a72Bc43E384a087731cecef'>S4: 0x26d44a260c6dde286a72Bc43E384a087731cecef</option>
                </select>

                <label htmlFor='price'>Your Address (Buyer):</label>
                <input type='text' name='buyerAddress' id='buyerAddress' value={buyerAddress} onChange={ (e) => setBuyerAddress(e.target.value) } />

                <input id='submitBtn' type='submit' />
            </form>

            <p>{ status }</p>
            {orderLink && <a href={orderLink} target='_blank' rel='noreferrer'>Complete Payment</a>}
            
        </div>
    );
}