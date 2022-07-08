import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-black p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 192.756 192.756">
              <g fillRule="evenodd" clipRule="evenodd">
              <path d="M0 0h192.756v192.756H0V0z" />
              <path fill="#fff" d="M35.024 113.982h-2.817l2.817-2.287V78.861h11.619l-2.904 2.289v30.545l2.816 2.287H35.024zM12.666 113.982h7.658l-2.553-2.287V96.643h-2.553v15.052l-2.552 2.287zM27.454 113.982l4.137-11.707-9.859-23.326h-8.891l14.613 35.033zM51.485 114.07h7.658l-2.553-2.199 4.93-21.743h-2.465l-5.017 21.743-2.553 2.199z" />
              <path d="M66.625 103.42c1.232 4.842 2.201 8.363 2.201 8.363l-2.289 2.111h11.62l-9.771-34.857h-8.098l5.897 22.535h-5.634v1.848h6.074zM83.878 113.895h7.659l-2.553-2.375V92.681h-2.553v18.839l-2.553 2.375zM83.878 79.037l20.071 35.033h5.809v-5.984L93.473 79.037h-9.595zM145.32 95.938h-13.291l3.785 3.082v15.932c0-.001 9.506-2.29 9.506-19.014zM131.236 114.951c-7.043-1.145-12.852-9.242-12.852-19.102 0-8.362 4.049-16.021 10.035-18.133v34.067l2.817 3.168zM165.654 115.039c-7.041-1.145-12.852-9.242-12.852-19.101 0-8.362 4.049-16.021 10.035-18.133v34.154l2.817 3.08zM167.15 77.805c7.131 1.144 12.941 9.243 12.941 19.102 0 8.363-4.139 16.109-10.035 18.133V80.974l-2.906-3.169zM132.029 77.717s4.93-.088 8.713 3.433l3.875-2.641v11.707s-4.666-10.123-12.588-10.123v-2.376zM112.311 78.949h-7.659l2.553 2.377v17.34h2.553v-17.34l2.553-2.377z" fill="#fff" />
            </g>
            </svg>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
              <span>Home</span>
            </Link>
            <Link to="/exercise1" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
              <span>Exercise 1</span>
            </Link>
            <Link to="exercise2" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-teal-200 mr-4">
              <span>Exercise 2</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
