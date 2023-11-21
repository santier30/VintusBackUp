import UserMenu from './UserMenu';
import { Outlet } from 'react-router-dom';
const UserPage = ({resetCart})=>{
    return(
        <main className='UserPage'>
                <div className='wrap'>
                <UserMenu set={resetCart}/>
                <section className='UserSection'>
                <Outlet />
                </section>
                </div>
        </main>
    )
}
export default UserPage


