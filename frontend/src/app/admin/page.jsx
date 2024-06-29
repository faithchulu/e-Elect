import Logo from '../../../public/images/logo/e-Elect-Logo.png';
import Flag from '../../../public/images/backgrounds/zambia_flag.png'
import Image from 'next/image';

export default function Login() {
    return (
      <>
       
        <div className="flex min-h-screen flex-1 bg-green-100">
          <div className="flex flex-1 flex-col justify-center px-4 py-6 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div className=''>
                <Image
                  className="h-30 w-30"
                  src={Logo}
                  alt="e-Elect Logo"
                />
                <h2 className="mt- text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  e-Elect Admin Portal
                </h2>

              </div>
  
              <div className="mt-6">
                <div>
                  <form action="#" method="POST" className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
  
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="block w-full px-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
  
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
  
            
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0">
            <Image
            src={Flag}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
          </div>
        </div>
      </>
    )
  }
  