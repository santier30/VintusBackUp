import UserMenu from './UserMenu';
import { Outlet } from 'react-router-dom';
const UserPage = ()=>{
    return(
        <main className='UserPage'>
                <div className='wrap'>
                <UserMenu />
                <section className='UserSection'>
                <Outlet />
                </section>
                </div>
        </main>
    )
}
export default UserPage


