import React,{useState,useEffect} from 'react'
import './cart.css'

function Cart() {
    const [userName,setUserName] = useState('');
    const [cartProduct,setCartProduct] = useState([]);

    useEffect(() => {
        setUserName(localStorage.getItem('user'));
        console.log(userName);
    }, [userName]);

    useEffect(() => {
        if (userName) { // userName이 설정된 이후에만 fetch 실행
            fetch('http://localhost:3003/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            })
            .then(response => response.json())
            .then(data => setCartProduct(data))
            .catch(error => console.error('Error:', error));
        }
    }, [userName]); // userName이 변경될 때마다 실행

    const itemDelete = async(id)=>{
        try{
            const response = fetch('http://localhost:3003/api/itemDelete',{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
                body:JSON.stringify({id})

            })
            if(response){
                alert('제품을 장바구니 목록에서 삭제하였습니다');
                window.location.reload();     
            }
            else if(response.status===401){
                alert('인증 오류: 로그인 상태를 확인해 주세요.');
            }
         
        }catch(err){
            console.error("데이터 삭제 중 오류 발생:", err);
            alert('데이터 삭제 중 네트워크 오류가 발생하였습니다.');   
        }
    }

    return (
        <div>
            <div className='cart-contents'>  
             {cartProduct.map((cartProduct, index) => (
                <div className='cart-container' key={index}>
                    <div className='cart-card'>
                        <div className='cart-header'>회사명
                            <button className='cart-delete' onClick={()=>itemDelete(cartProduct._id)}>삭제</button>
                        </div>
                        <div className='cart-content'>
                            <img className='cart-img' src={cartProduct.productImg} alt=''></img>
                            <h3 className='cart-Title'>{cartProduct.productTitle}</h3>
                            <p className='cart-price'>{cartProduct.price}원</p>
                        </div>  
                        <div className='cart-footer'>
                            <button className='cart-pay'>주문하기</button>
                        </div>
                    </div>
                </div>
                ))
             }
            </div>
        </div>
    );
}

export default Cart