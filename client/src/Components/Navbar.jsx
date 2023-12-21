export default function Navbar(){
    return(
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="logo_div flex justify-center items-center">
                    <img className='h-16' src='leaf-s-logo-icon-vector-illustration-template-design_878729-1905-removebg-preview (1) (1).png' />
                    <a className="px-3">AyurVision</a>
                </div>
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}