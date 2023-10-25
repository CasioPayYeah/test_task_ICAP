'use client'

import { FormEvent, useState } from 'react';
import { login } from '@/app/api/api';
import LoginStatus from '@/app/components/modals/LoginStatus';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isAuth = await login(username, password);

    console.log(isAuth);

    setUserName('');
    setPassword('');

    if (isAuth) {
      setLoginStatus(true);
      openModal();

      router.push('/dataTable')
    } else {
      setLoginStatus(false);
      openModal();
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-col justify-start px-6 py-12 lg:px-8">
        <div className="self-center">
          <p>username: testuser</p>
          <p>password: testpassword123</p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  placeholder="Type your username"
                  onChange={e => setUserName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  placeholder="Type your password"
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>

      <LoginStatus isOpen={isOpenModal} loginStatus={loginStatus} onClose={closeModal} />
    </>
  )
}
