const UserOrders  = ()=>{
    const userData = JSON.parse(localStorage.getItem("USER"))

    return(
        <>
        <article>
            <h2>Pedidos</h2>
        </article>
<div className="gap">
{userData.buys.map((order,index)=>{
    const date = order.date.split('T')
    const hs = date[1].split(':')
    return(
        <article className="userCart" key={index}>
        <div className="container">
            <span>{date[0] + ": " + hs[0]+ ":" +hs[1] }</span>
          <div className="address" >
          <p>{order.address.province}</p>
          <p>{order.address.postalCode}</p>
          <p>{order.address.street}</p>
          <p>{order.address.number}</p>
          <p>{order.address.apartment}</p>
          </div>

        {    order.cart.map((wine)=>{
    return(
        <div className="userItem" key={wine.Name}>
            <img src={wine.Img} alt="" className="cart-img"/>
                <div className="userCart_item_content">
                    <h3>{wine.Name}</h3>
                    <p>{"$" + wine.Price}</p>
                    <div className="item-buttons">
                        <span>{wine.Amount}</span>
                    </div>
                    <span className="total">{"$" + wine.Price*wine.Amount}</span>
                </div>
            </div>
    )
 })       }
 <span>{order.status + ": $"+ order.price}</span>
 </div>
 </article>
    )
})}
</div>



        </>
    )
}
export default UserOrders