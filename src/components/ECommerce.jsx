import { useState, useEffect } from 'react';

export function ECommerce() {
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [sellerAddress, setSellerAddress] = useState('0x25EfE244b43036aF8915Aa9806a478f9405D31db');
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

        const order = {id, price, sellerAddress, confirmed: false, hash: ''};

        if (price === '') {
            setStatus('Please enter a valid price');
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
                    setOrderLink('http://localhost:3000/landingpage?order='+id);

                    window.open('http://localhost:3000/landingpage?order='+id);
                    setPrice('');
                    setSellerAddress('0x25EfE244b43036aF8915Aa9806a478f9405D31db');
                    setId(id+1);
                }
            });
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor='price'>Price</label>
                <input type='text' name='price' id='price' value={price} onChange={ (e) => setPrice(e.target.value) } />

                <label htmlFor='sellerAddress'>Seller Address</label>
                <select name='sellerAddress' id='sellerAddress' value={sellerAddress} onChange={ (e) => setSellerAddress(e.target.value) } >
                    <option value='0x25EfE244b43036aF8915Aa9806a478f9405D31db'>S1: 0x25EfE244b43036aF8915Aa9806a478f9405D31db</option>
                    <option value='0xc6d8fEFc59868633e04b8DE3D7c69CbE92c2ac2E'>S2: 0xc6d8fEFc59868633e04b8DE3D7c69CbE92c2ac2E</option>
                    <option value='0x7FA3E0bbff7082cf4f2fcCB2CfcC92f2e5602999'>S3: 0x7FA3E0bbff7082cf4f2fcCB2CfcC92f2e5602999</option>
                    <option value='0x26d44a260c6dde286a72Bc43E384a087731cecef'>S4: 0x26d44a260c6dde286a72Bc43E384a087731cecef</option>
                    <option value='0x9034C7BfE4f6E4a30cbbcbC193EE1f98BF80421e'>S5: 0x9034C7BfE4f6E4a30cbbcbC193EE1f98BF80421e</option>
                    <option value='0xD7C4ca22b142fE95a33856bC37ED5E514C6b7279'>S6: 0xD7C4ca22b142fE95a33856bC37ED5E514C6b7279</option>
                    <option value='0xDE4706886D1c283a9765F8314125a439DE78dF24'>S7: 0xDE4706886D1c283a9765F8314125a439DE78dF24</option>
                    <option value='0xe5B197D91ad002a18917aB4fdc6b6E0126797482'>S8: 0xe5B197D91ad002a18917aB4fdc6b6E0126797482</option>
                </select>

                <input id='submitBtn' type='submit' />
            </form>

            <p>{ status }</p>
            {orderLink && <a href={orderLink} target='_blank' rel='noreferrer'>Complete Payment</a>}
            
        </div>
    );
}